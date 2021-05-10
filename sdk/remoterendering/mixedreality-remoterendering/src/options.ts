// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions } from "@azure/core-rest-pipeline";

/**
 * Options to create the RemoteRenderingClient.
 */
export interface RemoteRenderingClientOptions extends PipelineOptions {
  /**
   * Overrides the Mixed Reality STS service endpoint.
   */
  authenticationEndpointUrl?: string;
}
