// import React, { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useGetCodesQuery } from './codesApiSlice'

// import { ChevronLeft, SquarePen } from "lucide-react"

// import { Link } from 'react-router-dom'

// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"

// import { Button } from "@/components/ui/button"

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"

// import { Badge } from "@/components/ui/badge"
// import StockLevel from '@/components/StockLevel'
// import TooltipElement from '@/components/TooltipElement'

// import useTitle from '../../hooks/useTitle'

// const CodesList = () => {

//   const {
//     data: codes,
//     isLoading,
//     isSuccess,
//     isError,
//     error
//   } = useGetCodesQuery('Code')

//   const navigate = useNavigate()

//   useTitle("Маркировки")

//   let content

//   if (isSuccess) {
//     // console.log(codes)
//     content = codes.map(code => {
//       return (
//         <TableBody key={code.id}>
//           <TableRow>
//             <TableCell className="px-4 py-3">{code.code_index}</TableCell>
//             <TableCell className="space-x-2 px-4 py-3">
//               <span>{code.code_name}</span>
//               {code.note && code.note.trim().length !== 0 ? <TooltipElement tooltipText={code.note} /> : ''}
//             </TableCell>
//             <TableCell className="px-4 py-3">{code.legacy_code_name}</TableCell>
//             <TableCell className="px-4 py-3">{code.type}</TableCell>
//             <TableCell className="px-4 py-3">
//               <StockLevel stockLevel={code.stock_level} />
//             </TableCell>

//             <TableCell className="px-4 py-3 text-right">
//               <Button
//                 onClick={() => navigate(`/dash/codes/${code.id}`)}
//                 variant="neutral"
//               >
//                 <SquarePen size={17} />
//               </Button>
//             </TableCell>
//           </TableRow>
//         </TableBody>
//       );
//     })
//   }

//   return (
//     <div className='p-3'>
//       <div className='flex justify-between mb-3'>
//         <div className='flex items-center gap-3'>
//           <Button onClick={() => navigate('/dash')} size="icon" variant="outline">
//             <ChevronLeft />
//           </Button>
//           <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
//             Маркировки
//           </h4>
//         </div>
//         <Button onClick={() => navigate('/dash/codes/create')}>Создать</Button>
//       </div>
// <Card>
//   <Table>
//     <TableHeader>
//       <TableRow>
//         <TableHead className="p-4">Сокращение</TableHead>
//         <TableHead className="p-4">Маркировка</TableHead>
//         <TableHead className="p-4">Код поставщика</TableHead>
//         <TableHead className="p-4">Категория</TableHead>
//         <TableHead className="p-4">Количество</TableHead>
//         <TableHead className="p-4"></TableHead>
//       </TableRow>
//     </TableHeader>
//     {content}
//   </Table>
// </Card>
//     </div >
//   )
// }

// export default CodesList



import { useMediaQuery } from 'react-responsive'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetCodesQuery } from './codesApiSlice'

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

import Note from '@/components/Note'

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
import StockLevel from '@/components/StockLevel'
import TooltipElement from '@/components/TooltipElement'

import useTitle from '../../hooks/useTitle'


import useAuth from '../../hooks/useAuth'

const CodesList = () => {

  const navigate = useNavigate()

  const isDesktop = useMediaQuery({
    query: '(min-width: 924px)'
  })

  const isMobile = useMediaQuery({
    query: '(max-width: 924px)'
  })


  const {
    data: codes,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetCodesQuery('Code')


  const { role } = useAuth()


  const table = (

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="p-4">Сокращение</TableHead>
          <TableHead className="p-4">Маркировка</TableHead>
          <TableHead className="p-4">Код поставщика</TableHead>
          <TableHead className="p-4">Количество</TableHead>
          <TableHead className="p-4">Остатки</TableHead>
          <TableHead className="p-4">Тип</TableHead>
          {role == 'admin' || role == 'editor' ? (<TableHead className="p-4"></TableHead>) : ('')}

        </TableRow>
      </TableHeader>
      {
        isSuccess
          ? (

            codes.map(code => {

              const vaultCounts = code.in_vaults.reduce((acc, current) => {
                if (acc[current.vault_name]) {
                  acc[current.vault_name]++;
                } else {
                  acc[current.vault_name] = 1;
                }
                return acc;
              }, {});

              return (
                <TableBody key={code.id}>
                  <TableRow>
                    <TableCell className="px-4 py-3">{code.short_code_name}</TableCell>
                    <TableCell className="px-4 py-3 flex items-center gap-2">
                      {code.code_name}
                      <Note noteText={code.note} />
                    </TableCell>
                    <TableCell className="px-4 py-3">{code.supplier_code_name}</TableCell>
                    <TableCell className="px-4 py-3">
                      <StockLevel stockLevel={code.stock_level} />
                    </TableCell>

                    <TableCell className="px-4 py-3 flex gap-1 flex-wrap">
                      {
                        Object.keys(code.in_vaults.reduce((acc, current) => {
                          if (acc[current.vault_name]) {
                            acc[current.vault_name]++;
                          } else {
                            acc[current.vault_name] = 1;
                          }
                          return acc;
                        }, {})).map((vaultName, index) => {
                          const count = code.in_vaults.filter(vault => vault.vault_name === vaultName).length;
                          return (
                            <Link
                              key={index}
                              to={
                                code.in_vaults.find(vault => vault.vault_name === vaultName)
                                  ? (role === 'admin' || role === 'editor'
                                    ? `/dash/vaults/${code.in_vaults.find(vault => vault.vault_name === vaultName).vault_id}`
                                    : '')
                                  : ''
                              }
                              className="flex"
                            >
                              <Badge className={count > 1 ? 'rounded-l' : 'rounded'} variant="outline">
                                {vaultName}
                              </Badge>
                              {count > 1 && (
                                <Badge className="rounded-r-md bg-blue-500 text-white" variant="secondary">
                                  {count}
                                </Badge>
                              )}
                            </Link>
                          );
                        })
                      }
                    </TableCell>

                    <TableCell className="px-4 py-3">{code.type}</TableCell>


                    {role !== 'admin' || role !== 'editor' ? ('') : (
                      <TableCell className="px-4 py-3 text-right">
                        <Button
                          onClick={() => navigate(`/dash/codes/${code.id}`)}
                          variant="neutral"
                        >
                          <SquarePen size={17} />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                </TableBody>
              )
            })

          )
          : (
            ''
          )
      }
    </Table>

  )

  const content = (
    <div className='p-3'>
      <div className='flex justify-between mb-3'>
        <div className='flex items-center gap-3'>
          <Button onClick={() => navigate('/dash')} size="icon" variant="outline">
            <ChevronLeft />
          </Button>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Маркировки
          </h4>
        </div>
        <Button onClick={() => navigate('/dash/codes/create')}>Создать</Button>
      </div>
      {/* {
        isDesktop
          ? desktopContent
          : ''
      }

      {
        isMobile
          ? mobileContent
          : ''
      } */}
      {table}
    </div>
  )

  return content
}

export default CodesList