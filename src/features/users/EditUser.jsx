import React from 'react'
import useTitle from '@/hooks/useTitle'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useGetUserByIdQuery, useUpdateUserMutation } from './usersApiSlice'

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

const EditUser = () => {
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

  const [updateUser, {
    isLoading: isUpdateLoading,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
    error: updateError
  }] = useUpdateUserMutation()
 

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [isActive, setIsActive] = useState('')

  const handleUsernameChange = (e) => setUsername(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)
  const handleRoleChange = (e) => setRole(e)
  const handleActiveChange = () => {
    setIsActive(prev => !prev)
}

  const handleUpdateUser = () => updateUser({
    ...user,
    username,
    password,
    role,
    is_active: isActive
  })


  useEffect(() => {
    if (user) {
      setUsername(user.userName)
      setRole(user.role)
      setIsActive(user.is_active)
    }
  }, [isSuccess])

  useEffect(() => {
    if (isUpdateSuccess) {
      setUsername('')
      setPassword('')
      setRole('')
      setIsActive('')
      navigate('/dash/users')
    }
  }, [isUpdateSuccess])



  let content

  if (isSuccess) {

    content = (
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
              <Label htmlFor="password">Роль</Label>
              <Select onValueChange={handleRoleChange} value={role}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите роль" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Доступные роли</SelectLabel>
                    <SelectItem value="user">user</SelectItem>
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
              <Button onClick={handleUpdateUser}>Подтвердить</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return content
}

export default EditUser