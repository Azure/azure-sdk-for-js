// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { delay, HttpMethods, HttpOperationResponse, RequestOptionsBase, RequestPrepareOptions, RestError, stripRequest, WebResource } from "ms-rest-js";
import { AzureServiceClient } from "./azureServiceClient";
import { LongRunningOperationStates } from "./util/constants";

export type LROPollStrategyType = "AzureAsyncOperation" | "Location" | "GetResource";

export interface LROMemento {
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
  constructor(private readonly _azureServiceClient: AzureServiceClient, protected readonly _memento: LROMemento) {
  }

  public getOperationStatus(): LongRunningOperationStates {
    return this._memento.state;
  }

  /**
   * Get whether or not this poll strategy's LRO is finished.
   * @returns Whether or not this poll strategy's LRO is finished.
   */
  public isFinished(): boolean {
    return isFinished(this._memento.state);
  }

  /**
   * Send poll requests that check the LRO's status until it is determined that the LRO is finished.
   * @returns Whether or not the LRO succeeded.
   */
  public async pollUntilFinished(): Promise<boolean> {
    while (!this.isFinished()) {
      const delayInSeconds: number = getDelayInSeconds(this._azureServiceClient, this._memento.mostRecentResponse);
      await delay(delayInSeconds * 1000);

      await this.sendPollRequest();
    }
    return this.finalStatusIsAcceptable();
  }

  /**
   * Send a single poll request that checks the LRO's status and return the response. If the LRO is
   * finished, then no request will be sent and the last response received will be returned.
   */
  public abstract sendPollRequest(): Promise<void>;

  public abstract finalStatusIsAcceptable(): boolean;

  protected shouldDoFinalGetResourceRequest(): boolean {
    const initialRequestMethod: HttpMethods = this._memento.initialResponse.request.method;
    return !this._memento.resource && (initialRequestMethod === "PUT" || initialRequestMethod === "PATCH" || initialRequestMethod === "POST");
  }

  protected abstract doFinalGetResourceRequest(): Promise<void>;

  public async getOperationResponse(): Promise<HttpOperationResponse> {
    if (this.shouldDoFinalGetResourceRequest()) {
      await this.doFinalGetResourceRequest();
    }
    const response: HttpOperationResponse = this._memento.mostRecentResponse;
    const result: HttpOperationResponse = {
      ...response,
      headers: response.headers.clone()
    };
    const resource: any = this._memento.resource;
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
    error.request = stripRequest(this._memento.mostRecentRequest);
    error.response = this._memento.mostRecentResponse;
    error.message = `Long running operation failed with status: "${this._memento.state}".`;
    error.body = this._memento.resource;
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

  protected updateState(url: string): Promise<void> {
    return this.updateOperationStatus(url).then(result => {
      this._memento.state = getProvisioningState(result.parsedBody) || "Succeeded";
      this._memento.mostRecentResponse = result;
      this._memento.mostRecentRequest = result.request;
      try {
        this._memento.resource = getResponseBody(result);
      } catch (error) {
        this._memento.resource = undefined;
        const resultStatus: number = result.status;
        if (this._memento.initialResponse.request.method !== "DELETE" || resultStatus < 400 || 499 < resultStatus) {
          throw error;
        }
      }
    });
  }

  /**
   * Retrieves operation status by querying the operation URL.
   * @param {string} statusUrl URL used to poll operation result.
   */
  protected updateOperationStatus(statusUrl: string): Promise<HttpOperationResponse> {
    const requestUrl: string = statusUrl.replace(" ", "%20");
    const httpRequest: RequestPrepareOptions = {
      method: "GET",
      url: requestUrl,
      headers: {}
    };
    const options: RequestOptionsBase | undefined = this._memento.options;
    if (options && options.customHeaders) {
      const customHeaders = options.customHeaders;
      for (const headerName of Object.keys(customHeaders)) {
        httpRequest.headers![headerName] = customHeaders[headerName];
      }
    }
    return this._azureServiceClient.sendRequest(httpRequest);
  }

  public getMemento(): LROMemento {
    return this._memento;
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
  return responseBody && responseBody.properties && responseBody.properties.provisioningState;
}

function getResponseBody(response: HttpOperationResponse): any {
  let result: any;
  try {
    if (response.bodyAsText && response.bodyAsText.length > 0) {
      result = JSON.parse(response.bodyAsText);
    } else {
      result = response.parsedBody;
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
    const lroMemento: LROMemento = {
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
    result = createLROPollStrategyFromMemento(azureServiceClient, lroMemento);
  } else {
    result = undefined;
  }
  return result;
}

export function createLROPollStrategyFromMemento(azureServiceClient: AzureServiceClient, lroMemento: LROMemento): LROPollStrategy | undefined {
  let result: LROPollStrategy;
  switch (lroMemento.pollStrategyType) {
    case "AzureAsyncOperation":
      result = new AzureAsyncOperationLROPollStrategy(azureServiceClient, lroMemento);
      break;

    case "Location":
      result = new LocationLROPollStrategy(azureServiceClient, lroMemento);
      break;

    case "GetResource":
      result = new GetResourceLROPollStrategy(azureServiceClient, lroMemento);
      break;

    default:
      throw new Error(`Unrecognized LRO poll strategy type: "${lroMemento.pollStrategyType}"`);
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
  /**
   * Retrieve PUT operation status by polling from "location" header.
   * @param {string} method - The HTTP method.
   * @param {PollingState} pollingState - The object to persist current operation state.
   */
  public sendPollRequest(): Promise<void> {
    const memento: LROMemento = this._memento;
    return this.updateOperationStatus(memento.locationHeaderValue!).then((result: HttpOperationResponse) => {
      const locationHeaderValue: string | undefined = getLocationHeaderValue(result);
      if (locationHeaderValue) {
        memento.locationHeaderValue = locationHeaderValue;
      }

      memento.mostRecentResponse = result;
      memento.mostRecentRequest = result.request;

      const initialResponse: HttpOperationResponse = memento.initialResponse;
      const initialRequestMethod: HttpMethods = initialResponse.request.method;
      const initialResponseStatusCode: number = initialResponse.status;
      const statusCode: number = result.status;
      if (statusCode === 202) {
        memento.state = "InProgress";
      } else if (statusCode === 200 ||
        (statusCode === 201 && (initialRequestMethod === "PUT" || initialRequestMethod === "PATCH")) ||
        (statusCode === 204 && (initialRequestMethod === "DELETE" || initialRequestMethod === "POST"))) {
        memento.state = "Succeeded";
        memento.resource = getResponseBody(result);
      } else if (statusCode === 404 && initialRequestMethod === "POST" &&
        (initialResponseStatusCode === 200 || initialResponseStatusCode === 201 || initialResponseStatusCode === 202)) {
        memento.state = "Failed";
        memento.resource = getResponseBody(result);
      } else if (400 <= statusCode && statusCode <= 499) {
        const resultBody: string = result.bodyAsText!;
        throw new RestError(resultBody, undefined, statusCode, stripRequest(result.request), result, resultBody);
      } else {
        throw new Error(`The response with status code ${statusCode} from polling for long running operation url "${memento.locationHeaderValue}" is not valid.`);
      }
    });
  }

  public finalStatusIsAcceptable(): boolean {
    const memento: LROMemento = this._memento;
    const initialResponse: HttpOperationResponse = memento.initialResponse;
    const initialResponseStatusCode: number = initialResponse.status;
    return memento.state === "Succeeded" ||
      (initialResponse.request.method === "POST" && memento.mostRecentResponse.status === 404 &&
        (initialResponseStatusCode === 200 ||
          initialResponseStatusCode === 201 ||
          initialResponseStatusCode === 202));
  }

  protected shouldDoFinalGetResourceRequest(): boolean {
    const memento: LROMemento = this._memento;
    const initialResponse: HttpOperationResponse = memento.initialResponse;
    let result: boolean;
    const initialRequestMethod: HttpMethods = initialResponse.request.method;
    const initialResponseStatusCode: number = initialResponse.status;
    if (initialRequestMethod === "POST" && memento.mostRecentResponse.status === 404 &&
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
    const memento: LROMemento = this._memento;
    const initialResponse: HttpOperationResponse = memento.initialResponse;
    let getResourceRequestUrl: string;
    const initialResponseStatusCode: number = initialResponse.status;
    const initialRequest: WebResource = initialResponse.request;
    if (initialRequest.method === "POST" &&
      (initialResponseStatusCode === 200 ||
        initialResponseStatusCode === 201 ||
        initialResponseStatusCode === 202)) {
      getResourceRequestUrl = memento.locationHeaderValue!;
    } else {
      getResourceRequestUrl = initialRequest.url;
    }
    return this.updateState(getResourceRequestUrl);
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
    const memento: LROMemento = this._memento;
    return this.updateOperationStatus(memento.azureAsyncOperationHeaderValue!).then((response: HttpOperationResponse) => {
      const statusCode: number = response.status;
      const parsedResponse: any = response.parsedBody;
      if (statusCode !== 200 && statusCode !== 201 && statusCode !== 202 && statusCode !== 204) {
        const error = new RestError(`Invalid status code with response body "${response.bodyAsText}" occurred when polling for operation status.`);
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
        memento.azureAsyncOperationHeaderValue = azureAsyncOperationHeaderValue;
      }

      memento.state = parsedResponse.status;
      memento.mostRecentResponse = response;
      memento.mostRecentRequest = response.request;
      memento.resource = getResponseBody(response);
    });
  }

  protected shouldDoFinalGetResourceRequest(): boolean {
    const memento: LROMemento = this._memento;
    const initialResponse: HttpOperationResponse = memento.initialResponse;
    const initialRequestMethod: HttpMethods = initialResponse.request.method;
    let result = false;
    if (initialRequestMethod === "PUT" || initialRequestMethod === "PATCH") {
      result = true;
    } else {
      if (memento.locationHeaderValue) {
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
    const memento: LROMemento = this._memento;
    const locationHeaderValue: string | undefined = memento.locationHeaderValue;
    const initialResponse: HttpOperationResponse = memento.initialResponse;
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
    return this.updateState(getResourceRequestUrl);
  }

  public finalStatusIsAcceptable(): boolean {
    const memento: LROMemento = this._memento;
    const initialResponse: HttpOperationResponse = memento.initialResponse;
    const initialResponseStatusCode: number = initialResponse.status;
    return memento.state === "Succeeded" ||
      (initialResponse.request.method === "POST" && (initialResponseStatusCode === 200 || initialResponseStatusCode === 201));
  }
}

/**
 * A long-running operation polling strategy that is based on the resource's provisioning state.
 */
class GetResourceLROPollStrategy extends LROPollStrategy {
  public sendPollRequest(): Promise<void> {
    const memento: LROMemento = this._memento;
    return this.updateOperationStatus(memento.initialResponse.request.url).then(result => {
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

      memento.state = getProvisioningState(result.parsedBody) || "Succeeded";
      memento.mostRecentResponse = result;
      memento.mostRecentRequest = result.request;
      memento.resource = getResponseBody(result);
    });
  }

  public finalStatusIsAcceptable(): boolean {
    return this._memento.state === "Succeeded";
  }

  protected doFinalGetResourceRequest(): Promise<void> {
    return this.sendPollRequest();
  }
}