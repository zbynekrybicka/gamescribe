<template>
    <div>
      <div v-if="!id">
        <!--Table :data="stats" :headers="{ polozka: 'Položka', hodnota: 'Hodnota'}" /-->
        <Structure :data="locations" :format="location => location.name" @item-click="showLocation" />
      </div>
      <LocationDetail v-if="id" :id="id" />
    </div>
  </template>
  
  <script>
  import Table from "@/components/Table.vue";
  import Mapa from "@/components/Mapa.vue";
  import Structure from "@/components/Structure.vue";
  import LocationDetail from "@/components/LocationDetail.vue";
  import LocationStats from "@/components/LocationStats.vue";
  
  export default {
    components: {
      Table,
      Structure,
      LocationDetail,
      LocationStats,
      Mapa
    },
    computed: {
      locations() {
        return this.$store.getters.locations
      },
      stats() {
        return [
          { 
            polozka: "Celkový počet lokací",
            hodnota: this.locations.length
          },
          {
            polozka: "Počet obytných prostorů",
            hodnota: this.locations.filter(l => l.property === 1).length
          },
          {
            polozka: "Počet pokojů",
            hodnota: this.locations.filter(lc => this.locations.filter(lp => lp.property === 1).find(lp => lp.id === lc.parent_id)).length
          },
          {
            polozka: "Počet obyvatel",
            hodnota: this.locations.filter(l => l.habitability).map(l => this.calculateHabitability(l.habitability)).map(h => h.m + h.f + h.x).reduce((acc, val) => acc + (isNaN(Number(val)) ? 0 : Number(val)), 0)
          },
          {
            polozka: "Mužů",
            hodnota: this.locations.filter(l => l.habitability).map(l => this.calculateHabitability(l.habitability)).map(h => h.m).reduce((acc, val) => acc + (isNaN(Number(val)) ? 0 : Number(val)), 0)
          },
          {
            polozka: "Žen",
            hodnota: this.locations.filter(l => l.habitability).map(l => this.calculateHabitability(l.habitability)).map(h => h.f).reduce((acc, val) => acc + (isNaN(Number(val)) ? 0 : Number(val)), 0)
          },
          {
            polozka: "Zatím neurčené pohlaví",
            hodnota: this.locations.filter(l => l.habitability).map(l => this.calculateHabitability(l.habitability)).map(h => h.x).reduce((acc, val) => acc + (isNaN(Number(val)) ? 0 : Number(val)), 0)
          }
        ]
      },
      id() {
        return this.$route.params.id;
      }
    },
    methods: {
      showLocation(location) {
        this.$router.push("/locations/" + location.id);
      },
      calculateHabitability(code) {
        const h = {
          m: 0,
          f: 0,
          x: 0
        }
        for (const char of code) {
          switch (char) {
            case "c":
              h.m++
              h.f++
              break;

            default:
              h[char]++
          }
        }
        return h
      }
    }
  };
  </script>
  