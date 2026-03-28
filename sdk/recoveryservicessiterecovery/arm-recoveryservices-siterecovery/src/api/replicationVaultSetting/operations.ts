// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext as Client } from "../index.js";
import type {
  VaultSetting,
  VaultSettingCreationInput,
  _VaultSettingCollection,
} from "../../models/models.js";
import {
  vaultSettingDeserializer,
  vaultSettingCreationInputSerializer,
  _vaultSettingCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ReplicationVaultSettingListOptionalParams,
  ReplicationVaultSettingCreateOptionalParams,
  ReplicationVaultSettingGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ReplicationVaultSettingListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationVaultSettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_VaultSettingCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _vaultSettingCollectionDeserializer(result.body);
}

/** Gets the list of vault setting. This includes the Migration Hub connection settings. */
export function list(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ReplicationVaultSettingListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VaultSetting> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, resourceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-08-01" },
  );
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  vaultSettingName: string,
  input: VaultSettingCreationInput,
  options: ReplicationVaultSettingCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationVaultSettings/{vaultSettingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      vaultSettingName: vaultSettingName,
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
    body: vaultSettingCreationInputSerializer(input),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<VaultSetting> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return vaultSettingDeserializer(result.body);
}

/** The operation to configure vault setting. */
export function create(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  vaultSettingName: string,
  input: VaultSettingCreationInput,
  options: ReplicationVaultSettingCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VaultSetting>, VaultSetting> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, resourceName, vaultSettingName, input, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<VaultSetting>, VaultSetting>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  vaultSettingName: string,
  options: ReplicationVaultSettingGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationVaultSettings/{vaultSettingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      vaultSettingName: vaultSettingName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<VaultSetting> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return vaultSettingDeserializer(result.body);
}

/** Gets the vault setting. This includes the Migration Hub connection settings. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  vaultSettingName: string,
  options: ReplicationVaultSettingGetOptionalParams = { requestOptions: {} },
): Promise<VaultSetting> {
  const result = await _getSend(
    context,
    resourceGroupName,
    resourceName,
    vaultSettingName,
    options,
  );
  return _getDeserialize(result);
}
