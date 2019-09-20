// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpMethods, HttpOperationResponse, RequestOptionsBase, RestError, stripRequest, WebResource, OperationSpec } from "@azure/core-http";
import { AzureServiceClient } from "../azureServiceClient";
import { getStateFromResponse, getOperationResponse, getLocationHeaderValue, getResponseBody, azureServiceClientRequest } from "./utils.ts";
import { Poller, PollerOptionalParameters, LongRunningOperationStates } from "@azure/core-lro";

/**
 * A long-running operation polling strategy that is based on the location header.
 */
class LocationLROPollStrategy extends Poller {
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

  private shouldDeserialize(parsedResponse: HttpOperationResponse): boolean {
    const initialResponse: HttpOperationResponse = this.initialResponse;
    const initialRequestMethod: HttpMethods = initialResponse.request.method;
    const statusCode: number = parsedResponse.status;
    if (statusCode === 200 ||
      (statusCode === 201 && (initialRequestMethod === "PUT" || initialRequestMethod === "PATCH")) ||
      (statusCode === 204 && (initialRequestMethod === "DELETE" || initialRequestMethod === "POST"))) {
      return false;
    }
    return true;
  }

  protected getStateFromResponse(response: HttpOperationResponse): LongRunningOperationStates {
    const initialResponse: HttpOperationResponse = this.initialResponse;
    const initialRequestMethod: HttpMethods = initialResponse.request.method;
    const initialResponseStatusCode: number = initialResponse.status;

    const responseBody = getResponseBody(response);
    const statusCode: number = response.status;

    if (statusCode === 202) {
      return "InProgress";
    } else if (statusCode === 200 ||
      (statusCode === 201 && (initialRequestMethod === "PUT" || initialRequestMethod === "PATCH")) ||
      (statusCode === 204 && (initialRequestMethod === "DELETE" || initialRequestMethod === "POST"))) {
      return "Succeeded";
    } else if (statusCode === 404 && initialRequestMethod === "POST" &&
      (initialResponseStatusCode === 200 || initialResponseStatusCode === 201 || initialResponseStatusCode === 202)) {
      return "Failed";
    } else if (400 <= statusCode && statusCode <= 499) {
      const resultBody: string = response.bodyAsText!;
      let errorMessage: string = resultBody;
      try {
        const resultObject = JSON.parse(resultBody);
        errorMessage = resultObject.message;
      } catch (parseError) {
        // Ignore the exception, use resultBody as the error message
      }

      throw new RestError(errorMessage, undefined, statusCode, stripRequest(response.request), response, resultBody);
    } else {
      throw new Error(`The response with status code ${statusCode} from polling for long running operation url "${getLocationHeaderValue(this.previousResponse)}" is not valid.`);
    }
  }

  public async sendRequest(options?: RequestOptionsBase): Promise<void> {
    const statusUrl = getLocationHeaderValue(this.previousResponse);
    const response = await azureServiceClientRequest(this, statusUrl);
    this.processResponse(response);
  }

  // Final requests and final check removed since it seemed to me that they would only
  // be a normal sendRequest, plus a getStateFromResponse that would result in isDone() === true.
  // The original code probably needs to be factored out first.
}
