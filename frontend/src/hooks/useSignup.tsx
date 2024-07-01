import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState<string>('')
  const [isSignUp, setIsSignUp] = useState<string>('')
  const [isLoading, setIsLoading]= useState<boolean>(false)
  const { dispatch } = useAuthContext()

  const signup = async (email:string, password:string) => {
    setIsLoading(true)
    setError('')

    try{
        const response = await fetch('http://localhost:4000/api/users/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
          })
          const json = await response.json()
          console.log(json);

          if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
          }
          if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))
      
            // update the auth context
            dispatch({type: 'LOGIN', payload: json})

            //
            setIsSignUp('Registered Successfully ✅')
      
            // update loading state
            setIsLoading(false)
          }
    }
    catch(err){
        console.log(err)
    }

  }

  return { signup, isLoading, error ,isSignUp}
}
