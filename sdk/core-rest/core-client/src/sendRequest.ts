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
 * @param method method to use to send the request
 * @param url url to send the request to
 * @param pipeline pipeline with the policies to run when sending the request
 * @param options request options
 * @returns returns and HttpResponse
 */
export async function sendRequest(
  method: HttpMethods,
  url: string,
  pipeline: Pipeline,
  options: RequestParameters = {}
): Promise<HttpResponse> {
  const httpClient = getCachedDefaultHttpsClient();

  const headers = createHttpHeaders({
    accept: "application/json",
    "content-type": options.contentType || getContentType(options.body),
    ...(options.headers ? options.headers : {}),
  });

  const body = JSON.stringify(options.body);

  const request = createPipelineRequest({
    url: url.toString(),
    method,
    body,
    headers,
    allowInsecureConnection: options.allowInsecureConnection,
  });

  const result = await pipeline.sendRequest(httpClient, request);
  let rawHeaders: RawHttpHeaders = {};
  for (const [key, value] of result.headers) {
    rawHeaders[key] = value;
  }

  let parsedBody = undefined;

  try {
    parsedBody = result.bodyAsText ? JSON.parse(result.bodyAsText) : undefined;
  } catch {
    parsedBody = undefined;
  }

  return {
    bodyAsText: result.bodyAsText,
    request,
    headers: rawHeaders,
    status: result.status,
    body: parsedBody,
  };
}

/**
 * Function to determine the content-type of a body
 * this is used if an explicit content-type is not provided
 * @param body body in the request
 * @returns returns the content-type
 */
function getContentType(body: any): string {
  try {
    const jsonBody = JSON.stringify(body);
    JSON.parse(jsonBody);
    return "application/json; charset=UTF-8";
  } catch {}

  if (typeof body === "string") {
    return "text/plain";
  }

  if (ArrayBuffer.isView(body)) {
    return "application/octet-stream";
  }

  // Default, we may want to log a warning
  return "application/json; charset=UTF-8";
}
