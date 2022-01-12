<template>
  <main>
    <div class="container">
      <div id="login-row" class="row justify-content-center align-items-center">
        <div id="login-column" class="col-md-4">
          <div id="login-box" class="col-md-12">
            <form  id="login-form" class="form" action="" method="post">
              <h1 class="text-center text-danger text-info  fs-5 fs-md-2  mt-md-1 mb-md-3">Se connecter</h1>
              <div class="form-group mb-md-2 mb-2">
                <label for="email" class="text-danger fs-md-5 fw-bold">Adresse email :</label><br>
                <input  v-model="email" type="email" name="email" id="email" class="form-control required">
                <p v-if="errors.email" class="text-danger fw-md-bold error--name error-b"> {{ errors.email }} </p> 
              </div>
              <div class="form-group mb-md-2">
                <label for="password" class="text-danger fs-md-5 fw-bold">Mot de passe:</label><br>
                 <input v-model="password" type="text" name="password" id="password" class="form-control">
               <p v-if="errors.password" class="text-danger fw-md-bold error--name error-b"> {{ errors.password }} </p>
              </div>
              <div class="form-group mb-2 d-grid gap-2 py-2 mt-4 text-center ">
                <button @click.prevent="checkForm" class="btn btn-danger fs-5 fw-bold" type="button">Connexion</button>
              </div>
              <p v-if="errors.connect" class="text-danger fw-bold fs-5 error--name error-b"> {{ errors.connect }}</p>
              <div class="form-group d-grid gap-2  mt-4 text-center ">
                <button  v-on:click="signup" class="btn btn-primary fs-5 fw-bold" type="button">Oups, je n'ai pas de compte...</button>
              </div> 
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>

// import createStore from '../store/index'
import axios from 'axios'

 export default {
  name: 'Login',
  // createStore: createStore,
    data(){
      return {
          email:'',
          password: '',
          avatar:'',
          errors: {},
      }
    },
 
    methods:{
      signup: function(){
        this.$router.push('/inscription')
      },    

      checkForm: function(){
        
        if(this.email && this.password){
          axios.post('http://localhost:3005/api/auth/login', {
            email: this.email.toLowerCase(), 
            password: this.password.toLowerCase(),
          })
          .then((res)=>{
            const token = res.data.token;
            const UserId = res.data.UserId;
            const author = res.data.author;
            const avatar = res.data.avatar;
            console.log(res.data);
            localStorage.setItem('token', token);
            localStorage.setItem('UserId', UserId);
            localStorage.setItem('author', author);
            localStorage.setItem('avatar', avatar);
            location.reload();
            location.replace('/articles');
          })
          .catch(() =>{
            this.errors['connect']= 'Utilisateur inconnu, veuillez vérifier vos identifiants...'})
        }
        else{
          alert('Il faut remplir votre email et votre mot de passe')
        }
      },
    },
    computed:{
      // isUserConnected(){
      //   if(localStorage.getItem('token')){

      //   }
      // }
    },
    watch:{
      email(newValue){
        if (/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-zA-Z]{2,10}$/.test(newValue)) {
          this.errors['email'] = ''
        } else {
          this.errors['email'] = 'L\'adresse email n\'est pas valide'
        }
      },
      password(newValue) {
        if( /^(?=.*\d)(?=.*[a-z])[0-9a-z]{7,}$/.test(newValue)) {
          this.errors['password'] = ''
          }else {
          this.errors['password'] = 'Votre mot de passe doit contenir au minimum 4 caractéres et 1 chiffre'
        }
      },
    }
}

</script>

<style lang="scss" scoped>
 .avatar{
    width: 6rem;
  }
  a{
  text-decoration: none;
}
.container{
  margin-top: 4rem;
}
.error{
  display: block;
}
h3{
  margin-bottom: 2rem;
}
 @media screen and (min-width:992px){
    .container{
    margin-top: 8rem;
    }
  }
</style>