// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftStorageSyncContext } from "../../api/microsoftStorageSyncContext.js";
import {
  afsShareMetadataCertificatePublicKeys,
  triggerChangeDetection,
  postRestore,
  restoreheartbeat,
  preRestore,
  postBackup,
  preBackup,
  listBySyncGroup,
  $delete,
  create,
  get,
} from "../../api/cloudEndpoints/operations.js";
import {
  CloudEndpointsAfsShareMetadataCertificatePublicKeysOptionalParams,
  CloudEndpointsTriggerChangeDetectionOptionalParams,
  CloudEndpointsPostRestoreOptionalParams,
  CloudEndpointsRestoreheartbeatOptionalParams,
  CloudEndpointsPreRestoreOptionalParams,
  CloudEndpointsPostBackupOptionalParams,
  CloudEndpointsPreBackupOptionalParams,
  CloudEndpointsListBySyncGroupOptionalParams,
  CloudEndpointsDeleteOptionalParams,
  CloudEndpointsCreateOptionalParams,
  CloudEndpointsGetOptionalParams,
} from "../../api/cloudEndpoints/options.js";
import {
  CloudEndpoint,
  CloudEndpointCreateParameters,
  BackupRequest,
  PostBackupResponse,
  PreRestoreRequest,
  PostRestoreRequest,
  TriggerChangeDetectionParameters,
  CloudEndpointAfsShareMetadataCertificatePublicKeys,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

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
  /** @deprecated use triggerChangeDetection instead */
  beginTriggerChangeDetection: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    cloudEndpointName: string,
    parameters: TriggerChangeDetectionParameters,
    options?: CloudEndpointsTriggerChangeDetectionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use triggerChangeDetection instead */
  beginTriggerChangeDetectionAndWait: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    cloudEndpointName: string,
    parameters: TriggerChangeDetectionParameters,
    options?: CloudEndpointsTriggerChangeDetectionOptionalParams,
  ) => Promise<void>;
  /** Post Restore a given CloudEndpoint. */
  postRestore: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    cloudEndpointName: string,
    parameters: PostRestoreRequest,
    options?: CloudEndpointsPostRestoreOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use postRestore instead */
  beginPostRestore: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    cloudEndpointName: string,
    parameters: PostRestoreRequest,
    options?: CloudEndpointsPostRestoreOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use postRestore instead */
  beginPostRestoreAndWait: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    cloudEndpointName: string,
    parameters: PostRestoreRequest,
    options?: CloudEndpointsPostRestoreOptionalParams,
  ) => Promise<void>;
  /** Restore Heartbeat a given CloudEndpoint. */
  restoreheartbeat: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    cloudEndpointName: string,
    options?: CloudEndpointsRestoreheartbeatOptionalParams,
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
  /** @deprecated use preRestore instead */
  beginPreRestore: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    cloudEndpointName: string,
    parameters: PreRestoreRequest,
    options?: CloudEndpointsPreRestoreOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use preRestore instead */
  beginPreRestoreAndWait: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    cloudEndpointName: string,
    parameters: PreRestoreRequest,
    options?: CloudEndpointsPreRestoreOptionalParams,
  ) => Promise<void>;
  /** Post Backup a given CloudEndpoint. */
  postBackup: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    cloudEndpointName: string,
    parameters: BackupRequest,
    options?: CloudEndpointsPostBackupOptionalParams,
  ) => PollerLike<OperationState<PostBackupResponse>, PostBackupResponse>;
  /** @deprecated use postBackup instead */
  beginPostBackup: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    cloudEndpointName: string,
    parameters: BackupRequest,
    options?: CloudEndpointsPostBackupOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PostBackupResponse>, PostBackupResponse>>;
  /** @deprecated use postBackup instead */
  beginPostBackupAndWait: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    cloudEndpointName: string,
    parameters: BackupRequest,
    options?: CloudEndpointsPostBackupOptionalParams,
  ) => Promise<PostBackupResponse>;
  /** Pre Backup a given CloudEndpoint. */
  preBackup: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    cloudEndpointName: string,
    parameters: BackupRequest,
    options?: CloudEndpointsPreBackupOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use preBackup instead */
  beginPreBackup: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    cloudEndpointName: string,
    parameters: BackupRequest,
    options?: CloudEndpointsPreBackupOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use preBackup instead */
  beginPreBackupAndWait: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    cloudEndpointName: string,
    parameters: BackupRequest,
    options?: CloudEndpointsPreBackupOptionalParams,
  ) => Promise<void>;
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    cloudEndpointName: string,
    options?: CloudEndpointsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    cloudEndpointName: string,
    options?: CloudEndpointsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a new CloudEndpoint. */
  create: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    cloudEndpointName: string,
    parameters: CloudEndpointCreateParameters,
    options?: CloudEndpointsCreateOptionalParams,
  ) => PollerLike<OperationState<CloudEndpoint>, CloudEndpoint>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    cloudEndpointName: string,
    parameters: CloudEndpointCreateParameters,
    options?: CloudEndpointsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CloudEndpoint>, CloudEndpoint>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    cloudEndpointName: string,
    parameters: CloudEndpointCreateParameters,
    options?: CloudEndpointsCreateOptionalParams,
  ) => Promise<CloudEndpoint>;
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
    beginTriggerChangeDetection: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      cloudEndpointName: string,
      parameters: TriggerChangeDetectionParameters,
      options?: CloudEndpointsTriggerChangeDetectionOptionalParams,
    ) => {
      const poller = triggerChangeDetection(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        cloudEndpointName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginTriggerChangeDetectionAndWait: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      cloudEndpointName: string,
      parameters: TriggerChangeDetectionParameters,
      options?: CloudEndpointsTriggerChangeDetectionOptionalParams,
    ) => {
      return await triggerChangeDetection(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        cloudEndpointName,
        parameters,
        options,
      );
    },
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
    beginPostRestore: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      cloudEndpointName: string,
      parameters: PostRestoreRequest,
      options?: CloudEndpointsPostRestoreOptionalParams,
    ) => {
      const poller = postRestore(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        cloudEndpointName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPostRestoreAndWait: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      cloudEndpointName: string,
      parameters: PostRestoreRequest,
      options?: CloudEndpointsPostRestoreOptionalParams,
    ) => {
      return await postRestore(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        cloudEndpointName,
        parameters,
        options,
      );
    },
    restoreheartbeat: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      cloudEndpointName: string,
      options?: CloudEndpointsRestoreheartbeatOptionalParams,
    ) =>
      restoreheartbeat(
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
    beginPreRestore: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      cloudEndpointName: string,
      parameters: PreRestoreRequest,
      options?: CloudEndpointsPreRestoreOptionalParams,
    ) => {
      const poller = preRestore(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        cloudEndpointName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPreRestoreAndWait: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      cloudEndpointName: string,
      parameters: PreRestoreRequest,
      options?: CloudEndpointsPreRestoreOptionalParams,
    ) => {
      return await preRestore(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        cloudEndpointName,
        parameters,
        options,
      );
    },
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
    beginPostBackup: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      cloudEndpointName: string,
      parameters: BackupRequest,
      options?: CloudEndpointsPostBackupOptionalParams,
    ) => {
      const poller = postBackup(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        cloudEndpointName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPostBackupAndWait: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      cloudEndpointName: string,
      parameters: BackupRequest,
      options?: CloudEndpointsPostBackupOptionalParams,
    ) => {
      return await postBackup(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        cloudEndpointName,
        parameters,
        options,
      );
    },
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
    beginPreBackup: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      cloudEndpointName: string,
      parameters: BackupRequest,
      options?: CloudEndpointsPreBackupOptionalParams,
    ) => {
      const poller = preBackup(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        cloudEndpointName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPreBackupAndWait: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      cloudEndpointName: string,
      parameters: BackupRequest,
      options?: CloudEndpointsPreBackupOptionalParams,
    ) => {
      return await preBackup(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        cloudEndpointName,
        parameters,
        options,
      );
    },
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
    beginDelete: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      cloudEndpointName: string,
      options?: CloudEndpointsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        cloudEndpointName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      cloudEndpointName: string,
      options?: CloudEndpointsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        cloudEndpointName,
        options,
      );
    },
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
    beginCreate: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      cloudEndpointName: string,
      parameters: CloudEndpointCreateParameters,
      options?: CloudEndpointsCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        cloudEndpointName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      cloudEndpointName: string,
      parameters: CloudEndpointCreateParameters,
      options?: CloudEndpointsCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        cloudEndpointName,
        parameters,
        options,
      );
    },
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
