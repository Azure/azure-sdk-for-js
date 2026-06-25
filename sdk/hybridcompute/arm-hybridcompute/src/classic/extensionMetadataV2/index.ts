// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementContext } from "../../api/hybridComputeManagementContext.js";
import { list, get } from "../../api/extensionMetadataV2/operations.js";
import {
  ExtensionMetadataV2ListOptionalParams,
  ExtensionMetadataV2GetOptionalParams,
} from "../../api/extensionMetadataV2/options.js";
import { ExtensionValueV2 } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ExtensionMetadataV2 operations. */
export interface ExtensionMetadataV2Operations {
  /** Gets all Extension versions based on location, publisher, extensionType */
  list: (
    location: string,
    publisher: string,
    extensionType: string,
    options?: ExtensionMetadataV2ListOptionalParams,
  ) => PagedAsyncIterableIterator<ExtensionValueV2>;
  /** Gets an Extension Metadata based on location, publisher, extensionType and version */
  get: (
    location: string,
    publisher: string,
    extensionType: string,
    version: string,
    options?: ExtensionMetadataV2GetOptionalParams,
  ) => Promise<ExtensionValueV2>;
}

function _getExtensionMetadataV2(context: HybridComputeManagementContext) {
  return {
    list: (
      location: string,
      publisher: string,
      extensionType: string,
      options?: ExtensionMetadataV2ListOptionalParams,
    ) => list(context, location, publisher, extensionType, options),
    get: (
      location: string,
      publisher: string,
      extensionType: string,
      version: string,
      options?: ExtensionMetadataV2GetOptionalParams,
    ) => get(context, location, publisher, extensionType, version, options),
  };
}

export function _getExtensionMetadataV2Operations(
  context: HybridComputeManagementContext,
): ExtensionMetadataV2Operations {
  return {
    ..._getExtensionMetadataV2(context),
  };
}
