// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import { get, list } from "../../api/netAppResourceUsages/operations.js";
import {
  NetAppResourceUsagesGetOptionalParams,
  NetAppResourceUsagesListOptionalParams,
} from "../../api/netAppResourceUsages/options.js";
import { UsageResult } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a NetAppResourceUsages operations. */
export interface NetAppResourceUsagesOperations {
  /** Get current subscription usage of the specific type */
  get: (
    location: string,
    usageType: string,
    options?: NetAppResourceUsagesGetOptionalParams,
  ) => Promise<UsageResult>;
  /** Get current subscription usages */
  list: (
    location: string,
    options?: NetAppResourceUsagesListOptionalParams,
  ) => PagedAsyncIterableIterator<UsageResult>;
}

function _getNetAppResourceUsages(context: NetAppManagementContext) {
  return {
    get: (
      location: string,
      usageType: string,
      options?: NetAppResourceUsagesGetOptionalParams,
    ) => get(context, location, usageType, options),
    list: (
      location: string,
      options?: NetAppResourceUsagesListOptionalParams,
    ) => list(context, location, options),
  };
}

export function _getNetAppResourceUsagesOperations(
  context: NetAppManagementContext,
): NetAppResourceUsagesOperations {
  return {
    ..._getNetAppResourceUsages(context),
  };
}
