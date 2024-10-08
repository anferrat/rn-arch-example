import { NetworkRepoInterface } from "./interfaces/RepositoryInterfaces"

export class NetworkRepository implements NetworkRepoInterface {
    constructor() { }

    loginRequest(login: string, password: string): Promise<boolean> {
        // Here you can have HTTP request to your backend validating login credentials
        return new Promise((resolve, reject) => setTimeout(() => {
            if (login === 'user' && password === 'qwerty')
                resolve(true)
            else
                reject('Invalid credentials')
        }, 1000))
    }
}