import { ADD_TODO,INIT_TODOS,UPDATE_TODO,EDIT_TODO } from '../actionTypes'


export default (state:any[] = [],action:any)=>{
    switch (action.type){
        case ADD_TODO:
         return [state,...action.payload]
        case INIT_TODOS:
            return [...action.payload]
        case UPDATE_TODO:
           return state.map(v=>{
                if(v.id === action.payload.id){
                    return action.payload
                }else{
                    return v
                }
            })
        case EDIT_TODO:
            return state.map(v=>{
                if(v.id === action.payload){
                    return Object.assign({},v,{editing:true})
                }else{
                    return Object.assign({},v,{editing:false})
                }
            })
        default:
            return state
    }
}