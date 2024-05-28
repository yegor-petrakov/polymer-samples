import React from 'react'
import useTitle from '@/hooks/useTitle'
import { useParams } from 'react-router-dom'
import EditUserForm from './EditUserForm'

const EditUser = () => {
    useTitle('Редактирование')

    const { id } = useParams()

  return <EditUserForm userId={id} />
}

export default EditUser