import * as React from 'react';
import {Checkbox,Icon} from "antd"
import classNames from "classnames"
import "./todosItem.scss"
import {connect} from "react-redux"
import {editTodo,updateTodo} from "../../redux/actions";
import axios from 'src/config/axios';


interface ITodoItemProps{
    id:number;
    description:string;
    completed: boolean;
    editing: boolean;
    updateTodo:(payload:any)=> any;
    editTodo:(payload:number)=>any;
}
interface ITodoItemState{
    editText:string;
}
class TodoItem extends React.Component<ITodoItemProps,ITodoItemState> {
    constructor(props){
        super(props)
        this.state = {
            editText:this.props.description
        }
    }
    update = async(params:any)=>{
        try{
            const response = await axios.put(`todos/${this.props.id}`,params)
            this.props.updateTodo(response.data.resource)
            }catch(e){
                throw new Error(e)
            }
    }
    toEditing = ()=>{
        this.props.editTodo(this.props.id)
    }

    onKeyUp = (e)=>{
        if(e.keyCode === 13 && this.state.editText !== ''){
            this.update({description: this.state.editText})
        }
    }
    public render() {
        const editText = (
            <div className="editing">
                <input type="text" value={this.state.editText}
                       onChange={e => this.setState({editText : e.target.value})}
                       onKeyUp={this.onKeyUp}
                />
                <div className="iconWrapper">
                    <Icon type="enter"onClick={()=>this.update({description: this.state.editText})} />
                    <Icon onClick={() => this.update({deleted:true})} type="delete" />
                </div>
            </div>
        );
        const Text = <span className="text" onDoubleClick={this.toEditing}>{this.props.description}</span>
        const todoItemClass = classNames({
            TodoItem:true,
            editing:this.props.editing,
            completed:this.props.completed
        })
        return (
            <div className={todoItemClass} id ="TodoItem">
                <Checkbox checked = {this.props.completed}
                          onChange={e=>this.update({completed:e.target.checked})}
                />
                {this.props.editing?editText:Text}
            </div>
        );
    }
}
const mapStateToProps = (state,OwnProps) => ({
    ...OwnProps
})
const mapDispatchToProps = {
    updateTodo,
    editTodo
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoItem);