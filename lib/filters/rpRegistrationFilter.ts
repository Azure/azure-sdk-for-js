// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { BaseFilter } from "./baseFilter";
import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResource } from "../webResource";
import * as utils from "../util/utils";

/* tslint:disable:prefer-const */
let retryTimeout = 30;
/* tslint:enable:prefer-const */

export class RPRegistrationFilter extends BaseFilter {

  constructor(retryTimeout = 30) {
    super();
    retryTimeout = retryTimeout;
  }

  async after(operationResponse: HttpOperationResponse): Promise<HttpOperationResponse> {
    let rpName, urlPrefix;
    const options = operationResponse.request;
    if (operationResponse.response.status === 409) {
      rpName = this.checkRPNotRegisteredError(operationResponse.bodyAsText as string);
    }
    if (rpName) {
      urlPrefix = this.extractSubscriptionUrl(options.url);
      let registrationStatus = false;
      try {
        registrationStatus = await this.registerRP(urlPrefix, rpName, options);
      } catch (err) {
        // Autoregistration of ${provider} failed for some reason. We will not return this error
        // instead will return the initial response with 409 status code back to the user.
        // do nothing here as we are returning the original response at the end of this method.
      }

      if (registrationStatus) {
        // Retry the original request. We have to change the x-ms-client-request-id
        // otherwise Azure endpoint will return the initial 409 (cached) response.
        options.headers["x-ms-client-request-id"] = utils.generateUuid();
        let finalRes: HttpOperationResponse;
        try {
          finalRes = await utils.dispatchRequest(options);
        } catch (err) {
          return Promise.reject(err);
        }
        return Promise.resolve(finalRes);
      }
    }
    return Promise.resolve(operationResponse);
  }

  /**
   * Reuses the headers of the original request and url (if specified).
   * @param {WebResource} originalRequest The original request
   * @param {boolean} reuseUrlToo Should the url from the original request be reused as well. Default false.
   * @returns {object} reqOptions - A new request object with desired headers.
   */
  getRequestEssentials(originalRequest: WebResource, reuseUrlToo = false): any {
    const reqOptions: any = {
      headers: {}
    };
    if (reuseUrlToo) {
      reqOptions.url = originalRequest.url;
    }

    // Copy over the original request headers. This will get us the auth token and other useful stuff from
    // the original request header. Thus making it easier to make requests from this filter.
    for (const h in originalRequest.headers) {
      reqOptions.headers[h] = originalRequest.headers[h];
    }
    // We have to change the x-ms-client-request-id otherwise Azure endpoint
    // will return the initial 409 (cached) response.
    reqOptions.headers["x-ms-client-request-id"] = utils.generateUuid();

    // Set content-type to application/json
    reqOptions.headers["Content-Type"] = "application/json; charset=utf-8";

    return reqOptions;
  }

  /**
   * Validates the error code and message associated with 409 response status code. If it matches to that of
   * RP not registered then it returns the name of the RP else returns undefined.
   * @param {string} body - The response body received after making the original request.
   * @returns {string} result The name of the RP if condition is satisfied else undefined.
   */
  checkRPNotRegisteredError(body: string): string {
    let result, responseBody;
    if (body) {
      try {
        responseBody = JSON.parse(body);
      } catch (err) {
        // do nothing;
      }
      if (responseBody && responseBody.error && responseBody.error.message &&
        responseBody.error.code && responseBody.error.code === "MissingSubscriptionRegistration") {
        const matchRes = responseBody.error.message.match(/.*'(.*)'/i);
        if (matchRes) {
          result = matchRes.pop();
        }
      }
    }
    return result;
  }

  /**
   * Extracts the first part of the URL, just after subscription:
   * https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/
   * @param {string} url - The original request url
   * @returns {string} urlPrefix The url prefix as explained above.
   */
  extractSubscriptionUrl(url: string): string {
    let result;
    const matchRes = url.match(/.*\/subscriptions\/[a-f0-9-]+\//ig);
    if (matchRes && matchRes[0]) {
      result = matchRes[0];
    } else {
      throw new Error(`Unable to extract subscriptionId from the given url - ${url}.`);
    }
    return result;
  }

  /**
   * Registers the given provider.
   * @param {string} urlPrefix - https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/
   * @param {string} provider - The provider name to be registered.
   * @param {object} originalRequest - The original request sent by the user that returned a 409 response
   * with a message that the provider is not registered.
   * @param {registrationCallback} callback - The callback that handles the RP registration
   */
  async registerRP(urlPrefix: string, provider: string, originalRequest: WebResource): Promise<boolean> {
    const postUrl = `${urlPrefix}providers/${provider}/register?api-version=2016-02-01`;
    const getUrl = `${urlPrefix}providers/${provider}?api-version=2016-02-01`;
    const reqOptions = this.getRequestEssentials(originalRequest);
    reqOptions.method = "POST";
    reqOptions.url = postUrl;
    let res: HttpOperationResponse;
    try {
      res = await utils.dispatchRequest(reqOptions);
    } catch (err) {
      return Promise.reject(err);
    }
    if (res.response.status !== 200) {
      return Promise.reject(new Error(`Autoregistration of ${provider} failed. Please try registering manually.`));
    }
    let statusRes = false;
    try {
      statusRes = await this.getRegistrationStatus(getUrl, originalRequest);
    } catch (err) {
      return Promise.reject(err);
    }
    return Promise.resolve(statusRes);
  }

  /**
   * Polls the registration status of the provider that was registered. Polling happens at an interval of 30 seconds.
   * Polling will happen till the registrationState property of the response body is "Registered".
   * @param {string} url - The request url for polling
   * @param {object} originalRequest - The original request sent by the user that returned a 409 response
   * with a message that the provider is not registered.
   * @returns {Promise<boolean>} promise - True if RP Registration is successful.
   */
  async getRegistrationStatus(url: string, originalRequest: WebResource): Promise<boolean> {
    const reqOptions: any = this.getRequestEssentials(originalRequest);
    let res: HttpOperationResponse;
    let result = false;
    reqOptions.url = url;
    reqOptions.method = "GET";
    try {
      res = await utils.dispatchRequest(reqOptions);
    } catch (err) {
      return Promise.reject(err);
    }
    const obj = (res.bodyAsJson as any);
    if (res.bodyAsJson && obj.registrationState && obj.registrationState === "Registered") {
      result = true;
    } else {
      setTimeout(() => { return this.getRegistrationStatus(url, originalRequest); }, retryTimeout * 1000);
    }
    return Promise.resolve(result);
  }
}