<template>
    <ul>
      <li v-for="(item, index) in items" :key="item.id">
        <input v-model="item.name" @change="saveItem(item)" :ref="'input' + index" @keyup.shift.enter.stop="createItem(item)" @keyup.ctrl.enter.stop="createSubItem(item)" />
        <StructureEditable
            v-if="childCount(item) > 0"
          :data="this.data"
          :parent_id="item.id"
          @item-update="saveItem($event)"
          @item-create="createItem($event)"
          @item-delete="$emit('item-delete', $event)"
        />
      </li>
    </ul>
  </template>
<script>
  import StructureEditable from "@/components/StructureEditable.vue";
  
  export default {
    name: "StructureEditable",
    components: { StructureEditable },
    data() {
      return {
        expanded: this.data.filter(item => item.parent_id == this.parent_id).map(() => this.defaultExpanded)
      };
    },
    props: {
      data: {
        type: Array,
        default: () => []
      },
      parent_id: {
        type: Number,
        default: null
      },
      defaultExpanded: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      childCount(parent) {
        return this.data.filter(item => item.parent_id == parent.id).length;
      },
      saveItem(item) {
        if (item.name.length > 0 || this.data.filter(x => x.parent_id == item.id).length > 0) {
            this.$emit("item-update", item)
        } else {
            this.$emit("item-delete", item)
        }
      },
      createItem(item) {
        const newItem = { name: "", parent_id: item.parent_id };
        this.$emit("item-create", newItem);
      },
      createSubItem(item) {
        const newSubItem = { name: "", parent_id: item.id };
        this.$emit("item-create", newSubItem);
      }
    },
    computed: {
      items() {
        return this.data.filter(item => item.parent_id == this.parent_id);
      }
    },
  };
  </script>
  <style scoped>
  ul {
    display: inline-block;
  }
  li {
    list-style-type: none;
  }
  input {
    display: block;
    width: 100%;
  }
  </style>