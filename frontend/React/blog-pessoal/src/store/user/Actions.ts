export type Action = {type: "ADD_TOKEN"|"ADD_TIPO"; payload: string};

export const addToken = (token: string): Action =>({
    type: "ADD_TOKEN",
    payload: token,
});

export const addTipo = (tipo: string): Action =>({
    type: "ADD_TIPO",
    payload: tipo,
});
