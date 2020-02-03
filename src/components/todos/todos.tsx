import * as React from 'react';
import axios from 'src/config/axios'
import TodoInput from 'src/components/todos/todoInput'
import TodoItem from 'src/components/todos/todoItem'
import './todos.scss'

interface ITodosState{
    todos:any[]
}
class Todos extends React.Component<any,ITodosState> {
    constructor(props){
        super(props)
        this.state ={
            todos:[]
        }
    }
    addTodo = async(params:any)=>{
        const{todos} = this.state
        try{
            const response = await axios.post('todos',params)
            this.setState({todos:[response.data.resource,...todos]})
        }catch(e){
            throw new Error(e)
        }
    }
    componentDidMount(){
        this.getTodos()
    }
    getTodos= async()=>{
        try{
            const response = await axios.get('todos')
            const todos = response.data.resources.map(t=>Object.assign({},t,{editing:false}))
            this.setState({todos})
        }catch(e){
            throw new Error(e)
        }
    }
    get UndeletedTodos(){
        return this.state.todos.filter(t=>!t.deleted)
    }
    get UncompletedTodos(){
        return this.UndeletedTodos.filter(t=>!t.completed)
    }
    get CompletedTodos (){
        return this.UndeletedTodos.filter(t=>t.completed)
    }
    updateTodo = async(id:number,params:any)=>{
        const{todos} = this.state
        try{
            const response = await axios.put(`todos/${id}`,params)
            const newTodos = todos.map(t=>{
                if(id === t.id){
                    return response.data.resource
                }else{
                    return t
                }
            })
            this.setState({todos:newTodos})
        }catch(e){
            throw new Error(e)
        }
    }
    toEditing=(id:number)=>{
        const{todos}=this.state
        const newTodos = todos.map(t=>{
            if(id === t.id){
                return Object.assign({},t,{editing:true})
            }else{
                return Object.assign({},t,{editing:false})
            }
        })
        this.setState({todos:newTodos})
    }
    public render() {
        return (
            <div className="Todos" id="Todos">
                <TodoInput addTodo={(params)=>this.addTodo(params)}/>
                <div className="todoLists">
                    {
                        this.UncompletedTodos.map(t=><TodoItem key={t.id}{...t}
                            update={this.updateTodo} toEditing={this.toEditing}
                        />)
                    }
                    {
                        this.CompletedTodos.map(t=><TodoItem key={t.id}{...t}
                                                             update={this.updateTodo} toEditing={this.toEditing}
                        />)
                    }
                </div>
            </div>
        );
    }
}

export default Todos;