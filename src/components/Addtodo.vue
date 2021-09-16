<template>
<v-app>
    <form name="myform">
        <v-col>
            <!-- Todo Name--->
            <v-text-field   v-model="addTodos.todoName" label="Todo Name" required outlined></v-text-field>
            <!-- Todo Priority--->

            <v-select :items="priorities" label="Priority" outlined v-model="addTodos.priority"></v-select>


            <!-- Todo Date--->

            <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="addTodos.date" label="Choose Date" readonly v-bind="attrs" v-on="on" outlined ></v-text-field>
                </template>
                <v-date-picker v-model="addTodos.date" @input="menu2 = false" ></v-date-picker>
            </v-menu>

            <!-- Todo Notes--->
            <v-textarea v-model="addTodos.note"  solo name="input-7-4" label="Notes" ></v-textarea>

            <!-- Todo Add Button--->
       
        </v-col>
    </form>
    <div>
    <v-dialog
      v-model="dialog"
      width="300"
    >
      <template v-slot:activator="{attrs }">
          <v-card>

            <v-card-text>
            <v-btn
            color="dark"
            dark
            v-bind="attrs"
            @click="addTodo"
            >
            Add Todo
            </v-btn>
        </v-card-text>
        </v-card>
      </template>

      <v-card>
        <v-card-title class="text-h7 grey lighten-2">
          Added Todo!
        </v-card-title>

        <v-card-text style="padding-top:5px">
            <h4>You've successfully added a new Todo</h4>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="returnHome"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</v-app>
</template>
<script>
     export default {
        name:'Add',
        props:{
            view: {
              default: false
            }
        },
        data(){
            return{
                addTodos:{
                    id: '',
                    todoName: '',
                    note: '',
                    priority:'',
                    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                },
                priorities: ['Low', 'Medium', 'High'],
                menu2: false,
                dialog: false,
                attr: ''
            }
        },
        methods: {
            addTodo(){
                this.$http.post('http://localhost:3000/todolists', this.addTodos).then(
                );
                this.dialog = true
            },
            returnHome(){
                this.$router.push({ path: '/' })
            }
        }
    }
</script>