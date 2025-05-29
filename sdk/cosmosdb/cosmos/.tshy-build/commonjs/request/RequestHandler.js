"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestHandler = void 0;
const tslib_1 = require("tslib");
const core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
const index_js_1 = require("../common/index.js");
const constants_js_1 = require("../common/constants.js");
const Plugin_js_1 = require("../plugins/Plugin.js");
const RetryUtility = tslib_1.__importStar(require("../retry/retryUtility.js"));
const defaultAgent_js_1 = require("./defaultAgent.js");
const ErrorResponse_js_1 = require("./ErrorResponse.js");
const request_js_1 = require("./request.js");
const TimeoutError_js_1 = require("./TimeoutError.js");
const cachedClient_js_1 = require("../utils/cachedClient.js");
const logger_1 = require("@azure/logger");
const DiagnosticNodeInternal_js_1 = require("../diagnostics/DiagnosticNodeInternal.js");
const diagnostics_js_1 = require("../utils/diagnostics.js");
const time_js_1 = require("../utils/time.js");
const logger = (0, logger_1.createClientLogger)("RequestHandler");
async function executeRequest(diagnosticNode, requestContext) {
    return (0, Plugin_js_1.executePlugins)(diagnosticNode, requestContext, httpRequest, Plugin_js_1.PluginOn.request);
}
/**
 * @hidden
 */
async function httpRequest(requestContext, diagnosticNode) {
    var _a;
    const controller = new AbortController();
    const signal = controller.signal;
    // Wrap users passed abort events and call our own internal abort()
    const userSignal = requestContext.options && requestContext.options.abortSignal;
    if (userSignal) {
        if (userSignal.aborted) {
            controller.abort();
        }
        else {
            userSignal.addEventListener("abort", () => {
                controller.abort();
            });
        }
    }
    const timeout = setTimeout(() => {
        controller.abort();
    }, requestContext.connectionPolicy.requestTimeout);
    let response;
    if (requestContext.body) {
        requestContext.body = (0, request_js_1.bodyFromData)(requestContext.body);
    }
    const httpsClient = (_a = requestContext.httpClient) !== null && _a !== void 0 ? _a : (0, cachedClient_js_1.getCachedDefaultHttpClient)();
    const url = (0, index_js_1.prepareURL)(requestContext.endpoint, requestContext.path);
    const reqHeaders = (0, core_rest_pipeline_1.createHttpHeaders)(requestContext.headers);
    const pipelineRequest = (0, core_rest_pipeline_1.createPipelineRequest)({
        url,
        headers: reqHeaders,
        method: requestContext.method,
        abortSignal: signal,
        body: requestContext.body,
    });
    if (requestContext.requestAgent) {
        pipelineRequest.agent = requestContext.requestAgent;
    }
    else {
        const parsedUrl = new URL(url);
        pipelineRequest.agent = parsedUrl.protocol === "http:" ? defaultAgent_js_1.defaultHttpAgent : defaultAgent_js_1.defaultHttpsAgent;
        pipelineRequest.allowInsecureConnection = parsedUrl.protocol === "http:";
    }
    const startTimeUTCInMs = (0, time_js_1.getCurrentTimestampInMs)();
    try {
        if (requestContext.pipeline) {
            response = await requestContext.pipeline.sendRequest(httpsClient, pipelineRequest);
        }
        else {
            response = await httpsClient.sendRequest(pipelineRequest);
        }
    }
    catch (error) {
        if (error.name === "AbortError") {
            // If the user passed signal caused the abort, cancel the timeout and rethrow the error
            if (userSignal && userSignal.aborted === true) {
                clearTimeout(timeout);
                throw error;
            }
            // If the user didn't cancel, it must be an abort we called due to timeout
            throw new TimeoutError_js_1.TimeoutError(`Timeout Error! Request took more than ${requestContext.connectionPolicy.requestTimeout} ms`);
        }
        throw error;
    }
    clearTimeout(timeout);
    const result = response.status === 204 || response.status === 304 || response.bodyAsText === ""
        ? null
        : JSON.parse(response.bodyAsText);
    const responseHeaders = response.headers.toJSON();
    const substatus = responseHeaders[constants_js_1.Constants.HttpHeaders.SubStatus]
        ? parseInt(responseHeaders[constants_js_1.Constants.HttpHeaders.SubStatus], 10)
        : undefined;
    diagnosticNode.recordSuccessfulNetworkCall(startTimeUTCInMs, requestContext, response, substatus, url);
    if (response.status >= 400) {
        const errorResponse = new ErrorResponse_js_1.ErrorResponse(result.message);
        logger.warning(response.status +
            " " +
            requestContext.endpoint +
            " " +
            requestContext.path +
            " " +
            result.message);
        errorResponse.code = response.status;
        errorResponse.body = result;
        errorResponse.headers = responseHeaders;
        if (constants_js_1.Constants.HttpHeaders.ActivityId in responseHeaders) {
            errorResponse.activityId = responseHeaders[constants_js_1.Constants.HttpHeaders.ActivityId];
        }
        if (constants_js_1.Constants.HttpHeaders.SubStatus in responseHeaders) {
            errorResponse.substatus = substatus;
        }
        if (constants_js_1.Constants.HttpHeaders.RetryAfterInMs in responseHeaders) {
            errorResponse.retryAfterInMs = parseInt(responseHeaders[constants_js_1.Constants.HttpHeaders.RetryAfterInMs], 10);
            Object.defineProperty(errorResponse, "retryAfterInMilliseconds", {
                get: () => {
                    return errorResponse.retryAfterInMs;
                },
            });
        }
        throw errorResponse;
    }
    return {
        headers: responseHeaders,
        result,
        code: response.status,
        substatus,
    };
}
/**
 * @hidden
 */
async function request(requestContext, diagnosticNode) {
    if (requestContext.body) {
        requestContext.body = (0, request_js_1.bodyFromData)(requestContext.body);
        if (!requestContext.body) {
            throw new Error("parameter data must be a javascript object, string, or Buffer");
        }
    }
    return (0, diagnostics_js_1.addDiagnosticChild)(async (childNode) => {
        return RetryUtility.execute({
            diagnosticNode: childNode,
            requestContext,
            executeRequest,
        });
    }, diagnosticNode, DiagnosticNodeInternal_js_1.DiagnosticNodeType.REQUEST_ATTEMPTS);
}
exports.RequestHandler = {
    request,
};
//# sourceMappingURL=RequestHandler.js.map