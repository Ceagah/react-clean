import { AccountModel } from '../models/account-model'

type AutethenticationParams = {
    email: string,
    password: string
}

export interface Autethentication {
    auth(params: AutethenticationParams): Promise<AccountModel>
}