// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementContext } from "../../api/hybridComputeManagementContext.js";
import { list } from "../../api/extensionType/operations.js";
import { ExtensionTypeListOptionalParams } from "../../api/extensionType/options.js";
import { ExtensionType } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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
