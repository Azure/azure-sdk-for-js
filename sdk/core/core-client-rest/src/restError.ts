import { PathUncheckedResponse } from "./getClient";
import { RestError, PipelineResponse, createHttpHeaders } from "@azure/core-rest-pipeline";

/**
 * Creates a rest error from a PathUnchecked response
 */
export function createRestError(message: string, response: PathUncheckedResponse) {
  return new RestError(message, {
    statusCode: statusCodeToNumber(response.status),
    request: response.request,
    response: toPipelineresponse(response),
  });
}

function toPipelineresponse(response: PathUncheckedResponse): PipelineResponse {
  return {
    headers: createHttpHeaders(response.headers),
    request: response.request,
    status: statusCodeToNumber(response.status) ?? -1,
  };
}

function statusCodeToNumber(statusCode: string) {
  if (Number.isNaN(statusCode)) {
    return undefined;
  }

  return Number.parseInt(statusCode);
}
