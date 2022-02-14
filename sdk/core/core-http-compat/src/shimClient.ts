// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ServiceClient } from "@azure/core-client";
import { KeepAliveOptions } from "./policies/keepAliveOptions";
import { createKeepAlivePolicy } from "./policies/keepAlivePolicy";
import { RedirectPolicyOptions } from "./policies/redirectPolicyOptions";
import { redirectPolicyName } from "@azure/core-rest-pipeline";
import { ServiceClientOptions } from "@azure/core-client";

export interface ShimClientOptions extends ServiceClientOptions {
  keepAliveOptions?: KeepAliveOptions;
  redirectOptions?: RedirectPolicyOptions;
}

export class ShimClient extends ServiceClient {
  constructor(options: ShimClientOptions) {
    super(options);

    if (options.keepAliveOptions?.enable === false) {
      this.pipeline.addPolicy(createKeepAlivePolicy());
    }

    if (options.redirectOptions?.handleRedirects === false) {
      this.pipeline.removePolicy({
        name: redirectPolicyName,
      });
    }
  }
}
