// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import Constants from "./util/constants";
import * as msRest from "ms-rest-js";
const LroStates = Constants.LongRunningOperationStates;

/**
 * @class
 * Initializes a new instance of the PollingState class.
 */
export default class PollingState {
  /**
   * @param {msRest.HttpOperationResponse} [response] - Response of the initial request that was made as a part of the asynchronous operation.
   */
  resultOfInitialRequest: msRest.HttpOperationResponse;
  /**
   * @param {msRest.RequestOptionsBase} [optionsOfInitialRequest] - Request options that were provided as a part of the initial request.
   */
  optionsOfInitialRequest: msRest.RequestOptionsBase;
  /**
   * @param {msRest.WebResource} [request] - provides information about the request made for polling.
   */
  request: msRest.WebResource;
  /**
   * @param {Response} [response] - The response object to extract longrunning operation status.
   */
  response: Response;
  /**
   * @param {any} [resource] - Provides information about the response body received in the polling request. Particularly useful when polling via provisioningState.
   */
  resource: any;
  /**
   * @param {number} [retryTimeout] - The timeout in seconds to retry on intermediate operation results. Default Value is 30.
   */
  retryTimeout = 30;
  /**
   * @param {string} [azureAsyncOperationHeaderLink] - The url that is present in "azure-asyncoperation" response header.
   */
  azureAsyncOperationHeaderLink?: string;
  /**
   * @param {string} [locationHeaderLink] - The url that is present in "Location" response header.
   */
  locationHeaderLink?: string;
  /**
   * @param {string} [status] - The status of polling. "Succeeded, Failed, Cancelled, Updating, Creating, etc."
   */
  status?: string;
  /**
   * @param {msRest.RestError} [error] - Provides information about the error that happened while polling.
   */
  error?: msRest.RestError;

  constructor(resultOfInitialRequest: msRest.HttpOperationResponse, retryTimeout = 30) {
    this.resultOfInitialRequest = resultOfInitialRequest;
    this.retryTimeout = retryTimeout;
    this.updateResponse(resultOfInitialRequest.response);
    this.request = resultOfInitialRequest.request;
    // Parse response.body & assign it as the resource.
    try {
      if (resultOfInitialRequest.bodyAsText && resultOfInitialRequest.bodyAsText.length > 0) {
        this.resource = JSON.parse(resultOfInitialRequest.bodyAsText);
      } else {
        this.resource = resultOfInitialRequest.bodyAsJson;
      }
    } catch (error) {
      const deserializationError = new msRest.RestError(`Error "${error}" occurred in parsing the responseBody " +
        "while creating the PollingState for Long Running Operation- "${resultOfInitialRequest.bodyAsText}"`);
      deserializationError.request = resultOfInitialRequest.request;
      deserializationError.response = resultOfInitialRequest.response;
      throw deserializationError;
    }
    switch (this.response.status) {
      case 202:
        this.status = LroStates.InProgress;
        break;

      case 204:
        this.status = LroStates.Succeeded;
        break;

      case 201:
        if (this.resource && this.resource.properties && this.resource.properties.provisioningState) {
          this.status = this.resource.properties.provisioningState;
        } else {
          this.status = LroStates.InProgress;
        }
        break;

      case 200:
        if (this.resource && this.resource.properties && this.resource.properties.provisioningState) {
          this.status = this.resource.properties.provisioningState;
        } else {
          this.status = LroStates.Succeeded;
        }
        break;

      default:
        this.status = LroStates.Failed;
        break;
    }
  }

  /**
   * Update cached data using the provided response object
   * @param {Response} [response] - provider response object.
   */
  updateResponse(response: Response) {
    this.response = response;
    if (response && response.headers) {
      const asyncOperationHeader: string | null | undefined = response.headers.get("azure-asyncoperation");
      const locationHeader: string | null | undefined = response.headers.get("location");
      if (asyncOperationHeader) {
        this.azureAsyncOperationHeaderLink = asyncOperationHeader;
      }

      if (locationHeader) {
        this.locationHeaderLink = locationHeader;
      }
    }
  }

  /**
   * Gets timeout in milliseconds.
   * @returns {number} timeout
   */
  getTimeout() {
    if (this.retryTimeout || this.retryTimeout === 0) {
      return this.retryTimeout * 1000;
    }
    if (this.response) {
      const retryAfter: string | null | undefined = this.response.headers.get("retry-after");
      if (retryAfter) {
        return parseInt(retryAfter) * 1000;
      }
    }
    return 30 * 1000;
  }

  /**
   * Returns long running operation result.
   * @returns {msRest.HttpOperationResponse} HttpOperationResponse
   */
  getOperationResponse(): msRest.HttpOperationResponse {
    const result = new msRest.HttpOperationResponse(this.request, this.response);
    if (this.resource && typeof this.resource.valueOf() === "string") {
      result.bodyAsText = this.resource;
      result.bodyAsJson = JSON.parse(this.resource);
    } else {
      result.bodyAsJson = this.resource;
      result.bodyAsText = JSON.stringify(this.resource);
    }
    return result;
  }

  /**
   * Returns an Error on operation failure.
   * @param {Error} err - The error object.
   * @returns {msRest.RestError} The RestError defined in the runtime.
   */
  getRestError(err?: Error): msRest.RestError {
    let errMsg: string;
    let errCode: string | undefined = undefined;

    const error = new msRest.RestError("");
    error.request = msRest.stripRequest(this.request);
    error.response = this.response;
    const parsedResponse = this.resource as { [key: string]: any };

    if (err && err.message) {
      errMsg = `Long running operation failed with error: "${err.message}".`;
    } else {
      errMsg = `Long running operation failed with status: "${this.status}".`;
    }

    if (parsedResponse) {
      if (parsedResponse.error && parsedResponse.error.message) {
        errMsg = `Long running operation failed with error: "${parsedResponse.error.message}".`;
      }
      if (parsedResponse.error && parsedResponse.error.code) {
        errCode = parsedResponse.error.code as string;
      }
    }

    error.message = errMsg;
    if (errCode) error.code = errCode;
    error.body = parsedResponse;
    return error;
  }
}