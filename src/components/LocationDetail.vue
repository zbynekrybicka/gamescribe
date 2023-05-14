<template>
    <div>
      <div class="form-group">
        <label for="titleInput">Název lokace:</label>
        <input v-model="name" type="text" @change="handleSubmit" class="form-control" id="titleInput">
      </div>
      <div class="form-group">
        <label for="descriptionTextarea">Popis lokace:</label>
        <input v-model="description" type="text"  @change="handleSubmit" class="form-control" id="descriptionTextarea">
      </div>
      <div class="form-group">
        <label for="propertyCheckbox"><input type="checkbox" id="propertyCheckbox" v-model="property"  @change="handleSubmit" /> Jedná se o bytovou jednotku?</label>        
      </div>
      <div class="form-group">
        <label for="habitabilityInput">Obyvatelnost</label>
        <input v-model="habitability" type="text" class="form-control" id="habitabilityInput"  @change="handleSubmit">
      </div>

      <h2>Lokace uvnitř</h2>

      <a href="#" v-if="parent_id" @click.prevent="gotoLocation(parent_id)">Přejít na nadřazenou</a>

      <Table :data="children" :headers="{ name: 'Název lokace', description: 'Popis' }" @row-click="gotoLocation($event)" />

      <h2>Rychlý editor</h2>

      <StructureEditable :data="locations" :parent_id="id" 
        @item-create="quickCreate($event)" 
        @item-update="quickSave($event)" 
        @item-delete="quickDelete($event)"/>
    </div>
  </template>
  <script>
import Table from '@/components/Table.vue'
import StructureEditable from '@/components/StructureEditable'

  export default {
    name: "LocationDetail",
    components: { Table, StructureEditable },
    data() {
      return {
        name: "",
        description: "",
        property: false,
        interval: null,
        parent_id: null,
        habitability: ""
      };
    },
    mounted() {
        this.loadLocation(this.id)
    },
    methods: {
      save(id) {
        this.$store.dispatch("saveLocation", {
          id,
          name: this.name,
          property: this.property ? 1 : 0,
          description: this.description,
          habitability: this.habitability,
        });
      },
      create() {
        this.$store.dispatch("createLocation", {
          name: this.name,
          property: this.property ? 1 : 0,
          description: this.description,
          habitability: this.habitability
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
            this.name = location.name;
            this.property = !!location.property
            this.description = location.description;
            this.parent_id = location.parent_id;
            this.habitability = location.habitability;
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
    computed: {
      locations() {
        return this.$store.getters.locations
      },
      id() {
        return parseInt(this.$route.params.id);
      },
      textareaClasses() {
        return this.isFocused ? "focus" : "";
      },
      children() {
        return this.$store.getters.locations.filter(x => x.parent_id == this.id)
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