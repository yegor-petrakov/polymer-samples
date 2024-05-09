import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isEditor = false
    let isAdmin = false
    let status = "user"

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles } = decoded.UserInfo

        isEditor = roles.includes('editor')
        isAdmin = roles.includes('admin')

        if (isEditor) status = "editor"
        if (isAdmin) status = "admin"

        return { username, roles, status, isEditor, isAdmin }
    }

    return { username: '', roles: [], isEditor, isAdmin, status }
}
export default useAuth