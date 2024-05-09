import React, { useEffect } from 'react'
import { useGetUsersQuery } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'


import { ChevronLeft, SquarePen } from "lucide-react"

import { Link } from 'react-router-dom'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import ButtonElement from '@/components/ButtonElement'
import { Card } from "@/components/ui/card"

const UsersList = () => {
  const navigate = useNavigate()

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery('User')

  const handleCreateUserClick = () => navigate('/dash/users/create')


  let content

  if (isSuccess) {

    content = users && users.map(user => {
      return (
        <TableBody key={user.id}>
          <TableRow>
            <TableCell className="px-4 py-3">{user.username}</TableCell>
            <TableCell className="px-4 py-3">{user.roles.toString().replaceAll(',', ', ')}</TableCell>
            <TableCell className="px-4 py-3 text-right">
              <Button
                onClick={() => navigate(`/dash/users/${user.id}`)}
                variant="neutral"
              >
                <SquarePen size={17} />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      );
    })
  }


  return (
    <div className='p-3'>
      <div className='flex justify-between mb-3'>
        <div className='flex items-center gap-3'>
          <ButtonElement 
            path='/dash'
          />
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Пользователи
          </h4>
        </div>
        <Button onClick={handleCreateUserClick}>Создать</Button>
      </div>
      <Card>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="p-4">Имя пользователя</TableHead>
              <TableHead className="p-4">Роль</TableHead>
              <TableHead className="p-4"></TableHead>
            </TableRow>
          </TableHeader>
          {content}
        </Table>

      </Card>
    </div >
  )
}

export default UsersList