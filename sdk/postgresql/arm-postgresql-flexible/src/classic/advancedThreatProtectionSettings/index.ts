// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgreSQLManagementFlexibleServerContext } from "../../api/postgreSQLManagementFlexibleServerContext.js";
import { listByServer, get } from "../../api/advancedThreatProtectionSettings/operations.js";
import type {
  AdvancedThreatProtectionSettingsListByServerOptionalParams,
  AdvancedThreatProtectionSettingsGetOptionalParams,
} from "../../api/advancedThreatProtectionSettings/options.js";
import type {
  AdvancedThreatProtectionSettingsModel,
  ThreatProtectionName,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AdvancedThreatProtectionSettings operations. */
export interface AdvancedThreatProtectionSettingsOperations {
  /** Lists state of advanced threat protection settings for a server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: AdvancedThreatProtectionSettingsListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<AdvancedThreatProtectionSettingsModel>;
  /** Gets state of advanced threat protection settings for a server. */
  get: (
    resourceGroupName: string,
    serverName: string,
    threatProtectionName: ThreatProtectionName,
    options?: AdvancedThreatProtectionSettingsGetOptionalParams,
  ) => Promise<AdvancedThreatProtectionSettingsModel>;
}

function _getAdvancedThreatProtectionSettings(context: PostgreSQLManagementFlexibleServerContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: AdvancedThreatProtectionSettingsListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    get: (
      resourceGroupName: string,
      serverName: string,
      threatProtectionName: ThreatProtectionName,
      options?: AdvancedThreatProtectionSettingsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, threatProtectionName, options),
  };
}

export function _getAdvancedThreatProtectionSettingsOperations(
  context: PostgreSQLManagementFlexibleServerContext,
): AdvancedThreatProtectionSettingsOperations {
  return {
    ..._getAdvancedThreatProtectionSettings(context),
  };
}
