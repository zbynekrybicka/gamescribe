<template>
    <div>
        <template v-if="!id">
            <h1>NPC postavy</h1>
            <Table :data="npcs" @row-click="showNpc" :headers="{img: 'Foto', id: 'ID', name: 'Jméno'}" />
            <br />
            <button @click="addNpc" class="btn btn-primary">Přidat NPC postavu</button>
        </template>
        <NpcDetail :id="id" v-if="id" :key="componentKey" />
    </div>
</template>

<script>
    import Table from "@/components/Table.vue";
    import NpcDetail from "@/components/NpcDetail.vue";

    export default {
        data() {
            return {
                componentKey: 0
            }
        },
        components: { Table, NpcDetail },
        computed: {
            npcs() {
                return this.$store.getters.npcs.map(x => ({
                    id: x.id,
                    name: x.lastname + " " + x.firstname,
                    location: this.$store.getters.deepLocationById(x.location_id),
                    img: `<img src="${window.API_URL}/person_thumb/${x.id}" width="100" />`,
                }));
            },
            id() {
                return this.$route.params.id;
            }
        },
        methods: {
            addNpc() {
                this.$router.push('/npc/new');
            },
            showNpc(id) {
                this.$router.push('/npc/' + id);
            }
        },
        watch: {
            id() {
                this.componentKey++
            }
        }
    };
</script>
