import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { generateKey } from "./crypto.js";
import { createSasTokenProvider } from "@azure/core-amqp";
/**
 * @internal
 */
export class SasServiceClientCredentials {
    /**
     * Creates a new sasServiceClientCredentials object.
     *
     * @param credential - The NamedKeyCredential containing the key name and secret key value.
     */
    constructor(credential) {
        this._credential = credential;
        this._tokenProvider = createSasTokenProvider(credential);
    }
    async _generateSignature(targetUri, expirationDate) {
        const stringToSign = `${targetUri}\n${expirationDate}`;
        const result = await generateKey(this._credential.key, stringToSign);
        return result;
    }
    /**
     * Signs a request with the Authentication header.
     *
     * @param request - The {@link PipelineRequest} to be signed.
     * @returns The signed request object.
     */
    async signRequest(request) {
        if (!request.headers)
            request.headers = createHttpHeaders();
        const targetUri = encodeURIComponent(request.url.toLowerCase()).toLowerCase();
        const date = new Date();
        date.setMinutes(date.getMinutes() + 5);
        const expirationDate = Math.round(date.getTime() / 1000);
        const signature = await this._generateSignature(targetUri, expirationDate);
        request.headers.set("authorization", `SharedAccessSignature sig=${signature}&se=${expirationDate}&skn=${this._credential.name}&sr=${targetUri}`);
        request.withCredentials = true;
        return request;
    }
    getToken(audience) {
        return this._tokenProvider.getToken(audience);
    }
}
//# sourceMappingURL=sasServiceClientCredentials.js.map