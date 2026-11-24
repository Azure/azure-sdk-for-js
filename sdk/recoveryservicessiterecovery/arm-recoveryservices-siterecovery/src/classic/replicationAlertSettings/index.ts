// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext } from "../../api/siteRecoveryManagementContext.js";
import { list, create, get } from "../../api/replicationAlertSettings/operations.js";
import type {
  ReplicationAlertSettingsListOptionalParams,
  ReplicationAlertSettingsCreateOptionalParams,
  ReplicationAlertSettingsGetOptionalParams,
} from "../../api/replicationAlertSettings/options.js";
import type { Alert, ConfigureAlertRequest } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ReplicationAlertSettings operations. */
export interface ReplicationAlertSettingsOperations {
  /** Gets the list of email notification(alert) configurations for the vault. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: ReplicationAlertSettingsListOptionalParams,
  ) => PagedAsyncIterableIterator<Alert>;
  /** Create or update an email notification(alert) configuration. */
  create: (
    resourceGroupName: string,
    resourceName: string,
    alertSettingName: string,
    request: ConfigureAlertRequest,
    options?: ReplicationAlertSettingsCreateOptionalParams,
  ) => Promise<Alert>;
  /** Gets the details of the specified email notification(alert) configuration. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    alertSettingName: string,
    options?: ReplicationAlertSettingsGetOptionalParams,
  ) => Promise<Alert>;
}

function _getReplicationAlertSettings(context: SiteRecoveryManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: ReplicationAlertSettingsListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    create: (
      resourceGroupName: string,
      resourceName: string,
      alertSettingName: string,
      request: ConfigureAlertRequest,
      options?: ReplicationAlertSettingsCreateOptionalParams,
    ) => create(context, resourceGroupName, resourceName, alertSettingName, request, options),
    get: (
      resourceGroupName: string,
      resourceName: string,
      alertSettingName: string,
      options?: ReplicationAlertSettingsGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, alertSettingName, options),
  };
}

export function _getReplicationAlertSettingsOperations(
  context: SiteRecoveryManagementContext,
): ReplicationAlertSettingsOperations {
  return {
    ..._getReplicationAlertSettings(context),
  };
}
