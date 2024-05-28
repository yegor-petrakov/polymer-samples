import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isEditor = false
    let isAdmin = false
    let role = "user"

    if (token) {

        const decoded = jwtDecode(token)
        
        const role = decoded.clientRole

        isAdmin = role === 'admin' ? true : false
        isEditor = role === 'editor' ? true : false
        
        return { role, isAdmin, isEditor }
    }

    return { role, isEditor, isAdmin }
}
export default useAuth