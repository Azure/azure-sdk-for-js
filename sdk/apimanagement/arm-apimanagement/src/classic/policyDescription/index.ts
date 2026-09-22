// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { listByService } from "../../api/policyDescription/operations.js";
import type { PolicyDescriptionListByServiceOptionalParams } from "../../api/policyDescription/options.js";
import type { PolicyDescriptionCollection } from "../../models/models.js";

/** Interface representing a PolicyDescription operations. */
export interface PolicyDescriptionOperations {
  /** Lists all policy descriptions. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: PolicyDescriptionListByServiceOptionalParams,
  ) => Promise<PolicyDescriptionCollection>;
}

function _getPolicyDescription(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: PolicyDescriptionListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
  };
}

export function _getPolicyDescriptionOperations(
  context: ApiManagementContext,
): PolicyDescriptionOperations {
  return {
    ..._getPolicyDescription(context),
  };
}
