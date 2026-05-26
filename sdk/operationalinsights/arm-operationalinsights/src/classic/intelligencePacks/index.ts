// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementContext } from "../../api/operationalInsightsManagementContext.js";
import { list, enable, disable } from "../../api/intelligencePacks/operations.js";
import {
  IntelligencePacksListOptionalParams,
  IntelligencePacksEnableOptionalParams,
  IntelligencePacksDisableOptionalParams,
} from "../../api/intelligencePacks/options.js";
import { IntelligencePack } from "../../models/models.js";

/** Interface representing a IntelligencePacks operations. */
export interface IntelligencePacksOperations {
  /** Lists all the intelligence packs possible and whether they are enabled or disabled for a given workspace. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: IntelligencePacksListOptionalParams,
  ) => Promise<IntelligencePack[]>;
  /** Enables an intelligence pack for a given workspace. */
  enable: (
    resourceGroupName: string,
    workspaceName: string,
    intelligencePackName: string,
    options?: IntelligencePacksEnableOptionalParams,
  ) => Promise<void>;
  /** Disables an intelligence pack for a given workspace. */
  disable: (
    resourceGroupName: string,
    workspaceName: string,
    intelligencePackName: string,
    options?: IntelligencePacksDisableOptionalParams,
  ) => Promise<void>;
}

function _getIntelligencePacks(context: OperationalInsightsManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: IntelligencePacksListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    enable: (
      resourceGroupName: string,
      workspaceName: string,
      intelligencePackName: string,
      options?: IntelligencePacksEnableOptionalParams,
    ) => enable(context, resourceGroupName, workspaceName, intelligencePackName, options),
    disable: (
      resourceGroupName: string,
      workspaceName: string,
      intelligencePackName: string,
      options?: IntelligencePacksDisableOptionalParams,
    ) => disable(context, resourceGroupName, workspaceName, intelligencePackName, options),
  };
}

export function _getIntelligencePacksOperations(
  context: OperationalInsightsManagementContext,
): IntelligencePacksOperations {
  return {
    ..._getIntelligencePacks(context),
  };
}
