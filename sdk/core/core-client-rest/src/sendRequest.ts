// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  FormDataMap,
  HttpClient,
  HttpMethods,
  Pipeline,
  PipelineRequest,
  PipelineResponse,
  RequestBodyType,
  RestError,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import { getCachedDefaultHttpsClient } from "./clientHelpers";
import { isReadableStream } from "./helpers/isReadableStream";
import { HttpResponse, RequestParameters, ResponseBodyType } from "./common";
import { binaryArrayToString } from "./helpers/getBinaryBody";

/**
 * Helper function to send request used by the client
 * @param method - method to use to send the request
 * @param url - url to send the request to
 * @param pipeline - pipeline with the policies to run when sending the request
 * @param options - request options
 * @param customHttpClient - a custom HttpClient to use when making the request
 * @returns returns and HttpResponse
 */
export async function sendRequest(
  method: HttpMethods,
  url: string,
  pipeline: Pipeline,
  options: InternalRequestParameters = {},
  customHttpClient?: HttpClient
): Promise<HttpResponse> {
  const httpClient = customHttpClient ?? getCachedDefaultHttpsClient();
  const request = buildPipelineRequest(method, url, options);
  const response = await pipeline.sendRequest(httpClient, request);
  const headers = response.headers.toJSON();
  const stream = response.readableStreamBody ?? response.browserStreamBody;
  const parsedBody = await getResponseBody(response);
  const body = options.responseAsStream || stream !== undefined ? stream : parsedBody;

  if (options?.onResponse) {
    options.onResponse({ ...response, request, rawHeaders: headers, parsedBody });
  }

  return {
    request,
    headers,
    status: `${response.status}`,
    body,
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
    tracingOptions: options.tracingOptions,
    abortSignal: options.abortSignal,
    onUploadProgress: options.onUploadProgress,
    onDownloadProgress: options.onDownloadProgress,
    timeout: options.timeout,
    enableBrowserStreams: true,
    streamResponseStatusCodes: options.responseAsStream
      ? new Set([Number.POSITIVE_INFINITY])
      : undefined,
  });
}

interface RequestBody {
  body?: RequestBodyType;
  formData?: FormDataMap;
}

/**
 * Prepares the body before sending the request
 */
function getRequestBody(body?: unknown, contentType: string = ""): RequestBody {
  if (body === undefined) {
    return { body: undefined };
  }

  if (isReadableStream(body)) {
    return { body };
  }

  if (!contentType && typeof body === "string") {
    return { body };
  }

  const firstType = contentType.split(";")[0];

  if (firstType === "application/json") {
    return { body: JSON.stringify(body) };
  }

  if (ArrayBuffer.isView(body)) {
    if (body instanceof Uint8Array) {
      return { body: binaryArrayToString(body) };
    } else {
      return { body: JSON.stringify(body) };
    }
  }

  switch (firstType) {
    case "multipart/form-data":
      return isFormData(body)
        ? { formData: processFormData(body) }
        : { body: JSON.stringify(body) };
    case "text/plain":
      return { body: String(body) };
    default:
      if (typeof body === "string") {
        return { body };
      }
      return { body: JSON.stringify(body) };
  }
}

function isFormData(body: unknown): body is FormDataMap {
  return body instanceof Object && Object.keys(body).length > 0;
}

/**
 * Checks if binary data is in Uint8Array format, if so decode it to a binary string
 * to send over the wire
 */
function processFormData(formData?: FormDataMap): FormDataMap | undefined {
  if (!formData) {
    return formData;
  }

  const processedFormData: FormDataMap = {};

  for (const element in formData) {
    const item = formData[element];
    if (item instanceof Uint8Array) {
      processedFormData[element] = binaryArrayToString(item);
    } else {
      processedFormData[element] = item;
    }
  }

  return processedFormData;
}

/**
 * Prepares the response body
 * @param response - The received response
 * @param asStream - The type to coerce the body as
 */
async function getResponseBody(response: PipelineResponse): Promise<ResponseBodyType> {
  // Set the default response type
  const contentType = response.headers.get("content-type") ?? "";
  const firstType = contentType.split(";")[0];
  const text = response.bodyAsText ?? "";

  if (firstType === "text/plain") {
    return String(text);
  }
  // Default to "application/json" and fallback to string;
  return tryParse(text, firstType !== "application/json", response);
}

function tryParse(
  bodyAsText: PipelineResponse["bodyAsText"],
  allowUnparsed: boolean,
  response: PipelineResponse
): ResponseBodyType {
  try {
    return bodyAsText ? JSON.parse(bodyAsText) : undefined;
  } catch (error) {
    // If we were supposed to get a JSON object and failed to
    // parse, throw a parse error
    if (!allowUnparsed) {
      throw createParseError(response, error);
    }

    // We are not sure how to handle the response so we return it as
    // plain text.
    return String(bodyAsText);
  }
}

function createParseError(response: PipelineResponse, err: any): RestError {
  const msg = `Error "${err}" occurred while parsing the response body - ${response.bodyAsText}.`;
  const errCode = err.code ?? RestError.PARSE_ERROR;
  return new RestError(msg, {
    code: errCode,
    statusCode: response.status,
    request: response.request,
    response,
  });
}
