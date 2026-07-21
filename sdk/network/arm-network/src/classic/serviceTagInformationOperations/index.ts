// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list } from "../../api/serviceTagInformationOperations/operations.js";
import type { ServiceTagInformationOperationsListOptionalParams } from "../../api/serviceTagInformationOperations/options.js";
import type { ServiceTagInformation } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ServiceTagInformationOperations operations. */
export interface ServiceTagInformationOperationsOperations {
  /** Gets a list of service tag information resources with pagination. */
  list: (
    location: string,
    options?: ServiceTagInformationOperationsListOptionalParams,
  ) => PagedAsyncIterableIterator<ServiceTagInformation>;
}

function _getServiceTagInformationOperations(context: NetworkManagementContext) {
  return {
    list: (location: string, options?: ServiceTagInformationOperationsListOptionalParams) =>
      list(context, location, options),
  };
}

export function _getServiceTagInformationOperationsOperations(
  context: NetworkManagementContext,
): ServiceTagInformationOperationsOperations {
  return {
    ..._getServiceTagInformationOperations(context),
  };
}
