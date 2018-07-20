import { WriteStream } from "fs";
import { RequestOptions } from "https";
import { Stream } from "stream";
import * as url from "url";
import { EndpointDiscoveryRetryPolicy, ResourceThrottleRetryPolicy, SessionReadRetryPolicy } from ".";
import { Constants, StatusCodes, SubStatusCodes } from "../common";
import { ConnectionPolicy } from "../documents";
import { GlobalEndpointManager } from "../globalEndpointManager";
import { IHeaders } from "../queryExecutionContext";
import { ErrorResponse, Response } from "../request";
import { DefaultRetryPolicy } from "./defaultRetryPolicy";

/** @hidden */
export interface Body {
  buffer?: Buffer;
  stream?: Stream;
}

/** @hidden */
export type CreateRequestObjectStubFunction = (
  connectionPolicy: ConnectionPolicy,
  requestOptions: RequestOptions,
  body: Body
) => Promise<Response<any>>; // TODO: any response

/** @hidden */
export class RetryUtility {
  /**
   * Executes the retry policy for the created request object.
   * @param {object} globalEndpointManager - an instance of GlobalEndpointManager class.
   * @param {object} body - a dictionary containing 'buffer' and 'stream' keys to hold corresponding buffer or\
   *  stream body, null otherwise.
   * @param {function} createRequestObjectStub - stub function that creates the request object.
   * @param {object} connectionPolicy - an instance of ConnectionPolicy that has the connection configs.
   * @param {RequestOptions} requestOptions - The request options.
   * @param {function} callback - the callback that will be called when the request is finished executing.
   */
  public static async execute(
    globalEndpointManager: GlobalEndpointManager,
    body: Body,
    createRequestObjectFunc: CreateRequestObjectStubFunction,
    connectionPolicy: ConnectionPolicy,
    requestOptions: RequestOptions,
    request: any
  ): Promise<Response<any>> {
    // TODO: any request
    const r = typeof request !== "string" ? request : { path: "", operationType: "nonReadOps", client: null };

    const endpointDiscoveryRetryPolicy = new EndpointDiscoveryRetryPolicy(globalEndpointManager);
    const resourceThrottleRetryPolicy = new ResourceThrottleRetryPolicy(
      connectionPolicy.RetryOptions.MaxRetryAttemptCount,
      connectionPolicy.RetryOptions.FixedRetryIntervalInMilliseconds,
      connectionPolicy.RetryOptions.MaxWaitTimeInSeconds
    );
    const sessionReadRetryPolicy = new SessionReadRetryPolicy(globalEndpointManager, r);
    const defaultRetryPolicy = new DefaultRetryPolicy(request.operationType);

    return this.apply(
      body,
      createRequestObjectFunc,
      connectionPolicy,
      requestOptions,
      endpointDiscoveryRetryPolicy,
      resourceThrottleRetryPolicy,
      sessionReadRetryPolicy,
      defaultRetryPolicy
    );
  }

  /**
   * Applies the retry policy for the created request object.
   * @param {object} body - a dictionary containing 'buffer' and 'stream' keys to hold corresponding buffer or \
   * stream body, null otherwise.
   * @param {function} createRequestObjectFunc - function that creates the request object.
   * @param {object} connectionPolicy - an instance of ConnectionPolicy that has the connection configs.
   * @param {RequestOptions} requestOptions - The request options.
   * @param {EndpointDiscoveryRetryPolicy} endpointDiscoveryRetryPolicy - The endpoint discovery retry policy \
   * instance.
   * @param {ResourceThrottleRetryPolicy} resourceThrottleRetryPolicy - The resource throttle retry policy instance.
   * @param {function} callback - the callback that will be called when the response is retrieved and processed.
   */
  public static async apply(
    body: Body,
    createRequestObjectFunc: CreateRequestObjectStubFunction,
    connectionPolicy: ConnectionPolicy,
    requestOptions: RequestOptions,
    endpointDiscoveryRetryPolicy: EndpointDiscoveryRetryPolicy,
    resourceThrottleRetryPolicy: ResourceThrottleRetryPolicy,
    sessionReadRetryPolicy: SessionReadRetryPolicy,
    defaultRetryPolicy: DefaultRetryPolicy
  ): Promise<Response<any>> {
    // TODO: any response
    const httpsRequest = createRequestObjectFunc(connectionPolicy, requestOptions, body);

    try {
      const { result, headers } = await (httpsRequest as Promise<Response<any>>);
      headers[Constants.ThrottleRetryCount] = resourceThrottleRetryPolicy.currentRetryAttemptCount;
      headers[Constants.ThrottleRetryWaitTimeInMs] = resourceThrottleRetryPolicy.cummulativeWaitTimeinMilliseconds;
      return { result, headers };
    } catch (err) {
      // TODO: any error
      let retryPolicy:
        | SessionReadRetryPolicy
        | EndpointDiscoveryRetryPolicy
        | ResourceThrottleRetryPolicy
        | DefaultRetryPolicy = null; // TODO: any Need an interface
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
      const results = await retryPolicy.shouldRetry(err);
      if (!results) {
        headers[Constants.ThrottleRetryCount] = resourceThrottleRetryPolicy.currentRetryAttemptCount;
        headers[Constants.ThrottleRetryWaitTimeInMs] = resourceThrottleRetryPolicy.cummulativeWaitTimeinMilliseconds;
        err.headers = { ...err.headers, ...headers };
        throw err;
      } else {
        const newUrl = (results as any)[1]; // TODO: any hack
        return new Promise<Response<any>>((resolve, reject) => {
          setTimeout(async () => {
            if (typeof newUrl !== "undefined") {
              requestOptions = this.modifyRequestOptions(requestOptions, newUrl);
            }
            resolve(
              await this.apply(
                body,
                createRequestObjectFunc,
                connectionPolicy,
                requestOptions,
                endpointDiscoveryRetryPolicy,
                resourceThrottleRetryPolicy,
                sessionReadRetryPolicy,
                defaultRetryPolicy
              )
            );
          }, retryPolicy.retryAfterInMilliseconds);
        });
      }
    }
  }

  public static modifyRequestOptions(
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
