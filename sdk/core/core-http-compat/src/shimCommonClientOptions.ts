// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RedirectPolicyOptions } from "./policies/redirectPolicyOptions";
import { KeepAliveOptions } from "./policies/keepAliveOptions";
import { CommonClientOptions } from "@azure/core-client";

export interface ShimCommonClientOptions extends CommonClientOptions {
  /**
   * Options for how redirect responses are handled.
   */
  redirectOptions?: RedirectPolicyOptions;
  /**
   * Options for how HTTP connections should be maintained for future
   * requests.
   */
  keepAliveOptions?: KeepAliveOptions;
}
