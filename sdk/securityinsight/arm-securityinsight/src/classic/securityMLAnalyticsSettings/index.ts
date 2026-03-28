// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/securityMLAnalyticsSettings/operations.js";
import type {
  SecurityMLAnalyticsSettingsListOptionalParams,
  SecurityMLAnalyticsSettingsDeleteOptionalParams,
  SecurityMLAnalyticsSettingsCreateOrUpdateOptionalParams,
  SecurityMLAnalyticsSettingsGetOptionalParams,
} from "../../api/securityMLAnalyticsSettings/options.js";
import type { SecurityMLAnalyticsSettingUnion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SecurityMLAnalyticsSettings operations. */
export interface SecurityMLAnalyticsSettingsOperations {
  /** Gets all Security ML Analytics Settings. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: SecurityMLAnalyticsSettingsListOptionalParams,
  ) => PagedAsyncIterableIterator<SecurityMLAnalyticsSettingUnion>;
  /** Delete the Security ML Analytics Settings. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    settingsResourceName: string,
    options?: SecurityMLAnalyticsSettingsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates the Security ML Analytics Settings. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    settingsResourceName: string,
    securityMLAnalyticsSetting: SecurityMLAnalyticsSettingUnion,
    options?: SecurityMLAnalyticsSettingsCreateOrUpdateOptionalParams,
  ) => Promise<SecurityMLAnalyticsSettingUnion>;
  /** Gets the Security ML Analytics Settings. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    settingsResourceName: string,
    options?: SecurityMLAnalyticsSettingsGetOptionalParams,
  ) => Promise<SecurityMLAnalyticsSettingUnion>;
}

function _getSecurityMLAnalyticsSettings(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: SecurityMLAnalyticsSettingsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      settingsResourceName: string,
      options?: SecurityMLAnalyticsSettingsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, settingsResourceName, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      settingsResourceName: string,
      securityMLAnalyticsSetting: SecurityMLAnalyticsSettingUnion,
      options?: SecurityMLAnalyticsSettingsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        settingsResourceName,
        securityMLAnalyticsSetting,
        options,
      ),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      settingsResourceName: string,
      options?: SecurityMLAnalyticsSettingsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, settingsResourceName, options),
  };
}

export function _getSecurityMLAnalyticsSettingsOperations(
  context: SecurityInsightsContext,
): SecurityMLAnalyticsSettingsOperations {
  return {
    ..._getSecurityMLAnalyticsSettings(context),
  };
}
