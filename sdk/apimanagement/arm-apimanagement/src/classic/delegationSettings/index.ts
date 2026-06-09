// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listSecrets,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/delegationSettings/operations.js";
import type {
  DelegationSettingsListSecretsOptionalParams,
  DelegationSettingsUpdateOptionalParams,
  DelegationSettingsCreateOrUpdateOptionalParams,
  DelegationSettingsGetEntityTagOptionalParams,
  DelegationSettingsGetOptionalParams,
} from "../../api/delegationSettings/options.js";
import type {
  PortalDelegationSettings,
  PortalSettingValidationKeyContract,
} from "../../models/models.js";

/** Interface representing a DelegationSettings operations. */
export interface DelegationSettingsOperations {
  /** Gets the secret validation key of the DelegationSettings. */
  listSecrets: (
    resourceGroupName: string,
    serviceName: string,
    options?: DelegationSettingsListSecretsOptionalParams,
  ) => Promise<PortalSettingValidationKeyContract>;
  /** Update Delegation settings. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    ifMatch: string,
    parameters: PortalDelegationSettings,
    options?: DelegationSettingsUpdateOptionalParams,
  ) => Promise<void>;
  /** Create or Update Delegation settings. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    parameters: PortalDelegationSettings,
    options?: DelegationSettingsCreateOrUpdateOptionalParams,
  ) => Promise<PortalDelegationSettings>;
  /** Gets the entity state (Etag) version of the DelegationSettings. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    options?: DelegationSettingsGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Get Delegation Settings for the Portal. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    options?: DelegationSettingsGetOptionalParams,
  ) => Promise<PortalDelegationSettings>;
}

function _getDelegationSettings(context: ApiManagementContext) {
  return {
    listSecrets: (
      resourceGroupName: string,
      serviceName: string,
      options?: DelegationSettingsListSecretsOptionalParams,
    ) => listSecrets(context, resourceGroupName, serviceName, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      ifMatch: string,
      parameters: PortalDelegationSettings,
      options?: DelegationSettingsUpdateOptionalParams,
    ) => update(context, resourceGroupName, serviceName, ifMatch, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      parameters: PortalDelegationSettings,
      options?: DelegationSettingsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, parameters, options),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      options?: DelegationSettingsGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      options?: DelegationSettingsGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, options),
  };
}

export function _getDelegationSettingsOperations(
  context: ApiManagementContext,
): DelegationSettingsOperations {
  return {
    ..._getDelegationSettings(context),
  };
}
