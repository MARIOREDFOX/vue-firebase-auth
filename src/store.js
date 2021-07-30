import Vue from "vue";
import Vuex from "vuex";
import { db } from '@/main'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
    items: null,
    todos: []
  },

  getters: {
    user(state) {
      return state.user
    },
    getItems: state => {
      return state.items
    },
    allTodos: state => state.todos
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    setItems: state => {
      let items = []

      db.collection('items').orderBy('created_at').onSnapshot((snapshot) => {
        items = []
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, task_name: doc.data().task_name, description: doc.data().description, })
        })

        state.items = items
      })
    },
    fetchTodos({ commit }, user) {
      db.collection('user')
        .doc(user.uid)
        .collection('todos')
        .onSnapshot(snapshot => {
          commit('setTodos', snapshot.docs.map(doc => {
            return {
              id: doc.id,
              doc: doc.data()
            }
          }));
        })
    }
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);

      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
        });
      } else {
        commit("SET_USER", null);
      }
    },
    setItems: context => {
      context.commit('setItems')
    },
    setTodos: (state, todos) => {
      state.todos = todos.map(todo => {
        return {
          id: todo.id,
          title: todo.doc.title,
          completed: todo.doc.completed
        }
      });
    }
  }

});

