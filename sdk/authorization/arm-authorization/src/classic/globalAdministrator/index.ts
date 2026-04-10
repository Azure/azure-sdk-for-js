// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { elevateAccess } from "../../api/globalAdministrator/operations.js";
import type { GlobalAdministratorElevateAccessOptionalParams } from "../../api/globalAdministrator/options.js";

/** Interface representing a GlobalAdministrator operations. */
export interface GlobalAdministratorOperations {
  /** Elevates access for a Global Administrator. */
  elevateAccess: (options?: GlobalAdministratorElevateAccessOptionalParams) => Promise<void>;
}

function _getGlobalAdministrator(context: AuthorizationManagementContext) {
  return {
    elevateAccess: (options?: GlobalAdministratorElevateAccessOptionalParams) =>
      elevateAccess(context, options),
  };
}

export function _getGlobalAdministratorOperations(
  context: AuthorizationManagementContext,
): GlobalAdministratorOperations {
  return {
    ..._getGlobalAdministrator(context),
  };
}
