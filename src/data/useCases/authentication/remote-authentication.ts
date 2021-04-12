import { HttpPostClient, HttpStatusCode } from "@/data/protocols/http/";
import { UnexpectedError, InvalidCredentialsError } from "@/domain/errors/";
import { AccountModel } from "@/domain/models/";
import { Authentication, AuthenticationParams } from "@/domain/useCases/";

export class RemoteAuthentication implements Authentication {
    constructor(
        private readonly url: string,
        private readonly HttpPostClient: HttpPostClient<AuthenticationParams, AccountModel>

    ) { }

    async auth(params: AuthenticationParams): Promise<AccountModel> {
        const httpRepsonse = await this.HttpPostClient.post({
            url: this.url,
            body: params
        })
        switch (httpRepsonse.statusCode) {
            case HttpStatusCode.ok: return httpRepsonse.body
            case HttpStatusCode.unathorized: throw new InvalidCredentialsError()
            default: throw new UnexpectedError()
        }
    }
}