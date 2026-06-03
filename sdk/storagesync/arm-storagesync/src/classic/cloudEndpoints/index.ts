// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftStorageSyncContext } from "../../api/microsoftStorageSyncContext.js";
import {
  afsShareMetadataCertificatePublicKeys,
  triggerChangeDetection,
  postRestore,
  restoreHeartbeat,
  preRestore,
  postBackup,
  preBackup,
  listBySyncGroup,
  $delete,
  create,
  get,
} from "../../api/cloudEndpoints/operations.js";
import type {
  CloudEndpointsAfsShareMetadataCertificatePublicKeysOptionalParams,
  CloudEndpointsTriggerChangeDetectionOptionalParams,
  CloudEndpointsPostRestoreOptionalParams,
  CloudEndpointsRestoreHeartbeatOptionalParams,
  CloudEndpointsPreRestoreOptionalParams,
  CloudEndpointsPostBackupOptionalParams,
  CloudEndpointsPreBackupOptionalParams,
  CloudEndpointsListBySyncGroupOptionalParams,
  CloudEndpointsDeleteOptionalParams,
  CloudEndpointsCreateOptionalParams,
  CloudEndpointsGetOptionalParams,
} from "../../api/cloudEndpoints/options.js";
import type {
  CloudEndpoint,
  CloudEndpointCreateParameters,
  BackupRequest,
  PostBackupResponse,
  PreRestoreRequest,
  PostRestoreRequest,
  TriggerChangeDetectionParameters,
  CloudEndpointAfsShareMetadataCertificatePublicKeys,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CloudEndpoints operations. */
export interface CloudEndpointsOperations {
  /** Get the AFS file share metadata signing certificate public keys. */
  afsShareMetadataCertificatePublicKeys: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    cloudEndpointName: string,
    options?: CloudEndpointsAfsShareMetadataCertificatePublicKeysOptionalParams,
  ) => Promise<CloudEndpointAfsShareMetadataCertificatePublicKeys>;
  /** Triggers detection of changes performed on Azure File share connected to the specified Azure File Sync Cloud Endpoint. */
  triggerChangeDetection: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    cloudEndpointName: string,
    parameters: TriggerChangeDetectionParameters,
    options?: CloudEndpointsTriggerChangeDetectionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Post Restore a given CloudEndpoint. */
  postRestore: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    cloudEndpointName: string,
    parameters: PostRestoreRequest,
    options?: CloudEndpointsPostRestoreOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Restore Heartbeat a given CloudEndpoint. */
  restoreHeartbeat: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    cloudEndpointName: string,
    options?: CloudEndpointsRestoreHeartbeatOptionalParams,
  ) => Promise<void>;
  /** Pre Restore a given CloudEndpoint. */
  preRestore: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    cloudEndpointName: string,
    parameters: PreRestoreRequest,
    options?: CloudEndpointsPreRestoreOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Post Backup a given CloudEndpoint. */
  postBackup: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    cloudEndpointName: string,
    parameters: BackupRequest,
    options?: CloudEndpointsPostBackupOptionalParams,
  ) => PollerLike<OperationState<PostBackupResponse>, PostBackupResponse>;
  /** Pre Backup a given CloudEndpoint. */
  preBackup: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    cloudEndpointName: string,
    parameters: BackupRequest,
    options?: CloudEndpointsPreBackupOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Get a CloudEndpoint List. */
  listBySyncGroup: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    options?: CloudEndpointsListBySyncGroupOptionalParams,
  ) => PagedAsyncIterableIterator<CloudEndpoint>;
  /** Delete a given CloudEndpoint. */
  delete: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    cloudEndpointName: string,
    options?: CloudEndpointsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a new CloudEndpoint. */
  create: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    cloudEndpointName: string,
    parameters: CloudEndpointCreateParameters,
    options?: CloudEndpointsCreateOptionalParams,
  ) => PollerLike<OperationState<CloudEndpoint>, CloudEndpoint>;
  /** Get a given CloudEndpoint. */
  get: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    cloudEndpointName: string,
    options?: CloudEndpointsGetOptionalParams,
  ) => Promise<CloudEndpoint>;
}

function _getCloudEndpoints(context: MicrosoftStorageSyncContext) {
  return {
    afsShareMetadataCertificatePublicKeys: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      cloudEndpointName: string,
      options?: CloudEndpointsAfsShareMetadataCertificatePublicKeysOptionalParams,
    ) =>
      afsShareMetadataCertificatePublicKeys(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        cloudEndpointName,
        options,
      ),
    triggerChangeDetection: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      cloudEndpointName: string,
      parameters: TriggerChangeDetectionParameters,
      options?: CloudEndpointsTriggerChangeDetectionOptionalParams,
    ) =>
      triggerChangeDetection(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        cloudEndpointName,
        parameters,
        options,
      ),
    postRestore: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      cloudEndpointName: string,
      parameters: PostRestoreRequest,
      options?: CloudEndpointsPostRestoreOptionalParams,
    ) =>
      postRestore(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        cloudEndpointName,
        parameters,
        options,
      ),
    restoreHeartbeat: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      cloudEndpointName: string,
      options?: CloudEndpointsRestoreHeartbeatOptionalParams,
    ) =>
      restoreHeartbeat(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        cloudEndpointName,
        options,
      ),
    preRestore: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      cloudEndpointName: string,
      parameters: PreRestoreRequest,
      options?: CloudEndpointsPreRestoreOptionalParams,
    ) =>
      preRestore(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        cloudEndpointName,
        parameters,
        options,
      ),
    postBackup: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      cloudEndpointName: string,
      parameters: BackupRequest,
      options?: CloudEndpointsPostBackupOptionalParams,
    ) =>
      postBackup(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        cloudEndpointName,
        parameters,
        options,
      ),
    preBackup: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      cloudEndpointName: string,
      parameters: BackupRequest,
      options?: CloudEndpointsPreBackupOptionalParams,
    ) =>
      preBackup(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        cloudEndpointName,
        parameters,
        options,
      ),
    listBySyncGroup: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      options?: CloudEndpointsListBySyncGroupOptionalParams,
    ) =>
      listBySyncGroup(context, resourceGroupName, storageSyncServiceName, syncGroupName, options),
    delete: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      cloudEndpointName: string,
      options?: CloudEndpointsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        cloudEndpointName,
        options,
      ),
    create: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      cloudEndpointName: string,
      parameters: CloudEndpointCreateParameters,
      options?: CloudEndpointsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        cloudEndpointName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      cloudEndpointName: string,
      options?: CloudEndpointsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        cloudEndpointName,
        options,
      ),
  };
}

export function _getCloudEndpointsOperations(
  context: MicrosoftStorageSyncContext,
): CloudEndpointsOperations {
  return {
    ..._getCloudEndpoints(context),
  };
}
