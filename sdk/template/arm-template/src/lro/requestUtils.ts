// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FullOperationResponse, OperationSpec } from "@azure/core-client";
import { LROConfig } from "./models";
import { terminalStates } from "./stateMachine";

/**
 * We need to selectively deserialize our responses, only deserializing if we
 * are in a final LRO response, not deserializing any polling non-terminal responses
 */
export function shouldDeserializeLRO(finalStateVia?: string) {
  let initialOperationInfo: LROResponseInfo | undefined;
  let isInitialRequest = true;

  return (response: FullOperationResponse) => {
    if (response.status < 200 || response.status >= 300) {
      return true;
    }

    if (!initialOperationInfo) {
      initialOperationInfo = getLROData(response);
    } else {
      isInitialRequest = false;
    }

    if (
      initialOperationInfo.azureAsyncOperation ||
      initialOperationInfo.operationLocation
    ) {
      return (
        !isInitialRequest &&
        isAsyncOperationFinalResponse(
          response,
          initialOperationInfo,
          finalStateVia
        )
      );
    }

    if (initialOperationInfo.location) {
      return isLocationFinalResponse(response);
    }

    if (initialOperationInfo.requestMethod === "PUT") {
      return isBodyPollingFinalResponse(response);
    }

    return true;
  };
}

function isAsyncOperationFinalResponse(
  response: FullOperationResponse,
  initialOperationInfo: LROResponseInfo,
  finalStateVia?: string
): boolean {
  const status: string = response.parsedBody?.status || "Succeeded";
  if (!terminalStates.includes(status.toLowerCase())) {
    return false;
  }

  if (initialOperationInfo.requestMethod === "DELETE") {
    return true;
  }

  if (
    initialOperationInfo.requestMethod === "PUT" &&
    finalStateVia &&
    finalStateVia.toLowerCase() === "azure-asyncoperation"
  ) {
    return true;
  }

  if (
    initialOperationInfo.requestMethod !== "PUT" &&
    !initialOperationInfo.location
  ) {
    return true;
  }

  return false;
}

function isLocationFinalResponse(response: FullOperationResponse): boolean {
  return response.status !== 202;
}

function isBodyPollingFinalResponse(response: FullOperationResponse): boolean {
  const provisioningState: string =
    response.parsedBody?.properties?.provisioningState || "Succeeded";

  if (terminalStates.includes(provisioningState.toLowerCase())) {
    return true;
  }

  return false;
}

interface LROResponseInfo {
  requestMethod: string;
  azureAsyncOperation?: string;
  operationLocation?: string;
  location?: string;
}

function getLROData(result: FullOperationResponse): LROResponseInfo {
  return {
    azureAsyncOperation: result.headers.get("azure-asyncoperation"),
    operationLocation: result.headers.get("operation-location"),
    location: result.headers.get("location"),
    requestMethod: result.request.method
  };
}

/**
 * Detects where the continuation token is and returns it. Notice that azure-asyncoperation
 * must be checked first before the other location headers because there are scenarios
 * where both azure-asyncoperation and location could be present in the same response but
 * azure-asyncoperation should be the one to use for polling.
 */
export function getPollingURL(
  rawResponse: FullOperationResponse,
  defaultPath: string
): string {
  return (
    getAzureAsyncoperation(rawResponse) ??
    getLocation(rawResponse) ??
    getOperationLocation(rawResponse) ??
    defaultPath
  );
}

function getLocation(rawResponse: FullOperationResponse): string | undefined {
  return rawResponse.headers?.get("location");
}

function getOperationLocation(
  rawResponse: FullOperationResponse
): string | undefined {
  return rawResponse.headers?.get("operation-location");
}

function getAzureAsyncoperation(
  rawResponse: FullOperationResponse
): string | undefined {
  return rawResponse.headers?.get("azure-asyncoperation");
}

export function inferLROMode(
  spec: OperationSpec,
  rawResponse: FullOperationResponse
): LROConfig {
  const requestMethod = spec.httpMethod;
  if (getAzureAsyncoperation(rawResponse) !== undefined) {
    return {
      mode: "AzureAsync",
      resourceLocation:
        requestMethod === "PUT"
          ? spec.path
          : requestMethod === "POST"
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

export function getSpecPath(spec: OperationSpec): string {
  if (spec.path) {
    return spec.path;
  } else {
    throw Error("Bad spec: request path is not found!");
  }
}
