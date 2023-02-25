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
    console.log('reducer')
    const currentState = { ...state }

    switch (action.type) {
        case 'LOGIN':
            console.log('LOGIN')
            currentState.user = {
                name: action.payload.name,
                room: action.payload.room
            }
            console.log('LOGIN', currentState)
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
    console.log('state provider')
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
};