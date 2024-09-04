// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Constants } from "../common/constants";
import { sleep } from "../common/helper";
import { StatusCodes, SubStatusCodes } from "../common/statusCodes";
import { DiagnosticNodeInternal, DiagnosticNodeType } from "../diagnostics/DiagnosticNodeInternal";
import { Response } from "../request";
import { RequestContext } from "../request/RequestContext";
import { TimeoutErrorCode } from "../request/TimeoutError";
import { addDignosticChild } from "../utils/diagnostics";
import { getCurrentTimestampInMs } from "../utils/time";
import { DefaultRetryPolicy } from "./defaultRetryPolicy";
import { EndpointDiscoveryRetryPolicy } from "./endpointDiscoveryRetryPolicy";
import { ResourceThrottleRetryPolicy } from "./resourceThrottleRetryPolicy";
import { RetryContext } from "./RetryContext";
import { RetryPolicy } from "./RetryPolicy";
import { SessionRetryPolicy } from "./sessionRetryPolicy";
import { TimeoutFailoverRetryPolicy } from "./timeoutFailoverRetryPolicy";

/**
 * @hidden
 */
interface ExecuteArgs {
  retryContext?: RetryContext;
  diagnosticNode: DiagnosticNodeInternal;
  retryPolicies?: RetryPolicies;
  requestContext: RequestContext;
  executeRequest: (
    diagnosticNode: DiagnosticNodeInternal,
    requestContext: RequestContext,
  ) => Promise<Response<any>>;
}

/**
 * @hidden
 */
interface RetryPolicies {
  endpointDiscoveryRetryPolicy: EndpointDiscoveryRetryPolicy;
  resourceThrottleRetryPolicy: ResourceThrottleRetryPolicy;
  sessionReadRetryPolicy: SessionRetryPolicy;
  defaultRetryPolicy: DefaultRetryPolicy;
  timeoutFailoverRetryPolicy: TimeoutFailoverRetryPolicy;
}

/**
 * @hidden
 */
export async function execute({
  diagnosticNode,
  retryContext = { retryCount: 0 },
  retryPolicies,
  requestContext,
  executeRequest,
}: ExecuteArgs): Promise<Response<any>> {
  // TODO: any response
  return addDignosticChild(
    async (localDiagnosticNode: DiagnosticNodeInternal) => {
      localDiagnosticNode.addData({ requestAttempNumber: retryContext.retryCount });
      if (!retryPolicies) {
        retryPolicies = {
          endpointDiscoveryRetryPolicy: new EndpointDiscoveryRetryPolicy(
            requestContext.globalEndpointManager,
            requestContext.operationType,
          ),
          resourceThrottleRetryPolicy: new ResourceThrottleRetryPolicy(
            requestContext.connectionPolicy.retryOptions.maxRetryAttemptCount,
            requestContext.connectionPolicy.retryOptions.fixedRetryIntervalInMilliseconds,
            requestContext.connectionPolicy.retryOptions.maxWaitTimeInSeconds,
          ),
          sessionReadRetryPolicy: new SessionRetryPolicy(
            requestContext.globalEndpointManager,
            requestContext.resourceType,
            requestContext.operationType,
            requestContext.connectionPolicy,
          ),
          defaultRetryPolicy: new DefaultRetryPolicy(requestContext.operationType),
          timeoutFailoverRetryPolicy: new TimeoutFailoverRetryPolicy(
            requestContext.globalEndpointManager,
            requestContext.headers,
            requestContext.method,
            requestContext.resourceType,
            requestContext.operationType,
            requestContext.connectionPolicy.enableEndpointDiscovery,
          ),
        };
      }
      if (retryContext && retryContext.clearSessionTokenNotAvailable) {
        requestContext.client.clearSessionToken(requestContext.path);
        delete requestContext.headers["x-ms-session-token"];
      }
      if (retryContext && retryContext.retryLocationServerIndex) {
        requestContext.endpoint = await requestContext.globalEndpointManager.resolveServiceEndpoint(
          localDiagnosticNode,
          requestContext.resourceType,
          requestContext.operationType,
          retryContext.retryLocationServerIndex,
        );
      } else {
        requestContext.endpoint = await requestContext.globalEndpointManager.resolveServiceEndpoint(
          localDiagnosticNode,
          requestContext.resourceType,
          requestContext.operationType,
        );
      }
      const startTimeUTCInMs = getCurrentTimestampInMs();
      const correlatedActivityId =
        requestContext.headers[Constants.HttpHeaders.CorrelatedActivityId];
      try {
        const response = await executeRequest(localDiagnosticNode, requestContext);
        response.headers[Constants.ThrottleRetryCount] =
          retryPolicies.resourceThrottleRetryPolicy.currentRetryAttemptCount;
        response.headers[Constants.ThrottleRetryWaitTimeInMs] =
          retryPolicies.resourceThrottleRetryPolicy.cummulativeWaitTimeinMs;
        if (correlatedActivityId) {
          response.headers[Constants.HttpHeaders.CorrelatedActivityId] = correlatedActivityId;
        }
        return response;
      } catch (err: any) {
        // TODO: any error
        let retryPolicy: RetryPolicy = null;
        const headers = err.headers || {};
        if (correlatedActivityId) {
          headers[Constants.HttpHeaders.CorrelatedActivityId] = correlatedActivityId;
        }
        if (
          err.code === StatusCodes.ENOTFOUND ||
          err.code === "REQUEST_SEND_ERROR" ||
          (err.code === StatusCodes.Forbidden &&
            (err.substatus === SubStatusCodes.DatabaseAccountNotFound ||
              err.substatus === SubStatusCodes.WriteForbidden))
        ) {
          retryPolicy = retryPolicies.endpointDiscoveryRetryPolicy;
        } else if (err.code === StatusCodes.TooManyRequests) {
          retryPolicy = retryPolicies.resourceThrottleRetryPolicy;
        } else if (
          err.code === StatusCodes.NotFound &&
          err.substatus === SubStatusCodes.ReadSessionNotAvailable
        ) {
          retryPolicy = retryPolicies.sessionReadRetryPolicy;
        } else if (err.code === StatusCodes.ServiceUnavailable || err.code === TimeoutErrorCode) {
          retryPolicy = retryPolicies.timeoutFailoverRetryPolicy;
        } else {
          retryPolicy = retryPolicies.defaultRetryPolicy;
        }
        const results = await retryPolicy.shouldRetry(
          err,
          localDiagnosticNode,
          retryContext,
          requestContext.endpoint,
        );
        if (!results) {
          headers[Constants.ThrottleRetryCount] =
            retryPolicies.resourceThrottleRetryPolicy.currentRetryAttemptCount;
          headers[Constants.ThrottleRetryWaitTimeInMs] =
            retryPolicies.resourceThrottleRetryPolicy.cummulativeWaitTimeinMs;
          err.headers = { ...err.headers, ...headers };
          throw err;
        } else {
          requestContext.retryCount++;
          const newUrl = (results as any)[1]; // TODO: any hack
          if (newUrl !== undefined) {
            requestContext.endpoint = newUrl;
          }
          localDiagnosticNode.recordFailedNetworkCall(
            startTimeUTCInMs,
            requestContext,
            retryContext.retryCount,
            err.code,
            err.subsstatusCode,
            headers,
          );
          await sleep(retryPolicy.retryAfterInMs);
          return execute({
            diagnosticNode,
            executeRequest,
            requestContext,
            retryContext,
            retryPolicies,
          });
        }
      }
    },
    diagnosticNode,
    DiagnosticNodeType.HTTP_REQUEST,
  );
}
