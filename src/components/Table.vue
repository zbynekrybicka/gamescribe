<template>
    <table>
      <thead>
        <tr>
          <th v-for="(title, attribute) in headers" :key="attribute" @click="sortBy(attribute)">{{ title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in shownData" :key="row.id" @click.stop="rowClicked(row.id)" :class="[ 'bg-white' ]">
          <td v-for="(title, index) in Object.keys(headers)" :key="index" v-html="row[title]" :class="className(row)"/>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  export default {
    name: "TableComponent",
    data() {
      return {
        sortAttribute: null
      }
    },
    props: {
      className: {
        type: Function,
        required: false,
        default: () => '',
      },
      headers: {
        type: Object,
        required: true
      },
      data: {
        type: Array,
        required: true
      }
    },
    methods: {
      rowClicked(id) {
        this.$emit("row-click", id);
      },
      sortBy(attribute) {
        this.sortAttribute = attribute
      }
    },
    computed: {
      shownData() {
        if (this.sortAttribute) {
          return this.data.sort((a, b) => {
            if (a[this.sortAttribute] < b[this.sortAttribute]) {
              return -1;
            }
            if (a[this.sortAttribute] > b[this.sortAttribute]) {
              return 1;
            }
            return 0;
          })
        } else {
          return this.data
        }
      }
    },
  };
  </script>
  
  <style scoped>
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th {
      cursor: pointer;
    }
    th, td {
      padding: 8px;
      border: 1px solid #ddd;
      text-align: left;
    }
    td {
        cursor: pointer;
    }
    th {
      background-color: #f2f2f2;
      font-weight: bold;
    }
    .bg-gray-100 {
      background-color: #f5f5f5;
    }
    .bg-white {
      background-color: #fff;
    }

    tr:hover td {
        background-color: #f5fff5;
    }
  </style>
  