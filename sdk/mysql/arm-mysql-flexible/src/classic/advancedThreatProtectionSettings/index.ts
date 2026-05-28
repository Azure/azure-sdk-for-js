// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerContext } from "../../api/mySQLManagementFlexibleServerContext.js";
import {
  list,
  update,
  updatePut,
  get,
} from "../../api/advancedThreatProtectionSettings/operations.js";
import {
  AdvancedThreatProtectionSettingsListOptionalParams,
  AdvancedThreatProtectionSettingsUpdateOptionalParams,
  AdvancedThreatProtectionSettingsUpdatePutOptionalParams,
  AdvancedThreatProtectionSettingsGetOptionalParams,
} from "../../api/advancedThreatProtectionSettings/options.js";
import {
  AdvancedThreatProtection,
  AdvancedThreatProtectionName,
  AdvancedThreatProtectionForUpdate,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

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
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    serverName: string,
    advancedThreatProtectionName: AdvancedThreatProtectionName,
    parameters: AdvancedThreatProtectionForUpdate,
    options?: AdvancedThreatProtectionSettingsUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<AdvancedThreatProtection>, AdvancedThreatProtection>
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    advancedThreatProtectionName: AdvancedThreatProtectionName,
    parameters: AdvancedThreatProtectionForUpdate,
    options?: AdvancedThreatProtectionSettingsUpdateOptionalParams,
  ) => Promise<AdvancedThreatProtection>;
  /** Updates a server's Advanced Threat Protection state. */
  updatePut: (
    resourceGroupName: string,
    serverName: string,
    advancedThreatProtectionName: AdvancedThreatProtectionName,
    parameters: AdvancedThreatProtection,
    options?: AdvancedThreatProtectionSettingsUpdatePutOptionalParams,
  ) => PollerLike<OperationState<AdvancedThreatProtection>, AdvancedThreatProtection>;
  /** @deprecated use updatePut instead */
  beginUpdatePut: (
    resourceGroupName: string,
    serverName: string,
    advancedThreatProtectionName: AdvancedThreatProtectionName,
    parameters: AdvancedThreatProtection,
    options?: AdvancedThreatProtectionSettingsUpdatePutOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<AdvancedThreatProtection>, AdvancedThreatProtection>
  >;
  /** @deprecated use updatePut instead */
  beginUpdatePutAndWait: (
    resourceGroupName: string,
    serverName: string,
    advancedThreatProtectionName: AdvancedThreatProtectionName,
    parameters: AdvancedThreatProtection,
    options?: AdvancedThreatProtectionSettingsUpdatePutOptionalParams,
  ) => Promise<AdvancedThreatProtection>;
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
    beginUpdate: async (
      resourceGroupName: string,
      serverName: string,
      advancedThreatProtectionName: AdvancedThreatProtectionName,
      parameters: AdvancedThreatProtectionForUpdate,
      options?: AdvancedThreatProtectionSettingsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        serverName,
        advancedThreatProtectionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      advancedThreatProtectionName: AdvancedThreatProtectionName,
      parameters: AdvancedThreatProtectionForUpdate,
      options?: AdvancedThreatProtectionSettingsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        serverName,
        advancedThreatProtectionName,
        parameters,
        options,
      );
    },
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
    beginUpdatePut: async (
      resourceGroupName: string,
      serverName: string,
      advancedThreatProtectionName: AdvancedThreatProtectionName,
      parameters: AdvancedThreatProtection,
      options?: AdvancedThreatProtectionSettingsUpdatePutOptionalParams,
    ) => {
      const poller = updatePut(
        context,
        resourceGroupName,
        serverName,
        advancedThreatProtectionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdatePutAndWait: async (
      resourceGroupName: string,
      serverName: string,
      advancedThreatProtectionName: AdvancedThreatProtectionName,
      parameters: AdvancedThreatProtection,
      options?: AdvancedThreatProtectionSettingsUpdatePutOptionalParams,
    ) => {
      return await updatePut(
        context,
        resourceGroupName,
        serverName,
        advancedThreatProtectionName,
        parameters,
        options,
      );
    },
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
