// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions } from "@azure/core-http";
import {
  ChangeableAttributes,
  DeletedRepository,
  ManifestAttributes,
  RepositoryAttributes,
  TagAttributes
} from "./generated";

/**
 * Re-export generated types that are used as public interfaces.
 */
export {
  DeletedRepository,
  ChangeableAttributes,
  ManifestAttributes,
  RepositoryAttributes,
  TagAttributes
};

/**
 * Client options used to configure Container Registry Repository API requests.
 */
export interface ContainerRegistryClientOptions extends PipelineOptions {
  // Any custom options configured at the client level go here.
}

/**
 * Content properties.
 */
export type ContentProperties = ChangeableAttributes;

/**
 * Repository properties.
 */
export type RepositoryProperties = RepositoryAttributes;

/**
 * Result of a Delete Repository operation.
 */
export type DeletedRepositoryResult = DeletedRepository;

/** Tag properties details */
export interface TagProperties {
  /** Tag name */
  name?: string;
  /** Tag digest */
  digest?: string;
  /** Tag created time */
  createdOn?: Date;
  /** Tag last update time */
  lastUpdatedOn?: Date;
  /** Changeable properties */
  modifiableProperties?: ContentProperties;
  /** Registry name */
  registry: string;
  /** Repository name */
  repository: string;
}

export type RegistryArtifactProperties = ManifestAttributes;
