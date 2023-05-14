<template>
    <div :key="scrollY">
        <Relations :id="npc.id" />

        <h3 class="npc-header" v-if="isHeaderShown(scrollY)">
           <img :src="thumb(npc.id)" width="50" />
           {{ getFullname(npc) }}
        </h3>

        <div class="form-group" ref="personalData">
            <label for="firstnameInput">Jméno:</label>
            <input v-model="npc.firstname" @change="handleSubmit" type="text" class="form-control" id="firstnameInput">
        </div>
        <div class="form-group">
            <label for="lastnameInput">Příjmení:</label>
            <input v-model="npc.lastname" @change="handleSubmit" type="text" class="form-control" id="lastnameInput">
        </div>
        <div class="form-group" v-show="false">
            <label for="locationInput">Bydliště:</label>
            <select v-model="npc.location_id" @change="handleSubmit" class="form-control" id="locationInput">
                <option v-for="location in locations" :value="location.id">{{ location.name }}</option>
            </select>
        </div>
        <div class="form-group" v-for="(attribute, index) of attributes" :key="index">
            <label :for="'valueInput-' + index" @click="enabledRange = enabledRange !== index ? index : -1">{{ attribute.attribute }}: {{ attributeLabel(attribute.value) }}</label>
            <input type="range" 
                :disabled="enabledRange !== index" 
                min="0" max="7" 
                v-model="attribute.value" 
                class="form-control" 
                :id="'valueInput-' + index" 
                @change="setAttribute(attribute); enabledRange = -1"
                />
        </div>

        <div class="form-group">
            <label for="newAttributeInput">Přidat vlastnost:</label>
            <input v-model="newAttribute" type="text" class="form-control" id="newAttributeInput" @change="addAttribute" list="attributesList" autocomplete="off" placeholder="Přidat vlastnost...">
            <datalist id="attributesList">
                <option v-for="(attribute, index) of uniqueAttributes" :key="index">{{ attribute }}</option>
            </datalist>
        </div>

        <div class="form-group">
            <label for="newTagInput">Tagy:</label>
            <input v-model="newTag" type="text" class="form-control" id="newTagInput" @change="addTag" list="tagsList" autocomplete="off">
            <datalist id="tagsList">
                <option v-for="(tag, index) of uniqueTags" :key="index">{{ tag }}</option>
            </datalist>
            <hr />
            <span class="tag" v-for="(tag, index) of tags" :key="index" @click="removeTag(tag)">{{ tag.tag }}</span>
        </div>

        <div class="form-group">
            <label for="newRelationInput">Přidat vztah:</label>
            <input type="text" v-model="newRelation" class="form-control" id="newRelationInput" @change="addRelation" list="personsList" autocomplete="off" placeholder="Najít osobu...">
            <datalist id="personsList">
                <option v-for="(person, index) of availablePersons" :key="index">{{ person.firstname + " " + person.lastname }}</option>
            </datalist>
        </div>

        <div class="form-group" v-for="relation of relations" :key="relation.id">
            <label :for="'descriptionInput-' + relation.id">
                <img :src="thumb(getNpcInRelation(relation).id)" width="50" :alt="getFullname(getNpcInRelation(relation))" /> 
                    {{ getFullname(getNpcInRelation(relation)) }}
                    <a href="#" @click.prevent="gotoNpc(getNpcInRelation(relation).id)">Přejít na profil &gt;&gt;</a>
            </label>
            <textarea v-model="relation.description" class="form-control" :id="'descriptionInput-' + relation.id" @change="saveRelation(relation)" rows="3" />
            <hr />
        </div>

        <div class="form-group">
            <label for="descriptionTextarea">Charakteristika:</label>
            <textarea v-model="npc.description" @change="handleSubmit" class="form-control" id="descriptionTextarea"></textarea>
        </div>

        <hr />

        <a href="#" @click.prevent="gotoNpc(next.id)">Přejít na další osobu ({{ getFullname(next) }})</a>

    </div>
</template>
<script>
import Relations from './Relations.vue';

export default {
    name: "NpcDetail",
    components: { Relations },
    data() {
        return {
            enabledRange: -1,
            newTag: "",
            newRelation: "",
            newAttribute: "",
            npc: {
                id: null,
                name: '',
                location_id: null,
                description: ''
            }
        };
    },
    methods: {
        save(id) {
            this.$store.dispatch("saveNpc", {
                id,
                firstname: this.npc.firstname,
                lastname: this.npc.lastname,
                location_id: this.npc.location_id,
                description: this.npc.description,
            });
        },
        create() {
            this.$store.dispatch("createNpc", {
                firstname: this.npc.firstname,
                lastname: this.npc.lastname,
                location_id: this.npc.location_id,
                description: this.npc.description,
            });
        },
        handleSubmit() {
            /*if (this.id === "new") {
                this.create();
            } else {*/
                this.save(this.id);
            // }
        },
        getNpcById(id) {
            return this.$store.getters.npcById(id)
        },  
        getNpcInRelation(relation) {
            return this.getNpcById(relation.person1_id === this.id ? relation.person2_id : relation.person1_id)
        },
        getFullname(npc) {
            return npc.firstname + " " + npc.lastname
        },
        thumb(id) {
            return window.API_URL + '/person_thumb/' + id + '.jpg'
        },
        gotoNpc(id) {
            this.$router.push('/npc/' + id)
        },

        addTag() {
            this.$store.dispatch("addTag", { person_id: this.id, tag: this.newTag })
            this.newTag = ""
        },
        removeTag(tag) {
            this.$store.dispatch("removeTag", tag)
        },

        addAttribute() {
            this.$store.dispatch("addAttribute", { person_id: this.id, attribute: this.newAttribute })
            this.newAttribute = ""
        },
        setAttribute(attribute) {
            if (attribute.value > 0 || !confirm(`Opravdu chcete odstranit ${attribute.attribute}?`)) {
                this.$store.dispatch("saveAttribute", attribute)
            } else {
                this.removeAttribute(attribute)
            }
        },
        removeAttribute(attribute) {
            this.$store.dispatch("removeAttribute", attribute)
        },
        attributeLabel(value) {
            let labels = [
                'Irelevantní', 
                'Vůbec',
                'Naprosto minimálně',
                'Málo',
                'Středně',
                'Hodně',
                'Velmi mnoho',
                'Maximálně'
            ]
            return labels[value]
        },

        addRelation() {
            this.$store.dispatch("addRelation", { person_id: this.id, relativePerson: this.newRelation })
            this.newRelation = ""
        },
        saveRelation(relation) {
            this.$store.dispatch("saveRelation", { id: relation.id, description: relation.description })
        },
        isHeaderShown(x) {            
            if (this.$refs.personalData) {
                const rect = this.$refs.personalData.getBoundingClientRect();
                return rect.bottom < 0
            } else {
                return false
            }
        }
    },
    computed: {
        api() {
            return window.API_URL
        },
        locations() {
            return this.$store.getters.locations.filter(x => !!x.property).map(x => ({
                id: x.id,
                name: this.$store.getters.deepLocationById(x.id)
            }))
        },
        allLocations() {
            return this.$store.getters.locations
        },
        id() {
            return this.$route.params.id !== "new" ? parseInt(this.$route.params.id) : "new";
        },
        
        tags() {
            return this.availableTags.filter(t => t.person_id === this.id)
        },
        availableTags() {
            return this.$store.getters.personTags
        },
        uniqueTags() {
            return Array.from(new Set(this.availableTags.map(t => t.tag))).filter(t => !this.tags.find(tag => tag.tag === t))
        },

        attributes() {
            return this.availableAttributes.filter(a => a.person_id === this.id)
        },
        availableAttributes() {
            return this.$store.getters.personAttributes
        },        
        uniqueAttributes() {
            return Array.from(new Set(this.availableAttributes.map(a => a.attribute))).filter(a => !this.attributes.find(attribute => attribute.attribute === a))
        },
        
        relations() {
            return this.$store.getters.relationsById(this.id)
        },
        availablePersons() {
            return this.$store.getters.availablePersonsById(this.id)
        },
        scrollY() {
            return this.$store.getters.scrollY
        },
        next() {
            return this.$store.getters.nextPerson(this.id)
        }
    },
    created() {
        if (this.id !== 'new') {
            const npc = this.getNpcById(this.id);
            this.npc.id = npc.id;
            this.npc.firstname = npc.firstname;
            this.npc.lastname = npc.lastname;
            this.npc.location_id = npc.location_id;
            this.npc.description = npc.description;
        }
    }
};
</script>
<style scoped>
.form-group label {
    font-weight: bold;
}

textarea {
    height: 100px;
    transition: height 0.3s ease-in-out;
}

textarea:focus {
    position: fixed;
    left: 5%;
    width: 90%;
    top: 5%;
    height: 90%;
    z-index: 99999999;
}
.tag {
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 10px;
    padding: 5px 10px;
    background-color: #AFA;
}

.npc-header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    background-color: black;
    color: white;
    font-weight: bold;
}
</style>