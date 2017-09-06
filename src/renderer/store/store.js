const state = {
    fileDatas: [1],
    testing: "yes"
}

const mutations = {
    ADD_NEW_FILE_DATA(state, payload) {
        state.fileDatas = [...state.fileDatas, payload];
    },
    UPDATE_EXISTING_FILE(state, index, payload) {
        state.fileDatas[index] = payload;
    }
}

const actions = {
    addNewFile (context, payload) {
        commit('ADD_NEW_FILE_DATA', payload)
    }
}

export default {
    state,
    actions,
    mutations
}