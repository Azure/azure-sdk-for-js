// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { listByService } from "../../api/allPolicies/operations.js";
import type { AllPoliciesListByServiceOptionalParams } from "../../api/allPolicies/options.js";
import type { AllPoliciesContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AllPolicies operations. */
export interface AllPoliciesOperations {
  /** Status of all policies of API Management services. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: AllPoliciesListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<AllPoliciesContract>;
}

function _getAllPolicies(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: AllPoliciesListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
  };
}

export function _getAllPoliciesOperations(context: ApiManagementContext): AllPoliciesOperations {
  return {
    ..._getAllPolicies(context),
  };
}
