// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ServiceClient } from "@azure/core-client";
import { KeepAliveOptions } from "./policies/keepAliveOptions";
import { createDisableKeepAlivePolicy } from "./policies/disableKeepAlivePolicy";
import { RedirectOptions } from "./policies/redirectOptions";
import { redirectPolicyName } from "@azure/core-rest-pipeline";
import { ServiceClientOptions } from "@azure/core-client";
import { CommonClientOptions } from "@azure/core-client";

/**
 * Options specific to Shim Clients.
 */
export interface ExtendedOptions {
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
export type ExtendedServiceClientOptions = ServiceClientOptions & ExtendedOptions;

/**
 * The common set of options that custom shim clients are expected to expose.
 */
export type ExtendedCommonClientOptions = CommonClientOptions & ExtendedOptions;

/**
 * Client to provide compatability between core V1 & V2.
 */
export class ExtendedServiceClient extends ServiceClient {
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
}
