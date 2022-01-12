import { createStore } from 'vuex'
import axios from 'axios'
// const jwt = require('jsonwebtoken'); //appel de jwt pour les token

export default createStore({
  state:{
    currentPost: {},
    posts: [],
    // comments: [],
  },

  mutations:{
    loadPosts(state, posts){
      state.posts = posts
    },
    // isAdmin(state, isAdmin){
  

      
    //   console.log(jwtIsAdmin);
    // }

    // createAccount(state, userInfos){
    //   state.userInfos = userInfos
    // },
    
  },
  actions:{
    loadPosts:({ commit }) =>{
      axios
      .get('http://localhost:3005/api/post')
      .then(res => {
        commit('loadPosts', res.data.posts);
    
      })
      .catch(error => (error))
    },
  },
  modules:{

  }
})