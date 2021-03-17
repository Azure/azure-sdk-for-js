// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions } from "@azure/core-http";
import {
  ContentProperties,
  DeletedRepositoryResult,
  RegistryArtifactProperties,
  RepositoryProperties,
  TagProperties
} from "./generated";

/**
 * Re-export generated types that are used as public interfaces.
 */
export {
  ContentProperties,
  DeletedRepositoryResult,
  RegistryArtifactProperties,
  RepositoryProperties,
  TagProperties
};

/**
 * Client options used to configure Container Registry Repository API requests.
 */
export interface ContainerRegistryClientOptions extends PipelineOptions {
  // Any custom options configured at the client level go here.
}
