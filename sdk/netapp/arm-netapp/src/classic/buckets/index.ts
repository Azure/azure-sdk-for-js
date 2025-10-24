// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import {
  generateCredentials,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/buckets/operations.js";
import type {
  BucketsGenerateCredentialsOptionalParams,
  BucketsListOptionalParams,
  BucketsDeleteOptionalParams,
  BucketsUpdateOptionalParams,
  BucketsCreateOrUpdateOptionalParams,
  BucketsGetOptionalParams,
} from "../../api/buckets/options.js";
import type {
  Bucket,
  BucketPatch,
  BucketCredentialsExpiry,
  BucketGenerateCredentials,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Buckets operations. */
export interface BucketsOperations {
  /** Generate the access key and secret key used for accessing the specified volume bucket. Also return expiry date and time of key pair (in UTC). */
  generateCredentials: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    bucketName: string,
    body: BucketCredentialsExpiry,
    options?: BucketsGenerateCredentialsOptionalParams,
  ) => Promise<BucketGenerateCredentials>;
  /** Describes all buckets belonging to a volume. Buckets allow additional services, such as AI services, connect to the volume data contained in those buckets. */
  list: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    options?: BucketsListOptionalParams,
  ) => PagedAsyncIterableIterator<Bucket>;
  /** Delete a volume's bucket. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    bucketName: string,
    options?: BucketsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates the details of a volume bucket. */
  update: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    bucketName: string,
    body: BucketPatch,
    options?: BucketsUpdateOptionalParams,
  ) => PollerLike<OperationState<Bucket>, Bucket>;
  /** Creates or updates a bucket for a volume. A bucket allows additional services, such as AI services, connect to the volume data contained in those buckets. */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    bucketName: string,
    body: Bucket,
    options?: BucketsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Bucket>, Bucket>;
  /** Get the details of the specified volume's bucket. A bucket allows additional services, such as AI services, connect to the volume data contained in those buckets. */
  get: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    bucketName: string,
    options?: BucketsGetOptionalParams,
  ) => Promise<Bucket>;
}

function _getBuckets(context: NetAppManagementContext) {
  return {
    generateCredentials: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      bucketName: string,
      body: BucketCredentialsExpiry,
      options?: BucketsGenerateCredentialsOptionalParams,
    ) =>
      generateCredentials(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        bucketName,
        body,
        options,
      ),
    list: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      options?: BucketsListOptionalParams,
    ) => list(context, resourceGroupName, accountName, poolName, volumeName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      bucketName: string,
      options?: BucketsDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, accountName, poolName, volumeName, bucketName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      bucketName: string,
      body: BucketPatch,
      options?: BucketsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        bucketName,
        body,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      bucketName: string,
      body: Bucket,
      options?: BucketsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        bucketName,
        body,
        options,
      ),
    get: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      bucketName: string,
      options?: BucketsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, poolName, volumeName, bucketName, options),
  };
}

export function _getBucketsOperations(context: NetAppManagementContext): BucketsOperations {
  return {
    ..._getBuckets(context),
  };
}
