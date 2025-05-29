"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SasServiceClientCredentials = void 0;
const core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
const crypto_js_1 = require("./crypto.js");
const core_amqp_1 = require("@azure/core-amqp");
/**
 * @internal
 */
class SasServiceClientCredentials {
    /**
     * Creates a new sasServiceClientCredentials object.
     *
     * @param credential - The NamedKeyCredential containing the key name and secret key value.
     */
    constructor(credential) {
        this._credential = credential;
        this._tokenProvider = (0, core_amqp_1.createSasTokenProvider)(credential);
    }
    async _generateSignature(targetUri, expirationDate) {
        const stringToSign = `${targetUri}\n${expirationDate}`;
        const result = await (0, crypto_js_1.generateKey)(this._credential.key, stringToSign);
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
            request.headers = (0, core_rest_pipeline_1.createHttpHeaders)();
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
exports.SasServiceClientCredentials = SasServiceClientCredentials;
//# sourceMappingURL=sasServiceClientCredentials.js.map