// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext as Client } from "../index.js";
import type {
  DeletedBackupInstanceResource,
  _DeletedBackupInstanceResourceList,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  deletedBackupInstanceResourceDeserializer,
  _deletedBackupInstanceResourceListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DeletedBackupInstancesUndeleteOptionalParams,
  DeletedBackupInstancesListOptionalParams,
  DeletedBackupInstancesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _undeleteSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  options: DeletedBackupInstancesUndeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/deletedBackupInstances/{backupInstanceName}/undelete{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      backupInstanceName: backupInstanceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _undeleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** A long-running resource action. */
export function undelete(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  options: DeletedBackupInstancesUndeleteOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _undeleteDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _undeleteSend(context, resourceGroupName, vaultName, backupInstanceName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: DeletedBackupInstancesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/deletedBackupInstances{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeletedBackupInstanceResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _deletedBackupInstanceResourceListDeserializer(result.body);
}

/** Gets deleted backup instances belonging to a backup vault */
export function list(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: DeletedBackupInstancesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeletedBackupInstanceResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, vaultName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  options: DeletedBackupInstancesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/deletedBackupInstances/{backupInstanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      backupInstanceName: backupInstanceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<DeletedBackupInstanceResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return deletedBackupInstanceResourceDeserializer(result.body);
}

/** Gets a deleted backup instance with name in a backup vault */
export async function get(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  options: DeletedBackupInstancesGetOptionalParams = { requestOptions: {} },
): Promise<DeletedBackupInstanceResource> {
  const result = await _getSend(context, resourceGroupName, vaultName, backupInstanceName, options);
  return _getDeserialize(result);
}
