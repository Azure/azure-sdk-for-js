// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EducationManagementContext } from "../../api/educationManagementContext.js";
import { listAll, list, get } from "../../api/grants/operations.js";
import {
  GrantsListAllOptionalParams,
  GrantsListOptionalParams,
  GrantsGetOptionalParams,
} from "../../api/grants/options.js";
import { GrantDetails } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Grants operations. */
export interface GrantsOperations {
  /** Get a list of grants that Microsoft has provided. */
  listAll: (options?: GrantsListAllOptionalParams) => PagedAsyncIterableIterator<GrantDetails>;
  /** Get details for a specific grant linked to the provided billing account and billing profile. */
  list: (
    billingAccountName: string,
    billingProfileName: string,
    options?: GrantsListOptionalParams,
  ) => PagedAsyncIterableIterator<GrantDetails>;
  /** Get details for a specific grant linked to the provided billing account and billing profile. */
  get: (
    billingAccountName: string,
    billingProfileName: string,
    options?: GrantsGetOptionalParams,
  ) => Promise<GrantDetails>;
}

function _getGrants(context: EducationManagementContext) {
  return {
    listAll: (options?: GrantsListAllOptionalParams) => listAll(context, options),
    list: (
      billingAccountName: string,
      billingProfileName: string,
      options?: GrantsListOptionalParams,
    ) => list(context, billingAccountName, billingProfileName, options),
    get: (
      billingAccountName: string,
      billingProfileName: string,
      options?: GrantsGetOptionalParams,
    ) => get(context, billingAccountName, billingProfileName, options),
  };
}

export function _getGrantsOperations(context: EducationManagementContext): GrantsOperations {
  return {
    ..._getGrants(context),
  };
}
