// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions, PipelineOptions } from "@azure/core-http";

/**
 * Options to create the MixedRealityStsClient.
 */
export interface MixedRealityStsClientOptions extends PipelineOptions {
  /**
   * Overrides the Mixed Reality STS service endpoint.
   */
  endpointUrl?: string;
}

/**
 * Options to create the MixedRealityStsClient.
 */
export interface GetTokenOptions extends OperationOptions {}
