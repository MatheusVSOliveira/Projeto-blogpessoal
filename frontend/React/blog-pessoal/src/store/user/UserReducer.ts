import {Action } from './Actions';

export interface UserState {
    tokens: string,
    tipo: string
}

const initialState = {
    tokens: "",
    tipo: "",
}

export const userReducer = (state: UserState = initialState, action: Action) =>{
    switch (action.type){
        case "ADD_TOKEN": {
            return {tokens: action.payload, tipo: state.tipo};
        }
        case "ADD_TIPO": {
            return {tipo: action.payload, tokens: state.tokens};
        }
        default:
            return state
    }
}