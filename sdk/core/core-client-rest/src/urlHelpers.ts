// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "./common";
import { URL } from "./url";

/**
 * Builds the request url, filling in query and path parameters
 * @param baseUrl - base url which can be a template url
 * @param routePath - path to append to the baseUrl
 * @param pathParameters - values of the path parameters
 * @param options - request parameters including query parameters
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
    let value = pathParam;
    if (!options.skipUrlEncoding) {
      value = encodeURIComponent(pathParam);
    }

    path = path.replace(/{([^/]+)}/, value);
  }

  const url = new URL(`${baseUrl}/${path}`);

  if (options.queryParameters) {
    const queryParams = options.queryParameters;
    for (const key of Object.keys(queryParams)) {
      const param = queryParams[key] as any;
      if (param === undefined || param === null) {
        continue;
      }
      if (!param.toString || typeof param.toString !== "function") {
        throw new Error(`Query parameters must be able to be represented as string, ${key} can't`);
      }
      const value = param.toISOString !== undefined ? param.toISOString() : param.toString();
      url.searchParams.append(key, value);
    }
  }

  return (
    url
      .toString()
      // Remove double forward slashes
      .replace(/([^:]\/)\/+/g, "$1")
  );
}
