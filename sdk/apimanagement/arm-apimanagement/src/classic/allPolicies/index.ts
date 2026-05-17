// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext } from "../../api/apiManagementContext.js";
import { listByService } from "../../api/allPolicies/operations.js";
import { AllPoliciesListByServiceOptionalParams } from "../../api/allPolicies/options.js";
import { AllPoliciesContract } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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
