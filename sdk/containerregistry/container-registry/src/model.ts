// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions } from "@azure/core-rest-pipeline";
import {
  ContentProperties,
  DeleteRepositoryResult,
  RegistryArtifactProperties as ServiceRegistryArtifactProperties,
  RepositoryProperties,
  ManifestAttributesManifestReferences,
  TagProperties
} from "./generated";

/**
 * Re-export generated types that are used as public interfaces.
 */
export {
  ContentProperties,
  DeleteRepositoryResult,
  RepositoryProperties,
  ManifestAttributesManifestReferences,
  ServiceRegistryArtifactProperties,
  TagProperties
};

/**
 * Client options used to configure Container Registry Repository API requests.
 */
export interface ContainerRegistryClientOptions extends PipelineOptions {
  // Any custom options configured at the client level go here.
}

/** Manifest attributes details */
export type RegistryArtifactProperties = Omit<ServiceRegistryArtifactProperties, "references"> & {
  registryArtifacts?: RegistryArtifactProperties[];
};
