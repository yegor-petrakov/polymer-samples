import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetVaultsQuery } from './vaultsApiSlice'

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

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"


import AlertElement from '@/components/AlertElement'
import Loader from '@/components/ui/Loader'



import useTitle from "../../hooks/useTitle"
import useAuth from "../../hooks/useAuth"

const VaultsList = () => {

    const {
        data: vaults,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetVaultsQuery('Vault')

    const navigate = useNavigate()
    useTitle("Ячейки")

    const handleEditClicked = (id) => {
        navigate(`/dash/vaults/${id}`)
    }

    const handleCreateNewVaultClicked = () => navigate('/dash/vaults/create')

    const { role } = useAuth()

    let content;
    let tableContent

    console.log(role)

    if (isLoading) {
        content = <Loader />
    }

    if (isError) {
        content = <AlertElement error={error} />
    }

    if (isSuccess) {

        // console.log(vaults)

        tableContent = vaults.map(vault => {

            const groupedCodes = vault.includes.reduce((groups, code) => {
                const { short_code_name } = code;
                if (short_code_name) {
                    groups[short_code_name] = (groups[short_code_name] || 0) + 1;
                }
                return groups;
            }, {});

            const renderedCodes = Object.entries(groupedCodes).map(([shortCode, count]) => {
                const code = vault.includes.find(code => code.short_code_name === shortCode);
                return (
                    <Link
                        key={shortCode}
                        to={role == 'admin' || role == 'editor' ? `/dash/codes/${code.code_id}` : ''}
                        className='flex'
                    >
                        <Badge
                            className={`${count === 1 ? 'rounded-md' : 'rounded-l-md'} hover:cursor-pointer flex gap-2`}
                            variant="outline"
                        >
                            {shortCode}
                        </Badge>
                        {count > 1 && (
                            <Badge className="rounded-r-md bg-blue-500 text-white" variant="secondary">
                                {count}
                            </Badge>
                        )}
                    </Link>
                );
            });

            return (
                <TableBody key={vault.id}>
                    <TableRow>
                        <TableCell className="px-4 py-3">{vault.vault_name}</TableCell>
                        <TableCell className="px-4 py-3 flex gap-1 flex-wrap items-center">
                            {renderedCodes}
                        </TableCell>

                        {
                            role == 'admin' || role == 'editor' ? (
                                <TableCell className="px-4 py-3 text-right">
                                    <Button
                                        onClick={() => navigate(`/dash/vaults/${vault.id}`)}
                                        variant="neutral"
                                    >
                                        <SquarePen size={17} />
                                    </Button>
                                </TableCell>
                            ) : ('')
                        }

                    </TableRow>
                </TableBody>
            );
        });

        content = (
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="p-4">Название</TableHead>
                            <TableHead className="p-4">Содержимое</TableHead>
                            {role == 'admin' || role == 'editor' ? (<TableHead className="p-4"></TableHead>) : ('')}
                        </TableRow>
                    </TableHeader>
                    {tableContent}
                </Table>
            </Card>
        )
    }


    return (
        <div className='p-3'>
            <div className='flex justify-between mb-3'>
                <div className='flex items-center gap-3'>
                    <Button onClick={() => navigate('/dash')} size="icon" variant="outline">
                        <ChevronLeft />
                    </Button>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                        Ячейки
                    </h4>
                </div>
                <Button onClick={handleCreateNewVaultClicked}>Создать</Button>
            </div>
            {content}
        </div>
    )

    // return (
    //     <div className='p-3'>
    //         <div className='flex justify-between mb-3'>
    //             <div className='flex items-center gap-3'>
    //                 <Button onClick={() => navigate('/dash')} size="icon" variant="outline">
    //                     <ChevronLeft />
    //                 </Button>
    //                 <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
    //                     Ячейки
    //                 </h4>
    //             </div>
    //             <Button onClick={handleCreateNewVaultClicked}>Создать</Button>
    //         </div>

    //         {isError ? (
    //             <AlertElement
    //                 error={error}
    //             />
    //         ) : (
    //             <Card>
    //                 <Table>
    //                     <TableHeader>
    //                         <TableRow>
    //                             <TableHead className="p-4">Название</TableHead>
    //                             <TableHead className="p-4">Содержимое</TableHead>
    //                             <TableHead className="p-4"></TableHead>
    //                         </TableRow>
    //                     </TableHeader>
    //                     {tableContent}
    //                 </Table>
    //             </Card>
    //         )}

    //     </div>

    // )
}

export default VaultsList
