import { createStore } from 'vuex';
import { getRecentlyItems } from '../databaseManager';
export default createStore({
	state: {
		items: [],
		matrixItems: []
	},
	getters: {
		items: state => {
			return state.items;
		},
		matrixItems: state => {
			return state.matrixItems;
		}
	},
	mutations: {
		SET_Items(state, items) {
			state.items = items;
		},
		SET_matrixItems(state, matrixItems) {
			state.matrixItems = matrixItems;
		}
	},
	actions: {
		async loadItems({ commit }) {
			const items = await getRecentlyItems('men - jackets-coats');
			const matrixItems = [];
			for (let index = 0; index < items.length; index = index + 4) {
				matrixItems.push(items.slice(index, index + 4));
			}

			commit('SET_Items', items);
			commit('SET_matrixItems', matrixItems);
		}
	},

	modules: {}
});
