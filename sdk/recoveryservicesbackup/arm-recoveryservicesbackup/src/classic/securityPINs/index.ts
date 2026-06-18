// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { get } from "../../api/securityPINs/operations.js";
import { SecurityPINsGetOptionalParams } from "../../api/securityPINs/options.js";
import { TokenInformation } from "../../models/models.js";

/** Interface representing a SecurityPINs operations. */
export interface SecurityPINsOperations {
  /** Get the security PIN. */
  get: (
    vaultName: string,
    resourceGroupName: string,
    options?: SecurityPINsGetOptionalParams,
  ) => Promise<TokenInformation>;
}

function _getSecurityPINs(context: RecoveryServicesBackupContext) {
  return {
    get: (vaultName: string, resourceGroupName: string, options?: SecurityPINsGetOptionalParams) =>
      get(context, vaultName, resourceGroupName, options),
  };
}

export function _getSecurityPINsOperations(
  context: RecoveryServicesBackupContext,
): SecurityPINsOperations {
  return {
    ..._getSecurityPINs(context),
  };
}
