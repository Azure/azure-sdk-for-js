// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import { cancel, listByElasticPool } from "../../api/elasticPoolOperations/operations.js";
import type {
  ElasticPoolOperationsCancelOptionalParams,
  ElasticPoolOperationsListByElasticPoolOptionalParams,
} from "../../api/elasticPoolOperations/options.js";
import type { ElasticPoolOperation } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ElasticPoolOperations operations. */
export interface ElasticPoolOperationsOperations {
  /** Cancels the asynchronous operation on the elastic pool. */
  cancel: (
    resourceGroupName: string,
    serverName: string,
    elasticPoolName: string,
    operationId: string,
    options?: ElasticPoolOperationsCancelOptionalParams,
  ) => Promise<void>;
  /** Gets a list of operations performed on the elastic pool. */
  listByElasticPool: (
    resourceGroupName: string,
    serverName: string,
    elasticPoolName: string,
    options?: ElasticPoolOperationsListByElasticPoolOptionalParams,
  ) => PagedAsyncIterableIterator<ElasticPoolOperation>;
}

function _getElasticPoolOperations(context: SqlContext) {
  return {
    cancel: (
      resourceGroupName: string,
      serverName: string,
      elasticPoolName: string,
      operationId: string,
      options?: ElasticPoolOperationsCancelOptionalParams,
    ) => cancel(context, resourceGroupName, serverName, elasticPoolName, operationId, options),
    listByElasticPool: (
      resourceGroupName: string,
      serverName: string,
      elasticPoolName: string,
      options?: ElasticPoolOperationsListByElasticPoolOptionalParams,
    ) => listByElasticPool(context, resourceGroupName, serverName, elasticPoolName, options),
  };
}

export function _getElasticPoolOperationsOperations(
  context: SqlContext,
): ElasticPoolOperationsOperations {
  return {
    ..._getElasticPoolOperations(context),
  };
}
