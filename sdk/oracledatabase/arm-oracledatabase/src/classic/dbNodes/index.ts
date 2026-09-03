// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext } from "../../api/oracleDatabaseManagementContext.js";
import { action, listByParent, get } from "../../api/dbNodes/operations.js";
import type {
  DbNodesActionOptionalParams,
  DbNodesListByParentOptionalParams,
  DbNodesGetOptionalParams,
} from "../../api/dbNodes/options.js";
import type { DbNode, DbNodeAction } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DbNodes operations. */
export interface DbNodesOperations {
  /** VM actions on DbNode of VM Cluster by the provided filter */
  action: (
    resourceGroupName: string,
    cloudvmclustername: string,
    dbnodeocid: string,
    body: DbNodeAction,
    options?: DbNodesActionOptionalParams,
  ) => PollerLike<OperationState<DbNode>, DbNode>;
  /** List DbNode resources by CloudVmCluster */
  listByParent: (
    resourceGroupName: string,
    cloudvmclustername: string,
    options?: DbNodesListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<DbNode>;
  /** Get a DbNode */
  get: (
    resourceGroupName: string,
    cloudvmclustername: string,
    dbnodeocid: string,
    options?: DbNodesGetOptionalParams,
  ) => Promise<DbNode>;
}

function _getDbNodes(context: OracleDatabaseManagementContext) {
  return {
    action: (
      resourceGroupName: string,
      cloudvmclustername: string,
      dbnodeocid: string,
      body: DbNodeAction,
      options?: DbNodesActionOptionalParams,
    ) => action(context, resourceGroupName, cloudvmclustername, dbnodeocid, body, options),
    listByParent: (
      resourceGroupName: string,
      cloudvmclustername: string,
      options?: DbNodesListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, cloudvmclustername, options),
    get: (
      resourceGroupName: string,
      cloudvmclustername: string,
      dbnodeocid: string,
      options?: DbNodesGetOptionalParams,
    ) => get(context, resourceGroupName, cloudvmclustername, dbnodeocid, options),
  };
}

export function _getDbNodesOperations(context: OracleDatabaseManagementContext): DbNodesOperations {
  return {
    ..._getDbNodes(context),
  };
}
