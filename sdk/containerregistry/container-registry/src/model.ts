// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions } from "@azure/core-http";
import { ChangeableAttributes, DeletedRepository } from "./generated";

/**
 * Re-export generated types that are used as public interfaces.
 */
export { DeletedRepository, ChangeableAttributes };

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
 * Result of a Delete Repository operation.
 */
export type DeletedRepositoryResult = DeletedRepository;
