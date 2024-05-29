import React, { useEffect, useState } from 'react'
import { useGetCodeByIdQuery, useUpdateCodeMutation, useDeleteCodeMutation } from './codesApiSlice'

import { useNavigate, useParams } from "react-router-dom"

import InputField from '@/components/InputField'
import TextareaField from '@/components/TextareaField'
import ButtonElement from '@/components/ButtonElement'

import { ChevronLeft } from 'lucide-react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from '../../components/ui/label'

import useTitle from '../../hooks/useTitle'

const EditCode = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    useTitle("Редактирование")

    const {
        data: code,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCodeByIdQuery(id)

    const [updateCode, {
        isLoading: isUpdateLoading,
        isSuccess: isUpdateSuccess,
        isError: isUpdateError,
        error: updateError
    }] = useUpdateCodeMutation(id)

    const [deleteCode, {
        isLoading: isDeleteLoading,
        isSuccess: isDeleteSuccess,
        isError: isDeleteError,
        error: deleteError
    }] = useDeleteCodeMutation()



    const [shortCodeName, setShortCodeName] = useState('')
    const handleShortCodeNameChange = (e) => setShortCodeName(e.target.value)
    const [isValidShortCodeName, setIsValidShortCodeName] = useState(false)

    const [codeName, setCodeName] = useState('')
    const handleCodeNameChange = (e) => setCodeName(e.target.value)
    const [isValidCodeName, setIsValidCodeName] = useState(false)

    const [supplierCodeName, setSupplierCodeName] = useState('')
    const handleSupplierCodeNameChange = (e) => setSupplierCodeName(e.target.value)

    const [stockLevel, setStockLevel] = useState('')
    const handleStockLevelChange = (e) => setStockLevel(e)

    const [category, setCategory] = useState('')
    const handleCategoryChange = (e) => setCategory(e)

    const [note, setNote] = useState('')
    const handleNoteChange = (e) => setNote(e.target.value)

    const canSave = [
        isValidShortCodeName,
        isValidCodeName
    ].every(Boolean)
        && stockLevel !== null
        && category !== null
        && !isLoading

    useEffect(() => {
        setIsValidShortCodeName(shortCodeName.trim().length > 0)
        setIsValidCodeName(codeName.trim().length > 0)
    }, [shortCodeName, codeName])

    useEffect(() => {
        if (code) {
            setShortCodeName(code.short_code_name)
            setCodeName(code.code_name)
            setSupplierCodeName(code.supplier_code_name)
            setStockLevel(code.stock_level)
            setCategory(code.category_id)
            setNote(code.note)
        }
    }, [isSuccess])

    const handleUpdateCode = () => updateCode({
        ...code[0],
        id,
        short_code_name: shortCodeName,
        code_name: codeName,
        supplier_code_name: supplierCodeName,
        stock_level: stockLevel,
        category_id: category,
        note
    })

    const handleDeleteCode = () => deleteCode({
        id
    })

    useEffect(() => {
        if (isUpdateSuccess || isDeleteSuccess) {
            setShortCodeName('')
            setCodeName('')
            setSupplierCodeName('')
            setStockLevel('')
            setNote('')
            navigate('/dash/codes')
        }
    }, [isUpdateSuccess || isDeleteSuccess])

    return (
        <div className='p-3'>
            <div className='flex justify-between mb-3'>
                <div className='flex items-center gap-3'>
                    <ButtonElement
                        path={-1}
                    />
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                        Редактирование маркировки
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
                            <Label htmlFor="category">Категория</Label>
                            <Select id="category" onValueChange={handleCategoryChange} value={category}>
                                <SelectTrigger className="w-full">
                                    <SelectValue defaultValue={category} />
                                </SelectTrigger>
                                <SelectContent>

                                    <SelectItem key={1} value={1}>
                                        Лента
                                    </SelectItem>
                                    <SelectItem key={2} value={2}>
                                        Ziplink
                                    </SelectItem>
                                    <SelectItem key={3} value={3}>
                                        Плоский ремень
                                    </SelectItem>
                                    <SelectItem key={4} value={4}>
                                        Зубчатый ремень
                                    </SelectItem>
                                    <SelectItem key={5} value={5}>
                                        Покрытие
                                    </SelectItem>
                                    <SelectItem key={6} value={6}>
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
                    <div className='mt-2 flex gap-1'>
                        <ButtonElement
                            variant="default"
                            buttonText="Сохранить"
                            isLoadingText="Сохранение..."
                            handleClick={handleUpdateCode}
                            isLoading={isLoading}
                            isDisabled={!canSave}
                        />
                        <ButtonElement
                            variant="destructive"
                            buttonText="Удалить"
                            isLoadingText="Удаление..."
                            handleClick={handleDeleteCode}
                            isLoading={isLoading}
                            isDisabled={!canSave}
                        />
                    </div>
                </CardFooter>
            </Card >
        </div >
    )
}

export default EditCode