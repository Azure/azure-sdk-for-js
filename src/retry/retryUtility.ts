import { RequestOptions } from "https";
import * as url from "url";
import { EndpointDiscoveryRetryPolicy, ResourceThrottleRetryPolicy, SessionRetryPolicy } from ".";
import { Constants, Helper, StatusCodes, SubStatusCodes } from "../common";
import { ConnectionPolicy } from "../documents";
import { GlobalEndpointManager } from "../globalEndpointManager";
import { Response } from "../request";
import { LocationRouting } from "../request/LocationRouting";
import { RequestContext } from "../request/RequestContext";
import { DefaultRetryPolicy } from "./defaultRetryPolicy";
import { IRetryPolicy } from "./IRetryPolicy";
import { RetryContext } from "./RetryContext";

/** @hidden */
export type CreateRequestObjectStubFunction = (
  connectionPolicy: ConnectionPolicy,
  requestOptions: RequestOptions,
  body: Buffer
) => Promise<Response<any>>; // TODO: any response

/** @hidden */
export class RetryUtility {
  /**
   * Executes the retry policy for the created request object.
   * @param {object} globalEndpointManager - an instance of GlobalEndpointManager class.
   * @param {object} body - request body. A buffer or a string.
   * @param {function} createRequestObjectStub - stub function that creates the request object.
   * @param {object} connectionPolicy - an instance of ConnectionPolicy that has the connection configs.
   * @param {RequestOptions} requestOptions - The request options.
   * @param {function} callback - the callback that will be called when the request is finished executing.
   */
  public static async execute(
    globalEndpointManager: GlobalEndpointManager,
    body: Buffer,
    createRequestObjectFunc: CreateRequestObjectStubFunction,
    connectionPolicy: ConnectionPolicy,
    requestOptions: RequestOptions,
    request: RequestContext
  ): Promise<Response<any>> {
    // TODO: any request
    const r: RequestContext = typeof request !== "string" ? request : { path: "", operationType: "nonReadOps" };

    const endpointDiscoveryRetryPolicy = new EndpointDiscoveryRetryPolicy(globalEndpointManager, r);
    const resourceThrottleRetryPolicy = new ResourceThrottleRetryPolicy(
      connectionPolicy.RetryOptions.MaxRetryAttemptCount,
      connectionPolicy.RetryOptions.FixedRetryIntervalInMilliseconds,
      connectionPolicy.RetryOptions.MaxWaitTimeInSeconds
    );
    const sessionReadRetryPolicy = new SessionRetryPolicy(globalEndpointManager, r, connectionPolicy);
    const defaultRetryPolicy = new DefaultRetryPolicy(request.operationType);

    return this.apply(
      body,
      createRequestObjectFunc,
      connectionPolicy,
      requestOptions,
      endpointDiscoveryRetryPolicy,
      resourceThrottleRetryPolicy,
      sessionReadRetryPolicy,
      defaultRetryPolicy,
      globalEndpointManager,
      request,
      {}
    );
  }

  /**
   * Applies the retry policy for the created request object.
   * @param {object} body - request body. A buffer or a string.
   * @param {function} createRequestObjectFunc - function that creates the request object.
   * @param {object} connectionPolicy - an instance of ConnectionPolicy that has the connection configs.
   * @param {RequestOptions} requestOptions - The request options.
   * @param {EndpointDiscoveryRetryPolicy} endpointDiscoveryRetryPolicy - The endpoint discovery retry policy \
   * instance.
   * @param {ResourceThrottleRetryPolicy} resourceThrottleRetryPolicy - The resource throttle retry policy instance.
   * @param {function} callback - the callback that will be called when the response is retrieved and processed.
   */
  public static async apply(
    body: Buffer,
    createRequestObjectFunc: CreateRequestObjectStubFunction,
    connectionPolicy: ConnectionPolicy,
    requestOptions: RequestOptions,
    endpointDiscoveryRetryPolicy: EndpointDiscoveryRetryPolicy,
    resourceThrottleRetryPolicy: ResourceThrottleRetryPolicy,
    sessionReadRetryPolicy: SessionRetryPolicy,
    defaultRetryPolicy: DefaultRetryPolicy,
    globalEndpointManager: GlobalEndpointManager,
    request: RequestContext,
    retryContext: RetryContext
  ): Promise<Response<any>> {
    // TODO: any response
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
    requestOptions = this.modifyRequestOptions(requestOptions, url.parse(locationEndpoint));
    request.locationRouting.routeToLocation(locationEndpoint);
    try {
      const { result, headers } = await (httpsRequest as Promise<Response<any>>);
      headers[Constants.ThrottleRetryCount] = resourceThrottleRetryPolicy.currentRetryAttemptCount;
      headers[Constants.ThrottleRetryWaitTimeInMs] = resourceThrottleRetryPolicy.cummulativeWaitTimeinMilliseconds;
      return { result, headers };
    } catch (err) {
      // TODO: any error
      let retryPolicy: IRetryPolicy = null;
      const headers = err.headers || {};
      if (err.code === StatusCodes.Forbidden && err.substatus === SubStatusCodes.WriteForbidden) {
        retryPolicy = endpointDiscoveryRetryPolicy;
      } else if (err.code === StatusCodes.TooManyRequests) {
        retryPolicy = resourceThrottleRetryPolicy;
      } else if (err.code === StatusCodes.NotFound && err.substatus === SubStatusCodes.ReadSessionNotAvailable) {
        retryPolicy = sessionReadRetryPolicy;
      } else {
        retryPolicy = defaultRetryPolicy;
      }
      const results = await retryPolicy.shouldRetry(err, retryContext);
      if (!results) {
        headers[Constants.ThrottleRetryCount] = resourceThrottleRetryPolicy.currentRetryAttemptCount;
        headers[Constants.ThrottleRetryWaitTimeInMs] = resourceThrottleRetryPolicy.cummulativeWaitTimeinMilliseconds;
        err.headers = { ...err.headers, ...headers };
        throw err;
      } else {
        request.retryCount++;
        const newUrl = (results as any)[1]; // TODO: any hack
        await Helper.sleep(retryPolicy.retryAfterInMilliseconds);
        return this.apply(
          body,
          createRequestObjectFunc,
          connectionPolicy,
          requestOptions,
          endpointDiscoveryRetryPolicy,
          resourceThrottleRetryPolicy,
          sessionReadRetryPolicy,
          defaultRetryPolicy,
          globalEndpointManager,
          request,
          retryContext
        );
      }
    }
  }

  private static modifyRequestOptions(
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
}
