export const state = () => ({
    selected_room: null,
})

export const getters = {
    selected_room: state => {
        return state.selected_room
    }
}

export const actions = {
    updateRoom({commit, state}, room) {
        commit('updateRoom', room)
    }
}

export const mutations = {
    updateRoom(state, room) {
        state.selected_room = room
    }
}