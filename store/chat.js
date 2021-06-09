export const state = () => ({
    selected_room: null,
    messages: []
})

export const getters = {
    selected_room: state => {
        return state.selected_room
    },
    messages: state => {
        return state.messages.filter((item) => item.room === state.selected_room)
    }
}

export const actions = {
    updateRoom({commit, state}, room) {
        commit('updateRoom', room)
    },
    pushMessage({commit, state}, message) {
        commit('pushMessage', message)
    },
}

export const mutations = {
    updateRoom(state, room) {
        state.selected_room = room
    },
    pushMessage(state, message) {
        message.room = state.selected_room
        state.messages.push(message)
    }
}