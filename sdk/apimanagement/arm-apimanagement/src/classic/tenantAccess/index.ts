// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listSecrets,
  regenerateSecondaryKey,
  regeneratePrimaryKey,
  listByService,
  update,
  create,
  getEntityTag,
  get,
} from "../../api/tenantAccess/operations.js";
import type {
  TenantAccessListSecretsOptionalParams,
  TenantAccessRegenerateSecondaryKeyOptionalParams,
  TenantAccessRegeneratePrimaryKeyOptionalParams,
  TenantAccessListByServiceOptionalParams,
  TenantAccessUpdateOptionalParams,
  TenantAccessCreateOptionalParams,
  TenantAccessGetEntityTagOptionalParams,
  TenantAccessGetOptionalParams,
} from "../../api/tenantAccess/options.js";
import type {
  AccessInformationContract,
  AccessIdName,
  AccessInformationCreateParameters,
  AccessInformationUpdateParameters,
  AccessInformationSecretsContract,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a TenantAccess operations. */
export interface TenantAccessOperations {
  /** Get tenant access information details. */
  listSecrets: (
    resourceGroupName: string,
    serviceName: string,
    accessName: AccessIdName,
    options?: TenantAccessListSecretsOptionalParams,
  ) => Promise<AccessInformationSecretsContract>;
  /** Regenerate secondary access key */
  regenerateSecondaryKey: (
    resourceGroupName: string,
    serviceName: string,
    accessName: AccessIdName,
    options?: TenantAccessRegenerateSecondaryKeyOptionalParams,
  ) => Promise<void>;
  /** Regenerate primary access key */
  regeneratePrimaryKey: (
    resourceGroupName: string,
    serviceName: string,
    accessName: AccessIdName,
    options?: TenantAccessRegeneratePrimaryKeyOptionalParams,
  ) => Promise<void>;
  /** Returns list of access infos - for Git and Management endpoints. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: TenantAccessListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<AccessInformationContract>;
  /** Update tenant access information details. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    accessName: AccessIdName,
    ifMatch: string,
    parameters: AccessInformationUpdateParameters,
    options?: TenantAccessUpdateOptionalParams,
  ) => Promise<AccessInformationContract>;
  /** Update tenant access information details. */
  create: (
    resourceGroupName: string,
    serviceName: string,
    accessName: AccessIdName,
    ifMatch: string,
    parameters: AccessInformationCreateParameters,
    options?: TenantAccessCreateOptionalParams,
  ) => Promise<AccessInformationContract>;
  /** Tenant access metadata */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    accessName: AccessIdName,
    options?: TenantAccessGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Get tenant access information details without secrets. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    accessName: AccessIdName,
    options?: TenantAccessGetOptionalParams,
  ) => Promise<AccessInformationContract>;
}

function _getTenantAccess(context: ApiManagementContext) {
  return {
    listSecrets: (
      resourceGroupName: string,
      serviceName: string,
      accessName: AccessIdName,
      options?: TenantAccessListSecretsOptionalParams,
    ) => listSecrets(context, resourceGroupName, serviceName, accessName, options),
    regenerateSecondaryKey: (
      resourceGroupName: string,
      serviceName: string,
      accessName: AccessIdName,
      options?: TenantAccessRegenerateSecondaryKeyOptionalParams,
    ) => regenerateSecondaryKey(context, resourceGroupName, serviceName, accessName, options),
    regeneratePrimaryKey: (
      resourceGroupName: string,
      serviceName: string,
      accessName: AccessIdName,
      options?: TenantAccessRegeneratePrimaryKeyOptionalParams,
    ) => regeneratePrimaryKey(context, resourceGroupName, serviceName, accessName, options),
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: TenantAccessListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      accessName: AccessIdName,
      ifMatch: string,
      parameters: AccessInformationUpdateParameters,
      options?: TenantAccessUpdateOptionalParams,
    ) => update(context, resourceGroupName, serviceName, accessName, ifMatch, parameters, options),
    create: (
      resourceGroupName: string,
      serviceName: string,
      accessName: AccessIdName,
      ifMatch: string,
      parameters: AccessInformationCreateParameters,
      options?: TenantAccessCreateOptionalParams,
    ) => create(context, resourceGroupName, serviceName, accessName, ifMatch, parameters, options),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      accessName: AccessIdName,
      options?: TenantAccessGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, accessName, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      accessName: AccessIdName,
      options?: TenantAccessGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, accessName, options),
  };
}

export function _getTenantAccessOperations(context: ApiManagementContext): TenantAccessOperations {
  return {
    ..._getTenantAccess(context),
  };
}
