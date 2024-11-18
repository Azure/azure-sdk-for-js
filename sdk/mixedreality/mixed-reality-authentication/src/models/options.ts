// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CommonClientOptions, OperationOptions } from "@azure/core-client";

/**
 * Options to create the MixedRealityStsClient.
 */
export interface MixedRealityStsClientOptions extends CommonClientOptions {
  /**
   * Overrides the Mixed Reality STS service endpoint.
   */
  customEndpointUrl?: string;
}

/**
 * Options to create the MixedRealityStsClient.
 */
export interface GetTokenOptions extends OperationOptions {}
