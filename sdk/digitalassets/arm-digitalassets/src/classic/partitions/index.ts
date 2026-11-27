// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DigitalAssetsContext } from "../../api/digitalAssetsContext.js";
import {
  listByParent,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/partitions/operations.js";
import type {
  PartitionsListByParentOptionalParams,
  PartitionsDeleteOptionalParams,
  PartitionsUpdateOptionalParams,
  PartitionsCreateOrUpdateOptionalParams,
  PartitionsGetOptionalParams,
} from "../../api/partitions/options.js";
import type { Partition, PartitionTagsUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Partitions operations. */
export interface PartitionsOperations {
  /** List Partition resources by ZkpRollup */
  listByParent: (
    resourceGroupName: string,
    zkpRollupName: string,
    options?: PartitionsListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<Partition>;
  /** Delete a Partition */
  delete: (
    resourceGroupName: string,
    zkpRollupName: string,
    partitionName: string,
    options?: PartitionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a Partition */
  update: (
    resourceGroupName: string,
    zkpRollupName: string,
    partitionName: string,
    properties: PartitionTagsUpdate,
    options?: PartitionsUpdateOptionalParams,
  ) => Promise<Partition>;
  /** Creates or replaces a partition. */
  createOrUpdate: (
    resourceGroupName: string,
    zkpRollupName: string,
    partitionName: string,
    resource: Partition,
    options?: PartitionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Partition>, Partition>;
  /** Get a Partition */
  get: (
    resourceGroupName: string,
    zkpRollupName: string,
    partitionName: string,
    options?: PartitionsGetOptionalParams,
  ) => Promise<Partition>;
}

function _getPartitions(context: DigitalAssetsContext) {
  return {
    listByParent: (
      resourceGroupName: string,
      zkpRollupName: string,
      options?: PartitionsListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, zkpRollupName, options),
    delete: (
      resourceGroupName: string,
      zkpRollupName: string,
      partitionName: string,
      options?: PartitionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, zkpRollupName, partitionName, options),
    update: (
      resourceGroupName: string,
      zkpRollupName: string,
      partitionName: string,
      properties: PartitionTagsUpdate,
      options?: PartitionsUpdateOptionalParams,
    ) => update(context, resourceGroupName, zkpRollupName, partitionName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      zkpRollupName: string,
      partitionName: string,
      resource: Partition,
      options?: PartitionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, zkpRollupName, partitionName, resource, options),
    get: (
      resourceGroupName: string,
      zkpRollupName: string,
      partitionName: string,
      options?: PartitionsGetOptionalParams,
    ) => get(context, resourceGroupName, zkpRollupName, partitionName, options),
  };
}

export function _getPartitionsOperations(context: DigitalAssetsContext): PartitionsOperations {
  return {
    ..._getPartitions(context),
  };
}
