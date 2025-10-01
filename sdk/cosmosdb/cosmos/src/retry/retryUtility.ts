// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Constants } from "../common/constants.js";
import { sleep } from "../common/helper.js";
import { StatusCodes, SubStatusCodes } from "../common/statusCodes.js";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import { DiagnosticNodeType } from "../diagnostics/DiagnosticNodeInternal.js";
import type { Response } from "../request/index.js";
import type { RequestContext } from "../request/RequestContext.js";
import { TimeoutErrorCode } from "../request/TimeoutError.js";
import { addDiagnosticChild } from "../utils/diagnostics.js";
import { getCurrentTimestampInMs } from "../utils/time.js";
import { DefaultRetryPolicy } from "./defaultRetryPolicy.js";
import { EndpointDiscoveryRetryPolicy } from "./endpointDiscoveryRetryPolicy.js";
import { ResourceThrottleRetryPolicy } from "./resourceThrottleRetryPolicy.js";
import type { RetryContext } from "./RetryContext.js";
import type { RetryPolicy } from "./RetryPolicy.js";
import { SessionRetryPolicy } from "./sessionRetryPolicy.js";
import { TimeoutFailoverRetryPolicy } from "./timeoutFailoverRetryPolicy.js";

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
  return addDiagnosticChild(
    async (localDiagnosticNode: DiagnosticNodeInternal) => {
      localDiagnosticNode.addData({ requestAttempNumber: retryContext.retryCount });
      if (!retryPolicies) {
        retryPolicies = {
          endpointDiscoveryRetryPolicy: new EndpointDiscoveryRetryPolicy(
            requestContext.globalEndpointManager,
            requestContext.resourceType,
            requestContext.operationType,
            requestContext.globalPartitionEndpointManager,
          ),
          resourceThrottleRetryPolicy: new ResourceThrottleRetryPolicy(
            requestContext.connectionPolicy.retryOptions ?? {},
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
            requestContext.connectionPolicy.enablePartitionLevelFailover,
            requestContext.globalPartitionEndpointManager,
          ),
        };
      }
      if (retryContext && retryContext.clearSessionTokenNotAvailable) {
        requestContext.client.clearSessionToken(requestContext.path);
        delete requestContext.headers["x-ms-session-token"];
      }
      if (retryContext && retryContext.retryLocationServerIndex) {
        requestContext.endpoint =
          await requestContext.globalEndpointManager.resolveServiceEndpointInternal({
            diagnosticNode: localDiagnosticNode,
            resourceType: requestContext.resourceType,
            operationType: requestContext.operationType,
            startServiceEndpointIndex: retryContext.retryLocationServerIndex,
            excludedLocations: requestContext.options?.excludedLocations,
          });
      } else {
        requestContext.endpoint =
          await requestContext.globalEndpointManager.resolveServiceEndpointInternal({
            diagnosticNode: localDiagnosticNode,
            resourceType: requestContext.resourceType,
            operationType: requestContext.operationType,
            startServiceEndpointIndex: 0,
            excludedLocations: requestContext.options?.excludedLocations,
          });
      }
      const startTimeUTCInMs = getCurrentTimestampInMs();
      const correlatedActivityId =
        requestContext.headers[Constants.HttpHeaders.CorrelatedActivityId];

      if (requestContext.globalPartitionEndpointManager) {
        // Try partition level location override
        // This is used to override the partition level location for the request
        // if there has been a partition level failover
        requestContext =
          await requestContext.globalPartitionEndpointManager.tryAddPartitionLevelLocationOverride(
            requestContext,
            localDiagnosticNode,
          );
      }

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
        } else if (err.code === StatusCodes.TooManyRequests && !isBulkRequest(requestContext)) {
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
          requestContext,
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

/**
 * @hidden
 */
function isBulkRequest(requestContext: RequestContext): boolean {
  return (
    requestContext.operationType === "batch" &&
    !requestContext.headers[Constants.HttpHeaders.IsBatchAtomic]
  );
}
