// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext } from "../../api/microsoftElasticContext.js";
import { details } from "../../api/upgradableVersions/operations.js";
import type { UpgradableVersionsDetailsOptionalParams } from "../../api/upgradableVersions/options.js";
import type { UpgradableVersionsList } from "../../models/models.js";

/** Interface representing a UpgradableVersions operations. */
export interface UpgradableVersionsOperations {
  /** List all upgradable versions for your Elastic monitor resource, helping you plan and execute upgrades. */
  details: (
    resourceGroupName: string,
    monitorName: string,
    options?: UpgradableVersionsDetailsOptionalParams,
  ) => Promise<UpgradableVersionsList>;
}

function _getUpgradableVersions(context: MicrosoftElasticContext) {
  return {
    details: (
      resourceGroupName: string,
      monitorName: string,
      options?: UpgradableVersionsDetailsOptionalParams,
    ) => details(context, resourceGroupName, monitorName, options),
  };
}

export function _getUpgradableVersionsOperations(
  context: MicrosoftElasticContext,
): UpgradableVersionsOperations {
  return {
    ..._getUpgradableVersions(context),
  };
}
