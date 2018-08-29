// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpOperationResponse, OperationArguments, OperationSpec, RequestOptionsBase, RequestPrepareOptions, ServiceClient, ServiceClientCredentials, ServiceClientOptions, WebResource } from "ms-rest-js";
import { createLROPollerFromInitialResponse, createLROPollerFromPollState, LROPoller } from "./lroPoller";
import { LROPollState } from "./lroPollStrategy";
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

    // For convenience, if the credentials have an associated AzureEnvironment,
    // automatically use the baseUri from that environment.
    const env = (credentials as any).environment;
    if (env && !this.baseUri) {
      this.baseUri = env.resourceManagerEndpointUrl;
    }

    if (options.acceptLanguage != undefined) {
      this.acceptLanguage = options.acceptLanguage;
    }

    if (options.longRunningOperationRetryTimeout != undefined) {
      this.longRunningOperationRetryTimeout = options.longRunningOperationRetryTimeout;
    }

    this.addUserAgentInfo(`ms-rest-azure/${Constants.msRestAzureVersion}`);
  }

  /**
   * Send the initial request of a LRO (long running operation) and get back an
   * LROPoller that provides methods for polling the LRO and checking if the LRO is finished.
   * @param operationArguments The arguments to the operation.
   * @param operationSpec The specification for the operation.
   * @param options Additional options to be sent while making the request.
   * @returns The LROPoller object that provides methods for interacting with the LRO.
   */
  sendLRORequest(operationArguments: OperationArguments, operationSpec: OperationSpec, options?: RequestOptionsBase): Promise<LROPoller> {
    return this.sendOperationRequest(operationArguments, operationSpec)
      .then(initialResponse => createLROPollerFromInitialResponse(this, initialResponse._response, options));
  }

  /**
   * Provides a mechanism to make a request that will poll and provide the final result.
   * @param {msRest.RequestPrepareOptions|msRest.WebResource} request - The request object
   * @param {AzureRequestOptionsBase} [options] Additional options to be sent while making the request
   * @returns {Promise<msRest.HttpOperationResponse>} The HttpOperationResponse containing the final polling request, response and the responseBody.
   */
  sendLongRunningRequest(request: RequestPrepareOptions | WebResource, options?: RequestOptionsBase): Promise<HttpOperationResponse> {
    return this.beginLongRunningRequest(request, options)
      .then((lroResponse: LROPoller) => lroResponse.pollUntilFinished())
      .then(res => res._response);
  }

  /**
   * Send the initial request of a LRO (long running operation) and get back an
   * HttpLongRunningOperationResponse that provides methods for polling the LRO and checking if the
   * LRO is finished.
   * @param {msRest.RequestPrepareOptions|msRest.WebResource} request - The request object
   * @param {AzureRequestOptionsBase} [options] Additional options to be sent while making the request
   * @returns {Promise<LROPoller>} The HttpLongRunningOperationResponse
   * that provides methods for interacting with the LRO.
   */
  beginLongRunningRequest(request: RequestPrepareOptions | WebResource, options?: RequestOptionsBase): Promise<LROPoller> {
    return this.sendRequest(request)
      .then((initialResponse: HttpOperationResponse) => createLROPollerFromInitialResponse(this, initialResponse, options));
  }

  /**
   * Restore an LROPoller from the provided LROPollState. This method can be used to recreate an
   * LROPoller on a different process or machine.
   */
  restoreLROPoller(lroPollState: LROPollState): LROPoller {
    return createLROPollerFromPollState(this, lroPollState);
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