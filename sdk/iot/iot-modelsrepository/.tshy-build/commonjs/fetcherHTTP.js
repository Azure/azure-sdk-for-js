"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpFetcher = void 0;
const core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
const logger_js_1 = require("./logger.js");
/**
 * The HTTP Fetcher implements the Fetcher interface to
 * retrieve models through HTTP calls.
 *
 * @internal
 */
class HttpFetcher {
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    constructor(baseURL, client) {
        this._client = client;
        this._baseURL = baseURL;
    }
    async fetch(path, options) {
        var _a, _b;
        logger_js_1.logger.info(`Fetching ${path} from remote endpoint`);
        if (!options) {
            options = {};
        }
        const myURL = this._baseURL + "/" + path;
        const requestMethod = "GET";
        const requestHeader = (0, core_rest_pipeline_1.createHttpHeaders)((_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.customHeaders);
        const requestOptions = {
            url: myURL,
            method: requestMethod,
            headers: requestHeader,
            timeout: (_b = options.requestOptions) === null || _b === void 0 ? void 0 : _b.timeout,
            abortSignal: options.abortSignal,
            tracingOptions: options.tracingOptions,
            allowInsecureConnection: true,
        };
        const request = (0, core_rest_pipeline_1.createPipelineRequest)(requestOptions);
        const res = await this._client.sendRequest(request);
        if (res.status >= 200 && res.status < 400) {
            const dtdlAsString = res.bodyAsText || "";
            const parsedDtdl = JSON.parse(dtdlAsString);
            return parsedDtdl;
        }
        else {
            throw new core_rest_pipeline_1.RestError("Error on HTTP Request in remote model fetcher", {
                code: "ResourceNotFound",
                statusCode: res.status,
                response: res,
                request: request,
            });
        }
    }
}
exports.HttpFetcher = HttpFetcher;
//# sourceMappingURL=fetcherHTTP.js.map