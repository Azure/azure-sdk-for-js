// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createHttpHeaders,
  createPipelineRequest,
  FormDataMap,
  HttpMethods,
  Pipeline,
  PipelineRequest,
  PipelineResponse,
  RawHttpHeaders,
  RequestBodyType,
  RestError,
} from "@azure/core-rest-pipeline";
import { getCachedDefaultHttpsClient } from "./clientHelpers";
import { HttpResponse, RequestParameters } from "./common";

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
  const request = buildPipelineRequest(method, url, options);
  const response = await pipeline.sendRequest(httpClient, request);
  const rawHeaders: RawHttpHeaders = response.headers.toJSON();

  const parsedBody: RequestBodyType | undefined = getResponseBody(response);

  return {
    request,
    headers: rawHeaders,
    status: `${response.status}`,
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

export interface InternalRequestParameters extends RequestParameters {
  responseAsStream?: boolean;
}

function buildPipelineRequest(
  method: HttpMethods,
  url: string,
  options: InternalRequestParameters = {}
): PipelineRequest {
  const { body, formData } = getRequestBody(options.body, options.contentType);
  const hasContent = body !== undefined || formData !== undefined;

  const headers = createHttpHeaders({
    ...(options.headers ? options.headers : {}),
    accept: options.accept ?? "application/json",
    ...(hasContent && {
      "content-type": options.contentType ?? getContentType(options.body),
    }),
  });

  return createPipelineRequest({
    url,
    method,
    body,
    formData,
    headers,
    allowInsecureConnection: options.allowInsecureConnection,
  });
}

interface RequestBody {
  body?: RequestBodyType;
  formData?: FormDataMap;
}

/**
 * Prepares the body before sending the request
 */
function getRequestBody(body?: unknown, contentType: string = "application/json"): RequestBody {
  if (body === undefined) {
    return { body: undefined };
  }

  const firstType = contentType.split(";")[0];

  switch (firstType) {
    case "multipart/form-data":
      return isFormData(body) ? { formData: body } : { body: JSON.stringify(body) };
    case "text/plain":
      return { body: String(body) };
    default:
      return { body: JSON.stringify(body) };
  }
}

function isFormData(body: unknown): body is FormDataMap {
  return body instanceof Object && Object.keys(body).length > 0;
}

/**
 * Prepares the response body
 */
function getResponseBody(response: PipelineResponse): RequestBodyType | undefined {
  // Set the default response type
  const contentType = response.headers.get("content-type") ?? "";
  const firstType = contentType.split(";")[0];
  const bodyToParse: string = response.bodyAsText ?? "";

  if (firstType === "text/plain") {
    return String(bodyToParse);
  }

  // Default to "application/json" and fallback to string;
  try {
    return bodyToParse ? JSON.parse(bodyToParse) : undefined;
  } catch (error) {
    // If we were supposed to get a JSON object and failed to
    // parse, throw a parse error
    if (firstType === "application/json") {
      throw createParseError(response, error);
    }

    // We are not sure how to handle the response so we return it as
    // plain text.
    return String(bodyToParse);
  }
}

function createParseError(response: PipelineResponse, err: any): RestError {
  const msg = `Error "${err}" occurred while parsing the response body - ${response.bodyAsText}.`;
  const errCode = err.code ?? RestError.PARSE_ERROR;
  return new RestError(msg, {
    code: errCode,
    statusCode: response.status,
    request: response.request,
    response: response,
  });
}
