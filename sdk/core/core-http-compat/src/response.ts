// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { FullOperationResponse } from "@azure/core-client";
import { PipelineResponse, createHttpHeaders } from "@azure/core-rest-pipeline";
import {
  HttpHeadersLike,
  WebResourceLike,
  toHttpHeadersLike,
  toPipelineRequest,
  toWebResourceLike,
} from "./util.js";
/**
 * Http Response that is compatible with the core-v1(core-http).
 */
export interface CompatResponse extends Omit<FullOperationResponse, "request" | "headers"> {
  /**
   * A description of a HTTP request to be made to a remote server.
   */
  request: WebResourceLike;
  /**
   * A collection of HTTP header key/value pairs.
   */
  headers: HttpHeadersLike;
}

const originalResponse = Symbol("Original FullOperationResponse");
type ExtendedCompatResponse = CompatResponse & { [originalResponse]?: FullOperationResponse };

/**
 * A helper to convert response objects from the new pipeline back to the old one.
 * @param response - A response object from core-client.
 * @returns A response compatible with `HttpOperationResponse` from core-http.
 */
export function toCompatResponse(
  response: FullOperationResponse,
  options?: { createProxy?: boolean },
): CompatResponse {
  let request = toWebResourceLike(response.request);
  let headers = toHttpHeadersLike(response.headers);
  if (options?.createProxy) {
    return new Proxy(response, {
      get(target, prop, receiver) {
        if (prop === "headers") {
          return headers;
        } else if (prop === "request") {
          return request;
        } else if (prop === originalResponse) {
          return response;
        }
        return Reflect.get(target, prop, receiver);
      },
      set(target, prop, value, receiver) {
        if (prop === "headers") {
          headers = value;
        } else if (prop === "request") {
          request = value;
        }
        return Reflect.set(target, prop, value, receiver);
      },
    }) as unknown as CompatResponse;
  } else {
    return {
      ...response,
      request,
      headers,
    };
  }
}

/**
 * A helper to convert back to a PipelineResponse
 * @param compatResponse - A response compatible with `HttpOperationResponse` from core-http.
 */
export function toPipelineResponse(compatResponse: CompatResponse): PipelineResponse {
  const extendedCompatResponse = compatResponse as ExtendedCompatResponse;
  const response = extendedCompatResponse[originalResponse];
  const headers = createHttpHeaders(compatResponse.headers.toJson({ preserveCase: true }));
  if (response) {
    response.headers = headers;
    return response;
  } else {
    return {
      ...compatResponse,
      headers,
      request: toPipelineRequest(compatResponse.request),
    };
  }
}
