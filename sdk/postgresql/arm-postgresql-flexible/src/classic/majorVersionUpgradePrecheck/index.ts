// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgreSQLManagementFlexibleServerContext } from "../../api/postgreSQLManagementFlexibleServerContext.js";
import { list, get } from "../../api/majorVersionUpgradePrecheck/operations.js";
import type {
  MajorVersionUpgradePrecheckListOptionalParams,
  MajorVersionUpgradePrecheckGetOptionalParams,
} from "../../api/majorVersionUpgradePrecheck/options.js";
import type { MajorVersionUpgradePrecheckResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a MajorVersionUpgradePrecheck operations. */
export interface MajorVersionUpgradePrecheckOperations {
  /** Lists major version upgrade prechecks for a flexible server. */
  list: (
    resourceGroupName: string,
    serverName: string,
    options?: MajorVersionUpgradePrecheckListOptionalParams,
  ) => PagedAsyncIterableIterator<MajorVersionUpgradePrecheckResource>;
  /** Gets information about a major version upgrade precheck for a flexible server. */
  get: (
    resourceGroupName: string,
    serverName: string,
    precheckValidationId: string,
    options?: MajorVersionUpgradePrecheckGetOptionalParams,
  ) => Promise<MajorVersionUpgradePrecheckResource>;
}

function _getMajorVersionUpgradePrecheck(context: PostgreSQLManagementFlexibleServerContext) {
  return {
    list: (
      resourceGroupName: string,
      serverName: string,
      options?: MajorVersionUpgradePrecheckListOptionalParams,
    ) => list(context, resourceGroupName, serverName, options),
    get: (
      resourceGroupName: string,
      serverName: string,
      precheckValidationId: string,
      options?: MajorVersionUpgradePrecheckGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, precheckValidationId, options),
  };
}

export function _getMajorVersionUpgradePrecheckOperations(
  context: PostgreSQLManagementFlexibleServerContext,
): MajorVersionUpgradePrecheckOperations {
  return {
    ..._getMajorVersionUpgradePrecheck(context),
  };
}
