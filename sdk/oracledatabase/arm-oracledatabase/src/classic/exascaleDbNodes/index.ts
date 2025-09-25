// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext } from "../../api/oracleDatabaseManagementContext.js";
import { action, listByParent, get } from "../../api/exascaleDbNodes/operations.js";
import type {
  ExascaleDbNodesActionOptionalParams,
  ExascaleDbNodesListByParentOptionalParams,
  ExascaleDbNodesGetOptionalParams,
} from "../../api/exascaleDbNodes/options.js";
import type { DbNodeAction, ExascaleDbNode, DbActionResponse } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ExascaleDbNodes operations. */
export interface ExascaleDbNodesOperations {
  /** VM actions on DbNode of ExadbVmCluster by the provided filter */
  action: (
    resourceGroupName: string,
    exadbVmClusterName: string,
    exascaleDbNodeName: string,
    body: DbNodeAction,
    options?: ExascaleDbNodesActionOptionalParams,
  ) => PollerLike<OperationState<DbActionResponse>, DbActionResponse>;
  /** List ExascaleDbNode resources by ExadbVmCluster */
  listByParent: (
    resourceGroupName: string,
    exadbVmClusterName: string,
    options?: ExascaleDbNodesListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<ExascaleDbNode>;
  /** Get a ExascaleDbNode */
  get: (
    resourceGroupName: string,
    exadbVmClusterName: string,
    exascaleDbNodeName: string,
    options?: ExascaleDbNodesGetOptionalParams,
  ) => Promise<ExascaleDbNode>;
}

function _getExascaleDbNodes(context: OracleDatabaseManagementContext) {
  return {
    action: (
      resourceGroupName: string,
      exadbVmClusterName: string,
      exascaleDbNodeName: string,
      body: DbNodeAction,
      options?: ExascaleDbNodesActionOptionalParams,
    ) => action(context, resourceGroupName, exadbVmClusterName, exascaleDbNodeName, body, options),
    listByParent: (
      resourceGroupName: string,
      exadbVmClusterName: string,
      options?: ExascaleDbNodesListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, exadbVmClusterName, options),
    get: (
      resourceGroupName: string,
      exadbVmClusterName: string,
      exascaleDbNodeName: string,
      options?: ExascaleDbNodesGetOptionalParams,
    ) => get(context, resourceGroupName, exadbVmClusterName, exascaleDbNodeName, options),
  };
}

export function _getExascaleDbNodesOperations(
  context: OracleDatabaseManagementContext,
): ExascaleDbNodesOperations {
  return {
    ..._getExascaleDbNodes(context),
  };
}
