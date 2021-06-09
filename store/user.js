export const state = () => ({
    user: {
        auth: false,
        name: null,
        type_user: null
    }
})

export const getters = {
    user: state => {
        return state.user
    }
}

export const actions = {
    openSession({commit, state}, data) {
        commit('openSession', data)
    },
    closeSession({commit, state}) {
        commit('closeSession')
    }
}

export const mutations = {
    openSession(state, data) {
        state.user.auth = true 
        state.user.name = data.name
        state.user.type_user = data.type_user
    },
    closeSession(state) {
        this.$router.push({name: 'index', params: {example_param: 'text example'}})
        state.user.auth = false
        state.user.name = null
        state.user.type_user = null
    }
}