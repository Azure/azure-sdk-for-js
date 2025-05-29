"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const constants_js_1 = require("../common/constants.js");
const helper_js_1 = require("../common/helper.js");
const statusCodes_js_1 = require("../common/statusCodes.js");
const DiagnosticNodeInternal_js_1 = require("../diagnostics/DiagnosticNodeInternal.js");
const TimeoutError_js_1 = require("../request/TimeoutError.js");
const diagnostics_js_1 = require("../utils/diagnostics.js");
const time_js_1 = require("../utils/time.js");
const defaultRetryPolicy_js_1 = require("./defaultRetryPolicy.js");
const endpointDiscoveryRetryPolicy_js_1 = require("./endpointDiscoveryRetryPolicy.js");
const resourceThrottleRetryPolicy_js_1 = require("./resourceThrottleRetryPolicy.js");
const sessionRetryPolicy_js_1 = require("./sessionRetryPolicy.js");
const timeoutFailoverRetryPolicy_js_1 = require("./timeoutFailoverRetryPolicy.js");
/**
 * @hidden
 */
async function execute({ diagnosticNode, retryContext = { retryCount: 0 }, retryPolicies, requestContext, executeRequest, }) {
    // TODO: any response
    return (0, diagnostics_js_1.addDiagnosticChild)(async (localDiagnosticNode) => {
        var _a;
        localDiagnosticNode.addData({ requestAttempNumber: retryContext.retryCount });
        if (!retryPolicies) {
            retryPolicies = {
                endpointDiscoveryRetryPolicy: new endpointDiscoveryRetryPolicy_js_1.EndpointDiscoveryRetryPolicy(requestContext.globalEndpointManager, requestContext.operationType),
                resourceThrottleRetryPolicy: new resourceThrottleRetryPolicy_js_1.ResourceThrottleRetryPolicy((_a = requestContext.connectionPolicy.retryOptions) !== null && _a !== void 0 ? _a : {}),
                sessionReadRetryPolicy: new sessionRetryPolicy_js_1.SessionRetryPolicy(requestContext.globalEndpointManager, requestContext.resourceType, requestContext.operationType, requestContext.connectionPolicy),
                defaultRetryPolicy: new defaultRetryPolicy_js_1.DefaultRetryPolicy(requestContext.operationType),
                timeoutFailoverRetryPolicy: new timeoutFailoverRetryPolicy_js_1.TimeoutFailoverRetryPolicy(requestContext.globalEndpointManager, requestContext.headers, requestContext.method, requestContext.resourceType, requestContext.operationType, requestContext.connectionPolicy.enableEndpointDiscovery),
            };
        }
        if (retryContext && retryContext.clearSessionTokenNotAvailable) {
            requestContext.client.clearSessionToken(requestContext.path);
            delete requestContext.headers["x-ms-session-token"];
        }
        if (retryContext && retryContext.retryLocationServerIndex) {
            requestContext.endpoint = await requestContext.globalEndpointManager.resolveServiceEndpoint(localDiagnosticNode, requestContext.resourceType, requestContext.operationType, retryContext.retryLocationServerIndex);
        }
        else {
            requestContext.endpoint = await requestContext.globalEndpointManager.resolveServiceEndpoint(localDiagnosticNode, requestContext.resourceType, requestContext.operationType);
        }
        const startTimeUTCInMs = (0, time_js_1.getCurrentTimestampInMs)();
        const correlatedActivityId = requestContext.headers[constants_js_1.Constants.HttpHeaders.CorrelatedActivityId];
        try {
            const response = await executeRequest(localDiagnosticNode, requestContext);
            response.headers[constants_js_1.Constants.ThrottleRetryCount] =
                retryPolicies.resourceThrottleRetryPolicy.currentRetryAttemptCount;
            response.headers[constants_js_1.Constants.ThrottleRetryWaitTimeInMs] =
                retryPolicies.resourceThrottleRetryPolicy.cummulativeWaitTimeinMs;
            if (correlatedActivityId) {
                response.headers[constants_js_1.Constants.HttpHeaders.CorrelatedActivityId] = correlatedActivityId;
            }
            return response;
        }
        catch (err) {
            // TODO: any error
            let retryPolicy = null;
            const headers = err.headers || {};
            if (correlatedActivityId) {
                headers[constants_js_1.Constants.HttpHeaders.CorrelatedActivityId] = correlatedActivityId;
            }
            if (err.code === statusCodes_js_1.StatusCodes.ENOTFOUND ||
                err.code === "REQUEST_SEND_ERROR" ||
                (err.code === statusCodes_js_1.StatusCodes.Forbidden &&
                    (err.substatus === statusCodes_js_1.SubStatusCodes.DatabaseAccountNotFound ||
                        err.substatus === statusCodes_js_1.SubStatusCodes.WriteForbidden))) {
                retryPolicy = retryPolicies.endpointDiscoveryRetryPolicy;
            }
            else if (err.code === statusCodes_js_1.StatusCodes.TooManyRequests && !isBulkRequest(requestContext)) {
                retryPolicy = retryPolicies.resourceThrottleRetryPolicy;
            }
            else if (err.code === statusCodes_js_1.StatusCodes.NotFound &&
                err.substatus === statusCodes_js_1.SubStatusCodes.ReadSessionNotAvailable) {
                retryPolicy = retryPolicies.sessionReadRetryPolicy;
            }
            else if (err.code === statusCodes_js_1.StatusCodes.ServiceUnavailable || err.code === TimeoutError_js_1.TimeoutErrorCode) {
                retryPolicy = retryPolicies.timeoutFailoverRetryPolicy;
            }
            else {
                retryPolicy = retryPolicies.defaultRetryPolicy;
            }
            const results = await retryPolicy.shouldRetry(err, localDiagnosticNode, retryContext, requestContext.endpoint);
            if (!results) {
                headers[constants_js_1.Constants.ThrottleRetryCount] =
                    retryPolicies.resourceThrottleRetryPolicy.currentRetryAttemptCount;
                headers[constants_js_1.Constants.ThrottleRetryWaitTimeInMs] =
                    retryPolicies.resourceThrottleRetryPolicy.cummulativeWaitTimeinMs;
                err.headers = Object.assign(Object.assign({}, err.headers), headers);
                throw err;
            }
            else {
                requestContext.retryCount++;
                const newUrl = results[1]; // TODO: any hack
                if (newUrl !== undefined) {
                    requestContext.endpoint = newUrl;
                }
                localDiagnosticNode.recordFailedNetworkCall(startTimeUTCInMs, requestContext, retryContext.retryCount, err.code, err.subsstatusCode, headers);
                await (0, helper_js_1.sleep)(retryPolicy.retryAfterInMs);
                return execute({
                    diagnosticNode,
                    executeRequest,
                    requestContext,
                    retryContext,
                    retryPolicies,
                });
            }
        }
    }, diagnosticNode, DiagnosticNodeInternal_js_1.DiagnosticNodeType.HTTP_REQUEST);
}
/**
 * @hidden
 */
function isBulkRequest(requestContext) {
    return (requestContext.operationType === "batch" &&
        !requestContext.headers[constants_js_1.Constants.HttpHeaders.IsBatchAtomic]);
}
//# sourceMappingURL=retryUtility.js.map