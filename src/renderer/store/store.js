import _ from "lodash"

const state = {
    fileDatas: [],
    loading: false
}

const mutations = {
    ADD_NEW_FILE_DATA(state, newfile) {
        state.fileDatas = [...state.fileDatas, newfile];
    },
    REMOVE_FILE(state, index) {
        state.fileDatas.splice(index, 1);
    },
    UPDATE_EXISTING_FILE_NAME(state, { index, fileorder, filename }) {
        state.fileDatas[index][fileorder].name = filename;
    },
    UPDATE_EXISTING_FILE_RESULTS(state, { index, result }) {
        const fileUpdate = state.fileDatas[index];
        fileUpdate.file1.data = _.zip(result.file1);
        fileUpdate.file2.data = _.zip(result.file2);
        fileUpdate.results = result.comparisonResults;
    },
    SET_LOADING(state, isLoading) {
        state.loading = isLoading;
    }
}

const actions = {
    addNewFile({ commit, state }, payload) {
        commit('ADD_NEW_FILE_DATA', payload);
    },
    removeFile({ commit, state }, index) {
        commit('REMOVE_FILE', index);
    },
    updateFileName({ commit, state }, { index, fileorder, filename }) {
        commit('UPDATE_EXISTING_FILE_NAME', { index, fileorder, filename });
    },
    compareFiles({ commit, state }) {
        state.fileDatas.forEach(function (file, index) {
            if(file.file1.name !== "" && file.file2.name !== "") {
                commit('SET_LOADING', true)
                const resultPromise = window.CompareFile(file.file1.name, file.file2.name);
                resultPromise.then((result) => {
                    commit('UPDATE_EXISTING_FILE_RESULTS', { index, result });
                     if (index + 1 >= state.fileDatas.length) {
                        commit('SET_LOADING', false)
                    }
                })
            }
        });
    }
}

export default {
    state,
    actions,
    mutations
}