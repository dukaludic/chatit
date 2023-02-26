import { createContext, useReducer } from 'react'

const initialState = {
    state: {
        user: {
            name: '',
            room: ''
        },
    }
}


export const GlobalContext = createContext(initialState);



const reducer = (state, action) => {
    const currentState = { ...state }

    switch (action.type) {
        case 'LOGIN':
            currentState.user = {
                name: action.payload.name,
                room: action.payload.room
            }
            return currentState;

        case "LOGOUT":
            currentState.user = {
                name: '',
                room: ''
            }
            return currentState;
        default:
            break;
    }
}

export const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
};