// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type {
  EncryptionProtector,
  EncryptionProtectorName,
  _EncryptionProtectorListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  encryptionProtectorSerializer,
  encryptionProtectorDeserializer,
  _encryptionProtectorListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  EncryptionProtectorsRevalidateOptionalParams,
  EncryptionProtectorsListByServerOptionalParams,
  EncryptionProtectorsCreateOrUpdateOptionalParams,
  EncryptionProtectorsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _revalidateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  encryptionProtectorName: EncryptionProtectorName,
  options: EncryptionProtectorsRevalidateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/encryptionProtector/{encryptionProtectorName}/revalidate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      encryptionProtectorName: encryptionProtectorName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _revalidateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Revalidates an existing encryption protector. */
export function revalidate(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  encryptionProtectorName: EncryptionProtectorName,
  options: EncryptionProtectorsRevalidateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _revalidateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _revalidateSend(context, resourceGroupName, serverName, encryptionProtectorName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listByServerSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: EncryptionProtectorsListByServerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/encryptionProtector{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _listByServerDeserialize(
  result: PathUncheckedResponse,
): Promise<_EncryptionProtectorListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _encryptionProtectorListResultDeserializer(result.body);
}

/** Gets a list of server encryption protectors */
export function listByServer(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: EncryptionProtectorsListByServerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EncryptionProtector> {
  return buildPagedAsyncIterator(
    context,
    () => _listByServerSend(context, resourceGroupName, serverName, options),
    _listByServerDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  encryptionProtectorName: EncryptionProtectorName,
  parameters: EncryptionProtector,
  options: EncryptionProtectorsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/encryptionProtector/{encryptionProtectorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      encryptionProtectorName: encryptionProtectorName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: encryptionProtectorSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<EncryptionProtector> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return encryptionProtectorDeserializer(result.body);
}

/** Updates an existing encryption protector. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  encryptionProtectorName: EncryptionProtectorName,
  parameters: EncryptionProtector,
  options: EncryptionProtectorsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EncryptionProtector>, EncryptionProtector> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        serverName,
        encryptionProtectorName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<EncryptionProtector>, EncryptionProtector>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  encryptionProtectorName: EncryptionProtectorName,
  options: EncryptionProtectorsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/encryptionProtector/{encryptionProtectorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      encryptionProtectorName: encryptionProtectorName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<EncryptionProtector> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return encryptionProtectorDeserializer(result.body);
}

/** Gets a server encryption protector. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  encryptionProtectorName: EncryptionProtectorName,
  options: EncryptionProtectorsGetOptionalParams = { requestOptions: {} },
): Promise<EncryptionProtector> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serverName,
    encryptionProtectorName,
    options,
  );
  return _getDeserialize(result);
}
