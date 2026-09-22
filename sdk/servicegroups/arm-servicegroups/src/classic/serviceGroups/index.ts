// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceGroupsManagementContext } from "../../api/serviceGroupsManagementContext.js";
import { listAncestors, get } from "../../api/serviceGroups/operations.js";
import type {
  ServiceGroupsListAncestorsOptionalParams,
  ServiceGroupsGetOptionalParams,
} from "../../api/serviceGroups/options.js";
import type { ServiceGroup, ServiceGroupCollectionResponse } from "../../models/models.js";

/** Interface representing a ServiceGroups operations. */
export interface ServiceGroupsOperations {
  /** Get the details of the serviceGroup's ancestors */
  listAncestors: (
    serviceGroupName: string,
    options?: ServiceGroupsListAncestorsOptionalParams,
  ) => Promise<ServiceGroupCollectionResponse>;
  /** Get the details of the serviceGroup */
  get: (
    serviceGroupName: string,
    options?: ServiceGroupsGetOptionalParams,
  ) => Promise<ServiceGroup>;
}

function _getServiceGroups(context: ServiceGroupsManagementContext) {
  return {
    listAncestors: (serviceGroupName: string, options?: ServiceGroupsListAncestorsOptionalParams) =>
      listAncestors(context, serviceGroupName, options),
    get: (serviceGroupName: string, options?: ServiceGroupsGetOptionalParams) =>
      get(context, serviceGroupName, options),
  };
}

export function _getServiceGroupsOperations(
  context: ServiceGroupsManagementContext,
): ServiceGroupsOperations {
  return {
    ..._getServiceGroups(context),
  };
}
