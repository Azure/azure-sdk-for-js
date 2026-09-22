// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { list } from "../../api/eligibleChildResources/operations.js";
import { EligibleChildResourcesListOptionalParams } from "../../api/eligibleChildResources/options.js";
import { EligibleChildResource } from "../../models/microsoft/authorization/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a EligibleChildResources operations. */
export interface EligibleChildResourcesOperations {
  /** Get the child resources of a resource on which user has eligible access */
  list: (
    scope: string,
    options?: EligibleChildResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<EligibleChildResource>;
}

function _getEligibleChildResources(context: AuthorizationManagementContext) {
  return {
    list: (scope: string, options?: EligibleChildResourcesListOptionalParams) =>
      list(context, scope, options),
  };
}

export function _getEligibleChildResourcesOperations(
  context: AuthorizationManagementContext,
): EligibleChildResourcesOperations {
  return {
    ..._getEligibleChildResources(context),
  };
}
