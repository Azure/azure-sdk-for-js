// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DigitalAssetsContext } from "../../api/digitalAssetsContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/zkpRollups/operations.js";
import type {
  ZkpRollupsListBySubscriptionOptionalParams,
  ZkpRollupsListByResourceGroupOptionalParams,
  ZkpRollupsDeleteOptionalParams,
  ZkpRollupsUpdateOptionalParams,
  ZkpRollupsCreateOrUpdateOptionalParams,
  ZkpRollupsGetOptionalParams,
} from "../../api/zkpRollups/options.js";
import type { ZkpRollup, ZkpRollupUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ZkpRollups operations. */
export interface ZkpRollupsOperations {
  /** List ZkpRollup resources by subscription ID */
  listBySubscription: (
    options?: ZkpRollupsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ZkpRollup>;
  /** List ZkpRollup resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ZkpRollupsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ZkpRollup>;
  /** Delete a ZkpRollup */
  delete: (
    resourceGroupName: string,
    zkpRollupName: string,
    options?: ZkpRollupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates rollup tags, identity attachments or configuration. Metadata-only updates complete synchronously. Configuration changes reconcile the rollup and existing partition asynchronously, preserving checkpoints and discovered contracts. */
  update: (
    resourceGroupName: string,
    zkpRollupName: string,
    properties: ZkpRollupUpdate,
    options?: ZkpRollupsUpdateOptionalParams,
  ) => PollerLike<OperationState<ZkpRollup>, ZkpRollup>;
  /** Creates or replaces a ZKP rollup. */
  createOrUpdate: (
    resourceGroupName: string,
    zkpRollupName: string,
    resource: ZkpRollup,
    options?: ZkpRollupsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ZkpRollup>, ZkpRollup>;
  /** Get a ZkpRollup */
  get: (
    resourceGroupName: string,
    zkpRollupName: string,
    options?: ZkpRollupsGetOptionalParams,
  ) => Promise<ZkpRollup>;
}

function _getZkpRollups(context: DigitalAssetsContext) {
  return {
    listBySubscription: (options?: ZkpRollupsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ZkpRollupsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      zkpRollupName: string,
      options?: ZkpRollupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, zkpRollupName, options),
    update: (
      resourceGroupName: string,
      zkpRollupName: string,
      properties: ZkpRollupUpdate,
      options?: ZkpRollupsUpdateOptionalParams,
    ) => update(context, resourceGroupName, zkpRollupName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      zkpRollupName: string,
      resource: ZkpRollup,
      options?: ZkpRollupsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, zkpRollupName, resource, options),
    get: (
      resourceGroupName: string,
      zkpRollupName: string,
      options?: ZkpRollupsGetOptionalParams,
    ) => get(context, resourceGroupName, zkpRollupName, options),
  };
}

export function _getZkpRollupsOperations(context: DigitalAssetsContext): ZkpRollupsOperations {
  return {
    ..._getZkpRollups(context),
  };
}
