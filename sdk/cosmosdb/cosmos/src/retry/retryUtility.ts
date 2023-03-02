// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Constants } from "../common/constants";
import { sleep } from "../common/helper";
import { StatusCodes, SubStatusCodes } from "../common/statusCodes";
import { Response } from "../request";
import { RequestContext } from "../request/RequestContext";
import { DefaultRetryPolicy } from "./defaultRetryPolicy";
import { EndpointDiscoveryRetryPolicy } from "./endpointDiscoveryRetryPolicy";
import { ResourceThrottleRetryPolicy } from "./resourceThrottleRetryPolicy";
import { RetryContext } from "./RetryContext";
import { RetryPolicy } from "./RetryPolicy";
import { SessionRetryPolicy } from "./sessionRetryPolicy";

/**
 * @hidden
 */
interface ExecuteArgs {
  retryContext?: RetryContext;
  retryPolicies?: RetryPolicies;
  requestContext: RequestContext;
  executeRequest: (requestContext: RequestContext) => Promise<Response<any>>;
}

/**
 * @hidden
 */
interface RetryPolicies {
  endpointDiscoveryRetryPolicy: EndpointDiscoveryRetryPolicy;
  resourceThrottleRetryPolicy: ResourceThrottleRetryPolicy;
  sessionReadRetryPolicy: SessionRetryPolicy;
  defaultRetryPolicy: DefaultRetryPolicy;
}

/**
 * @hidden
 */
export async function execute({
  retryContext = { retryCount: 0 },
  retryPolicies,
  requestContext,
  executeRequest,
}: ExecuteArgs): Promise<Response<any>> {
  // TODO: any response
  if (!retryPolicies) {
    retryPolicies = setupRetryPolicies(retryPolicies, requestContext);
  }
  if (retryContext && retryContext.clearSessionTokenNotAvailable) {
    requestContext.client.clearSessionToken(requestContext.path);
    delete requestContext.headers["x-ms-session-token"];
  }
  requestContext.endpoint = await requestContext.globalEndpointManager.resolveServiceEndpoint(
    requestContext.resourceType,
    requestContext.operationType
  );

  try {
    const response = await executeRequest(requestContext);
    response.headers[Constants.ThrottleRetryCount] =
      retryPolicies.resourceThrottleRetryPolicy.currentRetryAttemptCount;
    response.headers[Constants.ThrottleRetryWaitTimeInMs] =
      retryPolicies.resourceThrottleRetryPolicy.cummulativeWaitTimeinMs;
    return response;
  } catch (err: any) {
    // TODO: any error
    const headers = err.headers || {};
    const retryPolicy: RetryPolicy = selectRetryPolicy(err, retryPolicies);
    const results = await retryPolicy.shouldRetry(err, retryContext, requestContext.endpoint);
    if (!results) {
      headers[Constants.ThrottleRetryCount] =
        retryPolicies.resourceThrottleRetryPolicy.currentRetryAttemptCount;
      headers[Constants.ThrottleRetryWaitTimeInMs] =
        retryPolicies.resourceThrottleRetryPolicy.cummulativeWaitTimeinMs;
      err.headers = { ...err.headers, ...headers };
      err.diagnostics = requestContext.diagnosticContext.getDiagnostics();
      throw err;
    } else {
      await sleep(retryPolicy.retryAfterInMs);
      requestContext.retryCount++;
      requestContext.diagnosticContext.recordFailedAttempt(err.code);
      return execute({
        executeRequest,
        requestContext,
        retryContext,
        retryPolicies,
      });
    }
  }
}

function setupRetryPolicies(retryPolicies: RetryPolicies, requestContext: RequestContext) {
  retryPolicies = {
    endpointDiscoveryRetryPolicy: new EndpointDiscoveryRetryPolicy(
      requestContext.globalEndpointManager,
      requestContext.operationType
    ),
    resourceThrottleRetryPolicy: new ResourceThrottleRetryPolicy(
      requestContext.connectionPolicy.retryOptions.maxRetryAttemptCount,
      requestContext.connectionPolicy.retryOptions.fixedRetryIntervalInMilliseconds,
      requestContext.connectionPolicy.retryOptions.maxWaitTimeInSeconds
    ),
    sessionReadRetryPolicy: new SessionRetryPolicy(
      requestContext.globalEndpointManager,
      requestContext.resourceType,
      requestContext.operationType,
      requestContext.connectionPolicy
    ),
    defaultRetryPolicy: new DefaultRetryPolicy(requestContext.operationType),
  };
  return retryPolicies;
}

function selectRetryPolicy(err: any, retryPolicies: RetryPolicies) {
  let retryPolicy: RetryPolicy;
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
  } else {
    retryPolicy = retryPolicies.defaultRetryPolicy;
  }
  return retryPolicy;
}
