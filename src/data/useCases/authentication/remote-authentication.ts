import { HttpPostClient } from "@/data/protocols/http/http-post-client";
import { HttpStatusCode } from "@/data/protocols/http/http-response";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";
import { AuthenticationParams } from "@/domain/useCases/authentication";

export class RemoteAuthentication {
    constructor(
        private readonly url: string,
        private readonly HttpPostClient: HttpPostClient

    ) { }

    async auth(params: AuthenticationParams): Promise<void> {
        const httpRepsonse = await this.HttpPostClient.post({
            url: this.url,
            body: params
        })
        switch (httpRepsonse.statusCode) {
            case HttpStatusCode.unathorized: throw new InvalidCredentialsError()

            default: return Promise.resolve()
        }
    }
}