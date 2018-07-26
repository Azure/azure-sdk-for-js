// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpOperationResponse, RequestOptionsBase, RequestPrepareOptions, ServiceClient, ServiceClientCredentials, ServiceClientOptions, WebResource } from "ms-rest-js";
import { createLROPollStrategy, LROPollStrategy } from "./lroPollStrategy";
import * as Constants from "./util/constants";

/**
 * Options to be provided while creating the client.
 */
export interface AzureServiceClientOptions extends ServiceClientOptions {
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
export class AzureServiceClient extends ServiceClient {
  public acceptLanguage: string = Constants.DEFAULT_LANGUAGE;
  /**
   * The retry timeout in seconds for Long Running Operations. Default value is 30.
   */
  public longRunningOperationRetryTimeout?: number;

  constructor(credentials: ServiceClientCredentials, options?: AzureServiceClientOptions) {
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
   * @param {AzureRequestOptionsBase} [options] Additional options to be sent while making the request
   * @returns {Promise<msRest.HttpOperationResponse>} The HttpOperationResponse containing the final polling request, response and the responseBody.
   */
  async sendLongRunningRequest(request: RequestPrepareOptions | WebResource, options?: RequestOptionsBase): Promise<HttpOperationResponse> {
    return this.sendRequest(request).then((response: HttpOperationResponse) => this.getLongRunningOperationResult(response, options));
  }

  /**
   * Poll Azure long running PUT, PATCH, POST or DELETE operations.
   * @param {HttpOperationResponse} initialResponse - response of the initial request which is a part of the asynchronous polling operation.
   * @param {AzureRequestOptionsBase} [options] - custom request options.
   * @returns {Promise<HttpOperationResponse>} The final response after polling is complete.
   */
  async getLongRunningOperationResult(initialResponse: HttpOperationResponse, options?: RequestOptionsBase): Promise<HttpOperationResponse> {
    const lroPollStrategy: LROPollStrategy | undefined = createLROPollStrategy(initialResponse, this, options);
    if (!lroPollStrategy) {
      return initialResponse;
    } else {
      const succeeded: boolean = await lroPollStrategy.pollUntilFinished();
      if (succeeded) {
        return lroPollStrategy.getOperationResponse();
      } else {
        throw lroPollStrategy.getRestError();
      }
    }
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