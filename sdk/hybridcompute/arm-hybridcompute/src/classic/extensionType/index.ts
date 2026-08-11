// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HybridComputeManagementContext } from "../../api/hybridComputeManagementContext.js";
import { list } from "../../api/extensionType/operations.js";
import type { ExtensionTypeListOptionalParams } from "../../api/extensionType/options.js";
import type { ExtensionType } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ExtensionType operations. */
export interface ExtensionTypeOperations {
  /** Gets all Extension types based on location and publisher */
  list: (
    location: string,
    publisher: string,
    options?: ExtensionTypeListOptionalParams,
  ) => PagedAsyncIterableIterator<ExtensionType>;
}

function _getExtensionType(context: HybridComputeManagementContext) {
  return {
    list: (location: string, publisher: string, options?: ExtensionTypeListOptionalParams) =>
      list(context, location, publisher, options),
  };
}

export function _getExtensionTypeOperations(
  context: HybridComputeManagementContext,
): ExtensionTypeOperations {
  return {
    ..._getExtensionType(context),
  };
}
