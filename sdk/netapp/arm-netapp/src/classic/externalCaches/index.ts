// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import { listByParent, get } from "../../api/externalCaches/operations.js";
import type {
  ExternalCachesListByParentOptionalParams,
  ExternalCachesGetOptionalParams,
} from "../../api/externalCaches/options.js";
import type { ExternalCache } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ExternalCaches operations. */
export interface ExternalCachesOperations {
  /** List all External Caches under an External SVM */
  listByParent: (
    resourceGroupName: string,
    externalClusterName: string,
    externalSvmName: string,
    options?: ExternalCachesListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<ExternalCache>;
  /** Get the External Cache */
  get: (
    resourceGroupName: string,
    externalClusterName: string,
    externalSvmName: string,
    externalCacheResourceName: string,
    options?: ExternalCachesGetOptionalParams,
  ) => Promise<ExternalCache>;
}

function _getExternalCaches(context: NetAppManagementContext) {
  return {
    listByParent: (
      resourceGroupName: string,
      externalClusterName: string,
      externalSvmName: string,
      options?: ExternalCachesListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, externalClusterName, externalSvmName, options),
    get: (
      resourceGroupName: string,
      externalClusterName: string,
      externalSvmName: string,
      externalCacheResourceName: string,
      options?: ExternalCachesGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        externalClusterName,
        externalSvmName,
        externalCacheResourceName,
        options,
      ),
  };
}

export function _getExternalCachesOperations(
  context: NetAppManagementContext,
): ExternalCachesOperations {
  return {
    ..._getExternalCaches(context),
  };
}
