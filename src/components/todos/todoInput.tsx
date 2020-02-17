import * as React from 'react';
import {Input,Icon} from 'antd';
import {addTodo} from "../../redux/actions";
import {connect} from "react-redux";
import axios from 'src/config/axios';

interface ITodoInputState{
    description:string;
}
interface ITodoInputProps{
    addTodo:(payload:any)=> any;
    todos:any[];
}
class TodoInput extends React.Component<ITodoInputProps,ITodoInputState> {
    constructor(props){
        super(props)
        this.state = {
            description:''
        }
    }
    onKeyUp = (e)=>{
        if(e.keyCode === 13 && this.state.description !== ''){
            this.PostTodo()
        }
    }

    PostTodo = async()=>{
        try{
                const response = await axios.post('todos',{description:this.state.description})
            console.log(response.data.resource);
            this.props.addTodo(response.data.resource)
            }catch(e){
                throw new Error(e)
            }
        this.setState({description:''})
    }
    public render() {
        const { description } = this.state
        const suffix = description? <Icon type="enter" onClick={this.PostTodo}/>:<span/>
        return (
            <div className="TodoInput" id = "TodoInput">
                <Input
                    placeholder = "添加新任务"
                    value = {description}
                    onChange = {(e) => this.setState({description:e.target.value})}
                    onKeyUp = {this.onKeyUp}
                    suffix={suffix} />
            </div>
        );
    }
}
const mapStateToStore=(state,ownProps)=>({
    todos:state.todos,
    ...ownProps
})
const mapDispatchToStore = {
    addTodo
}
export default connect(mapStateToStore,mapDispatchToStore)(TodoInput);