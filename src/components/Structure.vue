<template>
      <ul v-if="items.length > 0">
        <li v-for="(item, index) in items" :key="item.id">
          <div class="item-header" @click.stop="$emit('item-click', item.id)">
            <span @click.stop="expanded[index] = !expanded[index]" v-if="childCount(item) > 0">
              {{ expanded[index] ? '-' : '+' }}
            </span>
            {{ item.title }}
          </div>
          <Structure v-if="expanded[index]" :data="this.data" :parent_id="item.id" :defaultExpanded="defaultExpanded" @item-click="$emit('item-click', $event)"/>
        </li>
      </ul>
  </template>
  
  <script>
  import Structure from "@/components/Structure.vue";
  
  export default {
    name: "Structure",
    components: { Structure },
    data() {
        return {
            expanded: this.data.filter(item => item.parent_id == this.parent_id).map(x => this.defaultExpanded)
        }
    },
    props: {
      data: {
        type: Array,
        default: () => [],
      },
      parent_id: {
        type: Number,
        default: null,
      },
      defaultExpanded: {
        type: Boolean,
        default: false
      }
    },
    methods: {
        childCount(parent) {
            return this.data.filter(item => item.parent_id == parent.id).length
        }
    },
    computed: {
      items() {
        return this.data.filter(item => item.parent_id == this.parent_id);
      },
    },
  };
  </script>

<style>
ul {
    display: inline-block;
    padding-left: 25px;
}
li {
    list-style-type: none;
}
li .item-header {
    border: 1px solid black;
    padding: 5px 25px 5px 5px;
    margin-bottom: 5px;
    cursor: pointer;
}
li .item-header:hover {
    background-color: #efe;
}

li .item-header span {
    cursor: pointer;
    border: 1px solid black;
    font-size: 20px;
    line-height: 20px;
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 13px;
    text-align: center;
    background-color: white;
}
</style>