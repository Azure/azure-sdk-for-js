// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext } from "../../api/apiManagementContext.js";
import { listByService, get } from "../../api/tenantSettings/operations.js";
import {
  TenantSettingsListByServiceOptionalParams,
  TenantSettingsGetOptionalParams,
} from "../../api/tenantSettings/options.js";
import { TenantSettingsContract, SettingsTypeName } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a TenantSettings operations. */
export interface TenantSettingsOperations {
  /** Public settings. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: TenantSettingsListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<TenantSettingsContract>;
  /** Get tenant settings. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    settingsType: SettingsTypeName,
    options?: TenantSettingsGetOptionalParams,
  ) => Promise<TenantSettingsContract>;
}

function _getTenantSettings(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: TenantSettingsListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      settingsType: SettingsTypeName,
      options?: TenantSettingsGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, settingsType, options),
  };
}

export function _getTenantSettingsOperations(
  context: ApiManagementContext,
): TenantSettingsOperations {
  return {
    ..._getTenantSettings(context),
  };
}
