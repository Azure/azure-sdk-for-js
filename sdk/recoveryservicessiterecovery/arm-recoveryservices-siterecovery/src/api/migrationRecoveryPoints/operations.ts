// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext as Client } from "../index.js";
import type {
  MigrationRecoveryPoint,
  _MigrationRecoveryPointCollection,
} from "../../models/models.js";
import {
  migrationRecoveryPointDeserializer,
  _migrationRecoveryPointCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  MigrationRecoveryPointsListByReplicationMigrationItemsOptionalParams,
  MigrationRecoveryPointsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByReplicationMigrationItemsSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  migrationItemName: string,
  options: MigrationRecoveryPointsListByReplicationMigrationItemsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationMigrationItems/{migrationItemName}/migrationRecoveryPoints{?api%2Dversion}",
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

export async function _listByReplicationMigrationItemsDeserialize(
  result: PathUncheckedResponse,
): Promise<_MigrationRecoveryPointCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _migrationRecoveryPointCollectionDeserializer(result.body);
}

/** Gets the recovery points for a migration item. */
export function listByReplicationMigrationItems(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  migrationItemName: string,
  options: MigrationRecoveryPointsListByReplicationMigrationItemsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<MigrationRecoveryPoint> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByReplicationMigrationItemsSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        options,
      ),
    _listByReplicationMigrationItemsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-08-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  migrationItemName: string,
  migrationRecoveryPointName: string,
  options: MigrationRecoveryPointsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationMigrationItems/{migrationItemName}/migrationRecoveryPoints/{migrationRecoveryPointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      migrationItemName: migrationItemName,
      migrationRecoveryPointName: migrationRecoveryPointName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<MigrationRecoveryPoint> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return migrationRecoveryPointDeserializer(result.body);
}

/** Gets a recovery point for a migration item. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  migrationItemName: string,
  migrationRecoveryPointName: string,
  options: MigrationRecoveryPointsGetOptionalParams = { requestOptions: {} },
): Promise<MigrationRecoveryPoint> {
  const result = await _getSend(
    context,
    resourceGroupName,
    resourceName,
    fabricName,
    protectionContainerName,
    migrationItemName,
    migrationRecoveryPointName,
    options,
  );
  return _getDeserialize(result);
}
