// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list } from "../../api/serviceTags/operations.js";
import type { ServiceTagsListOptionalParams } from "../../api/serviceTags/options.js";
import type { ServiceTagsListResult } from "../../models/microsoft/network/models.js";

/** Interface representing a ServiceTags operations. */
export interface ServiceTagsOperations {
  /** Gets a list of service tag information resources. */
  list: (
    location: string,
    options?: ServiceTagsListOptionalParams,
  ) => Promise<ServiceTagsListResult>;
}

function _getServiceTags(context: NetworkManagementContext) {
  return {
    list: (location: string, options?: ServiceTagsListOptionalParams) =>
      list(context, location, options),
  };
}

export function _getServiceTagsOperations(
  context: NetworkManagementContext,
): ServiceTagsOperations {
  return {
    ..._getServiceTags(context),
  };
}
