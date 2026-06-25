// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementContext } from "../../api/hybridComputeManagementContext.js";
import { list } from "../../api/extensionPublisher/operations.js";
import { ExtensionPublisherListOptionalParams } from "../../api/extensionPublisher/options.js";
import { ExtensionPublisher } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ExtensionPublisher operations. */
export interface ExtensionPublisherOperations {
  /** Gets all Extension publishers based on the location */
  list: (
    location: string,
    options?: ExtensionPublisherListOptionalParams,
  ) => PagedAsyncIterableIterator<ExtensionPublisher>;
}

function _getExtensionPublisher(context: HybridComputeManagementContext) {
  return {
    list: (location: string, options?: ExtensionPublisherListOptionalParams) =>
      list(context, location, options),
  };
}

export function _getExtensionPublisherOperations(
  context: HybridComputeManagementContext,
): ExtensionPublisherOperations {
  return {
    ..._getExtensionPublisher(context),
  };
}
