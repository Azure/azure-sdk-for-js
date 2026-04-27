// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/securityStandards/operations.js";
import type {
  SecurityStandardsListOptionalParams,
  SecurityStandardsDeleteOptionalParams,
  SecurityStandardsCreateOrUpdateOptionalParams,
  SecurityStandardsGetOptionalParams,
} from "../../api/securityStandards/options.js";
import type { SecurityStandard } from "../../models/securityStandardsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SecurityStandards operations. */
export interface SecurityStandardsOperations {
  /** Get a list of all relevant security standards over a scope */
  list: (
    scope: string,
    options?: SecurityStandardsListOptionalParams,
  ) => PagedAsyncIterableIterator<SecurityStandard>;
  /** Delete a security standard over a given scope */
  delete: (
    scope: string,
    standardId: string,
    options?: SecurityStandardsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a security standard over a given scope */
  createOrUpdate: (
    scope: string,
    standardId: string,
    standard: SecurityStandard,
    options?: SecurityStandardsCreateOrUpdateOptionalParams,
  ) => Promise<SecurityStandard>;
  /** Get a specific security standard for the requested scope by standardId */
  get: (
    scope: string,
    standardId: string,
    options?: SecurityStandardsGetOptionalParams,
  ) => Promise<SecurityStandard>;
}

function _getSecurityStandards(context: SecurityCenterContext) {
  return {
    list: (scope: string, options?: SecurityStandardsListOptionalParams) =>
      list(context, scope, options),
    delete: (scope: string, standardId: string, options?: SecurityStandardsDeleteOptionalParams) =>
      $delete(context, scope, standardId, options),
    createOrUpdate: (
      scope: string,
      standardId: string,
      standard: SecurityStandard,
      options?: SecurityStandardsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, scope, standardId, standard, options),
    get: (scope: string, standardId: string, options?: SecurityStandardsGetOptionalParams) =>
      get(context, scope, standardId, options),
  };
}

export function _getSecurityStandardsOperations(
  context: SecurityCenterContext,
): SecurityStandardsOperations {
  return {
    ..._getSecurityStandards(context),
  };
}
