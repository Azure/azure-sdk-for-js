// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HybridComputeManagementContext } from "../../api/hybridComputeManagementContext.js";
import { list, get } from "../../api/extensionMetadata/operations.js";
import type {
  ExtensionMetadataListOptionalParams,
  ExtensionMetadataGetOptionalParams,
} from "../../api/extensionMetadata/options.js";
import type { ExtensionValue } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ExtensionMetadata operations. */
export interface ExtensionMetadataOperations {
  /** Gets all Extension versions based on location, publisher, extensionType */
  list: (
    location: string,
    publisher: string,
    extensionType: string,
    options?: ExtensionMetadataListOptionalParams,
  ) => PagedAsyncIterableIterator<ExtensionValue>;
  /** Gets an Extension Metadata based on location, publisher, extensionType and version */
  get: (
    location: string,
    publisher: string,
    extensionType: string,
    version: string,
    options?: ExtensionMetadataGetOptionalParams,
  ) => Promise<ExtensionValue>;
}

function _getExtensionMetadata(context: HybridComputeManagementContext) {
  return {
    list: (
      location: string,
      publisher: string,
      extensionType: string,
      options?: ExtensionMetadataListOptionalParams,
    ) => list(context, location, publisher, extensionType, options),
    get: (
      location: string,
      publisher: string,
      extensionType: string,
      version: string,
      options?: ExtensionMetadataGetOptionalParams,
    ) => get(context, location, publisher, extensionType, version, options),
  };
}

export function _getExtensionMetadataOperations(
  context: HybridComputeManagementContext,
): ExtensionMetadataOperations {
  return {
    ..._getExtensionMetadata(context),
  };
}
