// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list } from "../../api/serviceTagInformation/operations.js";
import type { ServiceTagInformationListOptionalParams } from "../../api/serviceTagInformation/options.js";
import type { ServiceTagInformation } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ServiceTagInformation operations. */
export interface ServiceTagInformationOperations {
  /** Gets a list of service tag information resources with pagination. */
  list: (
    location: string,
    options?: ServiceTagInformationListOptionalParams,
  ) => PagedAsyncIterableIterator<ServiceTagInformation>;
}

function _getServiceTagInformation(context: NetworkManagementContext) {
  return {
    list: (location: string, options?: ServiceTagInformationListOptionalParams) =>
      list(context, location, options),
  };
}

export function _getServiceTagInformationOperations(
  context: NetworkManagementContext,
): ServiceTagInformationOperations {
  return {
    ..._getServiceTagInformation(context),
  };
}
