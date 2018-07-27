// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { delay, HttpMethods, HttpOperationResponse, RequestOptionsBase, RequestPrepareOptions, RestError, stripRequest, WebResource } from "ms-rest-js";
import { AzureServiceClient } from "./azureServiceClient";
import { LongRunningOperationStates } from "./util/constants";

/**
 * A long-running operation polling strategy base class that other polling strategies should extend.
 */
export abstract class LROPollStrategy {
  protected readonly _initialRequestUrl: string;
  protected readonly _initialRequestMethod: HttpMethods;
  protected readonly _initialResponseStatusCode: number;
  protected _status: LongRunningOperationStates;
  protected _mostRecentRequest: WebResource;
  protected _response: HttpOperationResponse;
  protected _resource: any;
  protected _azureAsyncOperationHeaderValue: string | undefined;
  protected _locationHeaderValue: string | undefined;

  constructor(initialResponse: HttpOperationResponse, private readonly _azureServiceClient: AzureServiceClient, private readonly _options?: RequestOptionsBase) {
    this._response = initialResponse;

    this._mostRecentRequest = initialResponse.request;
    this._initialRequestUrl = this._mostRecentRequest.url;
    this._initialResponseStatusCode = initialResponse.status;
    this._initialRequestMethod = this._mostRecentRequest.method;

    this._resource = getResponseBody(initialResponse);
    this._status = getStatusFromResponse(initialResponse, this._resource);
    this._resource = getResponseBody(initialResponse);

    this._azureAsyncOperationHeaderValue = getAzureAsyncOperationHeaderValue(initialResponse);
    this._locationHeaderValue = getLocationHeaderValue(initialResponse);

  }

  public async pollUntilFinished(): Promise<boolean> {
    while (!isFinished(this._status)) {
      const delayInSeconds: number = getDelayInSeconds(this._azureServiceClient, this._response);
      await delay(delayInSeconds * 1000);

      await this.sendPollRequest();
    }
    return this.finalStatusIsAcceptable();
  }

  protected abstract sendPollRequest(): Promise<void>;

  protected abstract finalStatusIsAcceptable(): boolean;

  protected shouldDoFinalGetResourceRequest(): boolean {
    const initialRequestMethod: HttpMethods = this._initialRequestMethod;
    return !this._resource && (initialRequestMethod === "PUT" || initialRequestMethod === "PATCH" || initialRequestMethod === "POST");
  }

  protected abstract doFinalGetResourceRequest(): Promise<void>;

  public async getOperationResponse(): Promise<HttpOperationResponse> {
    if (this.shouldDoFinalGetResourceRequest()) {
      await this.doFinalGetResourceRequest();
    }
    const response: HttpOperationResponse = this._response;
    const result: HttpOperationResponse = {
      ...response,
      headers: response.headers.clone()
    };
    const resource: any = this._resource;
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
    error.request = stripRequest(this._mostRecentRequest);
    error.response = this._response;
    error.message = `Long running operation failed with status: "${this._status}".`;
    error.body = this._resource;
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
    return this.getStatus(url).then(result => {
      this._status = getProvisioningState(result.parsedBody) || "Succeeded";
      this._response = result;
      this._mostRecentRequest = result.request;
      try {
        this._resource = getResponseBody(result);
      } catch (error) {
        this._resource = undefined;
        const resultStatus: number = result.status;
        if (this._initialRequestMethod !== "DELETE" || resultStatus < 400 || 499 < resultStatus) {
          throw error;
        }
      }
    });
  }

  /**
   * Retrieves operation status by querying the operation URL.
   * @param {string} statusUrl URL used to poll operation result.
   */
  protected getStatus(statusUrl: string): Promise<HttpOperationResponse> {
    const requestUrl: string = statusUrl.replace(" ", "%20");
    const httpRequest: RequestPrepareOptions = {
      method: "GET",
      url: requestUrl,
      headers: {}
    };
    if (this._options && this._options.customHeaders) {
      const customHeaders = this._options.customHeaders;
      for (const headerName of Object.keys(customHeaders)) {
        httpRequest.headers![headerName] = customHeaders[headerName];
      }
    }
    return this._azureServiceClient.sendRequest(httpRequest);
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
export function createLROPollStrategy(initialResponse: HttpOperationResponse, azureServiceClient: AzureServiceClient, options?: RequestOptionsBase): LROPollStrategy | undefined {
  let result: LROPollStrategy | undefined;

  if (getAzureAsyncOperationHeaderValue(initialResponse)) {
    result = new AzureAsyncOperationLROPollStrategy(initialResponse, azureServiceClient, options);
  } else if (getLocationHeaderValue(initialResponse)) {
    result = new LocationLROPollStrategy(initialResponse, azureServiceClient, options);
  } else if (initialResponse.request.method === "PUT" || initialResponse.request.method === "PATCH") {
    result = new GetResourceLROPollStrategy(initialResponse, azureServiceClient, options);
  } else if (initialResponse.status === 201 || initialResponse.status === 202 || isFinished(getStatusFromResponse(initialResponse))) {
    result = undefined;
  } else {
    throw new Error("Can't determine long running operation polling strategy from initial response.");
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
  protected sendPollRequest(): Promise<void> {
    return this.getStatus(this._locationHeaderValue!).then((result: HttpOperationResponse) => {
      const locationHeaderValue: string | undefined = getLocationHeaderValue(result);
      if (locationHeaderValue) {
        this._locationHeaderValue = locationHeaderValue;
      }

      this._response = result;
      this._mostRecentRequest = result.request;

      const initialRequestMethod: HttpMethods = this._initialRequestMethod;
      const initialResponseStatusCode: number = this._initialResponseStatusCode;
      const statusCode: number = result.status;
      if (statusCode === 202) {
        this._status = "InProgress";
      } else if (statusCode === 200 ||
        (statusCode === 201 && (initialRequestMethod === "PUT" || initialRequestMethod === "PATCH")) ||
        (statusCode === 204 && (initialRequestMethod === "DELETE" || initialRequestMethod === "POST"))) {
        this._status = "Succeeded";
        this._resource = getResponseBody(result);
      } else if (statusCode === 404 && initialRequestMethod === "POST" &&
        (initialResponseStatusCode === 200 || initialResponseStatusCode === 201 || initialResponseStatusCode === 202)) {
        this._status = "Failed";
        this._resource = getResponseBody(result);
      } else if (400 <= statusCode && statusCode <= 499) {
        const resultBody: string = result.bodyAsText!;
        throw new RestError(resultBody, undefined, statusCode, stripRequest(result.request), result, resultBody);
      } else {
        throw new Error(`The response with status code ${statusCode} from polling for long running operation url "${this._locationHeaderValue}" is not valid.`);
      }
    });
  }

  protected finalStatusIsAcceptable(): boolean {
    const initialResponseStatusCode: number = this._initialResponseStatusCode;
    return this._status === "Succeeded" ||
      (this._initialRequestMethod === "POST" && this._response.status === 404 &&
        (initialResponseStatusCode === 200 ||
          initialResponseStatusCode === 201 ||
          initialResponseStatusCode === 202));
  }

  protected shouldDoFinalGetResourceRequest(): boolean {
    let result: boolean;
    const initialRequestMethod: HttpMethods = this._initialRequestMethod;
    const initialResponseStatusCode: number = this._initialResponseStatusCode;
    if (initialRequestMethod === "POST" && this._response.status === 404 &&
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
    let getResourceRequestUrl: string;
    const initialResponseStatusCode: number = this._initialResponseStatusCode;
    if (this._initialRequestMethod === "POST" &&
      (initialResponseStatusCode === 200 ||
        initialResponseStatusCode === 201 ||
        initialResponseStatusCode === 202)) {
      getResourceRequestUrl = this._locationHeaderValue!;
    } else {
      getResourceRequestUrl = this._initialRequestUrl;
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
  protected sendPollRequest(): Promise<void> {
    return this.getStatus(this._azureAsyncOperationHeaderValue!).then((response: HttpOperationResponse) => {
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
        this._azureAsyncOperationHeaderValue = azureAsyncOperationHeaderValue;
      }

      this._status = parsedResponse.status;
      this._response = response;
      this._mostRecentRequest = response.request;
      this._resource = getResponseBody(response);
    });
  }

  protected shouldDoFinalGetResourceRequest(): boolean {
    const initialRequestMethod: HttpMethods = this._initialRequestMethod;
    let result = false;
    if (initialRequestMethod === "PUT" || initialRequestMethod === "PATCH") {
      result = true;
    } else {
      if (this._locationHeaderValue) {
        const initialResponseStatusCode: number = this._initialResponseStatusCode;
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
    const locationHeaderValue: string | undefined = this._locationHeaderValue;
    let getResourceRequestUrl: string = this._initialRequestUrl;
    if (locationHeaderValue) {
      const initialRequestMethod: HttpMethods = this._initialRequestMethod;
      const initialResponseStatusCode: number = this._initialResponseStatusCode;
      if (initialRequestMethod === "POST" && (initialResponseStatusCode === 200 || initialResponseStatusCode === 201 || initialResponseStatusCode === 202)) {
        getResourceRequestUrl = locationHeaderValue;
      } else if (initialRequestMethod === "DELETE" && (initialResponseStatusCode === 200 || initialResponseStatusCode === 202)) {
        getResourceRequestUrl = locationHeaderValue;
      }
    }
    return this.updateState(getResourceRequestUrl);
  }

  protected finalStatusIsAcceptable(): boolean {
    const initialResponseStatusCode: number = this._initialResponseStatusCode;
    return this._status === "Succeeded" ||
      (this._initialRequestMethod === "POST" && (initialResponseStatusCode === 200 || initialResponseStatusCode === 201));
  }
}

/**
 * A long-running operation polling strategy that is based on the resource's provisioning state.
 */
class GetResourceLROPollStrategy extends LROPollStrategy {
  protected sendPollRequest(): Promise<void> {
    return this.getStatus(this._initialRequestUrl).then(result => {
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

      this._status = getProvisioningState(result.parsedBody) || "Succeeded";
      this._response = result;
      this._mostRecentRequest = result.request;
      this._resource = getResponseBody(result);
    });
  }

  protected finalStatusIsAcceptable(): boolean {
    return this._status === "Succeeded";
  }

  protected doFinalGetResourceRequest(): Promise<void> {
    return this.sendPollRequest();
  }
}