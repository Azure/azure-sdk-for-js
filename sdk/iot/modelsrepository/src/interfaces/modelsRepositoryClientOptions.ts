// Copyright (c) Microsoft.
// Licensed under the MIT license.

import { InternalClientPipelineOptions } from "@azure/core-client";
import { dependencyResolutionType } from "../internal";


/**
 * Options for creating a Pipeline to use with ModelsRepositoryClient.
 * It serves to configure the client itself, for instance by specifying
 * the repository location to use on any getModels call.
 */
export interface ModelsRepositoryClientOptions extends InternalClientPipelineOptions {
  /**
   * This is the base location (URI or path) that requests will be made against for this client.
   */
  repositoryLocation?: string;
  /**
   * Though currently not relevant, can be used in future iterations to specify the API Version
   * of the service.
   */
  apiVersion?: string;

  /**
   * This is the format of dependency resolution (no dependency resolution, standard dependency
   * resolution, resolution using the expanded json format) that will be used when retrieving 
   * models.
   */
  dependencyResolution?: dependencyResolutionType;
}
