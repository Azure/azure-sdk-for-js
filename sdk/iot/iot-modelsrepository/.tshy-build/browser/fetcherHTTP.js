// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createHttpHeaders, createPipelineRequest, RestError } from "@azure/core-rest-pipeline";
import { logger } from "./logger.js";
/**
 * The HTTP Fetcher implements the Fetcher interface to
 * retrieve models through HTTP calls.
 *
 * @internal
 */
export class HttpFetcher {
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    constructor(baseURL, client) {
        this._client = client;
        this._baseURL = baseURL;
    }
    async fetch(path, options) {
        var _a, _b;
        logger.info(`Fetching ${path} from remote endpoint`);
        if (!options) {
            options = {};
        }
        const myURL = this._baseURL + "/" + path;
        const requestMethod = "GET";
        const requestHeader = createHttpHeaders((_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.customHeaders);
        const requestOptions = {
            url: myURL,
            method: requestMethod,
            headers: requestHeader,
            timeout: (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.timeout,
            abortSignal: options.abortSignal,
            tracingOptions: options.tracingOptions,
            allowInsecureConnection: true,
        };
        const request = createPipelineRequest(requestOptions);
        const res = await this._client.sendRequest(request);
        if (res.status >= 200 && res.status < 400) {
            const dtdlAsString = res.bodyAsText || "";
            const parsedDtdl = JSON.parse(dtdlAsString);
            return parsedDtdl;
        }
        else {
            throw new RestError("Error on HTTP Request in remote model fetcher", {
                code: "ResourceNotFound",
                statusCode: res.status,
                response: res,
                request: request,
            });
        }
    }
}
//# sourceMappingURL=fetcherHTTP.js.map