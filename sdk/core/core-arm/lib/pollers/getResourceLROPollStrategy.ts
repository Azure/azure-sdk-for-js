// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpMethods, HttpOperationResponse, RequestOptionsBase, RestError, stripRequest, WebResource, OperationSpec } from "@azure/core-http";
import { AzureServiceClient } from "../azureServiceClient";
import { getStateFromResponse, getOperationResponse, getAzureAsyncOperationHeaderValue, getResponseBody, azureServiceClientRequest } from "./utils.ts";
import { Poller, PollerOptionalParameters, LongRunningOperationStates } from "@azure/core-lro";

/**
 * A long-running operation polling strategy that is based on the resource's provisioning state.
 */
class GetResourceLROPollStrategy extends LROPollStrategy {
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
      const error = new RestError(`Invalid status code with response body "${result.bodyAsText}" occurred when polling for operation status.`);
      error.statusCode = statusCode;
      error.request = stripRequest(result.request);
      error.response = result;
      error.body = responseBody;
      throw error;
    }

    if (!result.parsedBody) {
      throw new Error("The response from long running operation does not contain a body.");
    }

    return getStateFromResponse(response, responseBody);
  }
 
  public sendPollRequest(): Promise<void> {
    const statusUrl = this.initialResponse.request.url;
    const response = await azureServiceClientRequest(this, statusUrl);
    this.processResponse(response);
  }
}
