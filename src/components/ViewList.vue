<template>
    <v-app>
            <div v-for="(todo, index) in mytodo" :key="index" class="mycard">
                <v-card-text>
                    <v-row  >
                        <v-card-title><h2>{{todo.todoName}}</h2></v-card-title>
                    </v-row>
                    <v-chip-group>
                        <v-chip>{{todo.date}}</v-chip>
                        <v-chip>{{todo.priority}} Priority</v-chip>
                    </v-chip-group>
                </v-card-text>
                <v-divider class="m2-4"></v-divider>
                <v-card-text>
                    <div>{{ todo.note }}</div>
                </v-card-text>
                <v-divider class="m2-4"></v-divider>
                <v-card-text>
                    <v-btn style="margin-right:10px" light @click="updateTodo(todo)" >Edit</v-btn>
                <v-dialog
            v-model="dialog"
            width="300"
            >
            <template v-slot:activator="{ on, attrs }">
                
                    <v-btn
                    color="dark"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    >
                    Delete Todo
                    </v-btn>
            </template>

            <v-card>
                <v-card-title class="text-h7 grey lighten-2">
                Delete Todo
                </v-card-title>

                <v-card-text style="padding-top:5px">
                    <h4>You can't undo this action!</h4>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    @click="dialog = false"
                >
                    Cancel
                </v-btn>
                <v-btn
                    color="primary"
                    text
                    @click="deleteTodo"
                >
                    Continue
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>

                </v-card-text>
                    
            </div>
    </v-app>
</template>
<script>
    export default{
        name: 'ViewList',
        data(){
            return{
                title: "View List",
                todoId: this.$route.params.id,
                mytodo: [],
                dialog: false
            }
        },
        methods: {
            deleteTodo(){
                 this.$http.delete('http://localhost:3000/todolists/' + this.todoId, this.updatetodo).then(
                    this.$router.push({ path: '/' }),
                 );
            },
            updateTodo(){
                this.$router.push({ name: 'updateTodo', params: { id: this.todoId }})
            }
        },
        created: function(){
            // GET /someUrl
            this.$http.get('http://localhost:3000/todolists').then(response => {
                let res= response.body.filter(item => item.id === this.todoId)
                this.mytodo  = res;

            },response => {
                console.log(response + 'Error while fetching')
            });
        }
    }
</script>

<style>
   h2{
       color:rgb(67, 78, 78);
       font-family: Arial, Helvetica, sans-serif;
   }

   .mycard{
       height: 400px;
   }
</style>