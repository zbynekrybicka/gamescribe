<template>
    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Postava</th>
            <th scope="col">Dialog</th>
            <th scope="col">Poznámka</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dialog in getCutSceneDialogs" :key="dialog.id">
            <th scope="row">{{ dialog.id }}</th>
            <td>
              <select class="form-control" v-model="dialog.character_id" @change="saveDialog(dialog.id)">
                <option :value="null">-- scénická poznámka --</option>
                <option v-for="npc in npcs" :key="npc.id" :value="npc.id">{{ npc.name }}</option>
              </select>
            </td>
            <td>
              <textarea class="form-control" rows="3" v-model="dialog.line_text" @change="saveDialog(dialog.id)"></textarea>
            </td>
            <td>
              <input type="text" class="form-control" v-model="dialog.note" @change="saveDialog(dialog.id)" />
            </td>
            <td>
              <button class="btn btn-danger" @click="removeDialog(dialog.id)">Smazat</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button class="btn btn-primary" @click="addRow">Přidat řádek</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CutSceneDialogs',
    props: {
      cutScene: {
        type: Number,
        required: true
      },
      npcs: {
        type: Array,
        required: true
      },
      rowsData: {
        type: Array,
        default: () => [{ npc: null, dialog: '' }]
      }
    },
    data() {
      return {
        rows: this.rowsData
      }
    },
    methods: {
        saveDialog(dialogId) {
            this.$store.dispatch("saveDialog", this.getCutSceneDialogs.find(x => x.id === dialogId))
        },
        deleteDialog(dialogId) {
            this.$store.dispatch("deleteDialog", this.getCutSceneDialogs.find(x => x.id === dialogId))
        },
        createDialog() {
            this.$store.dispatch("createDialog", { cut_scene_id: this.cutScene, line_text: "" })
        }
    },
    computed: {
        getCutSceneDialogs() {
            return this.$store.getters.getCutSceneDialogs(this.cutScene)
        }
    },
    watch: {
      rows: {
        handler: function (newRows) {
          this.$emit('update:rows-data', newRows)
        },
        deep: true
      }
    }
  }
  </script>
  
  <style scoped>
  table {
    margin-bottom: 1rem;
  }
  
  th:first-child {
    width: 50px;
  }
  
  th:nth-child(2) {
    width: 30%;
  }
  
  th:nth-child(3) {
    width: 50%;
  }
  
  button {
    margin-top: 1rem;
  }
  </style>
  