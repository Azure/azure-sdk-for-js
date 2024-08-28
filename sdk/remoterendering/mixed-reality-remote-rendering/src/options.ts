// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommonClientOptions } from "@azure/core-client";

/**
 * Options to create the RemoteRenderingClient.
 */
export interface RemoteRenderingClientOptions extends CommonClientOptions {
  /**
   * Overrides the Mixed Reality STS service endpoint.
   */
  authenticationEndpointUrl?: string;
}
