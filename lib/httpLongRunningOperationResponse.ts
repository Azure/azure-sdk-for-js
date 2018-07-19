// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { delay, HttpMethods, HttpOperationResponse, RequestOptionsBase, RequestPrepareOptions, RestError, stripRequest } from "ms-rest-js";
import { AzureServiceClient } from "./azureServiceClient";
import PollingState from "./pollingState";
import { LongRunningOperationStates } from "./util/constants";

export class HttpLongRunningOperationResponse {
  public constructor(private readonly _azureServiceClient: AzureServiceClient) {
  }

  /**
   * Poll Azure long running PUT, PATCH, POST or DELETE operations.
   * @param {msRest.HttpOperationResponse} resultOfInitialRequest - result/response of the initial request which is a part of the asynchronous polling operation.
   * @param {msRest.RequestOptionsBase} [options] - custom request options.
   * @returns {Promise<msRest.HttpOperationResponse>} result - The final response after polling is complete.
   */
  async getLongRunningOperationResult(resultOfInitialRequest: HttpOperationResponse, options?: RequestOptionsBase): Promise<HttpOperationResponse> {
    const initialRequestMethod: HttpMethods = resultOfInitialRequest.request.method;

    if (checkResponseStatusCodeFailed(resultOfInitialRequest)) {
      throw new Error(`Unexpected polling status code from long running operation ` +
        `"${resultOfInitialRequest.status}" for method "${initialRequestMethod}".`);
    }
    const pollingState = new PollingState(resultOfInitialRequest, this._azureServiceClient.longRunningOperationRetryTimeout);
    pollingState.optionsOfInitialRequest = options!;

    const resourceUrl: string = resultOfInitialRequest.request.url;
    while (terminalStates.indexOf(pollingState.status) === -1) {
      await delay(pollingState.getTimeout());
      if (pollingState.azureAsyncOperationHeaderLink) {
        await updateStateFromAzureAsyncOperationHeader(this._azureServiceClient, pollingState);
      } else if (pollingState.locationHeaderLink) {
        await updateStateFromLocationHeader(this._azureServiceClient, initialRequestMethod, pollingState);
      } else if (initialRequestMethod === "PUT") {
        await updateStateFromGetResourceOperation(this._azureServiceClient, resourceUrl, pollingState);
      } else {
        throw new Error("Location header is missing from long running operation.");
      }
    }

    if (pollingState.status === "Succeeded") {
      if ((pollingState.azureAsyncOperationHeaderLink || !pollingState.resource) &&
        (initialRequestMethod === "PUT" || initialRequestMethod === "PATCH")) {
        await updateStateFromGetResourceOperation(this._azureServiceClient, resourceUrl, pollingState);
      }
      return pollingState.getOperationResponse();
    } else {
      throw pollingState.getRestError();
    }
  }
}

/**
 * Verified whether an unexpected polling status code for long running operation was received for the response of the initial request.
 * @param {msRest.HttpOperationResponse} initialResponse - Response to the initial request that was sent as a part of the asynchronous operation.
 */
export function checkResponseStatusCodeFailed(initialResponse: HttpOperationResponse): boolean {
  const statusCode = initialResponse.status;
  const method = initialResponse.request.method;
  if (statusCode === 200 || statusCode === 202 ||
    (statusCode === 201 && method === "PUT") ||
    (statusCode === 204 && (method === "DELETE" || method === "POST"))) {
    return false;
  } else {
    return true;
  }
}

const terminalStates: LongRunningOperationStates[] = ["Succeeded", "Failed", "Canceled"];

/**
 * Retrieve operation status by polling from "azure-asyncoperation" header.
 * @param {PollingState} pollingState - The object to persist current operation state.
 * @param {boolean} inPostOrDelete - Invoked by Post Or Delete operation.
 */
export function updateStateFromAzureAsyncOperationHeader(client: AzureServiceClient, pollingState: PollingState): Promise<void> {
  return getStatus(client, pollingState.azureAsyncOperationHeaderLink as string, pollingState.optionsOfInitialRequest).then(result => {
    const parsedResponse = result.parsedBody as { [key: string]: any };
    if (!parsedResponse) {
      throw new Error("The response from long running operation does not contain a body.");
    } else if (!parsedResponse.status) {
      throw new Error(`The response "${result.bodyAsText}" from long running operation does not contain the status property.`);
    }
    pollingState.status = parsedResponse.status;
    pollingState.error = parsedResponse.error;
    pollingState.updateResponse(result);
    pollingState.request = result.request;
    pollingState.resource = undefined;
    pollingState.resource = result.parsedBody;
  });
}

/**
 * Retrieve PUT operation status by polling from "location" header.
 * @param {string} method - The HTTP method.
 * @param {PollingState} pollingState - The object to persist current operation state.
 */
export function updateStateFromLocationHeader(client: AzureServiceClient, method: HttpMethods, pollingState: PollingState): Promise<void> {
  return getStatus(client, pollingState.locationHeaderLink as string, pollingState.optionsOfInitialRequest).then(result => {
    const parsedResponse = result.parsedBody as { [key: string]: any };

    pollingState.updateResponse(result);
    pollingState.request = result.request;
    const statusCode = result.status;
    if (statusCode === 202) {
      pollingState.status = "InProgress";
    } else if (statusCode === 200 ||
      (statusCode === 201 && (method === "PUT" || method === "PATCH")) ||
      (statusCode === 204 && (method === "DELETE" || method === "POST"))) {
      pollingState.status = "Succeeded";
      pollingState.resource = parsedResponse;
      // we might not throw an error, but initialize here just in case.
      pollingState.error = new RestError(`Long running operation failed with status "${pollingState.status}".`);
      pollingState.error.code = pollingState.status;
    } else {
      throw new Error(`The response with status code ${statusCode} from polling for ` +
        `long running operation url "${pollingState.locationHeaderLink}" is not valid.`);
    }
  });
}

/**
 * Polling for resource status.
 * @param {string} resourceUrl - The url of resource.
 * @param {PollingState} pollingState - The object to persist current operation state.
 */
export function updateStateFromGetResourceOperation(client: AzureServiceClient, resourceUrl: string, pollingState: PollingState): Promise<void> {
  return getStatus(client, resourceUrl, pollingState.optionsOfInitialRequest).then(result => {
    if (!result.parsedBody) {
      throw new Error("The response from long running operation does not contain a body.");
    }

    const parsedResponse = result.parsedBody as { [key: string]: any };
    pollingState.status = "Succeeded";
    if (parsedResponse && parsedResponse.properties && parsedResponse.properties.provisioningState) {
      pollingState.status = parsedResponse.properties.provisioningState;
    }
    pollingState.updateResponse(result);
    pollingState.request = result.request;
    pollingState.resource = parsedResponse;
    // we might not throw an error, but initialize here just in case.
    pollingState.error = new RestError(`Long running operation failed with status "${pollingState.status}".`);
    pollingState.error.code = pollingState.status;
  });
}

/**
 * Retrieves operation status by querying the operation URL.
 * @param {string} operationUrl - URL used to poll operation result.
 * @param {object} options - Options that can be set on the request object
 */
export function getStatus(client: AzureServiceClient, operationUrl: string, options?: RequestOptionsBase): Promise<HttpOperationResponse> {
  // Construct URL
  const requestUrl = operationUrl.replace(" ", "%20");
  // Create HTTP request object
  const httpRequest: RequestPrepareOptions = {
    method: "GET",
    url: requestUrl,
    headers: {}
  };
  if (options && options.customHeaders) {
    const customHeaders = options.customHeaders;
    for (const headerName of Object.keys(customHeaders)) {
      httpRequest.headers![headerName] = customHeaders[headerName];
    }
  }
  return client.sendRequest(httpRequest).then(operationResponse => {
    const statusCode = operationResponse.status;
    const responseBody = operationResponse.parsedBody;
    if (statusCode !== 200 && statusCode !== 201 && statusCode !== 202 && statusCode !== 204) {
      const error = new RestError(`Invalid status code with response body "${operationResponse.bodyAsText}" occurred ` +
        `when polling for operation status.`);
      error.statusCode = statusCode;
      error.request = stripRequest(operationResponse.request);
      error.response = operationResponse;
      error.body = responseBody;
      throw error;
    }

    return operationResponse;
  });
}