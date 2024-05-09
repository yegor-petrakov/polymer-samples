import React, { useEffect, useState } from 'react'
import { useAddNewCodeMutation } from './codesApiSlice'

import { useNavigate } from "react-router-dom"

import InputField from '@/components/InputField'
import TextareaField from '@/components/TextareaField'
import ButtonElement from '@/components/ButtonElement'
import AlertElement from '@/components/AlertElement'


import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ChevronLeft, CircleAlert } from 'lucide-react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


const CreateCode = () => {

    const navigate = useNavigate()

    const [addNewCode, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewCodeMutation()


    const [shortCodeName, setShortCodeName] = useState('')
    const handleShortCodeNameChange = (e) => setShortCodeName(e.target.value)
    const [isValidShortCodeName, setIsValidShortCodeName] = useState(false)

    const [codeName, setCodeName] = useState('')
    const handleCodeNameChange = (e) => setCodeName(e.target.value)
    const [isValidCodeName, setIsValidCodeName] = useState(false)

    const [supplierCodeName, setSupplierCodeName] = useState('')
    const handleSupplierCodeNameChange = (e) => setSupplierCodeName(e.target.value)

    const [stockLevel, setStockLevel] = useState('empty')
    const handleStockLevelChange = (e) => setStockLevel(e)

    const [category, setCategory] = useState(1)
    const handleCategoryChange = (e) => setCategory(e)

    const [note, setNote] = useState('')
    const handleNoteChange = (e) => setNote(e.target.value)

    useEffect(() => {
        setIsValidShortCodeName(shortCodeName.trim().length > 0)
        setIsValidCodeName(codeName.trim().length > 0)
    }, [shortCodeName, codeName])

    const canSave = [
        isValidShortCodeName,
        isValidCodeName
    ].every(Boolean)
        && stockLevel !== null
        && category !== null
        && !isLoading

    const handleCreateNewCode = () => addNewCode({
        short_code_name: shortCodeName,
        code_name: codeName,
        supplier_code_name: supplierCodeName,
        stock_level: stockLevel,
        category_id: category,
        note
    })

    useEffect(() => {
        if (isSuccess) {
            setShortCodeName('')
            setCodeName('')
            setSupplierCodeName('')
            setStockLevel('')
            setNote('')
            navigate('/dash/codes')
        }
    }, [isSuccess, navigate])

    return (
        <div className='p-3'>
            <div className='flex justify-between mb-3'>
                <div className='flex items-center gap-3'>
                    <ButtonElement
                        path='/dash/codes'
                    />
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                        Создание маркировки
                    </h4>
                </div>
            </div>
            <Card>
                <CardContent className="py-4 pt-8 flex flex-col gap-4">

                    <InputField
                        labelText="Сокращение"
                        name="short_code_name"
                        value={shortCodeName}
                        handleChange={handleShortCodeNameChange}
                        isDisabled={isLoading}
                    />
                    <InputField
                        labelText="Маркировка"
                        name="code_name"
                        value={codeName}
                        handleChange={handleCodeNameChange}
                        isDisabled={isLoading}
                    />
                    <InputField
                        labelText="Код поставщика"
                        name="supplier_code_name"
                        value={supplierCodeName}
                        handleChange={handleSupplierCodeNameChange}
                        isDisabled={isLoading}
                    />


                    <div className='flex gap-2'>
                        <div className="grid w-1/2 items-center gap-1.5">
                            <Label htmlFor="stock_level">Количество</Label>
                            <Select id="stock_level" onValueChange={handleStockLevelChange} value={stockLevel}>
                                <SelectTrigger className="w-full">
                                    <SelectValue defaultValue={stockLevel} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem key='empty' value='empty'>
                                        Пустой
                                    </SelectItem>
                                    <SelectItem key='low' value='low'>
                                        Заканчивается
                                    </SelectItem>
                                    <SelectItem key='enough' value='enough'>
                                        Достаточно
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid w-1/2 items-center gap-1.5">
                            <Label htmlFor="stock_level">Категория</Label>
                            <Select id="stock_level" onValueChange={handleCategoryChange} value={category}>
                                <SelectTrigger className="w-full">
                                    <SelectValue defaultValue={1} />
                                </SelectTrigger>
                                <SelectContent>

                                    <SelectItem key='1' value={1}>
                                        Лента
                                    </SelectItem>
                                    <SelectItem key='2' value={2}>
                                        Ziplink
                                    </SelectItem>
                                    <SelectItem key='3' value={3}>
                                        Плоский ремень
                                    </SelectItem>
                                    <SelectItem key='4' value={4}>
                                        Зубчатый ремень
                                    </SelectItem>
                                    <SelectItem key='5' value={5}>
                                        Покрытие
                                    </SelectItem>
                                    <SelectItem key='6' value={6}>
                                        Другое
                                    </SelectItem>

                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <TextareaField
                        labelText="Примечание"
                        name="note"
                        value={note}
                        handleChange={handleNoteChange}
                        isDisabled={isLoading}
                    />
                </CardContent >
                <CardFooter>
                    <div className='w-full space-y-4'>
                        {isError ? (
                            <AlertElement error={error} />
                        ) : (
                            ''
                        )}

                        <ButtonElement
                            variant="default"
                            buttonText="Создать"
                            isLoadingText="Создание..."
                            handleClick={handleCreateNewCode}
                            isLoading={isLoading}
                            isDisabled={!canSave}
                        />
                    </div>
                </CardFooter>
            </Card >
        </div >
    )
}

export default CreateCode