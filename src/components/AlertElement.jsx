import React from 'react'

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

import { CircleAlert } from "lucide-react"

const AlertElement = ({ error }) => {

    console.log('Origin - AlertElement Component')

    return (
        <Alert variant="destructive">
            <CircleAlert />
            <AlertTitle>Ошибка {error.status}</AlertTitle>
            <AlertDescription>
                {error.data}
            </AlertDescription>
        </Alert>
    )
}

export default AlertElement