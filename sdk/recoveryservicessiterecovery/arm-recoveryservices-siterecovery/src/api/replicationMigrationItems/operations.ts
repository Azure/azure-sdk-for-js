// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext as Client } from "../index.js";
import type {
  MigrationItem,
  EnableMigrationInput,
  UpdateMigrationItemInput,
  _MigrationItemCollection,
  MigrateInput,
  PauseReplicationInput,
  ResumeReplicationInput,
  ResyncInput,
  TestMigrateInput,
  TestMigrateCleanupInput,
} from "../../models/models.js";
import {
  migrationItemDeserializer,
  enableMigrationInputSerializer,
  updateMigrationItemInputSerializer,
  _migrationItemCollectionDeserializer,
  migrateInputSerializer,
  pauseReplicationInputSerializer,
  resumeReplicationInputSerializer,
  resyncInputSerializer,
  testMigrateInputSerializer,
  testMigrateCleanupInputSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ReplicationMigrationItemsListOptionalParams,
  ReplicationMigrationItemsTestMigrateCleanupOptionalParams,
  ReplicationMigrationItemsTestMigrateOptionalParams,
  ReplicationMigrationItemsResyncOptionalParams,
  ReplicationMigrationItemsResumeReplicationOptionalParams,
  ReplicationMigrationItemsPauseReplicationOptionalParams,
  ReplicationMigrationItemsMigrateOptionalParams,
  ReplicationMigrationItemsListByReplicationProtectionContainersOptionalParams,
  ReplicationMigrationItemsDeleteOptionalParams,
  ReplicationMigrationItemsUpdateOptionalParams,
  ReplicationMigrationItemsCreateOptionalParams,
  ReplicationMigrationItemsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ReplicationMigrationItemsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationMigrationItems{?api%2Dversion,skipToken,takeToken,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
      skipToken: options?.skipToken,
      takeToken: options?.takeToken,
      "%24filter": options?.filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_MigrationItemCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _migrationItemCollectionDeserializer(result.body);
}

/** Gets the list of migration items in the vault. */
export function list(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ReplicationMigrationItemsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MigrationItem> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, resourceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-08-01" },
  );
}

export function _testMigrateCleanupSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  migrationItemName: string,
  testMigrateCleanupInput: TestMigrateCleanupInput,
  options: ReplicationMigrationItemsTestMigrateCleanupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationMigrationItems/{migrationItemName}/testMigrateCleanup{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      migrationItemName: migrationItemName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: testMigrateCleanupInputSerializer(testMigrateCleanupInput),
  });
}

export async function _testMigrateCleanupDeserialize(
  result: PathUncheckedResponse,
): Promise<MigrationItem> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return migrationItemDeserializer(result.body);
}

/** The operation to initiate test migrate cleanup. */
export function testMigrateCleanup(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  migrationItemName: string,
  testMigrateCleanupInput: TestMigrateCleanupInput,
  options: ReplicationMigrationItemsTestMigrateCleanupOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MigrationItem>, MigrationItem> {
  return getLongRunningPoller(context, _testMigrateCleanupDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _testMigrateCleanupSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        testMigrateCleanupInput,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<MigrationItem>, MigrationItem>;
}

export function _testMigrateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  migrationItemName: string,
  testMigrateInput: TestMigrateInput,
  options: ReplicationMigrationItemsTestMigrateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationMigrationItems/{migrationItemName}/testMigrate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      migrationItemName: migrationItemName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: testMigrateInputSerializer(testMigrateInput),
  });
}

export async function _testMigrateDeserialize(
  result: PathUncheckedResponse,
): Promise<MigrationItem> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return migrationItemDeserializer(result.body);
}

/** The operation to initiate test migration of the item. */
export function testMigrate(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  migrationItemName: string,
  testMigrateInput: TestMigrateInput,
  options: ReplicationMigrationItemsTestMigrateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MigrationItem>, MigrationItem> {
  return getLongRunningPoller(context, _testMigrateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _testMigrateSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        testMigrateInput,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<MigrationItem>, MigrationItem>;
}

export function _resyncSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  migrationItemName: string,
  input: ResyncInput,
  options: ReplicationMigrationItemsResyncOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationMigrationItems/{migrationItemName}/resync{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      migrationItemName: migrationItemName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: resyncInputSerializer(input),
  });
}

export async function _resyncDeserialize(result: PathUncheckedResponse): Promise<MigrationItem> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return migrationItemDeserializer(result.body);
}

/** The operation to resynchronize replication of an ASR migration item. */
export function resync(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  migrationItemName: string,
  input: ResyncInput,
  options: ReplicationMigrationItemsResyncOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MigrationItem>, MigrationItem> {
  return getLongRunningPoller(context, _resyncDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _resyncSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        input,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<MigrationItem>, MigrationItem>;
}

export function _resumeReplicationSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  migrationItemName: string,
  resumeReplicationInput: ResumeReplicationInput,
  options: ReplicationMigrationItemsResumeReplicationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationMigrationItems/{migrationItemName}/resumeReplication{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      migrationItemName: migrationItemName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: resumeReplicationInputSerializer(resumeReplicationInput),
  });
}

export async function _resumeReplicationDeserialize(
  result: PathUncheckedResponse,
): Promise<MigrationItem> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return migrationItemDeserializer(result.body);
}

/** The operation to initiate resume replication of the item. */
export function resumeReplication(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  migrationItemName: string,
  resumeReplicationInput: ResumeReplicationInput,
  options: ReplicationMigrationItemsResumeReplicationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MigrationItem>, MigrationItem> {
  return getLongRunningPoller(context, _resumeReplicationDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _resumeReplicationSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        resumeReplicationInput,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<MigrationItem>, MigrationItem>;
}

export function _pauseReplicationSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  migrationItemName: string,
  pauseReplicationInput: PauseReplicationInput,
  options: ReplicationMigrationItemsPauseReplicationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationMigrationItems/{migrationItemName}/pauseReplication{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      migrationItemName: migrationItemName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: pauseReplicationInputSerializer(pauseReplicationInput),
  });
}

export async function _pauseReplicationDeserialize(
  result: PathUncheckedResponse,
): Promise<MigrationItem> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return migrationItemDeserializer(result.body);
}

/** The operation to initiate pause replication of the item. */
export function pauseReplication(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  migrationItemName: string,
  pauseReplicationInput: PauseReplicationInput,
  options: ReplicationMigrationItemsPauseReplicationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MigrationItem>, MigrationItem> {
  return getLongRunningPoller(context, _pauseReplicationDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _pauseReplicationSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        pauseReplicationInput,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<MigrationItem>, MigrationItem>;
}

export function _migrateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  migrationItemName: string,
  migrateInput: MigrateInput,
  options: ReplicationMigrationItemsMigrateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationMigrationItems/{migrationItemName}/migrate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      migrationItemName: migrationItemName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: migrateInputSerializer(migrateInput),
  });
}

export async function _migrateDeserialize(result: PathUncheckedResponse): Promise<MigrationItem> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return migrationItemDeserializer(result.body);
}

/** The operation to initiate migration of the item. */
export function migrate(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  migrationItemName: string,
  migrateInput: MigrateInput,
  options: ReplicationMigrationItemsMigrateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MigrationItem>, MigrationItem> {
  return getLongRunningPoller(context, _migrateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _migrateSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        migrateInput,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<MigrationItem>, MigrationItem>;
}

export function _listByReplicationProtectionContainersSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  options: ReplicationMigrationItemsListByReplicationProtectionContainersOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationMigrationItems{?api%2Dversion,skipToken,takeToken,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
      skipToken: options?.skipToken,
      takeToken: options?.takeToken,
      "%24filter": options?.filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listByReplicationProtectionContainersDeserialize(
  result: PathUncheckedResponse,
): Promise<_MigrationItemCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _migrationItemCollectionDeserializer(result.body);
}

/** Gets the list of ASR migration items in the protection container. */
export function listByReplicationProtectionContainers(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  options: ReplicationMigrationItemsListByReplicationProtectionContainersOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<MigrationItem> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByReplicationProtectionContainersSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        options,
      ),
    _listByReplicationProtectionContainersDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-08-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  migrationItemName: string,
  options: ReplicationMigrationItemsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationMigrationItems/{migrationItemName}{?api%2Dversion,deleteOption}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      migrationItemName: migrationItemName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
      deleteOption: options?.deleteOption,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** The operation to delete an ASR migration item. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  migrationItemName: string,
  options: ReplicationMigrationItemsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  migrationItemName: string,
  input: UpdateMigrationItemInput,
  options: ReplicationMigrationItemsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationMigrationItems/{migrationItemName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      migrationItemName: migrationItemName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: updateMigrationItemInputSerializer(input),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<MigrationItem> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return migrationItemDeserializer(result.body);
}

/** The operation to update the recovery settings of an ASR migration item. */
export function update(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  migrationItemName: string,
  input: UpdateMigrationItemInput,
  options: ReplicationMigrationItemsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MigrationItem>, MigrationItem> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        input,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<MigrationItem>, MigrationItem>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  migrationItemName: string,
  input: EnableMigrationInput,
  options: ReplicationMigrationItemsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationMigrationItems/{migrationItemName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      migrationItemName: migrationItemName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: enableMigrationInputSerializer(input),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<MigrationItem> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return migrationItemDeserializer(result.body);
}

/** The operation to create an ASR migration item (enable migration). */
export function create(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  migrationItemName: string,
  input: EnableMigrationInput,
  options: ReplicationMigrationItemsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MigrationItem>, MigrationItem> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        input,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<MigrationItem>, MigrationItem>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  migrationItemName: string,
  options: ReplicationMigrationItemsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationMigrationItems/{migrationItemName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      migrationItemName: migrationItemName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<MigrationItem> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return migrationItemDeserializer(result.body);
}

/** Gets the details of a migration item. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  migrationItemName: string,
  options: ReplicationMigrationItemsGetOptionalParams = { requestOptions: {} },
): Promise<MigrationItem> {
  const result = await _getSend(
    context,
    resourceGroupName,
    resourceName,
    fabricName,
    protectionContainerName,
    migrationItemName,
    options,
  );
  return _getDeserialize(result);
}
