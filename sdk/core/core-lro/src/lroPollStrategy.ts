// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { delay, HttpMethods, HttpOperationResponse, RequestOptionsBase, RestError, stripRequest, WebResource, OperationResponse, OperationSpec } from "@azure/core-http";
import { AzureServiceClient } from "@azure/core-arm";
import { LongRunningOperationStates } from "./util/constants";

export type LROPollStrategyType = "AzureAsyncOperation" | "Location" | "GetResource";

function getOperationResponse(operationSpec: OperationSpec, response: HttpOperationResponse): OperationResponse | undefined {
  const statusCode: number = response.status;
  const operationResponses: { [statusCode: string]: OperationResponse } = operationSpec.responses;
  let result: OperationResponse | undefined = operationResponses[statusCode];
  if (!result) {
    if (statusCode === 200) {
      result = operationResponses[201] || operationResponses[202];
    } else if (201 <= statusCode && statusCode <= 299) {
      result = {};
    }
  }
  return result;
} 

export interface LROPollState {
  pollStrategyType: LROPollStrategyType;
  initialResponse: HttpOperationResponse;
  state: LongRunningOperationStates;
  mostRecentRequest: WebResource;
  mostRecentResponse: HttpOperationResponse;
  resource: any;
  azureAsyncOperationHeaderValue?: string;
  locationHeaderValue?: string;
  options?: RequestOptionsBase;
}

/**
 * A long-running operation polling strategy base class that other polling strategies should extend.
 */
export abstract class LROPollStrategy {
  constructor(private readonly _azureServiceClient: AzureServiceClient, protected readonly _pollState: LROPollState) {
  }

  public getOperationStatus(): LongRunningOperationStates {
    return this._pollState.state;
  }

  /**
   * Get whether or not this poll strategy's LRO is finished.
   * @returns Whether or not this poll strategy's LRO is finished.
   */
  public isFinished(): boolean {
    return isFinished(this._pollState.state);
  }

  /**
   * Send poll requests that check the LRO's status until it is determined that the LRO is finished.
   * @returns Whether or not the LRO succeeded.
   */
  public async pollUntilFinished(): Promise<boolean> {
    while (!this.isFinished()) {
      const delayInSeconds: number = getDelayInSeconds(this._azureServiceClient, this._pollState.mostRecentResponse);
      await delay(delayInSeconds * 1000);

      await this.sendPollRequest();
    }
    return this.isFinalStatusAcceptable();
  }

  /**
   * Send a single poll request that checks the LRO's status and return the response. If the LRO is
   * finished, then no request will be sent and the last response received will be returned.
   */
  public abstract sendPollRequest(): Promise<void>;

  public abstract isFinalStatusAcceptable(): boolean;

  protected shouldDoFinalGetResourceRequest(): boolean {
    const initialRequestMethod: HttpMethods = this._pollState.initialResponse.request.method;
    return !this._pollState.resource && (initialRequestMethod === "PUT" || initialRequestMethod === "PATCH" || initialRequestMethod === "POST");
  }

  protected abstract doFinalGetResourceRequest(): Promise<void>;

  public getMostRecentResponse(): HttpOperationResponse {
    return this._pollState.mostRecentResponse;
  }

  public async getOperationResponse(): Promise<HttpOperationResponse> {
    if (this.shouldDoFinalGetResourceRequest()) {
      await this.doFinalGetResourceRequest();
    }
    const response: HttpOperationResponse = this._pollState.mostRecentResponse;
    const result: HttpOperationResponse = {
      ...response,
      headers: response.headers.clone()
    };
    const resource: any = this._pollState.resource;
    if (!resource) {
      result.bodyAsText = response.bodyAsText;
      result.parsedBody = response.parsedBody;
    } else if (typeof resource.valueOf() === "string") {
      result.bodyAsText = resource;
      result.parsedBody = JSON.parse(resource);
    } else {
      result.bodyAsText = JSON.stringify(resource);
      result.parsedBody = resource;
    }
    return result;
  }

  public getRestError(): RestError {
    const error = new RestError("");
    error.request = stripRequest(this._pollState.mostRecentRequest);
    error.response = this._pollState.mostRecentResponse;
    error.message = `Long running operation failed with status: "${this._pollState.state}".`;
    error.body = this._pollState.resource;
    if (error.body) {
      const innerError: any = error.body.error;
      if (innerError) {
        if (innerError.message) {
          error.message = `Long running operation failed with error: "${innerError.message}".`;
        }
        if (innerError.code) {
          error.code = innerError.code;
        }
      }
    }
    return error;
  }

  protected updateState(url: string, shouldDeserialize: boolean | ((response: HttpOperationResponse) => boolean)): Promise<void> {
    return this.updateOperationStatus(url, shouldDeserialize).then(result => {
      this._pollState.state = getProvisioningState(result.parsedBody) || "Succeeded";
      this._pollState.mostRecentResponse = result;
      this._pollState.mostRecentRequest = result.request;
      this._pollState.resource = getResponseBody(result);
    }).catch((error) => {
      let resultStatus: number | undefined;
      if (error.response && error.response.status) {
        resultStatus = error.response.status;
        if (this._pollState.initialResponse.request.method !== "DELETE" || resultStatus! < 400 || 499 < resultStatus!) {
          throw error;
        }
      } else {
        throw error;
      }
    });
  }

  /**
   * Retrieves operation status by querying the operation URL.
   * @param {string} statusUrl URL used to poll operation result.
   */
  protected updateOperationStatus(statusUrl: string, shouldDeserialize: boolean | ((response: HttpOperationResponse) => boolean)): Promise<HttpOperationResponse> {
    const requestUrl: string = statusUrl.replace(" ", "%20");
    const httpRequest = new WebResource(requestUrl, "GET");
    const pollState: LROPollState = this._pollState;
    httpRequest.operationSpec = pollState.mostRecentRequest.operationSpec;
    httpRequest.shouldDeserialize = shouldDeserialize;
    httpRequest.operationResponseGetter = getOperationResponse;
    const options: RequestOptionsBase | undefined = pollState.options;
    if (options && options.customHeaders) {
      const customHeaders = options.customHeaders;
      for (const headerName of Object.keys(customHeaders)) {
        httpRequest.headers.set(headerName, customHeaders[headerName]);
      }
    }
    return this._azureServiceClient.sendRequest(httpRequest);
  }

  public getPollState(): LROPollState {
    return this._pollState;
  }
}

export function getDelayInSeconds(azureServiceClient: AzureServiceClient, previousResponse: HttpOperationResponse): number {
  let delayInSeconds = 30;
  if (azureServiceClient.longRunningOperationRetryTimeout != undefined) {
    delayInSeconds = azureServiceClient.longRunningOperationRetryTimeout;
  } else {
    const retryAfterHeaderValue: string | undefined = previousResponse.headers.get("retry-after");
    if (retryAfterHeaderValue) {
      const retryAfterDelayInSeconds: number = parseInt(retryAfterHeaderValue);
      if (!Number.isNaN(retryAfterDelayInSeconds)) {
        delayInSeconds = retryAfterDelayInSeconds;
      }
    }
  }
  return delayInSeconds;
}

function getProvisioningState(responseBody: any): LongRunningOperationStates | undefined {
  let result: LongRunningOperationStates | undefined;
  if (responseBody) {
    if (responseBody.provisioningState) {
      result = responseBody.provisioningState;
    } else if (responseBody.properties) {
      result = responseBody.properties.provisioningState;
    }
  }
  return result;
}

function getResponseBody(response: HttpOperationResponse): any {
  let result: any;
  try {
    if (response.parsedBody) {
      result = response.parsedBody;
    } else if (response.bodyAsText && response.bodyAsText.length > 0) {
      result = JSON.parse(response.bodyAsText);
    }
  } catch (error) {
    const deserializationError = new RestError(`Error "${error}" occurred in parsing the responseBody " +
      "while creating the PollingState for Long Running Operation- "${response.bodyAsText}"`);
    deserializationError.request = response.request;
    deserializationError.response = response;
    throw deserializationError;
  }
  return result;
}

const terminalStates: LongRunningOperationStates[] = ["Succeeded", "Failed", "Canceled", "Cancelled"];

/**
 * Get whether or not a long-running operation with the provided status is finished.
 * @param status The current status of a long-running operation.
 * @returns Whether or not a long-running operation with the provided status is finished.
 */
export function isFinished(status: LongRunningOperationStates): boolean {
  let result = false;
  for (const terminalState of terminalStates) {
    if (longRunningOperationStatesEqual(status, terminalState)) {
      result = true;
      break;
    }
  }
  return result;
}

export function longRunningOperationStatesEqual(lhs: LongRunningOperationStates, rhs: LongRunningOperationStates): boolean {
  const lhsLowerCased: string = lhs && lhs.toLowerCase();
  const rhsLowerCased: string = rhs && rhs.toLowerCase();
  return lhsLowerCased === rhsLowerCased;
}
