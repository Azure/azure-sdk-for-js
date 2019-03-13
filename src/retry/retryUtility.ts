import { RequestOptions } from "https";
import * as url from "url";
import { Constants } from "../common/constants";
import { sleep } from "../common/helper";
import { StatusCodes, SubStatusCodes } from "../common/statusCodes";
import { ConnectionPolicy } from "../documents/ConnectionPolicy";
import { GlobalEndpointManager } from "../globalEndpointManager";
import { Response } from "../request";
import { LocationRouting } from "../request/LocationRouting";
import { RequestContext } from "../request/RequestContext";
import { DefaultRetryPolicy } from "./defaultRetryPolicy";
import { EndpointDiscoveryRetryPolicy } from "./endpointDiscoveryRetryPolicy";
import { ResourceThrottleRetryPolicy } from "./resourceThrottleRetryPolicy";
import { RetryContext } from "./RetryContext";
import { RetryPolicy } from "./RetryPolicy";
import { SessionRetryPolicy } from "./sessionRetryPolicy";

/** @hidden */
export type CreateRequestObjectStubFunction = (
  connectionPolicy: ConnectionPolicy,
  requestOptions: RequestOptions,
  body: Buffer
) => Promise<Response<any>>; // TODO: any response

interface ExecuteArgs {
  globalEndpointManager: GlobalEndpointManager;
  body: Buffer;
  createRequestObjectFunc: CreateRequestObjectStubFunction;
  connectionPolicy: ConnectionPolicy;
  requestOptions: RequestOptions;
  request: RequestContext;
  retryContext?: RetryContext;
  retryPolicies?: RetryPolicies;
}

interface RetryPolicies {
  endpointDiscoveryRetryPolicy: EndpointDiscoveryRetryPolicy;
  resourceThrottleRetryPolicy: ResourceThrottleRetryPolicy;
  sessionReadRetryPolicy: SessionRetryPolicy;
  defaultRetryPolicy: DefaultRetryPolicy;
}

export async function execute({
  body,
  createRequestObjectFunc,
  connectionPolicy,
  requestOptions,
  globalEndpointManager,
  request,
  retryContext,
  retryPolicies
}: ExecuteArgs): Promise<Response<any>> {
  // TODO: any response

  if (!retryContext) {
    retryContext = {};
  }
  if (!retryPolicies) {
    retryPolicies = {
      endpointDiscoveryRetryPolicy: new EndpointDiscoveryRetryPolicy(globalEndpointManager, request.operationType),
      resourceThrottleRetryPolicy: new ResourceThrottleRetryPolicy(
        connectionPolicy.RetryOptions.MaxRetryAttemptCount,
        connectionPolicy.RetryOptions.FixedRetryIntervalInMilliseconds,
        connectionPolicy.RetryOptions.MaxWaitTimeInSeconds
      ),
      sessionReadRetryPolicy: new SessionRetryPolicy(
        globalEndpointManager,
        request.resourceType,
        request.operationType,
        connectionPolicy
      ),
      defaultRetryPolicy: new DefaultRetryPolicy(request.operationType)
    };
  }
  const httpsRequest = createRequestObjectFunc(connectionPolicy, requestOptions, body);
  if (!request.locationRouting) {
    request.locationRouting = new LocationRouting();
  }
  request.locationRouting.clearRouteToLocation();
  if (retryContext) {
    request.locationRouting.routeToLocation(
      retryContext.retryCount || 0,
      !retryContext.retryRequestOnPreferredLocations
    );
    if (retryContext.clearSessionTokenNotAvailable) {
      request.client.clearSessionToken(request.path);
    }
  }
  const locationEndpoint = await globalEndpointManager.resolveServiceEndpoint(request);
  requestOptions = modifyRequestOptions(requestOptions, url.parse(locationEndpoint));
  request.locationRouting.routeToLocation(locationEndpoint);
  try {
    const { result, headers } = await (httpsRequest as Promise<Response<any>>);
    headers[Constants.ThrottleRetryCount] = retryPolicies.resourceThrottleRetryPolicy.currentRetryAttemptCount;
    headers[Constants.ThrottleRetryWaitTimeInMs] =
      retryPolicies.resourceThrottleRetryPolicy.cummulativeWaitTimeinMilliseconds;
    return { result, headers };
  } catch (err) {
    // TODO: any error
    let retryPolicy: RetryPolicy = null;
    const headers = err.headers || {};
    if (err.code === StatusCodes.Forbidden && err.substatus === SubStatusCodes.WriteForbidden) {
      retryPolicy = retryPolicies.endpointDiscoveryRetryPolicy;
    } else if (err.code === StatusCodes.TooManyRequests) {
      retryPolicy = retryPolicies.resourceThrottleRetryPolicy;
    } else if (err.code === StatusCodes.NotFound && err.substatus === SubStatusCodes.ReadSessionNotAvailable) {
      retryPolicy = retryPolicies.sessionReadRetryPolicy;
    } else {
      retryPolicy = retryPolicies.defaultRetryPolicy;
    }
    const results = await retryPolicy.shouldRetry(err, retryContext);
    if (!results) {
      headers[Constants.ThrottleRetryCount] = retryPolicies.resourceThrottleRetryPolicy.currentRetryAttemptCount;
      headers[Constants.ThrottleRetryWaitTimeInMs] =
        retryPolicies.resourceThrottleRetryPolicy.cummulativeWaitTimeinMilliseconds;
      err.headers = { ...err.headers, ...headers };
      throw err;
    } else {
      request.retryCount++;
      const newUrl = (results as any)[1]; // TODO: any hack
      await sleep(retryPolicy.retryAfterInMilliseconds);
      return execute({
        body,
        createRequestObjectFunc,
        connectionPolicy,
        requestOptions,
        globalEndpointManager,
        request,
        retryContext,
        retryPolicies
      });
    }
  }
}

function modifyRequestOptions(
  oldRequestOptions: RequestOptions | any, // TODO: any hack is bad
  newUrl: url.UrlWithStringQuery | any
) {
  // TODO: any hack is bad
  const properties = Object.keys(newUrl);
  for (const index in properties) {
    if (properties[index] !== "path") {
      oldRequestOptions[properties[index]] = newUrl[properties[index]];
    }
  }
  return oldRequestOptions;
}
