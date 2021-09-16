<template>
<v-app>
    <form name="myform" >
        <div>
        <v-col>
            <!-- Todo Name--->
            <v-text-field   v-model="updatetodo.todoName" label="Todo Name"  required outlined ></v-text-field>
            <!-- Todo Priority--->

            <v-select :items="priorities" label="Priority" outlined v-model="updatetodo.priority"></v-select>

            <!-- Todo Date--->

            <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="updatetodo.date" label="Choose Date" readonly v-bind="attrs" v-on="on" outlined ></v-text-field>
                </template>
                <v-date-picker v-model="updatetodo.date" @input="menu2 = false" ></v-date-picker>
            </v-menu>

            <!-- Todo Notes--->
            <v-textarea v-model="updatetodo.note"  solo name="input-7-4" label="Notes"></v-textarea>

            <!-- Todo Add Button--->

        </v-col>
        </div>
    </form>
    <v-dialog
      v-model="dialog"
      width="300"
    >
      <template v-slot:activator="{ on, attrs }">
          <v-card>

            <v-card-text>
            <v-btn
            color="dark"
            dark
            v-bind="attrs"
            v-on="on"
            class="myBtn"
            >
            Update Todo
            </v-btn>
        </v-card-text>
        </v-card>
      </template>

      <v-card>
        <v-card-title class="text-h7 grey lighten-2">
          Update Todo
        </v-card-title>

        <v-card-text style="padding-top:5px">
            <h4>You are about to update Todo!</h4>
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
            @click="updateTodo"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</v-app>
</template>
<script>
     export default {
        name:'updateTodo',
        data(){
            return{
                mytodo: [],
                id: this.$route.params.id,
                updatetodo:{
                    todoName: '',
                    note: '',
                    priority:'',
                    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                },
                priorities: ['Low', 'Medium', 'High'],
                menu2: false,
                dialog: false,
            }
        },
        methods: {
            updateTodo(){
                this.$http.put('http://localhost:3000/todolists/' + this.id, this.updatetodo).then(
                    this.$router.push({ path: '/' })
                );
            },

            getList(){
                this.$http.get('http://localhost:3000/todolists').then(response => {
                let res= response.body.filter(item => item.id === this.id)
                this.mytodo  = res;
                console.log(this.mytodo[0].todoName)
            },response => {
                console.log(response + 'Error while fetching')
            });
            }
        },
        computed:{
        },
        created() {
            this.getList()
        }
    }
</script>

<style>
.myBtn{
       position: sticky;
       z-index: 999;
       top:400px
   }
</style>