<template>
    <div>
      <div v-show="!zobrazitMapu">
        <div class="form-group">
          <label for="titleInput">Název lokace:</label>
          <input v-model="name" type="text" @change="handleSubmit" class="form-control" id="titleInput">
        </div>
        <div class="form-group">
          <label for="descriptionTextarea">Popis lokace:</label>
          <input v-model="description" type="text"  @change="handleSubmit" class="form-control" id="descriptionTextarea">
        </div>
        <!--div class="form-group">
          <label for="propertyCheckbox"><input type="checkbox" id="propertyCheckbox" v-model="property"  @change="handleSubmit" /> Jedná se o bytovou jednotku?</label>        
        </div>
        <div class="form-group">
          <label for="habitabilityInput">Obyvatelnost</label>
          <input v-model="habitability" type="text" class="form-control" id="habitabilityInput"  @change="handleSubmit">
        </div-->

        <div class="form-group">
          <label>Půdorys:</label>
          <div class="row">
            <div class="col-4 col-sm-2 mb-4" v-for="(souradnice, index) of pudorys" :key="index">
              <input class="form-control" :value="souradnice.join(', ')" @change="ulozitSouradnici(index, $event.target.value)" />
            </div>
            <div class="col-4 col-sm-2 mb-4">
              <button class="btn btn-primary" @click="pridatSouradnici">+</button>
            </div>
            <div class="col-6 col-sm-4 mb-4" v-if="pudorys.length === 2">
              <button class="btn btn-primary" @click="udelatObdelnik">Udělat obdelník</button>
            </div>
            <div class="col-6 col-sm-4 mb-4" v-if="pudorys.length === 0">
              <button class="btn btn-primary" @click="rodicovskyPudorys">Převzít půdorys z rodiče</button>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="barvaInput">Barva:</label>
          <input v-model="barva" type="text" @change="handleSubmit" class="form-control" id="barvaInput">
        </div>

        <div class="form-group">
          <label for="popisekInput">Popisek:</label>
          <input v-model="popisek" type="text" @change="handleSubmit" class="form-control" id="popisekInput">
        </div>

        <div class="form-group">
          <label for="vrstvaInput">Vrstva</label>
          <input v-model="vrstva" type="text" class="form-control" id="vrstvaInput"  @change="handleSubmit" list="vrstvyLokaci">
          <datalist id="vrstvyLokaci">
            <option v-for="vrstva of dostupneVrstvy">{{ vrstva }}</option>
          </datalist>
        </div>

        <button class="btn btn-light mb-2" @click="zobrazitMapu = true">Zobrazit mapu</button>

        <h2>Blízké lokace</h2>

        <Table :data="siblings" :headers="{ name: 'Název lokace', description: 'Popis' }" :className="x => x.id === id ? 'table-secondary' : ''" @row-click="gotoLocation($event)" />

        <h2>Lokace uvnitř</h2>

        <a href="#" v-if="parent_id" @click.prevent="gotoLocation(parent_id)">Přejít na nadřazenou</a>

        <Table :data="children" :headers="{ name: 'Název lokace', description: 'Popis' }" @row-click="gotoLocation($event)" />

        <h2>Rychlý editor</h2>

        <StructureEditable :data="locations" :parent_id="id" 
          @item-create="quickCreate($event)" 
          @item-update="quickSave($event)" 
          @item-delete="quickDelete($event)" />
      </div>
      <Mapa :podlazi="0" v-if="zobrazitMapu" :id="id" @close="zobrazitMapu = false" />
    </div>
  </template>
  <script>
import Table from '@/components/Table.vue'
import StructureEditable from '@/components/StructureEditable'
import Mapa from '@/components/Mapa.vue'

  export default {
    name: "LocationDetail",
    components: { Table, StructureEditable, Mapa },
    data() {
      return {
        zobrazitMapu: false,
        name: "",
        description: "",
        property: false,
        interval: null,
        parent_id: null,
        habitability: "",
        barva: "",
        pudorys: [],
        popisek: "",
        vrstva: "",
      };
    },
    mounted() {
        this.loadLocation(this.id)
    },
    computed: {
      dostupneVrstvy() {
        return Array.from(new Set(this.locations.map(l => l.vrstva).filter(v => v)))
      },
      locations() {
        return this.$store.getters.locations
      },
      id() {
        return parseInt(this.$route.params.id);
      },
      textareaClasses() {
        return this.isFocused ? "focus" : "";
      },
      siblings() {
        const location = this.$store.getters.locations.find(x => x.id === this.parent_id)
        if (location) {
          return this.$store.getters.locations.filter(x => x.parent_id === location.id)
        } else {
          return []
        }
      },
      children() {
        return this.$store.getters.locations.filter(x => x.parent_id == this.id)
      }
    },
    methods: {
      pridatSouradnici() {
        const predchoziHodnota = this.pudorys[this.pudorys.length - 1]
        this.pudorys.push([...(predchoziHodnota ? predchoziHodnota : [0, 0])])
      },
      rodicovskyPudorys() {        
        const location = this.locations.find(l => l.id === this.id)
        const parent = this.locations.find(l => l.id === location.parent_id)
        if (parent.pudorys) {
          this.pudorys = JSON.parse(parent.pudorys)
          location.pudorys = JSON.parse(parent.pudorys)
          this.save(this.id)
        }
      },
      udelatObdelnik() {
        const p = this.pudorys
        this.pudorys = [
          [ p[0][0], p[0][1] ],
          [ p[1][0], p[0][1] ],
          [ p[1][0], p[1][1] ],
          [ p[0][0], p[1][1] ],
        ]
        this.save(this.id)
      },
      ulozitSouradnici(index, hodnota) {
        const match = hodnota.match(/(\-?[0-9]+),\s*(\-?[0-9]+)/)
        if (match) {
          const [, x, y] = match
          this.pudorys[index] = [parseInt(x), parseInt(y)]
          this.save(this.id)
        } else if (hodnota.length === 0) {
          this.pudorys.splice(index, 1)
          this.save(this.id)
        } else {
          alert('Nepsrávné hodnoty (musí obsahovat dvě celá čísla oddělená čárkou)')
        }
      },
      save(id) {
        this.$store.dispatch("saveLocation", {
          id,
          name: this.name,
          property: this.property ? 1 : 0,
          description: this.description,
          habitability: this.habitability,
          pudorys: JSON.stringify(this.pudorys),
          barva: this.barva,
          popisek: this.popisek,
          vrstva: this.vrstva,
        });
      },
      create() {
        this.$store.dispatch("createLocation", {
          name: this.name,
          property: this.property ? 1 : 0,
          description: this.description,
          habitability: this.habitability,
          pudorys: [],
          barva: 'white',
          popisek: '',
          vrstva: ''
        });
      },
      handleSubmit() {
        this.save(this.id);
      },
      gotoLocation(id) {
        this.$router.push("/locations/" + id);
      },
      loadLocation(id) {
        const location = this.$store.state.data.locations.find(
            (x) => x.id == id
        );
        if (location) {
            this.name = location.name
            this.property = !!location.property
            this.description = location.description
            this.parent_id = location.parent_id
            this.habitability = location.habitability
            this.pudorys = JSON.parse(location.pudorys)
            this.barva = location.barva
            this.popisek = location.popisek
            this.vrstva = location.vrstva 
        } else {
          this.$router.push("/locations");
        }
      },

      quickCreate(item) {
        if (item.name[0] === "+") {
              item.property = 1
              item.name = item.name.slice(1)
          } else if (item.name[0] === "-") {
              item.property = 0
              item.name = item.name.slice(1)
          }
          const match = item.name.match(/:([cmfx]+)/);
          if (match) {
            item.habitability = match[1];
          }
          this.$store.dispatch("createLocation", {...item, description: "" })
      },

      quickSave(item) {
          if (item.name[0] === "+") {
              item.property = 1
              item.name = item.name.slice(1)
          } else if (item.name[0] === "-") {
              item.property = 0
              item.name = item.name.slice(1)
          }
          const match = item.name.match(/:([cmfx]+)/);
          if (match) {
            item.habitability = match[1];
          }
          this.$store.dispatch("saveLocation", item)
      },

      quickDelete(item) {
        this.$store.dispatch("deleteLocation", item)
      }

    },
    watch: {
        id(value, old) {
            this.save(old)
            this.loadLocation(value)
        }
    },
  };
  </script>
  <style scoped>
  .overflow-hidden {
    overflow: hidden;
  }
  .form-group label {
    font-weight: bold;
  }
  
  .form-control:focus {
    border-color: #80bdff;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.075),
      0 0 5px rgba(128, 189, 255, 0.5);
  }
  
  textarea {
    height: 100px;
    transition: height 0.3s ease-in-out;
  }
  
  textarea.focus {
    height: 500px;
  }
  </style>