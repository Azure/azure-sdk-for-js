// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeepAliveOptions } from "./policies/keepAliveOptions";
import { createDisableKeepAlivePolicy } from "./policies/disableKeepAlivePolicy";
import { RedirectOptions } from "./policies/redirectOptions";
import { redirectPolicyName } from "@azure/core-rest-pipeline";
import {
  ServiceClient,
  ServiceClientOptions,
  CommonClientOptions,
  OperationArguments,
  OperationSpec,
  FullOperationResponse,
  RawResponseCallback,
} from "@azure/core-client";

/**
 * Options specific to Shim Clients.
 */
export interface ExtendedClientOptions {
  /**
   * Options to disable keep alive.
   */
  keepAliveOptions?: KeepAliveOptions;
  /**
   * Options to redirect requests.
   */
  redirectOptions?: RedirectOptions;
}

/**
 * Options that shim clients are expected to expose.
 */
export type ExtendedServiceClientOptions = ServiceClientOptions & ExtendedClientOptions;

/**
 * The common set of options that custom shim clients are expected to expose.
 */
export type ExtendedCommonClientOptions = CommonClientOptions & ExtendedClientOptions;

/**
 * Response Object with _response property
 */
export interface ModifiedResponseObject {
  /**
   * Full Operation response from the service
   */
  _response: FullOperationResponse | undefined;
}

/**
 * Client to provide compatability between core V1 & V2.
 */
export class ExtendedServiceClient extends ServiceClient {
  /**
   * Full Operation response from the service
   */
  response: FullOperationResponse | undefined;

  /**
   * Callback (if any) provided by the user.
   */
  userProvidedCallBack: RawResponseCallback | undefined;

  constructor(options: ExtendedServiceClientOptions) {
    super(options);

    if (options.keepAliveOptions?.enable === false) {
      this.pipeline.addPolicy(createDisableKeepAlivePolicy());
    }

    if (options.redirectOptions?.handleRedirects === false) {
      this.pipeline.removePolicy({
        name: redirectPolicyName,
      });
    }
  }

  /**
   * Compatible send operation request function.
   *
   * @param operationArguments - Operation arguments
   * @param operationSpec - Operation Spec
   * @returns
   */
  async sendOperationRequest<T>(
    operationArguments: OperationArguments,
    operationSpec: OperationSpec
  ): Promise<T & ModifiedResponseObject> {
    this.userProvidedCallBack = operationArguments?.options?.onResponse;

    if (!operationArguments.options) operationArguments.options = {};
    operationArguments.options.onResponse = this.onResponse.bind(this);

    const result: T = await super.sendOperationRequest(operationArguments, operationSpec);

    // Object.defineProperty(result, "_response", {
    //   value: this.response,
    // });
    // return result;

    const mResult: T & ModifiedResponseObject = {
      ...result,
      _response: this.response,
    };

    return mResult;
  }

  /**
   * Custom callback method to capture the raw response and then call the user provided callback.
   *
   * @param rawResponse - Raw response from the service
   * @param flatResponse - Flat response from the service
   * @param error - Error returned from the service
   */
  onResponse(rawResponse: FullOperationResponse, flatResponse: unknown, error?: unknown): void {
    this.response = rawResponse;
    if (this.userProvidedCallBack) {
      this.userProvidedCallBack(rawResponse, flatResponse, error);
    }
  }
}
