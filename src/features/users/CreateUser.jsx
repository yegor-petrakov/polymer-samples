import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import {
    FontBoldIcon,
    FontItalicIcon,
    UnderlineIcon,
} from "@radix-ui/react-icons"

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"

import { ChevronLeft } from 'lucide-react'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Checkbox } from "@/components/ui/checkbox"


import { useAddNewUserMutation } from './usersApiSlice'

import useTitle from '../../hooks/useTitle'

const CreateUser = () => {
    const navigate = useNavigate()
    useTitle("Создание")

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    useEffect(() => {
        if (isSuccess) {
            navigate('/dash/users')
        }
    }, [isSuccess])

    const [username, setUsername] = useState('')
    const handleUsernameChange = (e) => setUsername(e.target.value)

    const [password, setPassword] = useState('')
    const handlePasswordChange = (e) => setPassword(e.target.value)

    const [role, setRole] = useState('')
    const handleRoleChange = (e) => setRole(e)

    const [isActive, setIsActive] = useState(true)
    const handleActiveChange = (e) => {
        setIsActive(prev => !prev)
        // // console.log(e)
    }

    const handleAddNewUser = () => {
        // console.log(username, password, role, isActive)
        addNewUser({ username, password, role, isActive })
    }

    return (
        <div className='p-3'>
            <div className='flex justify-between mb-3'>
                <div className='flex items-center gap-3'>
                    <Button onClick={() => navigate('/dash/vaults')} size="icon" variant="outline">
                        <ChevronLeft />
                    </Button>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                        Создание пользователя
                    </h4>
                </div>
            </div>
            <Card>
                <CardContent className="py-4 pt-8 flex flex-col gap-4">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="username">Имя пользователя</Label>
                        <Input onChange={handleUsernameChange} type="text" id="username" />
                    </div>

                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="password">Пароль</Label>
                        <Input onChange={handlePasswordChange} type="password" id="password" />
                    </div>



                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="password">Роль</Label>
                        <Select onValueChange={handleRoleChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Выберите роль" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Доступные роли</SelectLabel>
                                    <SelectItem value="viewer">viewer</SelectItem>
                                    <SelectItem value="editor">editor</SelectItem>
                                    <SelectItem value="admin">admin</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>




                    <div className="items-top flex space-x-2">
                        <Checkbox id="active" onCheckedChange={handleActiveChange} checked={isActive} />
                        <div className="grid gap-1.5 leading-none">
                            <Label
                                htmlFor="active"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Пользователь {isActive ? 'активен' : 'деактивирован'}
                            </Label>
                            <p className="text-sm text-slate-600">
                                Деактивированный пользователь не сможет авторизироваться и использовать систему.
                            </p>
                        </div>
                    </div>



                </CardContent>
                <CardFooter>
                    <div className='mt-4'>
                        <Button onClick={handleAddNewUser}>Подтвердить</Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default CreateUser