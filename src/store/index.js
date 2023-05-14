import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    authToken: null,
    isLoading: false,
    zvolenyProjekt: null,
    error: "",
    data: null
  },
  getters: {
    nextPerson: (state) => (id) => {
      let personsWithAttributes = [1, id, ...state.data.person_attributes.map(pa => pa.person_id)]
      return state.data.npcs.find(p => p.gender === "m" && personsWithAttributes.indexOf(p.id) === -1)
    },
    availablePersonsById: (state) => (id) => {
      let relatedPersons = state.data?.persons_relations
        .filter(pr => pr.person1_id === id || pr.person2_id === id)
        .map(pr => pr.person1_id === id ? pr.person2_id : pr.person1_id)
      return state.data?.npcs.filter(p => !relatedPersons.includes(p.id))
        },
    relationsById: (state) => (id) => {
      return state.data?.persons_relations.filter(pr => pr.person1_id === id || pr.person2_id === id)
    },
    isLoggedIn(state) {
      return !!state.authToken
    },
    error(state) {
      return state.error
    },
    isLoadedData(state) {
      return !state.authToken || state.data !== null
    },
    jeZvolenyProjekt(state) {
      return !!state.zvolenyProjekt
    },
    projects(state) {
      return state.data?.projects || []
    },
    locations(state) {
      return state.data?.locations.filter(x => x.project_id == state.zvolenyProjekt) || []
    },
    npcs(state) {
      return state.data?.npcs.filter(x => x.project_id == state.zvolenyProjekt) || []
    },
    items(state) {
      return state.data?.items.filter(x => x.project_id == state.zvolenyProjekt) || []
    },
    cutScenes(state) {
      return state.data?.cutScenes.filter(x => state.data.locations.find(l => l.id == x.location_id)) || []
    },
    npcById: (state) => (id) => {
      return state.data?.npcs.find(npc => npc.id === id);
    },
    itemById: (state) => (id) => {
      return state.data?.items.find(item => item.id === id);
    },
    cutsceneById: (state) => (id) => {
      return state.data?.cutScenes.find(item => item.id === id);
    },
    deepLocationById: (state) => (id) => {
      const location = state.data.locations.find(x => x.id == id)
      if (!location) {
        return ""
      }
      const parent = state.data.locations.find(x => x.id == location.parent_id)
      return (parent?.name || " ") + " - " + location.name
    },
    getCutSceneNPCs: (state) => (cutSceneId) => {
      return state.data.npcs.filter(npc => state.data.cutScenesCharacters.some(x => npc.id === x.person_id && x.cut_scene_id === cutSceneId))
    },
    getCutSceneDialogs: (state) => (cutSceneId) => {
      return state.data.cutScenesLines.filter(x => x.cut_scene_id === cutSceneId)
    },
    motherById: (state) => (id) => {
      let me = state.data?.npcs.find(npc => npc.id === id);
      return state.data.npcs.find(npc => npc.id === me.mother_id);
    },
    fatherById: (state) => (id) => {
      let me = state.data?.npcs.find(npc => npc.id === id);
      return state.data.npcs.find(npc => npc.id === me.father_id);
    },
    childrenById: (state) => (id) => {
      return state.data.npcs.filter(npc => id === npc.mother_id || id === npc.father_id);
    },
    siblingsById: (state) => (id) => {
      let me = state.data?.npcs.find(npc => npc.id === id);
      return state.data.npcs.filter(npc => npc.id !== id && (me.mother_id !== null && npc.mother_id === me.mother_id || me.father_id !== null && npc.father_id === me.father_id));
    },
    partnerById: (state) => (id) => {
      return state.data.npcs.find(npc => id === npc.partner_id);
    }, 
    personTags(state) {
      return state.data.person_tags
    },
    personAttributes(state) {
      return state.data.person_attributes
    },
    scrollY(state) {
      return state.scrollY
    }
  }, 
  mutations: {
    scroll(state, value) {
      state.scrollY = value
    },
    addAttribute(state, data) {
      state.data.person_attributes.push(data)
    },
    saveAttribute(state, data) {
      let index = state.data.person_attributes.findIndex(pa => pa.person_id === data.person_id && pa.attribute === data.attribute)
      state.data.person_attributes[index].value = data.value
    },
    removeAttribute(state, data) {
      let index = state.data.person_attributes.findIndex(pa => pa.person_id === data.person_id && pa.attribute === data.attribute)
      state.data.person_attributes.splice(index, 1)
    },
    addRelation(state, data) {
      state.data.persons_relations.push(data)
    },
    saveRelation(state, data) {
      let index = state.data.persons_relations.findIndex(pr => pr.id === data.id)
      state.data.persons_relations[index].description = data.description
    },
    removeRelation(state, id) {
      let index = state.data.persons_relations.findIndex(pr => pr.id === id)
      state.data.persons_relations.splice(index, 1)
    },
    setAuthToken(state, token) {
      state.authToken = token
    },
    setLoading(state, isLoading) {
      state.isLoading = isLoading
    },
    logout(state) {
      state.authToken = null
      localStorage.removeItem('gamescribe-authToken')
    },
    loadAll(state, data) {
      state.data = data
    },
    setError(state, error) {
      state.error = error
      setTimeout(() => {
        state.error = ""
      }, 5000)
    },
    addProject(state, data) {
      state.data.projects.push(data)
    },
    saveProject(state, data) {
      const index = state.data.projects.findIndex(project => project.id == data.id)
      if (index !== -1) {
        state.data.projects[index].title = data.title
        state.data.projects[index].description = data.description
      }
    },
    zvolitProjekt(state, id) {
      state.zvolenyProjekt = id
      localStorage.setItem("zvolenyProjekt", id)
    },

    addLocation(state, location) {
      state.data.locations.push(location)
    },
    
    saveLocation(state, data) {
      const index = state.data.locations.findIndex(x => x.id == data.id);
      if (index !== -1) {
        if ("property" in data) {
          state.data.locations[index].property = data.property
        }
        state.data.locations[index].name = data.name
        state.data.locations[index].description = data.description
      }
    },

    deleteLocation(state, location) {
      const index = state.data.locations.findIndex(l => l.id == location.id);
      if (index !== -1) {
        state.data.locations.splice(index, 1);
      }
    },

    saveNpc(state, npcData) {
      const index = state.data.npcs.findIndex(npc => npc.id === npcData.id);
      if (index !== -1) {
        state.data.npcs[index].name = npcData.name;
        state.data.npcs[index].description = npcData.description;
        state.data.npcs[index].location_id = npcData.location_id;
      }
    },
    addNpc(state, npcData) {
      state.data.npcs.push(npcData);
    },
    

    addItem(state, itemData) {
      state.data.items.push(itemData);
    },

    saveItem(state, itemData) {
      const index = state.data.items.findIndex(item => item.id === itemData.id);
      if (index !== -1) {
        state.data.items[index].name = itemData.name;
        state.data.items[index].description = itemData.description;
      }
    },

    addCutScene(state, cutSceneData) {
      state.cutScenes.push(cutSceneData)
    },
    
    saveCutScene(state, cutSceneData) {
      const index = state.data.cutScenes.findIndex(cutScene => cutScene.id === cutSceneData.id);
      if (index !== -1) {
        state.data.cutScenes[index].name = cutSceneData.name;
        state.data.cutScenes[index].description = cutSceneData.description;
      }
    },

    addNPCtoCutScene(state, { cut_scene_id, person_id }) {
      state.data.cutScenesCharacters.push({ cut_scene_id, person_id })
    },
    removeNPCfromCutScene(state, { cutSceneId, npcId }) {
      const index = state.data.cutScenesCharacters.findIndex(x => x.cut_scene_id === cutSceneId && x.person_id === npcId);
      state.data.cutScenesCharacters.splice(index, 1)
    },

    addCutSceneDialog(state, cutSceneDialog) {
      state.data.cutScenesDialogs.push(cutSceneDialog)
    },
    saveCutSceneDialog(state, cutSceneDialog) {
      const index = state.data.cutScenesDialogs.findIndex(x => x.id === cutSceneDialog.id);
      if (index !== -1) {
        state.data.cutScenesDialogs[index].character_id = cutSceneDialog.character_id;
        state.data.cutScenesDialogs[index].line_text = cutSceneDialog.line_text;
        state.data.cutScenesDialogs[index].note = cutSceneDialog.note;
      }
    },
    addTag(state, tag) {
      state.data.person_tags.push(tag)
    },
    removeTag(state, tag) {
      let index = state.data.person_tags.findIndex(t => tag.person_id === t.person_id && tag.tag === t.tag)
      state.data.person_tags.splice(index, 1)
    }    
  },
  actions: {
    login({ commit, dispatch }, { email, password, rememberMe }) {
      commit('setLoading', true)
      return axios
        .post(window.API_URL + '/login', { email, password })
        .then((response) => {
          commit('setAuthToken', response.data)
          if (rememberMe) {
            localStorage.setItem('gamescribe-authToken', response.data)
          }
          dispatch('loadAll')
        })
        .catch((error) => {
          console.error(error)
          commit('setError', `Chyba při přihlašování: ${error.response.data}`)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },

    loadAll({ commit, state }) {
      commit('setLoading', true)
      axios.get(window.API_URL + '/all', {
        headers: {
          Authorization: `Bearer ${state.authToken}`
        }
      }).then(response => {
        commit('loadAll', response.data)
      }).catch(error => {
        commit('setError', error.response.data)
      }).finally(() => {
        commit('setLoading', false)
      })
    },

    saveProject({ commit, state }, data) {
      commit('setLoading', true)
      axios.put(window.API_URL + '/projects', data, { headers: { Authorization: `Bearer ${state.authToken}` } })
        .then(() => {
          commit('setLoading', false)
          commit('saveProject', data)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error.response.data)
        }).finally(() => {
          commit('setLoading', false)
        })
    },
    
    createProject({ commit, state }, { title, description }) {
      commit('setLoading', true)
      axios.post(window.API_URL + '/projects', { title, description }, {
        headers: { Authorization: `Bearer ${state.authToken}` }
      })
      .then(response => {
        commit('addProject', response.data)
      })
      .catch(error => {
        commit('setError', error.response.data)
      }).finally(() => {
        commit('setLoading', false)
      })
    },

    saveLocation({ commit, state }, data) {
      commit('setLoading', true)
      axios.put(window.API_URL + '/locations', data, { headers: { Authorization: `Bearer ${state.authToken}` } })
        .then(() => {
          commit('saveLocation', data)
        })
        .catch(error => {
          commit('setError', error.response)
        }).finally(() => {
          commit('setLoading', false)
        })
    },
        
    createLocation({ commit, state }, data) {
      commit('setLoading', true)
      axios.post(window.API_URL + '/locations', {...data, project_id: state.zvolenyProjekt }, { headers: { Authorization: `Bearer ${state.authToken}` } })
        .then(response => {
          commit('addLocation', response.data)
        })
        .catch(error => {
          commit('setError', error.response.data)
        }).finally(() => {
          commit('setLoading', false)
        })
    },

    deleteLocation({ commit, state }, location) {
      commit('setLoading', true)
      axios.delete(window.API_URL + '/locations/' + location.id, { headers: { Authorization: `Bearer ${state.authToken}` } })
        .then(() => {
          commit('deleteLocation', location)
        })
        .catch(error => {
          commit('setError', error.response.data)
        }).finally(() => {
          commit('setLoading', false)
        })
    },
    
    createNpc({ commit, state }, npcData) {
      commit('setLoading', true)
      axios.post(window.API_URL + '/npcs', {...npcData, project_id: state.zvolenyProjekt }, { headers: { Authorization: `Bearer ${state.authToken}` } })
        .then(response => {
          commit('addNpc', response.data)
        })
        .catch(error => {
          commit('setError', error.response.data)
        }).finally(() => {
          commit('setLoading', false)
        })
    },
    
    saveNpc({ commit, state }, npcData) {
      commit('setLoading', true)
      axios.put(window.API_URL + '/npcs', npcData, { headers: { Authorization: `Bearer ${state.authToken}` } })
        .then(() => {
          commit('saveNpc', npcData)
        })
        .catch(error => {
          commit('setError', error.response)
        }).finally(() => {
          commit('setLoading', false)
        })
    },
    
    createItem({ commit, state }, itemData) {
      commit('setLoading', true)
      axios.post(window.API_URL + '/items', {...itemData, project_id: state.zvolenyProjekt }, { headers: { Authorization: `Bearer ${state.authToken}` } })
        .then(response => {
          commit('addItem', response.data)
        })
        .catch(error => {
          commit('setError', error.response.data)
        }).finally(() => {
          commit('setLoading', false)
        })
    },
    
    saveItem({ commit, state }, itemData) {
      commit('setLoading', true)
      axios.put(window.API_URL + '/items', itemData, { headers: { Authorization: `Bearer ${state.authToken}` } })
        .then(() => {
          commit('saveItem', itemData)
        })
        .catch(error => {
          commit('setError', error.response)
        }).finally(() => {
          commit('setLoading', false)
        })
    },
    
    createCutScene({ commit, state }, cutSceneData) {
      commit('setLoading', true)
      axios.post(window.API_URL + '/cut-scenes', cutSceneData, { headers: { Authorization: `Bearer ${state.authToken}` } })
        .then(response => {
          commit('addCutScene', response.data)
        })
        .catch(error => {
          commit('setError', error.response.data)
        }).finally(() => {
          commit('setLoading', false)
        })
    },
    
    saveCutScene({ commit, state }, cutSceneData) {
      commit('setLoading', true)
      axios.put(window.API_URL + '/cut-scenes/' + cutSceneData.id, cutSceneData, { headers: { Authorization: `Bearer ${state.authToken}` } })
        .then(() => {
          commit('saveCutScene', cutSceneData)
        })
        .catch(error => {
          commit('setError', error.response)
        }).finally(() => {
          commit('setLoading', false)
        })
    },

        // přidání NPC do cut scény
    addNPCtoCutScene({ commit, state }, { npcId, cutSceneId }) {
      commit('setLoading', true)
      axios.post(`${window.API_URL}/cut-scenes-characters`, { cut_scene_id: cutSceneId, person_id: npcId }, { headers: { Authorization: `Bearer ${state.authToken}` } })
        .then(response => {
          commit('addNPCtoCutScene', response.data)
        })
        .catch(error => {
          commit('setError', error.response.data)
        }).finally(() => {
          commit('setLoading', false)
        })
    },

    // odebrání NPC z cut scény
    removeNPCfromCutScene({ commit, state }, { npcId, cutSceneId }) {
      commit('setLoading', true)
      axios.delete(`${window.API_URL}/cut-scenes-characters/${cutSceneId}-${npcId}`, { headers: { Authorization: `Bearer ${state.authToken}` } })
        .then(() => {
          commit('removeNPCfromCutScene', npcId)
        })
        .catch(error => {
          commit('setError', error.response.data)
        }).finally(() => {
          commit('setLoading', false)
        })
    },

    createDialog({ commit, state }, cutSceneDialog) {
      commit('setLoading', true)
      axios.post(window.API_URL + '/cut-scenes-lines', cutSceneDialog, { headers: { Authorization: `Bearer ${state.authToken}` } })
        .then(response => {
          commit('addCutSceneDialog', response.data)
        })
        .catch(error => {
          commit('setError', error.response.data)
        }).finally(() => {
          commit('setLoading', false)
        })
    },

    saveDialog({ commit, state }, cutSceneDialog) {
      commit('setLoading', true)
      axios.put(window.API_URL + '/cut-scenes-lines', cutSceneDialog, { headers: { Authorization: `Bearer ${state.authToken}` } })
        .then(() => {
          commit('saveCutSceneDialog', cutSceneDialog)
        })
        .catch(error => {
          commit('setError', error.response)
        }).finally(() => {
          commit('setLoading', false)
        })
    },
    
    addTag({ commit, state }, data) {
      commit('setLoading', true)
      axios.post(window.API_URL + '/person_tag', data, { headers: { Authorization: `Bearer ${state.authToken}` } })
        .then(response => {
          commit('addTag', response.data)
        })
        .catch(error => {
          commit('setError', error.response.data)
        }).finally(() => {
          commit('setLoading', false)
        })
    },

    removeTag({ commit, state }, data) {
      commit('setLoading', true)
      axios.delete(`${window.API_URL}/person_tag/${data.person_id}-${data.tag}`, { headers: { Authorization: `Bearer ${state.authToken}` } })
        .then(() => {
          commit('removeTag', data)
        })
        .catch(error => {
          commit('setError', error.response.data)
        }).finally(() => {
          commit('setLoading', false)
        })
    },

    addRelation({ commit, state }, data) {
      commit('setLoading', true)
      axios.post(window.API_URL + '/persons_relations', data, { headers: { Authorization: `Bearer ${state.authToken}` } })
        .then(response => {
          commit('addRelation', response.data)
        })
        .catch(error => {
          commit('setError', error.response.data)
        }).finally(() => {
          commit('setLoading', false)
        })
    },

    saveRelation({ commit, state }, data) {
      commit('setLoading', true)
      axios.put(window.API_URL + '/persons_relations', data, { headers: { Authorization: `Bearer ${state.authToken}` } })
        .then(() => {
          commit('saveRelation', data)
        })
        .catch(error => {
          commit('setError', error.response.data)
        }).finally(() => {
          commit('setLoading', false)
        })
    },

    removeRelation({ commit, state }, data) {
      commit('setLoading', true)
      axios.delete(`${window.API_URL}/persons_relations/${id}`, { headers: { Authorization: `Bearer ${state.authToken}` } })
        .then(() => {
          commit('removeRelation', id)
        })
        .catch(error => {
          commit('setError', error.response.data)
        }).finally(() => {
          commit('setLoading', false)
        })
    },

    addAttribute({ commit, state }, data) {
      commit('setLoading', true)
      axios.post(window.API_URL + '/persons_attributes', data, { headers: { Authorization: `Bearer ${state.authToken}` } })
        .then(response => {
          commit('addAttribute', response.data)
        })
        .catch(error => {
          commit('setError', error.response.data)
        }).finally(() => {
          commit('setLoading', false)
        })
    },

    saveAttribute({ commit, state }, data) {
      commit('setLoading', true)
      axios.put(window.API_URL + '/persons_attributes', data, { headers: { Authorization: `Bearer ${state.authToken}` } })
        .then(() => {
          commit('saveAttribute', data)
        })
        .catch(error => {
          commit('setError', error.response.data)
        }).finally(() => {
          commit('setLoading', false)
        })
    },

    removeAttribute({ commit, state }, data) {
      commit('setLoading', true)
      axios.delete(`${window.API_URL}/persons_attributes/${data.person_id}-${data.attribute}`, { headers: { Authorization: `Bearer ${state.authToken}` } })
        .then(() => {
          commit('removeAttribute', data)
        })
        .catch(error => {
          commit('setError', error.response.data)
        }).finally(() => {
          commit('setLoading', false)
        })
    },


  },
  modules: {
  }
})
