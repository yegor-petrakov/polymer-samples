import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'

const DashLayout = () => {
    return (
        <>
            <Navigation />
            <div className='container'>
                <Outlet />
            </div>
        </>
    )
}
export default DashLayout