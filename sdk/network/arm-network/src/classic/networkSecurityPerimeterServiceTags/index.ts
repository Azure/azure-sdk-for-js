// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list } from "../../api/networkSecurityPerimeterServiceTags/operations.js";
import type { NetworkSecurityPerimeterServiceTagsListOptionalParams } from "../../api/networkSecurityPerimeterServiceTags/options.js";
import type { NspServiceTagsResource } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a NetworkSecurityPerimeterServiceTags operations. */
export interface NetworkSecurityPerimeterServiceTagsOperations {
  /** Gets the list of service tags supported by NSP. These service tags can be used to create access rules in NSP. */
  list: (
    location: string,
    options?: NetworkSecurityPerimeterServiceTagsListOptionalParams,
  ) => PagedAsyncIterableIterator<NspServiceTagsResource>;
}

function _getNetworkSecurityPerimeterServiceTags(context: NetworkManagementContext) {
  return {
    list: (location: string, options?: NetworkSecurityPerimeterServiceTagsListOptionalParams) =>
      list(context, location, options),
  };
}

export function _getNetworkSecurityPerimeterServiceTagsOperations(
  context: NetworkManagementContext,
): NetworkSecurityPerimeterServiceTagsOperations {
  return {
    ..._getNetworkSecurityPerimeterServiceTags(context),
  };
}
