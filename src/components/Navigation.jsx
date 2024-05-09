import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { ListOrdered, Boxes, UserCog, Zap, SquareArrowOutUpRight, LogOut } from 'lucide-react'

import Loader from './ui/Loader'

import { Button } from './ui/button'

const Navigation = () => {
    const { username, roles } = useAuth()
    const navigate = useNavigate()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    const { pathname } = useLocation();

    const [activeTab, setActiveTab] = useState('');

    useEffect(() => {
        // Determine active tab based on pathname
        if (pathname.startsWith('/dash/users')) {
            setActiveTab('users');
        } else if (pathname.startsWith('/dash/codes')) {
            setActiveTab('codes');
        } else if (pathname.startsWith('/dash/vaults')) {
            setActiveTab('vaults');
        } else if (pathname.startsWith('/dash/users')) {
            setActiveTab('users');
        } else if (pathname.startsWith('/dash/logs')) {
            setActiveTab('logs');
        } else {
            setActiveTab('');
        }
    }, [pathname]);

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    if (isLoading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        )
    }

    const handleCodesClicked = () => navigate('/dash/codes')
    const codesButton = (
        <div className='relative'>
            <Button
                size='md'
                variant="ghost"
                className={`flex gap-1.5 ${activeTab === 'codes' ? 'text-blue-700 hover:text-blue-800' : ''}`}
                onClick={handleCodesClicked}
            >
                <ListOrdered strokeWidth={1.5} />
                Маркировки
            </Button>
            {activeTab === 'codes' ? (
                <div className='h-0.5 w-full bg-blue-600 rounded-t-full absolute bottom-[-8px]'></div>
            ) : (
                ''
            )}
        </div>

    )


    const handleVaultsClicked = () => navigate('/dash/vaults')
    const vaultsButton = (
        <div className='relative'>
            <Button
                onClick={handleVaultsClicked}
                size='md'
                variant="ghost"
                className={`flex gap-1.5 ${activeTab === 'vaults' ? 'text-blue-700 hover:text-blue-800' : ''}`}
            >
                <Boxes strokeWidth={1.5} />
                Хранение
            </Button>
            {activeTab === 'vaults' ? (
                <div className='h-0.5 w-full bg-blue-600 rounded-t-full absolute bottom-[-8px]'></div>
            ) : (
                ''
            )}
        </div>
    )

    const handleUsersClicked = () => navigate('/dash/users')

    let usersButton

    if (roles.includes('admin')) {
        usersButton = (
            <div className='relative'>
                <Button
                    size='md'
                    variant="ghost"
                    className={`flex gap-1.5 ${activeTab === 'users' ? 'text-blue-700 hover:text-blue-800' : ''}`}
                    onClick={handleUsersClicked}
                >
                    <UserCog strokeWidth={1.5} />
                    Пользователи
                </Button>
                {activeTab === 'users' ? (
                    <div className='h-0.5 w-full bg-blue-600 rounded-t-full absolute bottom-[-8px]'></div>
                ) : (
                    ''
                )}
            </div>
        )
    }

    const handleLogoutClicked = () => sendLogout()
    const logoutButton = (
        <Button
            variant='outline'
            size='icon'
            onClick={handleLogoutClicked}
        >
            <LogOut size={17} />
        </Button>
    )

    const content = (
        <header className='px-3 py-2 bg-white border-b border-slate-300'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>

                    {codesButton}
                    {vaultsButton}
                    {usersButton}
                </div>
                <div className='flex gap-3 items-center'>
                    <p className='text-sm'>{username}</p>
                    {logoutButton}
                </div>
            </div>
        </header>
    )

    return content
}

export default Navigation