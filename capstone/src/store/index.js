import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,

  },
  getters: {
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setProduct(state, product) {
      state.product = product;
    },
    setUser(state, user) {
      state.user = user;
    },
    setUsers(state, users) {
      state.users = users;
    }
  },
  actions: {
    async loginUser(context, payload) {
      const {email, password} = payload;
      fetch(`http://localhost:10000/auth/login?email=${this.email}&password=${this.password}`, {
        method: 'POST',
        body: JSON.stringify(email, password),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      })
        .then((res) => res.json())
        .then((data) => context.state.user = data.results);
    },
  },
  async registerUser(context, payload) {
    const { fullname, email, password, phone } = payload;
    fetch(`https://luna-rose.herokuapp.com/auth/signup?fullname=${this.fullname}&email=${this.email}&password=${this.password}&phone=${this.phone}`, {
      method: 'POST',
      body: JSON.stringify(fullname, email, password, phone),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then((res) => res.json())
      .then((data) => context.state.user = data.results);
  },
  modules: {
  }
})
