<template>
    <div class="todoPan">
       <v-card class="card" elevation="2" >
            <v-toolbar flat style="background-color:rgb(96, 177, 202); position:sticky; z-index:500; top:0" class="toolbar" >
                    <h2>Todo App {{myId}}</h2>
                    <div class="btn">
                        <v-btn v-if="view" fab meduim @click="addRoute" color="orange" >
                            <v-icon dark > mdi-plus </v-icon>
                        </v-btn>
                        <v-btn v-if="!view" @click="homeRoute" fab meduim color="orange" >
                            <v-icon dark > mdi-arrow-left </v-icon>
                        </v-btn>
                    </div>
            </v-toolbar>
            <router-view/>
        </v-card>
    </div>    
</template>

<script>
export default {
    name: 'Body',
    data(){
        return{
            view: true,
        }
    },
    watch:{
      $route (to, from) {
        if(to !== from ) {
          this.view = false;
        }
      }
    },
    methods: {
        addRoute(){
            this.$router.push({ name: 'Add', params: {id:'todo'}})
            this.view = false
        },
        homeRoute(){
            this.$router.push( {path: '/'})
            this.view = true
        }
    }
}
</script>

<style>
 .todoPan{
     margin-top :20px;
 }

 .todoPan .card{
    height: 500px;
    margin:auto;
    width:40%;
    overflow: auto;
    background-color: rgb(184, 184, 184);
    
}

.toolbar h2{
    font-family: 'arial';
    padding: 0;
    color:rgb(255, 255, 255)
 }

 .toolbar .btn{
    float: right; 
    padding-left: 66%;
 }
</style>

