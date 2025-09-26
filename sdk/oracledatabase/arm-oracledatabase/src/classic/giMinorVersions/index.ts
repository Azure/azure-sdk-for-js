// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext } from "../../api/oracleDatabaseManagementContext.js";
import { get, listByParent } from "../../api/giMinorVersions/operations.js";
import type {
  GiMinorVersionsGetOptionalParams,
  GiMinorVersionsListByParentOptionalParams,
} from "../../api/giMinorVersions/options.js";
import type { GiMinorVersion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a GiMinorVersions operations. */
export interface GiMinorVersionsOperations {
  /** Get a GiMinorVersion */
  get: (
    location: string,
    giversionname: string,
    giMinorVersionName: string,
    options?: GiMinorVersionsGetOptionalParams,
  ) => Promise<GiMinorVersion>;
  /** List GiMinorVersion resources by GiVersion */
  listByParent: (
    location: string,
    giversionname: string,
    options?: GiMinorVersionsListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<GiMinorVersion>;
}

function _getGiMinorVersions(context: OracleDatabaseManagementContext) {
  return {
    get: (
      location: string,
      giversionname: string,
      giMinorVersionName: string,
      options?: GiMinorVersionsGetOptionalParams,
    ) => get(context, location, giversionname, giMinorVersionName, options),
    listByParent: (
      location: string,
      giversionname: string,
      options?: GiMinorVersionsListByParentOptionalParams,
    ) => listByParent(context, location, giversionname, options),
  };
}

export function _getGiMinorVersionsOperations(
  context: OracleDatabaseManagementContext,
): GiMinorVersionsOperations {
  return {
    ..._getGiMinorVersions(context),
  };
}
