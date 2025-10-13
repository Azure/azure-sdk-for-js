// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext } from "../../api/mySQLManagementFlexibleServerContext.js";
import {
  list,
  update,
  updatePut,
  get,
} from "../../api/advancedThreatProtectionSettings/operations.js";
import type {
  AdvancedThreatProtectionSettingsListOptionalParams,
  AdvancedThreatProtectionSettingsUpdateOptionalParams,
  AdvancedThreatProtectionSettingsUpdatePutOptionalParams,
  AdvancedThreatProtectionSettingsGetOptionalParams,
} from "../../api/advancedThreatProtectionSettings/options.js";
import type {
  AdvancedThreatProtection,
  AdvancedThreatProtectionName,
  AdvancedThreatProtectionForUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AdvancedThreatProtectionSettings operations. */
export interface AdvancedThreatProtectionSettingsOperations {
  /** Gets a list of server's Advanced Threat Protection states. */
  list: (
    resourceGroupName: string,
    serverName: string,
    options?: AdvancedThreatProtectionSettingsListOptionalParams,
  ) => PagedAsyncIterableIterator<AdvancedThreatProtection>;
  /** Updates a server's Advanced Threat Protection state. */
  update: (
    resourceGroupName: string,
    serverName: string,
    advancedThreatProtectionName: AdvancedThreatProtectionName,
    parameters: AdvancedThreatProtectionForUpdate,
    options?: AdvancedThreatProtectionSettingsUpdateOptionalParams,
  ) => PollerLike<OperationState<AdvancedThreatProtection>, AdvancedThreatProtection>;
  /** Updates a server's Advanced Threat Protection state. */
  updatePut: (
    resourceGroupName: string,
    serverName: string,
    advancedThreatProtectionName: AdvancedThreatProtectionName,
    parameters: AdvancedThreatProtection,
    options?: AdvancedThreatProtectionSettingsUpdatePutOptionalParams,
  ) => PollerLike<OperationState<AdvancedThreatProtection>, AdvancedThreatProtection>;
  /** Get a server's Advanced Threat Protection state */
  get: (
    resourceGroupName: string,
    serverName: string,
    advancedThreatProtectionName: AdvancedThreatProtectionName,
    options?: AdvancedThreatProtectionSettingsGetOptionalParams,
  ) => Promise<AdvancedThreatProtection>;
}

function _getAdvancedThreatProtectionSettings(context: MySQLManagementFlexibleServerContext) {
  return {
    list: (
      resourceGroupName: string,
      serverName: string,
      options?: AdvancedThreatProtectionSettingsListOptionalParams,
    ) => list(context, resourceGroupName, serverName, options),
    update: (
      resourceGroupName: string,
      serverName: string,
      advancedThreatProtectionName: AdvancedThreatProtectionName,
      parameters: AdvancedThreatProtectionForUpdate,
      options?: AdvancedThreatProtectionSettingsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        serverName,
        advancedThreatProtectionName,
        parameters,
        options,
      ),
    updatePut: (
      resourceGroupName: string,
      serverName: string,
      advancedThreatProtectionName: AdvancedThreatProtectionName,
      parameters: AdvancedThreatProtection,
      options?: AdvancedThreatProtectionSettingsUpdatePutOptionalParams,
    ) =>
      updatePut(
        context,
        resourceGroupName,
        serverName,
        advancedThreatProtectionName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      serverName: string,
      advancedThreatProtectionName: AdvancedThreatProtectionName,
      options?: AdvancedThreatProtectionSettingsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, advancedThreatProtectionName, options),
  };
}

export function _getAdvancedThreatProtectionSettingsOperations(
  context: MySQLManagementFlexibleServerContext,
): AdvancedThreatProtectionSettingsOperations {
  return {
    ..._getAdvancedThreatProtectionSettings(context),
  };
}
