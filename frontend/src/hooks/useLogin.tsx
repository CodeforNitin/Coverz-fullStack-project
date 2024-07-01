import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router'


export const useLogin = () => {
  const [error, setError] = useState<string>('')
  const [isLoggedin, setIsLoggedin] = useState<string>('')
  const [isLoading, setIsLoading]= useState<boolean>(false)
  const { dispatch } = useAuthContext()
  const navigate = useNavigate();

  const login = async (email:string, password:string) => {
    setIsLoading(true)
    setError('')

    try{
        const response = await fetch('http://localhost:4000/api/users/login', {
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
            setIsLoggedin('Logged In Successfully ✅')
      
            // update loading state
            setIsLoading(false)

            //navigate back to home page
            navigate('/'); // Correct way to navigate
          }
    }
    catch(err){
        console.log(err)
    }

  }

  return { login, isLoading, error ,isLoggedin}
}
