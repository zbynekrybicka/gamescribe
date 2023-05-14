<template>
    <div>
        <template v-if="!id">
            <h1>Předměty</h1>
            <Table :data="items" @row-click="showItem" :headers="{id: 'ID', name: 'Název', description: 'Popis' }" />
            <br />
            <button @click="addItem" class="btn btn-primary">Přidat předmět</button>
        </template>
        <ItemDetail :id="id" v-if="id" />
    </div>
</template>

<script>
    import Table from "@/components/Table.vue";
    import ItemDetail from "@/components/ItemDetail.vue";

    export default {
        components: { Table, ItemDetail },
        computed: {
            items() {
                return this.$store.getters.items.map(x => ({
                    id: x.id,
                    name: x.name,
                    description: x.description
                }));
            },
            id() {
                return this.$route.params.id;
            }
        },
        methods: {
            addItem() {
                this.$router.push('/items/new');
            },
            showItem(id) {
                this.$router.push('/items/' + id);
            }
        }
    };
</script>
