// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { list } from "../../api/eligibleChildResources/operations.js";
import type { EligibleChildResourcesListOptionalParams } from "../../api/eligibleChildResources/options.js";
import type { EligibleChildResource } from "../../models/microsoft/authorization/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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
