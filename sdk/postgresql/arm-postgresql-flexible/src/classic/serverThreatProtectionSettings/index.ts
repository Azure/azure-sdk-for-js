// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgreSQLManagementFlexibleServerContext } from "../../api/postgreSQLManagementFlexibleServerContext.js";
import { createOrUpdate } from "../../api/serverThreatProtectionSettings/operations.js";
import type { ServerThreatProtectionSettingsCreateOrUpdateOptionalParams } from "../../api/serverThreatProtectionSettings/options.js";
import type {
  AdvancedThreatProtectionSettingsModel,
  ThreatProtectionName,
} from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ServerThreatProtectionSettings operations. */
export interface ServerThreatProtectionSettingsOperations {
  /** Creates or updates a server's Advanced Threat Protection settings. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    threatProtectionName: ThreatProtectionName,
    parameters: AdvancedThreatProtectionSettingsModel,
    options?: ServerThreatProtectionSettingsCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<AdvancedThreatProtectionSettingsModel>,
    AdvancedThreatProtectionSettingsModel
  >;
}

function _getServerThreatProtectionSettings(context: PostgreSQLManagementFlexibleServerContext) {
  return {
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      threatProtectionName: ThreatProtectionName,
      parameters: AdvancedThreatProtectionSettingsModel,
      options?: ServerThreatProtectionSettingsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        threatProtectionName,
        parameters,
        options,
      ),
  };
}

export function _getServerThreatProtectionSettingsOperations(
  context: PostgreSQLManagementFlexibleServerContext,
): ServerThreatProtectionSettingsOperations {
  return {
    ..._getServerThreatProtectionSettings(context),
  };
}
