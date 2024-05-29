// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeepAliveOptions } from "./policies/keepAliveOptions.js";
import {
  createDisableKeepAlivePolicy,
  pipelineContainsDisableKeepAlivePolicy,
} from "./policies/disableKeepAlivePolicy.js";
import { RedirectOptions } from "./policies/redirectOptions.js";
import { redirectPolicyName } from "@azure/core-rest-pipeline";
import {
  CommonClientOptions,
  FullOperationResponse,
  OperationArguments,
  OperationSpec,
  RawResponseCallback,
  ServiceClient,
  ServiceClientOptions,
} from "@azure/core-client";
import { toCompatResponse } from "./response.js";

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
 * Client to provide compatability between core V1 & V2.
 */
export class ExtendedServiceClient extends ServiceClient {
  constructor(options: ExtendedServiceClientOptions) {
    super(options);

    if (
      options.keepAliveOptions?.enable === false &&
      !pipelineContainsDisableKeepAlivePolicy(this.pipeline)
    ) {
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
    operationSpec: OperationSpec,
  ): Promise<T> {
    const userProvidedCallBack: RawResponseCallback | undefined =
      operationArguments?.options?.onResponse;

    let lastResponse: FullOperationResponse | undefined;

    function onResponse(
      rawResponse: FullOperationResponse,
      flatResponse: unknown,
      error?: unknown,
    ): void {
      lastResponse = rawResponse;
      if (userProvidedCallBack) {
        userProvidedCallBack(rawResponse, flatResponse, error);
      }
    }

    operationArguments.options = {
      ...operationArguments.options,
      onResponse,
    };

    const result: T = await super.sendOperationRequest(operationArguments, operationSpec);

    if (lastResponse) {
      Object.defineProperty(result, "_response", {
        value: toCompatResponse(lastResponse),
      });
    }

    return result;
  }
}
