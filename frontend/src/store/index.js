import { createStore } from 'vuex';
import { getRecentlyItems } from '../databaseManager';
export default createStore({
	state: {
		items: [],
		backupItems: [],
		matrixItems: []
	},
	getters: {
		items: state => {
			return state.items;
		},
		backupItems: state => {
			return state.backupItems;
		},
		matrixItems: state => {
			return state.matrixItems;
		}
	},
	mutations: {
		SET_Items(state, items) {
			console.log('from Set_Items');
			state.items = items.slice();

			state.matrixItems = [];
			for (let index = 0; index < state.items.length; index = index + 4) {
				state.matrixItems.push(state.items.slice(index, index + 4));
			}
			//state.matrixItems = matrixItems;
		},

		SET_Matrix(state, items) {
			console.log('inside set matrix');
			state.matrixItems = [];
			for (let index = 0; index < state.items.length; index = index + 4) {
				state.matrixItems.push(state.items.slice(index, index + 4));
			}
		},

		SET_BackupItems(state, items) {
			state.backupItems = items;
		}
	},
	actions: {
		async loadItems({ commit }) {
			const items = await getRecentlyItems('men - jackets-coats'); /// lo hova load items
			commit('SET_Items', items);
			commit('SET_BackupItems', items);
		}
	},

	modules: {}
});
