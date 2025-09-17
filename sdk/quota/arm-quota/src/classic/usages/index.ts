// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureQuotaExtensionAPIContext } from "../../api/azureQuotaExtensionAPIContext.js";
import { list, get } from "../../api/usages/operations.js";
import type {
  UsagesListOptionalParams,
  UsagesGetOptionalParams,
} from "../../api/usages/options.js";
import type { CurrentUsagesBase } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Usages operations. */
export interface UsagesOperations {
  /** Get a list of current usage for all resources for the scope specified. */
  list: (
    scope: string,
    options?: UsagesListOptionalParams,
  ) => PagedAsyncIterableIterator<CurrentUsagesBase>;
  /** Get the current usage of a resource. */
  get: (
    scope: string,
    resourceName: string,
    options?: UsagesGetOptionalParams,
  ) => Promise<CurrentUsagesBase>;
}

function _getUsages(context: AzureQuotaExtensionAPIContext) {
  return {
    list: (scope: string, options?: UsagesListOptionalParams) => list(context, scope, options),
    get: (scope: string, resourceName: string, options?: UsagesGetOptionalParams) =>
      get(context, scope, resourceName, options),
  };
}

export function _getUsagesOperations(context: AzureQuotaExtensionAPIContext): UsagesOperations {
  return {
    ..._getUsages(context),
  };
}
