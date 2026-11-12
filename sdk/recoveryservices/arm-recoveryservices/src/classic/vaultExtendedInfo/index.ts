// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesContext } from "../../api/recoveryServicesContext.js";
import { update, createOrUpdate, get } from "../../api/vaultExtendedInfo/operations.js";
import type {
  VaultExtendedInfoUpdateOptionalParams,
  VaultExtendedInfoCreateOrUpdateOptionalParams,
  VaultExtendedInfoGetOptionalParams,
} from "../../api/vaultExtendedInfo/options.js";
import type { VaultExtendedInfoResource } from "../../models/models.js";

/** Interface representing a VaultExtendedInfo operations. */
export interface VaultExtendedInfoOperations {
  /** Update vault extended info. */
  update: (
    resourceGroupName: string,
    vaultName: string,
    resourceResourceExtendedInfoDetails: VaultExtendedInfoResource,
    options?: VaultExtendedInfoUpdateOptionalParams,
  ) => Promise<VaultExtendedInfoResource>;
  /** Create vault extended info. */
  createOrUpdate: (
    resourceGroupName: string,
    vaultName: string,
    resourceResourceExtendedInfoDetails: VaultExtendedInfoResource,
    options?: VaultExtendedInfoCreateOrUpdateOptionalParams,
  ) => Promise<VaultExtendedInfoResource>;
  /** Get the vault extended info. */
  get: (
    resourceGroupName: string,
    vaultName: string,
    options?: VaultExtendedInfoGetOptionalParams,
  ) => Promise<VaultExtendedInfoResource>;
}

function _getVaultExtendedInfo(context: RecoveryServicesContext) {
  return {
    update: (
      resourceGroupName: string,
      vaultName: string,
      resourceResourceExtendedInfoDetails: VaultExtendedInfoResource,
      options?: VaultExtendedInfoUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, vaultName, resourceResourceExtendedInfoDetails, options),
    createOrUpdate: (
      resourceGroupName: string,
      vaultName: string,
      resourceResourceExtendedInfoDetails: VaultExtendedInfoResource,
      options?: VaultExtendedInfoCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        vaultName,
        resourceResourceExtendedInfoDetails,
        options,
      ),
    get: (
      resourceGroupName: string,
      vaultName: string,
      options?: VaultExtendedInfoGetOptionalParams,
    ) => get(context, resourceGroupName, vaultName, options),
  };
}

export function _getVaultExtendedInfoOperations(
  context: RecoveryServicesContext,
): VaultExtendedInfoOperations {
  return {
    ..._getVaultExtendedInfo(context),
  };
}
