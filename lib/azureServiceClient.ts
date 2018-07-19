// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as msRest from "ms-rest-js";
import PollingState from "./pollingState";
import Constants, { LongRunningOperationStates as LroStates } from "./util/constants";
import { HttpLongRunningOperationResponse } from "./httpLongRunningOperationResponse";

/**
 * Options to be provided while creating the client.
 */
export interface AzureServiceClientOptions extends msRest.ServiceClientOptions {
  /**
   * @property {string} [options.acceptLanguage] - Gets or sets the preferred language for the response. Default value is: "en-US".
   */
  acceptLanguage?: string;

  /**
   * @property {number} [options.longRunningOperationRetryTimeout] - Gets or sets the retry timeout in seconds for
   * Long Running Operations. Default value is 30.
   */
  longRunningOperationRetryTimeout?: number;
}

/**
 * @class
 * Initializes a new instance of the AzureServiceClient class.
 * @constructor
 *
 * @param {msRest.ServiceClientCredentilas} credentials - ApplicationTokenCredentials or
 * UserTokenCredentials object used for authentication.
 * @param {AzureServiceClientOptions} options - The parameter options used by AzureServiceClient
 */
export class AzureServiceClient extends msRest.ServiceClient {
  acceptLanguage: string = Constants.DEFAULT_LANGUAGE;
  longRunningOperationRetryTimeout = 30;

  constructor(credentials: msRest.ServiceClientCredentials, options?: AzureServiceClientOptions) {
    super(credentials, options = updateOptionsWithDefaultValues(options));

    if (options.acceptLanguage != undefined) {
      this.acceptLanguage = options.acceptLanguage;
    }

    if (options.longRunningOperationRetryTimeout != undefined) {
      this.longRunningOperationRetryTimeout = options.longRunningOperationRetryTimeout;
    }

    this.addUserAgentInfo(`ms-rest-azure/${Constants.msRestAzureVersion}`);
  }

  /**
   * Provides a mechanism to make a request that will poll and provide the final result.
   * @param {msRest.RequestPrepareOptions|msRest.WebResource} request - The request object
   * @param {msRest.RequestOptionsBase} [options] Additional options to be sent while making the request
   * @returns {Promise<msRest.HttpOperationResponse>} The HttpOperationResponse containing the final polling request, response and the responseBody.
   */
  async sendLongRunningRequest(request: msRest.RequestPrepareOptions | msRest.WebResource, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse> {
    const initialResponse: msRest.HttpOperationResponse = await this.sendRequest(request);
    const httpLongRunningOperationResponse = new HttpLongRunningOperationResponse(this);
    return httpLongRunningOperationResponse.getLongRunningOperationResult(initialResponse, options);
  }
}

export function updateOptionsWithDefaultValues(options?: AzureServiceClientOptions): AzureServiceClientOptions {
  if (!options) {
    options = {};
  }
  if (options.generateClientRequestIdHeader == undefined) {
    options.generateClientRequestIdHeader = true;
  }
  return options;
}