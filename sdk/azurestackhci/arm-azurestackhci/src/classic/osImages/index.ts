// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import { listBySubscriptionLocationResource, get } from "../../api/osImages/operations.js";
import type {
  OsImagesListBySubscriptionLocationResourceOptionalParams,
  OsImagesGetOptionalParams,
} from "../../api/osImages/options.js";
import type { OsImage } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a OsImages operations. */
export interface OsImagesOperations {
  /** List all os images. */
  listBySubscriptionLocationResource: (
    location: string,
    options?: OsImagesListBySubscriptionLocationResourceOptionalParams,
  ) => PagedAsyncIterableIterator<OsImage>;
  /** Get a os image. */
  get: (
    location: string,
    osImageName: string,
    options?: OsImagesGetOptionalParams,
  ) => Promise<OsImage>;
}

function _getOsImages(context: AzureStackHCIContext) {
  return {
    listBySubscriptionLocationResource: (
      location: string,
      options?: OsImagesListBySubscriptionLocationResourceOptionalParams,
    ) => listBySubscriptionLocationResource(context, location, options),
    get: (location: string, osImageName: string, options?: OsImagesGetOptionalParams) =>
      get(context, location, osImageName, options),
  };
}

export function _getOsImagesOperations(context: AzureStackHCIContext): OsImagesOperations {
  return {
    ..._getOsImages(context),
  };
}
