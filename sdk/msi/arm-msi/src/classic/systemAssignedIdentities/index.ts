// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedServiceIdentityContext } from "../../api/managedServiceIdentityContext.js";
import { getByScope } from "../../api/systemAssignedIdentities/operations.js";
import type { SystemAssignedIdentitiesGetByScopeOptionalParams } from "../../api/systemAssignedIdentities/options.js";
import type { SystemAssignedIdentity } from "../../models/models.js";

/** Interface representing a SystemAssignedIdentities operations. */
export interface SystemAssignedIdentitiesOperations {
  /** Gets the systemAssignedIdentity available under the specified RP scope. */
  getByScope: (
    scope: string,
    options?: SystemAssignedIdentitiesGetByScopeOptionalParams,
  ) => Promise<SystemAssignedIdentity>;
}

function _getSystemAssignedIdentities(context: ManagedServiceIdentityContext) {
  return {
    getByScope: (scope: string, options?: SystemAssignedIdentitiesGetByScopeOptionalParams) =>
      getByScope(context, scope, options),
  };
}

export function _getSystemAssignedIdentitiesOperations(
  context: ManagedServiceIdentityContext,
): SystemAssignedIdentitiesOperations {
  return {
    ..._getSystemAssignedIdentities(context),
  };
}
