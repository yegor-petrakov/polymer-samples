import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import useTitle from '../../hooks/useTitle'
import usePersist from '../../hooks/usePersist'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Lock } from 'lucide'


const Login = () => {
    useTitle('Авторизация')

    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [persist, setPersist] = usePersist()
    const [errMsg, setErrMsg] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const handleUsernameInput = (e) => setUsername(e.target.value)
    const handlePasswordInput = (e) => setPassword(e.target.value)
    const handleToggle = () => {
        setPersist(prev => !prev)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            navigate('/dash')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    }

    const content = (
        <div>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>
                        Авторизация
                    </CardTitle>
                    <CardDescription>Вход в систему управления образцами</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">

                            <div className="flex flex-col space-y-1.5">
                                <Label
                                    htmlFor="username"
                                >
                                    Имя пользователя
                                </Label>
                                <Input
                                    id="username"
                                    type="text"
                                    onChange={handleUsernameInput}
                                    ref={userRef}
                                    disabled={isLoading ? true : false}
                                    autoComplete="off"
                                    required
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label
                                    htmlFor="password">
                                    Пароль
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    onChange={handlePasswordInput}
                                    disabled={isLoading ? true : false}
                                    autoComplete="off"
                                    required
                                />
                            </div>

                            <div className="items-top flex space-x-2">
                                <Checkbox
                                    id="persist"
                                    onCheckedChange={handleToggle}
                                    checked={persist}
                                    disabled={isLoading ? true : false}
                                />
                                <div className="grid gap-1.5 leading-none">
                                    <label
                                        htmlFor="persist"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Оставаться авторизованым
                                    </label>
                                </div>
                            </div>

                        </div>
                        <div className='mt-6'>
                            {isLoading
                                ? (<Button disabled>Обработка...</Button>)
                                : (<Button>Войти</Button>)
                            }

                        </div>
                    </form>
                </CardContent>
            </Card>
            {errMsg
                ? (<Alert variant="destructive" className="w-[350px] mt-3 bg-red-100">
                    {/* <Terminal className="h-4 w-4" /> */}
                    <AlertTitle>Ошибка!</AlertTitle>
                    <AlertDescription>
                        {errMsg}
                    </AlertDescription>
                </Alert>)
                : ('')
            }

        </div>
    )

    return (
        <div className='h-screen w-full bg-slate-100 flex justify-center items-center'>
            {content}
        </div>
    )
}
export default Login