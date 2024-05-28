import React from 'react'
import useTitle from '@/hooks/useTitle'
import useAuth from '../../hooks/useAuth'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Badge } from '@/components/ui/badge'

import { CornerDownRight } from 'lucide-react'

const Home = () => {
  useTitle('Система управления образцами')
  const { role } = useAuth()

  const currentDate = new Date().toLocaleString('ru-RU');

  return (
    <Card className="mt-6">
      {/* <CardHeader>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Система управления образцами
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          {currentDate}
        </p>
      </CardHeader>
      <CardContent>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Добро пожаловать, {username}
        </h4>
        <div className='relative mt-2'>
          <CornerDownRight className='absolute top-[-2px]' />
          <div className='flex items-center gap-2'>
            <span className="text-base font-normal leading-none ml-7">
              Назначеные роли:
            </span>
            <div>
              {roles.map(role => <Badge key={role} className='rounded-full ml-1'>{role}</Badge>)}
            </div>
          </div>
        </div>
        <p className="leading-7 [&:not(:first-child)]:mt-6 font-medium">
          Основные функции системы включают:
        </p>
        <ul className="my-2 ml-6 list-disc [&>li]:mt-0">
          <li>Управление маркировками</li>
          <ul className="my-1 ml-6 list-disc [&>li]:mt-0">
            <li>Создание новых маркировок</li>
            <li>Редактирование и удаление</li>
          </ul>
          <li>Ячейки</li>
          <ul className="my-1 ml-6 list-disc [&>li]:mt-0">
            <li>Создание новых ячеек</li>
            <li>Редактирование и удаление</li>
            <li>Управление остатками</li>
          </ul>
        </ul>
      </CardContent>
      <CardFooter>

      </CardFooter> */}
    </Card>
  )
}

export default Home