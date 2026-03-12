// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPIContext } from "../../api/azureSiteRecoveryManagementServiceAPIContext.js";
import { ReplicationExtensionModel } from "../../models/models.js";
import {
  ReplicationExtensionListOptionalParams,
  ReplicationExtensionDeleteOptionalParams,
  ReplicationExtensionCreateOptionalParams,
  ReplicationExtensionGetOptionalParams,
} from "../../api/replicationExtension/options.js";
import { list, $delete, create, get } from "../../api/replicationExtension/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ReplicationExtension operations. */
export interface ReplicationExtensionOperations {
  /** Gets the list of replication extensions in the given vault. */
  list: (
    resourceGroupName: string,
    vaultName: string,
    options?: ReplicationExtensionListOptionalParams,
  ) => PagedAsyncIterableIterator<ReplicationExtensionModel>;
  /** Deletes the replication extension in the given vault. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    vaultName: string,
    replicationExtensionName: string,
    options?: ReplicationExtensionDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates the replication extension in the given vault. */
  create: (
    resourceGroupName: string,
    vaultName: string,
    replicationExtensionName: string,
    resource: ReplicationExtensionModel,
    options?: ReplicationExtensionCreateOptionalParams,
  ) => PollerLike<OperationState<ReplicationExtensionModel>, ReplicationExtensionModel>;
  /** Gets the details of the replication extension. */
  get: (
    resourceGroupName: string,
    vaultName: string,
    replicationExtensionName: string,
    options?: ReplicationExtensionGetOptionalParams,
  ) => Promise<ReplicationExtensionModel>;
}

function _getReplicationExtension(context: AzureSiteRecoveryManagementServiceAPIContext) {
  return {
    list: (
      resourceGroupName: string,
      vaultName: string,
      options?: ReplicationExtensionListOptionalParams,
    ) => list(context, resourceGroupName, vaultName, options),
    delete: (
      resourceGroupName: string,
      vaultName: string,
      replicationExtensionName: string,
      options?: ReplicationExtensionDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, vaultName, replicationExtensionName, options),
    create: (
      resourceGroupName: string,
      vaultName: string,
      replicationExtensionName: string,
      resource: ReplicationExtensionModel,
      options?: ReplicationExtensionCreateOptionalParams,
    ) => create(context, resourceGroupName, vaultName, replicationExtensionName, resource, options),
    get: (
      resourceGroupName: string,
      vaultName: string,
      replicationExtensionName: string,
      options?: ReplicationExtensionGetOptionalParams,
    ) => get(context, resourceGroupName, vaultName, replicationExtensionName, options),
  };
}

export function _getReplicationExtensionOperations(
  context: AzureSiteRecoveryManagementServiceAPIContext,
): ReplicationExtensionOperations {
  return {
    ..._getReplicationExtension(context),
  };
}
