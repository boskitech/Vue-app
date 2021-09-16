<template>
<div class="todoPan">
    <div class="v-content">
        <v-card class="pass" v-for="(todo, index) in todos" :key="index" @click="viewTodo(todo)">
            <v-card-text>
                <h2>{{todo.todoName}}</h2><br>
                <h4>{{todo.date}}<span style="float:right">{{todo.priority}}</span></h4>
            </v-card-text>
        </v-card>
    </div>
</div>
</template>

<script>

export default{
    name: 'List',
    data(){
        return{
            title: "Todo List",
            todos: [],
            id:''
        }
    },
    methods: {
        viewTodo(todo){
            this.id = todo.id;

            this.$router.push({ name: 'viewlist', params: { id: this.id }})
        }
    },
    created: function(){
        // GET /someUrl
        this.$http.get('http://localhost:3000/todolists').then(response => {

            this.todos = response.body;
            console.log(this.todos)

        }, response => {
            console.log(response + 'Error while fetching')
        });
    }
}

</script>


<style scoped>

.v-content{
    padding: 0px 10px;
    height: auto;
    font-family: 'arial';
    color:rgb(48, 53, 53)
}

.v-content .pass{
    margin-bottom: 8px;
    cursor: pointer;
}

.v-content .pass:hover{
    background-color: rgb(186, 215, 226);
}
</style>