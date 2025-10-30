// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesContext } from "../../api/recoveryServicesContext.js";
import { $delete } from "../../api/registeredIdentities/operations.js";
import type { RegisteredIdentitiesDeleteOptionalParams } from "../../api/registeredIdentities/options.js";

/** Interface representing a RegisteredIdentities operations. */
export interface RegisteredIdentitiesOperations {
  /** Unregisters the given container from your Recovery Services vault. */
  /**
   *  @fixme Delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    vaultName: string,
    identityName: string,
    options?: RegisteredIdentitiesDeleteOptionalParams,
  ) => Promise<void>;
}

function _getRegisteredIdentities(context: RecoveryServicesContext) {
  return {
    delete: (
      resourceGroupName: string,
      vaultName: string,
      identityName: string,
      options?: RegisteredIdentitiesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, vaultName, identityName, options),
  };
}

export function _getRegisteredIdentitiesOperations(
  context: RecoveryServicesContext,
): RegisteredIdentitiesOperations {
  return {
    ..._getRegisteredIdentities(context),
  };
}
