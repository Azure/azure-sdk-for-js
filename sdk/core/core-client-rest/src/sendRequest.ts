// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createHttpHeaders,
  createPipelineRequest,
  HttpMethods,
  Pipeline,
  RawHttpHeaders,
} from "@azure/core-rest-pipeline";
import { getCachedDefaultHttpsClient } from "./clientHelpers";
import { RequestParameters } from "./pathClientTypes";
import { HttpResponse } from "./common";

/**
 * Helper function to send request used by the client
 * @param method - method to use to send the request
 * @param url - url to send the request to
 * @param pipeline - pipeline with the policies to run when sending the request
 * @param options - request options
 * @returns returns and HttpResponse
 */
export async function sendRequest(
  method: HttpMethods,
  url: string,
  pipeline: Pipeline,
  options: RequestParameters = {}
): Promise<HttpResponse> {
  const httpClient = getCachedDefaultHttpsClient();

  const body = options.body !== undefined ? JSON.stringify(options.body) : undefined;

  const headers = createHttpHeaders({
    accept: options.accept ?? "application/json",
    ...(body !== undefined && {
      "content-type": options.contentType ?? getContentType(options.body),
    }),
    ...(options.headers ? options.headers : {}),
  });

  const request = createPipelineRequest({
    url,
    method,
    body,
    headers,
    allowInsecureConnection: options.allowInsecureConnection,
  });

  const result = await pipeline.sendRequest(httpClient, request);
  const rawHeaders: RawHttpHeaders = result.headers.toJSON();

  let parsedBody = undefined;

  try {
    parsedBody = result.bodyAsText ? JSON.parse(result.bodyAsText) : undefined;
  } catch {
    parsedBody = undefined;
  }

  return {
    request,
    headers: rawHeaders,
    status: `${result.status}`,
    body: parsedBody,
  };
}

/**
 * Function to determine the content-type of a body
 * this is used if an explicit content-type is not provided
 * @param body - body in the request
 * @returns returns the content-type
 */
function getContentType(body: any): string {
  if (ArrayBuffer.isView(body)) {
    return "application/octet-stream";
  }

  // By default return json
  return "application/json; charset=UTF-8";
}
