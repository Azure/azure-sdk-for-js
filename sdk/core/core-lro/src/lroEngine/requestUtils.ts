// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LroConfig, RawResponse } from "./models";

/**
 * Detects where the continuation token is and returns it. Notice that azure-asyncoperation
 * must be checked first before the other location headers because there are scenarios
 * where both azure-asyncoperation and location could be present in the same response but
 * azure-asyncoperation should be the one to use for polling.
 */
export function getPollingUrl(rawResponse: RawResponse, defaultPath: string): string {
  return (
    getAzureAsyncOperation(rawResponse) ??
    getLocation(rawResponse) ??
    getOperationLocation(rawResponse) ??
    defaultPath
  );
}

function getLocation(rawResponse: RawResponse): string | undefined {
  return rawResponse.headers["location"];
}

function getOperationLocation(rawResponse: RawResponse): string | undefined {
  return rawResponse.headers["operation-location"];
}

function getAzureAsyncOperation(rawResponse: RawResponse): string | undefined {
  return rawResponse.headers["azure-asyncoperation"];
}

export function inferLroMode(
  requestPath: string,
  requestMethod: string,
  rawResponse: RawResponse
): LroConfig {
  if (getAzureAsyncOperation(rawResponse) !== undefined) {
    return {
      mode: "AzureAsync",
      resourceLocation:
        requestMethod === "PUT"
          ? requestPath
          : requestMethod === "POST" || requestMethod === "PATCH"
          ? getLocation(rawResponse)
          : undefined
    };
  } else if (
    getLocation(rawResponse) !== undefined ||
    getOperationLocation(rawResponse) !== undefined
  ) {
    return {
      mode: "Location"
    };
  } else if (["PUT", "PATCH"].includes(requestMethod)) {
    return {
      mode: "Body"
    };
  }
  return {};
}

class SimpleRestError extends Error {
  public statusCode?: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "RestError";
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, SimpleRestError.prototype);
  }
}

export function isUnexpectedInitialResponse(rawResponse: RawResponse): boolean {
  const code = rawResponse.statusCode;
  if (![203, 204, 202, 201, 200, 500].includes(code)) {
    throw new SimpleRestError(
      `Received unexpected HTTP status code ${code} in the initial response. This may indicate a server issue.`,
      code
    );
  }
  return false;
}

export function isUnexpectedPollingResponse(rawResponse: RawResponse): boolean {
  const code = rawResponse.statusCode;
  if (![202, 201, 200, 500].includes(code)) {
    throw new SimpleRestError(
      `Received unexpected HTTP status code ${code} while polling. This may indicate a server issue.`,
      code
    );
  }
  return false;
}
