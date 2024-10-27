import { Element } from "@prisma/client";

export function countPassword(elements : Element[]){
    const passwordCounts = new Map<string, number>()  // almacena la cuenta de cada contraseña
    elements.forEach(element => {
        const password = element.password
        if(password ){
            if(passwordCounts.has(password)){
                passwordCounts.set(password, (passwordCounts.get(password) || 0) + 1)
            }else{
                passwordCounts.set(password, 1)
            }
        }
    })

    let uniquePasswordsCount = 0
    let repeatedPasswordsCount = 0

    passwordCounts.forEach((count) => {
            if(count === 1){
                uniquePasswordsCount++
            }else{
                repeatedPasswordsCount++
            }
    })

    return {
       unique: uniquePasswordsCount,
       repeated: repeatedPasswordsCount,
    }
}