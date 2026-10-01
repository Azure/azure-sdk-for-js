// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PurviewManagementContext } from "../../api/purviewManagementContext.js";
import { get } from "../../api/usages/operations.js";
import { UsagesGetOptionalParams } from "../../api/usages/options.js";
import { UsageList } from "../../models/models.js";

/** Interface representing a Usages operations. */
export interface UsagesOperations {
  /** Get the usage quota configuration */
  get: (location: string, options?: UsagesGetOptionalParams) => Promise<UsageList>;
}

function _getUsages(context: PurviewManagementContext) {
  return {
    get: (location: string, options?: UsagesGetOptionalParams) => get(context, location, options),
  };
}

export function _getUsagesOperations(context: PurviewManagementContext): UsagesOperations {
  return {
    ..._getUsages(context),
  };
}
