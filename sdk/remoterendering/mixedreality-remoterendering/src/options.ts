// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions } from "@azure/core-http";

/**
 * Options to create the MixedRealityStsClient.
 */
export interface RemoteRenderingClientOptions extends PipelineOptions {
  /**
   * Overrides the Mixed Reality STS service endpoint.
   */
  authenticationEndpointUrl?: string;
}

/**
 * Options to create the MixedRealityStsClient.
 */
//export interface GetTokenOptions extends OperationOptions {}
