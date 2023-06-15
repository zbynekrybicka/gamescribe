<template>
  <ul v-if="items.length > 0">
    <li v-for="(item, index) in items" :key="item.id">
      <div class="list-group-item" @click.stop="$emit('item-click', item)">
        <div class="item-header">
          <span @click.stop="expanded[index] = !expanded[index]" v-if="childCount(item) > 0">
            {{ expanded[index] ? '-' : '+' }}
          </span>
          {{ format(item) }}
        </div>
      </div>
      <Structure v-if="expanded[index]" 
        :data="data"
        :format="format"
        :parent_id="item.id" 
        :defaultExpanded="defaultExpanded" 
        @item-click="$emit('item-click', $event)"/>
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
      format: {
        type: Function,
        required: true,
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
li {
    list-style-type: none;
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