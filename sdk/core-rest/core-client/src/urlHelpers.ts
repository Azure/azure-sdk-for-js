import { RequestParameters } from "./pathClientTypes";

/**
 * Builds the request url, filling in query and path parameters
 * @param baseUrl base url which can be a template url
 * @param routePath path to append to the baseUrl
 * @param pathParameters values of the path parameters
 * @param options request parameters including query parameters
 * @returns a full url with path and query parameters
 */
export function buildRequestUrl(
  baseUrl: string,
  routePath: string,
  pathParameters: string[],
  options: RequestParameters = {}
): string {
  let path = routePath;

  if (path.startsWith("https://") || path.startsWith("http://")) {
    return path;
  }

  for (const pathParam of pathParameters) {
    path = path.replace(/{([^\/]+)}/, pathParam);
  }

  const url = new URL(`${baseUrl}/${path}`);

  if (options.queryParameters) {
    const queryParams = options.queryParameters;
    for (const key of Object.keys(queryParams)) {
      url.searchParams.append(key, (queryParams as any)[key]);
    }
  }

  return (
    url
      .toString()
      // Remove double forward slashes
      .replace(/([^:]\/)\/+/g, "$1")
  );
}
