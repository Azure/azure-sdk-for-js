// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceGroupsManagementContext } from "../../api/serviceGroupsManagementContext.js";
import { get } from "../../api/serviceGroups/operations.js";
import type { ServiceGroupsGetOptionalParams } from "../../api/serviceGroups/options.js";
import type { ServiceGroup } from "../../models/models.js";

/** Interface representing a ServiceGroups operations. */
export interface ServiceGroupsOperations {
  /** Get the details of the serviceGroup */
  get: (
    serviceGroupName: string,
    options?: ServiceGroupsGetOptionalParams,
  ) => Promise<ServiceGroup>;
}

function _getServiceGroups(context: ServiceGroupsManagementContext) {
  return {
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
