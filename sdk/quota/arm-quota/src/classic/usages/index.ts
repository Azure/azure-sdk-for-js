// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureQuotaExtensionAPIContext } from "../../api/azureQuotaExtensionAPIContext.js";
import { list, get } from "../../api/usages/operations.js";
import { UsagesListOptionalParams, UsagesGetOptionalParams } from "../../api/usages/options.js";
import { CurrentUsagesBase } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Usages operations. */
export interface UsagesOperations {
  /** Get a list of current usage for all resources for the scope specified. */
  list: (
    scope: string,
    options?: UsagesListOptionalParams,
  ) => PagedAsyncIterableIterator<CurrentUsagesBase>;
  /** Get the current usage of a resource. */
  get: (
    apiVersion: string,
    resourceName: string,
    scope: string,
    options?: UsagesGetOptionalParams,
  ) => Promise<CurrentUsagesBase>;
}

function _getUsages(context: AzureQuotaExtensionAPIContext) {
  return {
    list: (scope: string, options?: UsagesListOptionalParams) => list(context, scope, options),
    get: (
      apiVersion: string,
      resourceName: string,
      scope: string,
      options?: UsagesGetOptionalParams,
    ) => get(context, apiVersion, resourceName, scope, options),
  };
}

export function _getUsagesOperations(context: AzureQuotaExtensionAPIContext): UsagesOperations {
  return {
    ..._getUsages(context),
  };
}
