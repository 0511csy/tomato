import * as React from 'react';
import {connect} from 'react-redux'
import axios from 'src/config/axios'
import TodoInput from 'src/components/todos/todoInput'
import TodoItem from 'src/components/todos/todoItem'
import './todos.scss'
import {initTodo,updateTodo} from "../../redux/actions";



class Todos extends React.Component<any> {
    constructor(props){
        super(props)

    }


    componentDidMount(){
        this.getTodos()
    }
    getTodos= async()=>{
        try{
            const response = await axios.get('todos')
            const todos = response.data.resources.map(t=>Object.assign({},t,{editing:false}))
            this.props.initTodo(todos)
        }catch(e){
            throw new Error(e)
        }
    }
    get UndeletedTodos(){
        return this.props.todos.filter(t=>!t.deleted)
    }
    get UncompletedTodos(){
        return this.UndeletedTodos.filter(t=>!t.completed)
    }
    get CompletedTodos (){
        return this.UndeletedTodos.filter(t=>t.completed)
    }

    public render() {
        return (
            <div className="Todos" id="Todos">
                <TodoInput />
                <div className="todoLists">
                    {
                        this.UncompletedTodos.map(t=>
                            <TodoItem key={t.id}{...t}
                        />)
                    }
                    {
                        this.CompletedTodos.map(t=><TodoItem key={t.id}{...t}
                        />)
                    }
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state,ownProps)=>({
    todos:state.todos,
        ...ownProps
})
const mapDispatchToProps = {
    initTodo,
    updateTodo
}

export default connect(mapStateToProps,mapDispatchToProps)(Todos);