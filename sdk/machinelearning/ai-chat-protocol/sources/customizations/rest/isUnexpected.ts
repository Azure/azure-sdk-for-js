import {
  Create200Response,
  CreateDefaultResponse,
  CreateStreaming200Response,
  CreateStreamingDefaultResponse,
} from "../../generated/src/rest/responses";

export function isUnexpected(
  response: Create200Response | CreateDefaultResponse
): response is CreateDefaultResponse;
export function isUnexpected(
  response: CreateStreaming200Response | CreateStreamingDefaultResponse
): response is CreateStreamingDefaultResponse;
export function isUnexpected(
  response:
    | CreateStreaming200Response
    | CreateStreamingDefaultResponse
    | Create200Response
    | CreateDefaultResponse
): response is CreateDefaultResponse | CreateStreamingDefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  let pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    pathDetails = getParametrizedPathSuccess(method, url.pathname);
  }
  return !pathDetails.includes(response.status);
}
