// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpMethods, HttpOperationResponse, RequestOptionsBase, RestError, stripRequest, WebResource, OperationSpec } from "@azure/core-http";
import { AzureServiceClient } from "../azureServiceClient";
import { getStateFromResponse, getOperationResponse, getAzureAsyncOperationHeaderValue, getResponseBody, azureServiceClientRequest } from "./utils.ts";
import { Poller, PollerOptionalParameters, LongRunningOperationStates } from "@azure/core-lro";
 
/**
 * A long-running operation polling strategy that is based on the azure-asyncoperation header.
 */
class AzureAsyncOperationLROPollStrategy extends Poller {
  constructor(
    client: ServiceClient,
    options: PollerOptionalParameters
  ) {
    super({
      ...options,
      resources: {
        client
      }
    });
  }

  protected getStateFromResponse(response: HttpOperationResponse): LongRunningOperationStates {
    const initialResponse: HttpOperationResponse = this.initialResponse;
    const initialRequestMethod: HttpMethods = initialResponse.request.method;
    const initialResponseStatusCode: number = initialResponse.status;

    const responseBody = getResponseBody(response);
    const statusCode: number = response.status;

    if (statusCode !== 200 && statusCode !== 201 && statusCode !== 202 && statusCode !== 204) {
      const error = new RestError(`Invalid status code (${statusCode}) with response body "${response.bodyAsText}" occurred when polling for operation status.`);
      error.statusCode = statusCode;
      error.request = stripRequest(response.request);
      error.response = response;
      error.body = responseBody;
      throw error;
    }

    if (!responseBody) {
      throw new Error("The response from long running operation does not contain a body.");
    } else if (!responseBody.status) {
      throw new Error(`The response "${response.bodyAsText}" from long running operation does not contain the status property.`);
    }

    return getStateFromResponse(response, responseBody);
  }
 
  public sendRequest(): Promise<void> {
    const statusUrl = getAzureAsyncOperationHeaderValue(this.previousResponse);
    const response = await azureServiceClientRequest(this, statusUrl);
    this.processResponse(response);
  }

  // Final requests and final check removed since it seemed to me that they would only
  // be a normal sendRequest, plus a getStateFromResponse that would result in isDone() === true.
  // The original code probably needs to be factored out first.
}
