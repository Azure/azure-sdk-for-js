// Copyright (c) Microsoft.
// Licensed under the MIT license.

import { dependencyResolutionType } from "../internal";

/**
 * Options for getting models.
 */
export interface GetModelsOptions {
  /**
   * This is the format of dependency resolution (no dependency resolution, standard dependency
   * resolution, resolution using the expanded json format) that will be used when retrieving 
   * models. This overwrites the default dependencyResolution settings of the client. 
   */
  dependencyResolution: dependencyResolutionType;
}
