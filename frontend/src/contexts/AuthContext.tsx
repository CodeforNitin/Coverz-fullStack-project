import { createContext,useReducer, useEffect, ReactNode } from "react";

interface AuthState {
    user: any; // Adjust 'any' to the appropriate type if you have a user type
  }
  
  type AuthAction = 
    | { type: 'LOGIN'; payload: any } // Adjust 'any' to the appropriate type
    | { type: 'LOGOUT' };

interface AuthContextProviderProps {
    children: ReactNode;
}
export const AuthContext = createContext<{
    user: any;
    dispatch: React.Dispatch<AuthAction>;
  } | undefined>(undefined);
  

export const authReducer = (state:AuthState, action:AuthAction) => {
    switch(action.type){
        case 'LOGIN':
            return {user: action.payload}
        case 'LOGOUT':
            return {user: null}
        default:
            return state
    }
}

export const AuthContextProvider = ({children}:AuthContextProviderProps) =>{

    const [state, dispatch] = useReducer(authReducer, { 
        user: null
    })
    
      useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') as string)
    
        if (user) {
          dispatch({ type: 'LOGIN', payload: user }) 
        }
      }, [])
    
      console.log('AuthContext state:', state)
    
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}