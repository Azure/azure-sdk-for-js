// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext } from "../../api/containerServiceContext.js";
import { list } from "../../api/trustedAccessRoles/operations.js";
import type { TrustedAccessRolesListOptionalParams } from "../../api/trustedAccessRoles/options.js";
import type { TrustedAccessRole } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a TrustedAccessRoles operations. */
export interface TrustedAccessRolesOperations {
  /** List supported trusted access roles. */
  list: (
    location: string,
    options?: TrustedAccessRolesListOptionalParams,
  ) => PagedAsyncIterableIterator<TrustedAccessRole>;
}

function _getTrustedAccessRoles(context: ContainerServiceContext) {
  return {
    list: (location: string, options?: TrustedAccessRolesListOptionalParams) =>
      list(context, location, options),
  };
}

export function _getTrustedAccessRolesOperations(
  context: ContainerServiceContext,
): TrustedAccessRolesOperations {
  return {
    ..._getTrustedAccessRoles(context),
  };
}
