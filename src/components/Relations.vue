<template>
    <div class="relations">
        <div class="table">
            <div class="parents">  
                <div>
                    <img v-if="mother" :src="url(mother)" :width="50" :title="mother.firstname + ' ' + mother.lastname" @click="gotoNpc(mother)"/>
                    <img v-else :src="url({id:0})" :width="50" title="Osoba není známá" />
                    <img v-if="father" :src="url(father)" :width="50" :title="father.firstname + ' ' + father.lastname" @click="gotoNpc(father)"/>
                    <img v-else :src="url({id:0})" :width="50" title="Osoba není známá" />
                </div>          
            </div>
        </div>
        
        <div class="me">
            <div>
                <div :class="fitMe ? 'fit' : ''" :style="{ 'background-image': fitMe ? 'url(' + url(me) + ')' : 'none'}" @click="fitMe = !fitMe">
                    <h2 v-if="fitMe">{{ me.firstname + " " + me.lastname }}</h2>
                    <img v-if="!fitMe" :src="url(me)"  class="only-me" :width="105" :title="me.firstname + ' ' + me.lastname"/>
                </div>
                <div>
                    <img v-if="partner" class="partner" :src="url(partner)" :width="50" :title="partner.firstname + ' ' + partner.lastname" @click="gotoNpc(partner)"/>            
                    <img v-else class="partner" :src="url({id:0})" :width="50" title="Osoba není známá" />

                    <br />

                    <img v-for="sibling of siblings" class="sibling" :src="url(sibling)" :width="50" :title="sibling.firstname + ' ' + sibling.lastname" @click="gotoNpc(sibling)"/>
                </div>
            </div>
        </div>

        <div class="table">
            <div class="children">
                <img  v-if="children.length" v-for="child of children" :src="url(child)" :width="50" :title="child.firstname + ' ' + child.lastname" @click="gotoNpc(child)"/>
                <img v-else title="Osoba není známá" :src="url({id:0})" :width="50" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Relations',
    data() {
        return {
            fitMe: false
        }
    },
    props: {
        id: {
            type: Number,
            required: true
        },
    },    
    methods: {
        url(npc) {
            return `${window.API_URL}/persons/${npc.id}.jpg`
        },
        gotoNpc(npc) {
            this.$router.push('/npc/' + npc.id);
        }
    },
    computed: {
        me() {
            return this.$store.getters.npcById(this.id)
        },
        mother() {
            return this.$store.getters.motherById(this.id)
        },
        father() {
            return this.$store.getters.fatherById(this.id)
        },
        children() {
            return this.$store.getters.childrenById(this.id)
        },
        siblings() {
            return this.$store.getters.siblingsById(this.id)
        },
        partner() {
            return this.$store.getters.partnerById(this.id)
        }
    }
}
</script>
<style>
.relations {
    border: 3px solid black;
    padding: 10px;
    margin: 20px 0;
}
.table {
    display: table;
    margin-bottom: 10px;
}
.parents {
    width: 100%;
    text-align:center;
    display: table-row;
}
.parents > div {
    display: table-cell;
    width: 100%;
    text-align: center;
}
.me {
    width: 100%;
}
.me > div {
    padding: 10px 0;
    text-align: center;
}
.me > div > div {
    display: inline-block;
    vertical-align: top;
    text-align: left;
}
.me img {
    margin-right: 5px;
}
.partner {
    filter: saturate(.1);
}
.sibling {
    margin-top: 5px;
    filter: saturate(.1);
}
.parents img {
    filter: saturate(.1);
    margin: 0 5px;
}
.children {
    text-align: center;
}
.children img {
    filter: saturate(.1);
    margin-right: 10px;
}
.fit {
    z-index: 99999999999999;
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-position: center center;
    background-repeat: no-repeat;
    background-color: black;
}
.fit {
    background-size: contain;
}
.fit h2 {
    font-weight: bold;
    text-align: center;
    padding: 25px 0;
    color: white;
}
.fill-black {
    filter: brightness(0)
}
</style>