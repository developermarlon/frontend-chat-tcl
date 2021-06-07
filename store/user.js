export const state = () => ({
    auth: false,
    name: null,
    email: null,
    photo: null,
    role: null,
    token: null
})

export const getters = {
    auth: state => {
        return state.auth
    },
    name: state => {
        return state.name
    },
    email: state => {
        return state.email
    },
    photo: state => {
        return state.photo
    },
    role: state => {
        return state.role
    },
    token: state => {
        return state.token
    }
}

export const actions = {
    openSession({commit, state}, date) {
        commit('openSession', date)
    },
    closeSession({commit, state}) {
        commit('closeSession')
    },
    updateStoreUser({commit, state}, data) {
        commit('updateStoreUser', data)
    }
}

export const mutations = {
    openSession(state, date) {
        state.auth = true 
        state.name = date.user.name
        state.email = date.user.email
        state.photo = date.user.photo
        state.role = date.user.role
        state.token = date.token
    },
    closeSession(state) {
        this.$router.push({name: 'auth-login', params: {example_param: 'text example'}})
        state.auth = false 
        state.name = null
        state.email = null
        state.photo = null
        state.role = null
        state.token = null
    },
    updateStoreUser(state, data) {
        state.photo = data.photo
        state.name = data.name
        state.email = data.email
    }
}