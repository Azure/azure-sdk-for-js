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
  optionsOfInitialRequest!: msRest.RequestOptionsBase;
  /**
   * @param {msRest.WebResource} [request] - provides information about the request made for polling.
   */
  request: msRest.WebResource;
  /**
   * @param {Response} [response] - The response object to extract longrunning operation status.
   */
  response!: msRest.HttpOperationResponse;
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
    this.updateResponse(resultOfInitialRequest);
    this.request = resultOfInitialRequest.request;
    // Parse response.body & assign it as the resource.
    try {
      if (resultOfInitialRequest.bodyAsText && resultOfInitialRequest.bodyAsText.length > 0) {
        this.resource = JSON.parse(resultOfInitialRequest.bodyAsText);
      } else {
        this.resource = resultOfInitialRequest.parsedBody;
      }
    } catch (error) {
      const deserializationError = new msRest.RestError(`Error "${error}" occurred in parsing the responseBody " +
        "while creating the PollingState for Long Running Operation- "${resultOfInitialRequest.bodyAsText}"`);
      deserializationError.request = resultOfInitialRequest.request;
      deserializationError.response = resultOfInitialRequest;
      throw deserializationError;
    }
    const resource = this.resource;
    let status: string | undefined;
    switch (this.response.status) {
      case 202:
        status = LroStates.InProgress;
        break;

      case 204:
        status = LroStates.Succeeded;
        break;

      case 201:
        if (resource && resource.properties && resource.properties.provisioningState) {
          status = resource.properties.provisioningState;
        } else {
          status = LroStates.InProgress;
        }
        break;

      case 200:
        if (resource && resource.properties && resource.properties.provisioningState) {
          status = resource.properties.provisioningState;
        } else {
          status = LroStates.Succeeded;
        }
        break;

      default:
        status = LroStates.Failed;
        break;
    }
    this.status = status;
  }

  /**
   * Update cached data using the provided response object
   * @param {Response} [response] - provider response object.
   */
  updateResponse(response: msRest.HttpOperationResponse) {
    this.response = response;
    if (response && response.headers) {
      const asyncOperationHeader: string | undefined = response.headers.get("azure-asyncoperation");
      const locationHeader: string | undefined = response.headers.get("location");
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
    const retryTimeout = this.retryTimeout;
    if (retryTimeout || retryTimeout === 0) {
      return retryTimeout * 1000;
    }
    if (this.response) {
      const retryAfter: string | undefined = this.response.headers.get("retry-after");
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
    const result = { ...this.response, headers: this.response.headers.clone() };
    const resource = this.resource;
    if (resource && typeof resource.valueOf() === "string") {
      result.bodyAsText = resource;
      result.parsedBody = JSON.parse(resource);
    } else {
      result.parsedBody = resource;
      result.bodyAsText = JSON.stringify(resource);
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