// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { delay, HttpMethods, HttpOperationResponse, RequestOptionsBase, RestError, stripRequest, WebResource, OperationResponse, OperationSpec } from "ms-rest-js";
import { AzureServiceClient } from "./azureServiceClient";
import { LongRunningOperationStates } from "./util/constants";

export type LROPollStrategyType = "AzureAsyncOperation" | "Location" | "GetResource";

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
      try {
        this._pollState.resource = getResponseBody(result);
      } catch (error) {
        this._pollState.resource = undefined;
        const resultStatus: number = result.status;
        if (this._pollState.initialResponse.request.method !== "DELETE" || resultStatus < 400 || 499 < resultStatus) {
          throw error;
        }
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

function getStatusFromResponse(response: HttpOperationResponse, responseBody?: any): LongRunningOperationStates {
  if (responseBody == undefined) {
    responseBody = getResponseBody(response);
  }

  let result: LongRunningOperationStates;
  switch (response.status) {
    case 202:
      result = "InProgress";
      break;

    case 204:
      result = "Succeeded";
      break;

    case 201:
      result = getProvisioningState(responseBody) || "InProgress";
      break;

    case 200:
      const provisioningState: LongRunningOperationStates | undefined = getProvisioningState(responseBody);
      if (provisioningState) {
        result = provisioningState;
      } else if (getAzureAsyncOperationHeaderValue(response) || getLocationHeaderValue(response)) {
        result = "InProgress";
      } else {
        result = "Succeeded";
      }
      break;

    default:
      result = "Failed";
      break;
  }
  return result;
}

const terminalStates: LongRunningOperationStates[] = ["Succeeded", "Failed", "Canceled"];

/**
 * Get whether or not a long-running operation with the provided status is finished.
 * @param status The current status of a long-running operation.
 * @returns Whether or not a long-running operation with the provided status is finished.
 */
function isFinished(status: LongRunningOperationStates): boolean {
  return terminalStates.indexOf(status) !== -1;
}

/**
 * Create a new long-running operation polling strategy based on the provided initial response.
 * @param initialResponse The initial response to the long-running operation's initial request.
 * @param azureServiceClient The AzureServiceClient that was used to send the initial request.
 * @param options Any options that were provided to the initial request.
 */
export function createLROPollStrategyFromInitialResponse(initialResponse: HttpOperationResponse, azureServiceClient: AzureServiceClient, options?: RequestOptionsBase): LROPollStrategy | undefined {
  const initialRequestMethod: HttpMethods = initialResponse.request.method;
  const initialResponseStatus: number = initialResponse.status;

  let lroPollStrategyType: LROPollStrategyType | undefined;
  if (getAzureAsyncOperationHeaderValue(initialResponse)) {
    lroPollStrategyType = "AzureAsyncOperation";
  } else if (getLocationHeaderValue(initialResponse)) {
    lroPollStrategyType = "Location";
  } else if (initialRequestMethod === "PUT" || initialRequestMethod === "PATCH") {
    lroPollStrategyType = "GetResource";
  } else if (initialResponseStatus !== 201 && initialResponseStatus !== 202 && !isFinished(getStatusFromResponse(initialResponse))) {
    throw new Error("Can't determine long running operation polling strategy.");
  }

  let result: LROPollStrategy | undefined;
  if (lroPollStrategyType) {
    const resource: any = getResponseBody(initialResponse);
    const lroPollState: LROPollState = {
      pollStrategyType: lroPollStrategyType,
      options: options,
      initialResponse: initialResponse,
      mostRecentResponse: initialResponse,
      mostRecentRequest: initialResponse.request,
      azureAsyncOperationHeaderValue: getAzureAsyncOperationHeaderValue(initialResponse),
      locationHeaderValue: getLocationHeaderValue(initialResponse),
      resource: resource,
      state: getStatusFromResponse(initialResponse, resource)
    };
    result = createLROPollStrategyFromPollState(azureServiceClient, lroPollState);
  } else {
    result = undefined;
  }
  return result;
}

export function createLROPollStrategyFromPollState(azureServiceClient: AzureServiceClient, lroPollState: LROPollState): LROPollStrategy | undefined {
  let result: LROPollStrategy;
  switch (lroPollState.pollStrategyType) {
    case "AzureAsyncOperation":
      result = new AzureAsyncOperationLROPollStrategy(azureServiceClient, lroPollState);
      break;

    case "Location":
      result = new LocationLROPollStrategy(azureServiceClient, lroPollState);
      break;

    case "GetResource":
      result = new GetResourceLROPollStrategy(azureServiceClient, lroPollState);
      break;

    default:
      throw new Error(`Unrecognized LRO poll strategy type: "${lroPollState.pollStrategyType}"`);
      break;
  }
  return result;
}

function getLocationHeaderValue(response: HttpOperationResponse): string | undefined {
  return response.headers.get("location");
}

/**
 * A long-running operation polling strategy that is based on the location header.
 */
class LocationLROPollStrategy extends LROPollStrategy {
  private locationStrategyShouldDeserialize(parsedResponse: HttpOperationResponse): boolean {
    let shouldDeserialize = false;

    const initialResponse: HttpOperationResponse = this._pollState.initialResponse;
    const initialRequestMethod: HttpMethods = initialResponse.request.method;
    const statusCode: number = parsedResponse.status;
    if (statusCode === 200 ||
      (statusCode === 201 && (initialRequestMethod === "PUT" || initialRequestMethod === "PATCH")) ||
      (statusCode === 204 && (initialRequestMethod === "DELETE" || initialRequestMethod === "POST"))) {
      shouldDeserialize = true;
    }

    return shouldDeserialize;
  }
  /**
   * Retrieve PUT operation status by polling from "location" header.
   * @param {string} method - The HTTP method.
   * @param {PollingState} pollingState - The object to persist current operation state.
   */
  public sendPollRequest(): Promise<void> {
    const lroPollState: LROPollState = this._pollState;
    return this.updateOperationStatus(lroPollState.locationHeaderValue!, this.locationStrategyShouldDeserialize.bind(this)).then((result: HttpOperationResponse) => {
      const locationHeaderValue: string | undefined = getLocationHeaderValue(result);
      if (locationHeaderValue) {
        lroPollState.locationHeaderValue = locationHeaderValue;
      }

      lroPollState.mostRecentResponse = result;
      lroPollState.mostRecentRequest = result.request;

      const initialResponse: HttpOperationResponse = lroPollState.initialResponse;
      const initialRequestMethod: HttpMethods = initialResponse.request.method;
      const initialResponseStatusCode: number = initialResponse.status;
      const statusCode: number = result.status;
      if (statusCode === 202) {
        lroPollState.state = "InProgress";
      } else if (statusCode === 200 ||
        (statusCode === 201 && (initialRequestMethod === "PUT" || initialRequestMethod === "PATCH")) ||
        (statusCode === 204 && (initialRequestMethod === "DELETE" || initialRequestMethod === "POST"))) {
        lroPollState.state = "Succeeded";
        lroPollState.resource = getResponseBody(result);
      } else if (statusCode === 404 && initialRequestMethod === "POST" &&
        (initialResponseStatusCode === 200 || initialResponseStatusCode === 201 || initialResponseStatusCode === 202)) {
        lroPollState.state = "Failed";
        lroPollState.resource = getResponseBody(result);
      } else if (400 <= statusCode && statusCode <= 499) {
        const resultBody: string = result.bodyAsText!;
        throw new RestError(resultBody, undefined, statusCode, stripRequest(result.request), result, resultBody);
      } else {
        throw new Error(`The response with status code ${statusCode} from polling for long running operation url "${lroPollState.locationHeaderValue}" is not valid.`);
      }
    });
  }

  public isFinalStatusAcceptable(): boolean {
    const lroPollState: LROPollState = this._pollState;
    const initialResponse: HttpOperationResponse = lroPollState.initialResponse;
    const initialResponseStatusCode: number = initialResponse.status;
    return lroPollState.state === "Succeeded" ||
      (initialResponse.request.method === "POST" && lroPollState.mostRecentResponse.status === 404 &&
        (initialResponseStatusCode === 200 ||
          initialResponseStatusCode === 201 ||
          initialResponseStatusCode === 202));
  }

  protected shouldDoFinalGetResourceRequest(): boolean {
    const lroPollState: LROPollState = this._pollState;
    const initialResponse: HttpOperationResponse = lroPollState.initialResponse;
    let result: boolean;
    const initialRequestMethod: HttpMethods = initialResponse.request.method;
    const initialResponseStatusCode: number = initialResponse.status;
    if (initialRequestMethod === "POST" && lroPollState.mostRecentResponse.status === 404 &&
      (initialResponseStatusCode === 200 ||
        initialResponseStatusCode === 201 ||
        initialResponseStatusCode === 202)) {
      result = false;
    } else {
      result = super.shouldDoFinalGetResourceRequest() ||
        (initialRequestMethod === "POST" && initialResponseStatusCode === 201);
    }
    return result;
  }

  protected doFinalGetResourceRequest(): Promise<void> {
    const lroPollState: LROPollState = this._pollState;
    const initialResponse: HttpOperationResponse = lroPollState.initialResponse;
    let getResourceRequestUrl: string;
    const initialResponseStatusCode: number = initialResponse.status;
    const initialRequest: WebResource = initialResponse.request;
    if (initialRequest.method === "POST" &&
      (initialResponseStatusCode === 200 ||
        initialResponseStatusCode === 201 ||
        initialResponseStatusCode === 202)) {
      getResourceRequestUrl = lroPollState.locationHeaderValue!;
    } else {
      getResourceRequestUrl = initialRequest.url;
    }
    return this.updateState(getResourceRequestUrl, true);
  }
}

function getAzureAsyncOperationHeaderValue(response: HttpOperationResponse): string | undefined {
  return response.headers.get("azure-asyncoperation");
}

/**
 * A long-running operation polling strategy that is based on the azure-asyncoperation header.
 */
class AzureAsyncOperationLROPollStrategy extends LROPollStrategy {
  /**
   * Retrieve operation status by polling from "azure-asyncoperation" header.
   * @param {PollingState} pollingState - The object to persist current operation state.
   * @param {boolean} inPostOrDelete - Invoked by Post Or Delete operation.
   */
  public sendPollRequest(): Promise<void> {
    const lroPollState: LROPollState = this._pollState;
    return this.updateOperationStatus(lroPollState.azureAsyncOperationHeaderValue!, false).then((response: HttpOperationResponse) => {
      const statusCode: number = response.status;
      const parsedResponse: any = response.parsedBody;
      if (statusCode !== 200 && statusCode !== 201 && statusCode !== 202 && statusCode !== 204) {
        const error = new RestError(`Invalid status code (${statusCode}) with response body "${response.bodyAsText}" occurred when polling for operation status.`);
        error.statusCode = statusCode;
        error.request = stripRequest(response.request);
        error.response = response;
        error.body = parsedResponse;
        throw error;
      }

      if (!parsedResponse) {
        throw new Error("The response from long running operation does not contain a body.");
      } else if (!parsedResponse.status) {
        throw new Error(`The response "${response.bodyAsText}" from long running operation does not contain the status property.`);
      }

      const azureAsyncOperationHeaderValue: string | undefined = getAzureAsyncOperationHeaderValue(response);
      if (azureAsyncOperationHeaderValue) {
        lroPollState.azureAsyncOperationHeaderValue = azureAsyncOperationHeaderValue;
      }

      lroPollState.state = parsedResponse.status;
      lroPollState.mostRecentResponse = response;
      lroPollState.mostRecentRequest = response.request;
      lroPollState.resource = getResponseBody(response);
    });
  }

  protected shouldDoFinalGetResourceRequest(): boolean {
    const lroPollState: LROPollState = this._pollState;
    const initialResponse: HttpOperationResponse = lroPollState.initialResponse;
    const initialRequestMethod: HttpMethods = initialResponse.request.method;
    let result = false;
    if (initialRequestMethod === "PUT" || initialRequestMethod === "PATCH") {
      result = true;
    } else {
      if (lroPollState.locationHeaderValue) {
        const initialResponseStatusCode: number = initialResponse.status;
        if (initialRequestMethod === "POST") {
          result = initialResponseStatusCode === 200 || initialResponseStatusCode === 201 || initialResponseStatusCode === 202;
        } else if (initialRequestMethod === "DELETE") {
          result = initialResponseStatusCode === 200 || initialResponseStatusCode === 202;
        }
      }
    }
    return result;
  }

  protected doFinalGetResourceRequest(): Promise<void> {
    const lroPollState: LROPollState = this._pollState;
    const locationHeaderValue: string | undefined = lroPollState.locationHeaderValue;
    const initialResponse: HttpOperationResponse = lroPollState.initialResponse;
    const initialRequest: WebResource = initialResponse.request;
    let getResourceRequestUrl: string = initialRequest.url;
    if (locationHeaderValue) {
      const initialRequestMethod: HttpMethods = initialRequest.method;
      const initialResponseStatusCode: number = initialResponse.status;
      if (initialRequestMethod === "POST" && (initialResponseStatusCode === 200 || initialResponseStatusCode === 201 || initialResponseStatusCode === 202)) {
        getResourceRequestUrl = locationHeaderValue;
      } else if (initialRequestMethod === "DELETE" && (initialResponseStatusCode === 200 || initialResponseStatusCode === 202)) {
        getResourceRequestUrl = locationHeaderValue;
      }
    }
    return this.updateState(getResourceRequestUrl, true);
  }

  public isFinalStatusAcceptable(): boolean {
    const lroPollState: LROPollState = this._pollState;
    const initialResponse: HttpOperationResponse = lroPollState.initialResponse;
    const initialResponseStatusCode: number = initialResponse.status;
    return lroPollState.state === "Succeeded" ||
      (initialResponse.request.method === "POST" && (initialResponseStatusCode === 200 || initialResponseStatusCode === 201));
  }
}

/**
 * A long-running operation polling strategy that is based on the resource's provisioning state.
 */
class GetResourceLROPollStrategy extends LROPollStrategy {
  public sendPollRequest(): Promise<void> {
    const lroPollState: LROPollState = this._pollState;
    return this.updateOperationStatus(lroPollState.initialResponse.request.url, false).then(result => {
      const statusCode: number = result.status;
      const responseBody: any = result.parsedBody;
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

      lroPollState.state = getProvisioningState(result.parsedBody) || "Succeeded";
      lroPollState.mostRecentResponse = result;
      lroPollState.mostRecentRequest = result.request;
      lroPollState.resource = getResponseBody(result);
    });
  }

  public isFinalStatusAcceptable(): boolean {
    return this._pollState.state === "Succeeded";
  }

  protected doFinalGetResourceRequest(): Promise<void> {
    return this.sendPollRequest();
  }
}