import { useState, useEffect } from 'react'
import { useGetVaultByIdQuery, useUpdateVaultMutation, useDeleteVaultMutation } from "./vaultsApiSlice"
import { useGetCodesQuery } from '../codes/codesApiSlice'
import { useAddNewCodeVaultMutation } from './codeVaultApiSlice'
import { useNavigate, useParams } from "react-router-dom"
import { useMediaQuery } from 'react-responsive'

import { Button } from "@/components/ui/button"

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



import Heading from '@/components/Heading'
import InputField from '@/components/InputField'
import TextareaField from '@/components/TextareaField'
import ButtonElement from '@/components/ButtonElement'
import CodeVault from '../../components/CodeVault'

import useTitle from "../../hooks/useTitle"



const EditVault = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    useTitle("Редактирование")

    const isDesktop = useMediaQuery({
        query: '(min-width: 724px)'
    })

    const isMobile = useMediaQuery({
        query: '(max-width: 724px)'
    })

    const {
        data: vault,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetVaultByIdQuery(id)

    const [updateVault, {
        isLoading: isUpdateVaultLoading,
        isSuccess: isUpdateVaultSuccess,
        isError: isUpdateVaultError,
        error: updateVaultError
    }] = useUpdateVaultMutation()

    const [deleteVault, {
        isLoading: isDeleteVaultLoading,
        isSuccess: isDeleteVaultSuccess,
        isError: isDeleteVaultError,
        error: deleteVaultError
    }] = useDeleteVaultMutation()


    const [vaultName, setVaultName] = useState('')
    const [note, setNote] = useState('')

    let canSave = vaultName.length > 0 && !isLoading

    useEffect(() => {
        if (vault) {
            setVaultName(vault[0].vault_name)
            setNote(vault[0].note)
        }
    }, [isSuccess])


    useEffect(() => {
        if (isUpdateVaultSuccess) {
            setVaultName('')
            setNote('')
            navigate('/dash/vaults')
        }
    }, [isUpdateVaultSuccess])

    useEffect(() => {
        if (isDeleteVaultSuccess) {
            navigate('/dash/vaults')
        }
    }, [isDeleteVaultSuccess])

    const onVaultNameChange = (e) => setVaultName(e.target.value)
    const onNoteChange = (e) => setNote(e.target.value)

    const handleUpdateVault = () => updateVault({ ...vault[0], id, vault_name: vaultName, note })
    const handleDeleteVault = () => deleteVault({ id })

    return (
        <div className='p-3'>
            <div className='flex justify-between mb-3'>
                <div className='flex items-center gap-3'>
                    <ButtonElement
                        variant="outline"
                        path="/dash/vaults"
                    />
                    <Heading level={1} headingText="Редактирование ячейки" />
                </div>
            </div>
            <div className={`flex gap-4 items-baseline ${isMobile ? 'flex-col' : ''}`}>

                <Card className={isDesktop ? `w-1/2` : `w-full`}>
                    <CardContent className="py-4 pt-8 flex flex-col gap-4">

                        <InputField
                            labelText="Название"
                            name="vault_name"
                            handleChange={onVaultNameChange}
                            value={vaultName}
                            isDisabled={isLoading}
                        />

                        <TextareaField
                            labelText="Примечание"
                            name="note"
                            handleChange={onNoteChange}
                            value={note}
                            isDisabled={isLoading}
                        />

                    </CardContent >
                    <CardFooter>
                        <div className='mt-2 flex gap-1'>
                            <ButtonElement
                                variant="default"
                                buttonText="Сохранить"
                                isLoadingText="Сохранение..."
                                handleClick={handleUpdateVault}
                                isLoading={isUpdateVaultLoading}
                                isDisabled={!canSave}
                            />
                            <ButtonElement
                                variant="destructive"
                                buttonText="Удалить"
                                isLoadingText="Удаление..."
                                handleClick={handleDeleteVault}
                                isLoading={isDeleteVaultLoading}
                            />
                        </div>

                    </CardFooter>
                </Card >

                <Card className={isDesktop ? `w-1/2` : `w-full`}>
                    <CardContent className="py-4 pt-8 flex flex-col gap-4">

                        <CodeVault
                            currentVaultId={id}
                        />

                    </CardContent >
                    <CardFooter></CardFooter>
                </Card >
            </div>
        </div >
    )
}

export default EditVault


