<template>
    <div class="mapa-frame" ref="mapaFrame">
        <div class="close-button">
            <button class="btn btn-default" @click="zoom(1.1)">Zvětšit</button>
            <button class="btn btn-default" @click="zoom(0.9)">Zmenšit</button>
            <button type="button" class="btn btn-light" data-dismiss="modal" aria-label="Close" @click="$emit('close')">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <div @scroll="this.scrollKey++">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" :width="velikost * _zoom" :height="velikost * _zoom">
                <g :transform="'translate(' + (velikost/2*_zoom) + ', ' + (velikost/2*_zoom) + ') scale(' + _zoom + ', -' + _zoom + ')'">
                    <polygon v-for="lokace of locations" :points="lokace.pudorys" :style="{ fill:lokace.barva, stroke:'black', strokeWidth: 1 }" :key="lokace.id" />
                    <text transform="scale(1,-1)" :x="popisek.x" :y="popisek.y" font-size="100px" v-for="popisek of popisky">{{ popisek.popisek }}</text>
                </g>
            </svg>        
        </div>

    </div>
</template>

<script>
export default {
    name: "Mapa",
    props: {
        podlazi: { type: Number, required: true },
        id: { type: Number, required: true }
    },
    data: () => ({
        velikost: 400000,
        _zoom: .2,
        scrollKey: 0
    }),
    computed: {
        locations() {
            this.serazeneLokace = []
            this.podrizeneLokace(null)
            return this.serazeneLokace.filter(sl => {
                let souradnice = JSON.parse(sl.pudorys)
                return !!souradnice.length
            }).map(sl => ({
                id: sl.id,
                souradnice: (() => {
                    try {
                        let souradnice = JSON.parse(sl.pudorys)
                        return souradnice.length === 0 ? [[0,0]] : souradnice
                    } catch (e) {
                        return [[0,0]]
                    }
                })(),
                pudorys: (() => { 
                    let pudorys
                    try {
                        pudorys = JSON.parse(sl.pudorys)
                    } catch (e) {
                        return '0,0'
                    }
                    return pudorys.map(p => p.join(',')).join(' ')
                })(),
                barva: sl.barva,
                popisek: sl.popisek
            }))
        },
        popisky() {
            return this.locations.map(l => {
                const match = l.popisek.match(/((\-?[0-9]+),\s*(\-?[0-9]+)\s*)(.*)/)
                if (match) {
                    const [ , , x, y, popisek] = match
                    const [souradnice] = l.pudorys.split(' ')
                    const [ bx, by ] = souradnice.split(',')
                    const result = {
                        x: x ? (parseInt(bx) + parseInt(x)) : null,
                        y: y ? (parseInt(by) - parseInt(y)) : null,
                        popisek
                    }
                    return result
                }
                return null
            }).filter(p => p && !isNaN(p.x) && !isNaN(p.y) && p.popisek)
        },
        mapaFramScroll() {
            this.scrollKey
            if (this.$refs.mapaFrame) {
                return [this.$refs.mapaFrame.scrollTop, this.$refs.mapaFrame.scrollLeft]
            } else {
                return ['?', '?']
            }
        }
    },
    methods: {
        podrizeneLokace(id) {
            let result = this.$store.getters.locations.filter(l => l.parent_id === id)
            for (const l of result) {
                this.serazeneLokace.push(l)
                this.podrizeneLokace(l.id)
            }
        },
        zoom(podil) {
            this._zoom *= podil
            this.$nextTick(() => {
                this.center()
            })
        },
        center() {
            const location = this.locations.find(l => l.id === this.id)
            let x, y
            if (location) {
                x = (this.$refs.mapaFrame.scrollWidth / 2) / (this.velikost / 2) * location.souradnice[0][0] 
                y = (this.$refs.mapaFrame.scrollHeight / 2) / (this.velikost / 2) * location.souradnice[0][1]  * -1
            } else {
                x = 0
                y = 0
            }
            this.$refs.mapaFrame.scrollLeft = Math.round(this.$refs.mapaFrame.scrollWidth / 2) + x - Math.round(this.$refs.mapaFrame.clientWidth / 2)
            this.$refs.mapaFrame.scrollTop = Math.round(this.$refs.mapaFrame.scrollHeight / 2) + y - Math.round(this.$refs.mapaFrame.clientHeight / 2)

        }
    },
    mounted() {
        this.center()
    }
}
</script>

<style>
.close-button {
    position: fixed;
    top: 4px;
    right: 21px;
}
.mapa-frame {
    background-color: white;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
}
</style>

