import { LoginInterface } from "../services/interfaces/ApplicationServiceInterfaces"
import { ControllerBase, Response } from "./base/ControllerBase"

export class LoginController extends ControllerBase {
    /*
    Controllers are to orginize services based into categories. A service can be used in different controllers
    */

    private loginService: LoginInterface

    constructor(loginService: LoginInterface) {
        super()
        this.loginService = loginService
    }


    login(login: string, password: string): Promise<Response<void>> {
        return super.execute(() => this.loginService.execute(login, password))
    }

}