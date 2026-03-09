// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SearchManagementContext } from "../../api/searchManagementContext.js";
import { $delete, listBySearchService, create } from "../../api/queryKeys/operations.js";
import type {
  QueryKeysDeleteOptionalParams,
  QueryKeysListBySearchServiceOptionalParams,
  QueryKeysCreateOptionalParams,
} from "../../api/queryKeys/options.js";
import type { QueryKey } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a QueryKeys operations. */
export interface QueryKeysOperations {
  /** Deletes the specified query key. Unlike admin keys, query keys are not regenerated. The process for regenerating a query key is to delete and then recreate it. */
  /**
   *  @fixme Delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    searchServiceName: string,
    key: string,
    options?: QueryKeysDeleteOptionalParams,
  ) => Promise<void>;
  /** Returns the list of query API keys for the given Azure AI Search service. */
  listBySearchService: (
    resourceGroupName: string,
    searchServiceName: string,
    options?: QueryKeysListBySearchServiceOptionalParams,
  ) => PagedAsyncIterableIterator<QueryKey>;
  /** Generates a new query key for the specified search service. You can create up to 50 query keys per service. */
  create: (
    resourceGroupName: string,
    searchServiceName: string,
    name: string,
    options?: QueryKeysCreateOptionalParams,
  ) => Promise<QueryKey>;
}

function _getQueryKeys(context: SearchManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      searchServiceName: string,
      key: string,
      options?: QueryKeysDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, searchServiceName, key, options),
    listBySearchService: (
      resourceGroupName: string,
      searchServiceName: string,
      options?: QueryKeysListBySearchServiceOptionalParams,
    ) => listBySearchService(context, resourceGroupName, searchServiceName, options),
    create: (
      resourceGroupName: string,
      searchServiceName: string,
      name: string,
      options?: QueryKeysCreateOptionalParams,
    ) => create(context, resourceGroupName, searchServiceName, name, options),
  };
}

export function _getQueryKeysOperations(context: SearchManagementContext): QueryKeysOperations {
  return {
    ..._getQueryKeys(context),
  };
}
