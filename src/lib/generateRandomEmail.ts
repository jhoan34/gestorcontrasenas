import { generateRandomUser } from "./generaterandomUser"

export const generateRandomEmail = () => {

    const domains = [
        "example.com",
        "test.com",
        "sample.org",
        "mail.net",
        "demo.co",
        "site.edu"
    ]
    const username = generateRandomUser(8)
    const domain = domains[Math.floor(Math.random() * domains.length)] 
    return `${username}@${domain}`
}
