// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import {
  listBySubscription,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/standards/operations.js";
import type {
  StandardsListBySubscriptionOptionalParams,
  StandardsListOptionalParams,
  StandardsDeleteOptionalParams,
  StandardsCreateOrUpdateOptionalParams,
  StandardsGetOptionalParams,
} from "../../api/standards/options.js";
import type { Standard } from "../../models/standardsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Standards operations. */
export interface StandardsOperations {
  /** Get a list of all relevant security standards over a subscription level scope. */
  listBySubscription: (
    options?: StandardsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Standard>;
  /** Get security standards on all your resources inside a scope */
  list: (
    resourceGroupName: string,
    options?: StandardsListOptionalParams,
  ) => PagedAsyncIterableIterator<Standard>;
  /** Delete a security standard on a scope. */
  delete: (
    resourceGroupName: string,
    standardId: string,
    options?: StandardsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a security standard on the given scope.  Available only for custom standards.  Will create/update the required standard definitions. */
  createOrUpdate: (
    resourceGroupName: string,
    standardId: string,
    standard: Standard,
    options?: StandardsCreateOrUpdateOptionalParams,
  ) => Promise<Standard>;
  /** Get a specific security standard for the requested scope */
  get: (
    resourceGroupName: string,
    standardId: string,
    options?: StandardsGetOptionalParams,
  ) => Promise<Standard>;
}

function _getStandards(context: SecurityCenterContext) {
  return {
    listBySubscription: (options?: StandardsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    list: (resourceGroupName: string, options?: StandardsListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      standardId: string,
      options?: StandardsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, standardId, options),
    createOrUpdate: (
      resourceGroupName: string,
      standardId: string,
      standard: Standard,
      options?: StandardsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, standardId, standard, options),
    get: (resourceGroupName: string, standardId: string, options?: StandardsGetOptionalParams) =>
      get(context, resourceGroupName, standardId, options),
  };
}

export function _getStandardsOperations(context: SecurityCenterContext): StandardsOperations {
  return {
    ..._getStandards(context),
  };
}
