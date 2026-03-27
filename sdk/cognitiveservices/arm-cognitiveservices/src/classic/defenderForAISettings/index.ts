// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { list, update, createOrUpdate, get } from "../../api/defenderForAISettings/operations.js";
import type {
  DefenderForAISettingsListOptionalParams,
  DefenderForAISettingsUpdateOptionalParams,
  DefenderForAISettingsCreateOrUpdateOptionalParams,
  DefenderForAISettingsGetOptionalParams,
} from "../../api/defenderForAISettings/options.js";
import type { DefenderForAISetting } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DefenderForAISettings operations. */
export interface DefenderForAISettingsOperations {
  /** Lists the Defender for AI settings. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: DefenderForAISettingsListOptionalParams,
  ) => PagedAsyncIterableIterator<DefenderForAISetting>;
  /** Updates the specified Defender for AI setting. */
  update: (
    resourceGroupName: string,
    accountName: string,
    defenderForAISettingName: string,
    defenderForAISettings: DefenderForAISetting,
    options?: DefenderForAISettingsUpdateOptionalParams,
  ) => Promise<DefenderForAISetting>;
  /** Creates or Updates the specified Defender for AI setting. */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    defenderForAISettingName: string,
    defenderForAISettings: DefenderForAISetting,
    options?: DefenderForAISettingsCreateOrUpdateOptionalParams,
  ) => Promise<DefenderForAISetting>;
  /** Gets the specified Defender for AI setting by name. */
  get: (
    resourceGroupName: string,
    accountName: string,
    defenderForAISettingName: string,
    options?: DefenderForAISettingsGetOptionalParams,
  ) => Promise<DefenderForAISetting>;
}

function _getDefenderForAISettings(context: CognitiveServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: DefenderForAISettingsListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      defenderForAISettingName: string,
      defenderForAISettings: DefenderForAISetting,
      options?: DefenderForAISettingsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        accountName,
        defenderForAISettingName,
        defenderForAISettings,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      defenderForAISettingName: string,
      defenderForAISettings: DefenderForAISetting,
      options?: DefenderForAISettingsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        defenderForAISettingName,
        defenderForAISettings,
        options,
      ),
    get: (
      resourceGroupName: string,
      accountName: string,
      defenderForAISettingName: string,
      options?: DefenderForAISettingsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, defenderForAISettingName, options),
  };
}

export function _getDefenderForAISettingsOperations(
  context: CognitiveServicesManagementContext,
): DefenderForAISettingsOperations {
  return {
    ..._getDefenderForAISettings(context),
  };
}
