// import React, { useEffect, useState } from 'react'
// import { useGetUserByIdQuery } from './usersApiSlice'

// import { useNavigate } from "react-router-dom"

// import { Button } from "@/components/ui/button"
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Textarea } from '@/components/ui/textarea'

// import { Checkbox } from "@/components/ui/checkbox"

// import {
//     ToggleGroup,
//     ToggleGroupItem,
// } from "@/components/ui/toggle-group"

// import { ChevronLeft, ChevronsUpDown, Check, Trash2 } from 'lucide-react'
// import { cn } from "@/lib/utils"

// import { Badge } from '@/components/ui/badge'

// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card"

// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectLabel,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"

// const EditUserForm = ({ userId }) => {

//     const navigate = useNavigate()

//     const {
//         data: user,
//         isLoading,
//         isSuccess,
//         isError,
//         error
//     } = useGetUserByIdQuery(userId)

//     const [username, setUsername] = useState('')
//     const handleUsernameChange = (e) => setUsername(e.target.value)

//     const [password, setPassword] = useState('')
//     const handlePasswordChange = (e) => setPassword(e.target.value)

//     const [roles, setRoles] = useState([])
//     const handleRolesChange = (e) => setRoles(e)

//     const [active, setActive] = useState(true)
//     const handleActiveChange = (e) => {
//         setActive(prev => !prev)
//     }

//     useEffect(() => {
//         if (isSuccess) {
//             setUsername(user[0].username)
//             setActive(user[0].active)
//         }
//     }, [isSuccess])

//     return (
//         <div className='p-3'>
//             <div className='flex justify-between mb-3'>
//                 <div className='flex items-center gap-3'>
//                     <Button onClick={() => navigate('/dash/users')} size="icon" variant="outline">
//                         <ChevronLeft />
//                     </Button>
//                     <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
//                         Создание пользователя
//                     </h4>
//                 </div>
//             </div>
//             <Card>
//                 <CardContent className="py-4 pt-8 flex flex-col gap-4">
//                     <div className="grid w-full items-center gap-1.5">
//                         <Label htmlFor="username">Имя пользователя</Label>
//                         <Input onChange={handleUsernameChange} value={username} type="text" id="username" />
//                     </div>

//                     <div className="grid w-full items-center gap-1.5">
//                         <Label htmlFor="password">Пароль</Label>
//                         <Input onChange={handlePasswordChange} type="password" id="password" />
//                     </div>

//                     <div className="grid w-full items-center gap-1.5">
//                         <Label htmlFor="password">Роли</Label>
//                         <ToggleGroup className="w-fit" type="multiple" onValueChange={handleRolesChange}>

//                             <ToggleGroupItem value="user">
//                                 Пользователь
//                             </ToggleGroupItem>
//                             <ToggleGroupItem value="editor">
//                                 Редактор
//                             </ToggleGroupItem>
//                             <ToggleGroupItem value="admin">
//                                 Админ
//                             </ToggleGroupItem>
//                         </ToggleGroup>
//                     </div>

//                     <div className="items-top flex space-x-2">
//                         <Checkbox id="active" onCheckedChange={handleActiveChange} checked={active} />
//                         <div className="grid gap-1.5 leading-none">
//                             <Label
//                                 htmlFor="active"
//                                 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                             >
//                                 Пользователь {active ? 'активен' : 'деактивирован'}
//                             </Label>
//                             <p className="text-sm text-slate-600">
//                                 Деактивированный пользователь не сможет авторизироваться и использовать систему.
//                             </p>
//                         </div>
//                     </div>



//                 </CardContent>
//                 <CardFooter>
//                     <div className='mt-4'>
//                         <Button>Подтвердить</Button>
//                     </div>
//                 </CardFooter>
//             </Card>
//         </div>
//     )
// }

// export default EditUserForm



import React from 'react'
import useTitle from '@/hooks/useTitle'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useGetUserByIdQuery } from './usersApiSlice'

import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { Checkbox } from "@/components/ui/checkbox"

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"

import { ChevronLeft, ChevronsUpDown, Check, Trash2 } from 'lucide-react'
import { cn } from "@/lib/utils"

import { Badge } from '@/components/ui/badge'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const EditUserForm = () => {
    useTitle('Редактирование')

    const { id } = useParams()

    const navigate = useNavigate()

    const {
        data: user,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUserByIdQuery(id)

    const [username, setUsername] = useState('')
    const handleUsernameChange = (e) => setUsername(e.target.value)

    const [password, setPassword] = useState('')
    const handlePasswordChange = (e) => setPassword(e.target.value)

    const [role, setRole] = useState('')
    const handleRoleChange = (e) => setRole(e)

    const [active, setActive] = useState(true)
    const handleActiveChange = (e) => {
        setActive(prev => !prev)
    }

    useEffect(() => {
        if (isSuccess) {
            setUsername(user.userName)
            setRole(user.role)
            setActive(user.isActive)
        }
    }, [isSuccess])

    return (
        <div className='p-3'>
            <div className='flex justify-between mb-3'>
                <div className='flex items-center gap-3'>
                    <Button onClick={() => navigate('/dash/users')} size="icon" variant="outline">
                        <ChevronLeft />
                    </Button>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                        Редактирование пользователя
                    </h4>
                </div>
            </div>
            <Card>
                <CardContent className="py-4 pt-8 flex flex-col gap-4">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="username">Имя пользователя</Label>
                        <Input onChange={handleUsernameChange} value={username} type="text" id="username" />
                    </div>

                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="password">Пароль</Label>
                        <Input onChange={handlePasswordChange} type="password" id="password" />
                    </div>

                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="password">Роли</Label>
                        <Select id="roles" onValueChange={handleRoleChange} value={role}>
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">admin</SelectItem>
                                <SelectItem value="editor">editor</SelectItem>
                                <SelectItem value="user">user</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="items-top flex space-x-2">
                        <Checkbox id="active" onCheckedChange={handleActiveChange} checked={active} />
                        <div className="grid gap-1.5 leading-none">
                            <Label
                                htmlFor="active"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Пользователь {active ? 'активен' : 'деактивирован'}
                            </Label>
                            <p className="text-sm text-slate-600">
                                Деактивированный пользователь не сможет авторизироваться и использовать систему.
                            </p>
                        </div>
                    </div>



                </CardContent>
                <CardFooter>
                    <div className='mt-4'>
                        <Button>Подтвердить</Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default EditUserForm