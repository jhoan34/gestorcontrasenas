"use client"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Copy, Shuffle } from "lucide-react"
import { useEffect, useState } from "react"
import { copyToClipboard } from "@/lib/clipboard"
import { PasswordGenerator } from "./passworgenerator"
import { UserGenerator } from "./usergenerator"
import { generateCustomPassword } from "@/lib/generateCustomPassword"
import { generateRandomUser } from "@/lib/generaterandomUser"
import { generateRandomEmail } from "@/lib/generateRandomEmail"

export const FormGenerator = () => {
    const [itemvalue, setItemValue ] = useState("")
    const [selectValue, setSelectValue] = useState<"password" | "user" | string >("password")
    const [userTypeSelected , setUserTypeSelected] = useState("username")

    // Estados para el generador de contraseñas
    const [lengthPassword, setLengthPassword] = useState<number>(11);
    const [isMayusSelected, setIsMayusSelected] = useState<boolean>(true);
    const [isMinusSelected, setIsMinusSelected] = useState<boolean>(true);
    const [isSpecialCharacters, setIsSpecialCharacters] = useState<boolean>(true);
    const [isNumberSelected, setIsNumberSelected] = useState<boolean>(true);
    
    useEffect(() => {
        if(selectValue === "password"){
            const newPassword = generateCustomPassword(lengthPassword, isMayusSelected, isMinusSelected, isSpecialCharacters, isNumberSelected)
            setItemValue(newPassword)
        }
    }, [lengthPassword, isMayusSelected, isMinusSelected, isSpecialCharacters , isNumberSelected, selectValue])

    useEffect(() => {
        if(selectValue === "user"){
            const newuserGenerater = generateRandomUser()
            setItemValue(newuserGenerater)
        }
        if(selectValue === "email"){
            const newEmail = generateRandomEmail()
            setItemValue(newEmail)
        }
    }, [selectValue, userTypeSelected ])

    const shuffle = () => {
        if(selectValue === "password") {
            const password = generateCustomPassword(lengthPassword, isMayusSelected, isMinusSelected, isSpecialCharacters, isNumberSelected)
            setItemValue(password)
        }
        if(selectValue === "user") {
            if(userTypeSelected === "email"){
                const newEmail = generateRandomEmail()
                setItemValue(newEmail)
            }else {
                const newuserGenerater = generateRandomUser()
                setItemValue(newuserGenerater)
            }
        }
    }

    return (
        <div className="mt-5 max-w-2xl">
            <div className="relative w-full">
                <Input value={itemvalue} placeholder="input.." onChange={() => console.log("onchange")} />
                <Copy className="absolute top-3 right-12 cursor-pointer h-5 w-5" onClick={() => copyToClipboard(itemvalue)}/>
                <Shuffle className="absolute top-3 right-3 cursor-pointer h-5 w-5" onClick={shuffle} />
            </div>
            <div className="bg-slate-100 rounded-md shadow-md my-4 p-4">
                <p className="mb-4 text-slate-500">¿Qué quieres generar?</p>
                <RadioGroup defaultValue="password" onValueChange={(value) => setSelectValue(value)}> 
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="password" id="r1" />
                        <Label htmlFor="r1" className="text-slate-700">Password</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="user" id="r2" />
                        <Label htmlFor="r2" className="text-slate-700">Usuario</Label>
                    </div>
                </RadioGroup>
            </div>
            {
                selectValue === "password" ? (
                    <PasswordGenerator 
                        lengthPassword={lengthPassword}
                        setLengthPassword={setLengthPassword}
                        isMayusSelected={isMayusSelected}
                        setIsMayusSelected={setIsMayusSelected}
                        isMinusSelected={isMinusSelected}
                        setIsMinusSelected={setIsMinusSelected}
                        isSpecialCharacters={isSpecialCharacters}
                        setIsSpecialCharacters={setIsSpecialCharacters}
                        isNumberSelected={isNumberSelected}
                        setIsNumberSelected={setIsNumberSelected}
                    />
                ): (
                    <UserGenerator setUserTypeSelected={setUserTypeSelected}/>
                )
            }
        </div>
    )
}
