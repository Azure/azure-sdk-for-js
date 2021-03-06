// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions } from "@azure/core-http";

/**
 * Client options used to configure Container Registry Repository API requests.
 */
export interface ContainerRegistryClientOptions extends PipelineOptions {
  // Any custom options configured at the client level go here.
}

export interface ContentProperties {
  canDelete?: boolean;
  canList?: boolean;
  canRead?: boolean;
  canWrite?: boolean;
}
