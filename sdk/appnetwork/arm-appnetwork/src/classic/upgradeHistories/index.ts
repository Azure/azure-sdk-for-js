// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppLinkContext } from "../../api/appLinkContext.js";
import { listByAppLinkMember } from "../../api/upgradeHistories/operations.js";
import type { UpgradeHistoriesListByAppLinkMemberOptionalParams } from "../../api/upgradeHistories/options.js";
import type { UpgradeHistory } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a UpgradeHistories operations. */
export interface UpgradeHistoriesOperations {
  /** List UpgradeHistory resources by AppLinkMember. */
  listByAppLinkMember: (
    resourceGroupName: string,
    appLinkName: string,
    appLinkMemberName: string,
    options?: UpgradeHistoriesListByAppLinkMemberOptionalParams,
  ) => PagedAsyncIterableIterator<UpgradeHistory>;
}

function _getUpgradeHistories(context: AppLinkContext) {
  return {
    listByAppLinkMember: (
      resourceGroupName: string,
      appLinkName: string,
      appLinkMemberName: string,
      options?: UpgradeHistoriesListByAppLinkMemberOptionalParams,
    ) => listByAppLinkMember(context, resourceGroupName, appLinkName, appLinkMemberName, options),
  };
}

export function _getUpgradeHistoriesOperations(
  context: AppLinkContext,
): UpgradeHistoriesOperations {
  return {
    ..._getUpgradeHistories(context),
  };
}
