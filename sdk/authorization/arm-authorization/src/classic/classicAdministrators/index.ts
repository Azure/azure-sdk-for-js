// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { list } from "../../api/classicAdministrators/operations.js";
import type { ClassicAdministratorsListOptionalParams } from "../../api/classicAdministrators/options.js";
import type { ClassicAdministrator } from "../../models/microsoft/classicAdmin/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ClassicAdministrators operations. */
export interface ClassicAdministratorsOperations {
  /** Gets service administrator, account administrator, and co-administrators for the subscription. */
  list: (
    options?: ClassicAdministratorsListOptionalParams,
  ) => PagedAsyncIterableIterator<ClassicAdministrator>;
}

function _getClassicAdministrators(context: AuthorizationManagementContext) {
  return {
    list: (options?: ClassicAdministratorsListOptionalParams) => list(context, options),
  };
}

export function _getClassicAdministratorsOperations(
  context: AuthorizationManagementContext,
): ClassicAdministratorsOperations {
  return {
    ..._getClassicAdministrators(context),
  };
}
