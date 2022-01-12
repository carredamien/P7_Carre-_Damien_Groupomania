<template>
  <main class="main--post m-2">
    <div class="container col-md-6 bg-white rounded scroller ">
      <div v-if="isUserConnected" class="container--avatar d-flex py-2">
        <img v-if="avatar.length > 10" class="avatar rounded mx-2" :src="`${avatar}`" alt="avatar"> 
        <img v-else class="avatar mx-1" src="../assets/images/user_gray.png" alt="avatar par défaut">
        <p class="fw-bold mt-2 text-secondary">Bonjour <span class="capitalize" >{{author}}</span></p>
      </div>
      <h1 class="text-center text-danger fs-4 fs-md-2 mt-1 py-3 ">Les dernières news</h1>
      <div v-if="isUserConnected" class="col-md-9 m-auto mt-5 mb-5">
        <button @click="createPost" class="pos col-12 mb-3 btn btn-outline-primary add--post " title="Ajouter un message">+</button>
        <div v-for="(post, index) in this.posts" :key="index" class="card img-fluid mb-5">
            <img v-if="post.imageUrl"  class="img-message" :src="`${post.imageUrl}`" :alt="`${post.title}`">
          <router-link :to="{name: 'PostId', params: {id: `${post.id}`,title: `${post.title}`,authorId: `${post.UserId}`, image: `${post.imageUrl}` , href: `${post.href}`, content: `${post.content}`, author: `${post.author}`, dateCreated: `${post.created}` }}">
            <div class="card-body">
              <h2 class="card-title">{{ post.title }} </h2>
              <p class="text-secondary mb-1">
                Publié par <span class="fw-bold capitalize">{{post.author}}</span> le {{ createdDate(post.created) }} 
              </p>
              <p class="card-text">
              {{post.content.substr(0,30)}}...  <span class="fw-bold text-secondary fst-italic">voir l'article</span>
              </p>
            </div>
          </router-link>
        </div>
      </div>
      <div v-else class="col-md-9 m-auto mt-5 mb-5">
        <h3 class="card-title text-center">Pour voir les news, il faut se connecter 😉</h3>
      </div>
    </div>
  </main>
</template>

<script>
import createStore from '../store/index'

export default {
  name: 'Message',
  createStore: createStore,
  data(){
    return {
      avatar: localStorage.getItem('avatar'),
      author: localStorage.getItem('author'),
      post: {
        imageUrl: '',
      },
    }
  },
  methods:{
    createPost: function(){
      this.$router.push('/articles/new-article')
      },
      createdDate: function(date){
        const createdDate = new Date(date);
        return createdDate.toLocaleDateString('fr-FR');
      },
    },
  computed:{
    posts(){
      return this.$store.state.posts
    },
    isUserConnected: function(){
      return localStorage.getItem('token');
    }
  },
  created(){
    this.$store.dispatch('loadPosts', this.id);
  }
}   
</script>

<style lang="scss" scoped>
 main > .container{
    height: 80vh;
  }
  .avatar{
    width: 36px;
    height: 36px;
  }
  .img-message{
    width:100%;
    height: auto;
    max-height: 25rem;
    object-fit: cover;
    object-position: center;
  }
  .img-author{
    width:2rem;
    height: 2rem;
    border: 2px solid gray;
    border-radius: 50%;
    padding:0.1rem;
    margin-bottom: 0.6rem;
  }
  a{
    text-decoration:none;
    color: rgb(0, 0, 0);
  }
// srcollbar
  .scroller {
    height: 90vh;
    overflow-y: scroll;
    scrollbar-color: #dc3545;
    // scrollbar-color: rebeccapurple green;
    scrollbar-width: thin;
    scroll-behavior: smooth;
  }
  .pos{
    font-size: 1.8rem;
    padding:0rem;
    font-weight: bold;
  }
  /* Works on Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: transparent;
  }
  /* Works on Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 6px;
  }
  *::-webkit-scrollbar-track {
    background: transparent;
  }
  *::-webkit-scrollbar-thumb {
    background-color: #dc3545;
    border-radius: 20px;
  }
  .main--post{
    position: relative;
  }
 

</style>
