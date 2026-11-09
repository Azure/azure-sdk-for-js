// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SearchManagementContext } from "../../api/searchManagementContext.js";
import { regenerate, get } from "../../api/adminKeys/operations.js";
import type {
  AdminKeysRegenerateOptionalParams,
  AdminKeysGetOptionalParams,
} from "../../api/adminKeys/options.js";
import type { AdminKeyResult, AdminKeyKind } from "../../models/models.js";

/** Interface representing a AdminKeys operations. */
export interface AdminKeysOperations {
  /** Regenerates either the primary or secondary admin API key. You can only regenerate one key at a time. */
  regenerate: (
    resourceGroupName: string,
    searchServiceName: string,
    keyKind: AdminKeyKind,
    options?: AdminKeysRegenerateOptionalParams,
  ) => Promise<AdminKeyResult>;
  /** Gets the primary and secondary admin API keys for the specified Azure AI Search service. */
  get: (
    resourceGroupName: string,
    searchServiceName: string,
    options?: AdminKeysGetOptionalParams,
  ) => Promise<AdminKeyResult>;
}

function _getAdminKeys(context: SearchManagementContext) {
  return {
    regenerate: (
      resourceGroupName: string,
      searchServiceName: string,
      keyKind: AdminKeyKind,
      options?: AdminKeysRegenerateOptionalParams,
    ) => regenerate(context, resourceGroupName, searchServiceName, keyKind, options),
    get: (
      resourceGroupName: string,
      searchServiceName: string,
      options?: AdminKeysGetOptionalParams,
    ) => get(context, resourceGroupName, searchServiceName, options),
  };
}

export function _getAdminKeysOperations(context: SearchManagementContext): AdminKeysOperations {
  return {
    ..._getAdminKeys(context),
  };
}
