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
//     console.log(codes)
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
  } = useGetCodesQuery('Code', {
    pollingInterval: 15000,
  })


  const desktopContent = (

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="p-4">Сокращение</TableHead>
          <TableHead className="p-4">Маркировка</TableHead>
          <TableHead className="p-4">Код поставщика</TableHead>
          <TableHead className="p-4">Тип</TableHead>
          <TableHead className="p-4">Количество</TableHead>
          <TableHead className="p-4"></TableHead>
        </TableRow>
      </TableHeader>
      {
        isSuccess
          ? (

            codes.map(code => {
              return (
                <TableBody key={code.id}>
                  <TableRow>
                    <TableCell className="px-4 py-3">{code.short_code_name}</TableCell>
                    <TableCell className="px-4 py-3">{code.code_name}</TableCell>
                    <TableCell className="px-4 py-3">{code.supplier_code_name}</TableCell>
                    <TableCell className="px-4 py-3">{code.type}</TableCell>
                    <TableCell className="px-4 py-3">
                      <StockLevel stockLevel={code.stock_level} />
                    </TableCell>

                    <TableCell className="px-4 py-3 text-right">
                      <Button
                        onClick={() => navigate(`/dash/codes/${code.id}`)}
                        variant="neutral"
                      >
                        <SquarePen size={17} />
                      </Button>
                    </TableCell>
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

  const mobileContent = (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="p-4">Маркировка</TableHead>
            <TableHead className="p-4">Количество</TableHead>
            <TableHead className="p-4"></TableHead>
          </TableRow>
        </TableHeader>
        {
          isSuccess
            ? (

              codes.map(code => {
                return (
                  <TableBody key={code.id}>
                    <TableRow>
                      <TableCell className="px-4 py-3">
                        {code.short_code_name}<br />
                        <strong>{code.code_name}</strong><br />
                        {code.supplier_code_name}<br />
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <StockLevel stockLevel={code.stock_level} />
                      </TableCell>

                      <TableCell className="px-4 py-3 text-right">
                        <Button
                          onClick={() => navigate(`/dash/codes/${code.id}`)}
                          variant="neutral"
                        >
                          <SquarePen size={17} />
                        </Button>
                      </TableCell>
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
      {
        isDesktop
          ? desktopContent
          : ''
      }

      {
        isMobile
          ? mobileContent
          : ''
      }
    </div>
  )

  return content
}

export default CodesList