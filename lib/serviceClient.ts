// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { RequestPipeline } from "./requestPipeline";
import { ServiceClientCredentials } from "./credentials/serviceClientCredentials";
import { BaseFilter } from "./filters/baseFilter";
import { ExponentialRetryPolicyFilter } from "./filters/exponentialRetryPolicyFilter";
import { SystemErrorRetryPolicyFilter } from "./filters/systemErrorRetryPolicyFilter";
import { RedirectFilter } from "./filters/redirectFilter";
import { SigningFilter } from "./filters/signingFilter";
import { RPRegistrationFilter } from "./filters/rpRegistrationFilter";
import { MsRestUserAgentFilter } from "./filters/msRestUserAgentFilter";
import { WebResource, RequestPrepareOptions } from "./webResource";
import { Constants } from "./util/constants";
import { HttpOperationResponse } from "./httpOperationResponse";

/**
 * Options to be provided while creating the client.
 */
export interface ServiceClientOptions {
  /**
   * @property {RequestInit} [requestOptions] The request options. Detailed info can be found
   * here https://github.github.io/fetch/#Request
   */
  requestOptions?: RequestInit;
  /**
   * @property {Array<BaseFilter>} [filters] An array of filters/interceptors that will
   * be processed in the request pipeline (before and after) sending the request on the wire.
   */
  filters?: BaseFilter[];
  /**
   * @property {bool} [noRetryPolicy] - If set to true, turn off the default retry policy.
   */
  noRetryPolicy?: boolean;
  /**
   * @property {number} [rpRegistrationRetryTimeout] - Gets or sets the retry timeout
   * in seconds for AutomaticRPRegistration. Default value is 30.
   */
  rpRegistrationRetryTimeout?: number;
}

/**
 * @class
 * Initializes a new instance of the ServiceClient.
 */
export class ServiceClient {
  /**
   * The string to be appended to the User-Agent header while sending the request.
   * This will be applicable only for node.js environment as the fetch library in browser does not allow setting custom UA.
   * @property {Array<string>} value - An array of string that need to be appended to the User-Agent request header.
   */
  userAgentInfo: { value: Array<string> };

  /**
   * The request pipeline that provides hooks for adding custom filters.
   * The before filters get executed before sending the request and the after filters get executed after receiving the response.
   */
  pipeline: Function;

  /**
   * The ServiceClient constructor
   * @constructor
   * @param {ServiceClientCredentials }[credentials] - BasicAuthenticationCredentials or
   * TokenCredentials object used for authentication.
   * @param { ServiceClientOptions } [options] The service client options that govern the behavior of the client.
   */
  constructor(credentials?: ServiceClientCredentials, options?: ServiceClientOptions) {
    if (!options) {
      options = {};
    }

    if (!options.requestOptions) {
      options.requestOptions = {};
    }

    if (!options.filters) {
      options.filters = [];
    }

    this.userAgentInfo = { value: [] };

    if (credentials && !credentials.signRequest) {
      throw new Error("credentials argument needs to implement signRequest method");
    }

    try {
      const moduleName = "ms-rest-js";
      const moduleVersion = Constants.msRestVersion;
      this.addUserAgentInfo(`${moduleName}/${moduleVersion}`);
    } catch (err) {
      // do nothing
    }

    if (credentials) {
      options.filters.push(new SigningFilter(credentials));
    }

    options.filters.push(new MsRestUserAgentFilter(this.userAgentInfo.value));
    options.filters.push(new RedirectFilter());
    options.filters.push(new RPRegistrationFilter(options.rpRegistrationRetryTimeout));

    if (!options.noRetryPolicy) {
      options.filters.push(new ExponentialRetryPolicyFilter());
      options.filters.push(new SystemErrorRetryPolicyFilter());
    }

    this.pipeline = new RequestPipeline(options.filters, options.requestOptions).create();
  }

  /**
   * Adds custom information to user agent header
   * @param {any} additionalUserAgentInfo - information to be added to user agent header, as string.
   */
  addUserAgentInfo(additionalUserAgentInfo: string): void {
    if (this.userAgentInfo.value.indexOf(additionalUserAgentInfo) === -1) {
      this.userAgentInfo.value.push(additionalUserAgentInfo);
    }
    return;
  }

  async sendRequest(options: RequestPrepareOptions | WebResource): Promise<HttpOperationResponse> {
    if (options === null || options === undefined || typeof options !== "object") {
      throw new Error("options cannot be null or undefined and it must be of type object.");
    }

    let httpRequest: WebResource;
    try {
      if (options instanceof WebResource) {
        options.validateRequestProperties();
        httpRequest = options;
      } else {
        httpRequest = new WebResource();
        httpRequest = httpRequest.prepare(options);
      }
    } catch (error) {
      return Promise.reject(error);
    }
    // send request
    let operationResponse: HttpOperationResponse;
    try {
      operationResponse = await this.pipeline(httpRequest);
    } catch (err) {
      return Promise.reject(err);
    }
    return Promise.resolve(operationResponse);
  }
}
