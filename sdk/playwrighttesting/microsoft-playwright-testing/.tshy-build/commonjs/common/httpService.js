"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpService = void 0;
const node_crypto_1 = require("node:crypto");
const core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
const logger_js_1 = require("./logger.js");
const HTTP_CALL_TIMEOUT = 70000;
class HttpService {
    async callAPI(method, url, data, token, contentType, correlationId) {
        const pipeline = (0, core_rest_pipeline_1.createPipelineFromOptions)({
            loggingOptions: {
                logger: logger_js_1.reporterLogger.info,
            },
        });
        const httpClient = (0, core_rest_pipeline_1.createDefaultHttpClient)();
        const request = (0, core_rest_pipeline_1.createPipelineRequest)({
            url,
            method,
            headers: (0, core_rest_pipeline_1.createHttpHeaders)({
                "Content-Type": contentType,
                Accept: "*/*",
                Authorization: `Bearer ${token}`,
                "x-ms-client-request-id": `${(0, node_crypto_1.randomUUID)()}`,
                "x-correlation-id": correlationId,
            }),
            timeout: HTTP_CALL_TIMEOUT,
        });
        if (data) {
            request.body = data;
        }
        return pipeline.sendRequest(httpClient, request);
    }
}
exports.HttpService = HttpService;
//# sourceMappingURL=httpService.js.map