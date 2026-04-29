// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  listByServer,
  createOrUpdate,
  get,
} from "../../api/serverAdvancedThreatProtectionSettings/operations.js";
import {
  ServerAdvancedThreatProtectionSettingsListByServerOptionalParams,
  ServerAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams,
  ServerAdvancedThreatProtectionSettingsGetOptionalParams,
} from "../../api/serverAdvancedThreatProtectionSettings/options.js";
import {
  AdvancedThreatProtectionName,
  ServerAdvancedThreatProtection,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ServerAdvancedThreatProtectionSettings operations. */
export interface ServerAdvancedThreatProtectionSettingsOperations {
  /** Get a list of the server's Advanced Threat Protection states. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: ServerAdvancedThreatProtectionSettingsListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<ServerAdvancedThreatProtection>;
  /** Creates or updates an Advanced Threat Protection state. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    advancedThreatProtectionName: AdvancedThreatProtectionName,
    parameters: ServerAdvancedThreatProtection,
    options?: ServerAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ServerAdvancedThreatProtection>, ServerAdvancedThreatProtection>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    advancedThreatProtectionName: AdvancedThreatProtectionName,
    parameters: ServerAdvancedThreatProtection,
    options?: ServerAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ServerAdvancedThreatProtection>, ServerAdvancedThreatProtection>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    advancedThreatProtectionName: AdvancedThreatProtectionName,
    parameters: ServerAdvancedThreatProtection,
    options?: ServerAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams,
  ) => Promise<ServerAdvancedThreatProtection>;
  /** Get a server's Advanced Threat Protection state. */
  get: (
    resourceGroupName: string,
    serverName: string,
    advancedThreatProtectionName: AdvancedThreatProtectionName,
    options?: ServerAdvancedThreatProtectionSettingsGetOptionalParams,
  ) => Promise<ServerAdvancedThreatProtection>;
}

function _getServerAdvancedThreatProtectionSettings(context: SqlManagementContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: ServerAdvancedThreatProtectionSettingsListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      advancedThreatProtectionName: AdvancedThreatProtectionName,
      parameters: ServerAdvancedThreatProtection,
      options?: ServerAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        advancedThreatProtectionName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      advancedThreatProtectionName: AdvancedThreatProtectionName,
      parameters: ServerAdvancedThreatProtection,
      options?: ServerAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
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
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      advancedThreatProtectionName: AdvancedThreatProtectionName,
      parameters: ServerAdvancedThreatProtection,
      options?: ServerAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
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
      options?: ServerAdvancedThreatProtectionSettingsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, advancedThreatProtectionName, options),
  };
}

export function _getServerAdvancedThreatProtectionSettingsOperations(
  context: SqlManagementContext,
): ServerAdvancedThreatProtectionSettingsOperations {
  return {
    ..._getServerAdvancedThreatProtectionSettings(context),
  };
}
