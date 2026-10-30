// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageManagementContext as Client } from "../index.js";
import type {
  BlobAccessPointConfiguration,
  BlobAccessPointConfigurationUpdate,
  _BlobAccessPointConfigurationListResult,
  BlobAccessPointConnectionTestRequest,
  BlobAccessPointConnectionTestResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer_1,
  blobAccessPointConfigurationSerializer,
  blobAccessPointConfigurationDeserializer,
  blobAccessPointConfigurationUpdateSerializer,
  _blobAccessPointConfigurationListResultDeserializer,
  blobAccessPointConnectionTestRequestSerializer,
  blobAccessPointConnectionTestResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  BlobAccessPointConfigurationsTestExistingConnectionOptionalParams,
  BlobAccessPointConfigurationsListByStorageAccountOptionalParams,
  BlobAccessPointConfigurationsDeleteOptionalParams,
  BlobAccessPointConfigurationsUpdateOptionalParams,
  BlobAccessPointConfigurationsCreateOptionalParams,
  BlobAccessPointConfigurationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _testExistingConnectionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  blobAccessPointConfigurationName: string,
  body: BlobAccessPointConnectionTestRequest,
  options: BlobAccessPointConfigurationsTestExistingConnectionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobAccessPointConfigurations/{blobAccessPointConfigurationName}/testExistingConnection{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      blobAccessPointConfigurationName: blobAccessPointConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: blobAccessPointConnectionTestRequestSerializer(body),
  });
}

export async function _testExistingConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<BlobAccessPointConnectionTestResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer_1(result.body);
    }

    throw error;
  }

  return blobAccessPointConnectionTestResponseDeserializer(result.body);
}

/** Test the connection configured on an existing Blob Access Point configuration. */
export function testExistingConnection(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  blobAccessPointConfigurationName: string,
  body: BlobAccessPointConnectionTestRequest,
  options: BlobAccessPointConfigurationsTestExistingConnectionOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<BlobAccessPointConnectionTestResponse>,
  BlobAccessPointConnectionTestResponse
> {
  return getLongRunningPoller(context, _testExistingConnectionDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _testExistingConnectionSend(
        context,
        resourceGroupName,
        accountName,
        blobAccessPointConfigurationName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-09-01",
  }) as PollerLike<
    OperationState<BlobAccessPointConnectionTestResponse>,
    BlobAccessPointConnectionTestResponse
  >;
}

export function _listByStorageAccountSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: BlobAccessPointConfigurationsListByStorageAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobAccessPointConfigurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01",
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

export async function _listByStorageAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_BlobAccessPointConfigurationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer_1(result.body);
    }

    throw error;
  }

  return _blobAccessPointConfigurationListResultDeserializer(result.body);
}

/** List all Blob Access Point configurations in a Storage Account. */
export function listByStorageAccount(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: BlobAccessPointConfigurationsListByStorageAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BlobAccessPointConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _listByStorageAccountSend(context, resourceGroupName, accountName, options),
    _listByStorageAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-09-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  blobAccessPointConfigurationName: string,
  options: BlobAccessPointConfigurationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobAccessPointConfigurations/{blobAccessPointConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      blobAccessPointConfigurationName: blobAccessPointConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01",
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
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer_1(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a Blob Access Point configuration. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  blobAccessPointConfigurationName: string,
  options: BlobAccessPointConfigurationsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        accountName,
        blobAccessPointConfigurationName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-09-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  blobAccessPointConfigurationName: string,
  properties: BlobAccessPointConfigurationUpdate,
  options: BlobAccessPointConfigurationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobAccessPointConfigurations/{blobAccessPointConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      blobAccessPointConfigurationName: blobAccessPointConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: blobAccessPointConfigurationUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<BlobAccessPointConfiguration> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer_1(result.body);
    }

    throw error;
  }

  return blobAccessPointConfigurationDeserializer(result.body);
}

/** Update a Blob Access Point configuration. */
export function update(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  blobAccessPointConfigurationName: string,
  properties: BlobAccessPointConfigurationUpdate,
  options: BlobAccessPointConfigurationsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BlobAccessPointConfiguration>, BlobAccessPointConfiguration> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        accountName,
        blobAccessPointConfigurationName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-09-01",
  }) as PollerLike<OperationState<BlobAccessPointConfiguration>, BlobAccessPointConfiguration>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  blobAccessPointConfigurationName: string,
  resource: BlobAccessPointConfiguration,
  options: BlobAccessPointConfigurationsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobAccessPointConfigurations/{blobAccessPointConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      blobAccessPointConfigurationName: blobAccessPointConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: blobAccessPointConfigurationSerializer(resource),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<BlobAccessPointConfiguration> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer_1(result.body);
    }

    throw error;
  }

  return blobAccessPointConfigurationDeserializer(result.body);
}

/** Creates or updates a Blob Access Point configuration. */
export function create(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  blobAccessPointConfigurationName: string,
  resource: BlobAccessPointConfiguration,
  options: BlobAccessPointConfigurationsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BlobAccessPointConfiguration>, BlobAccessPointConfiguration> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        accountName,
        blobAccessPointConfigurationName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-09-01",
  }) as PollerLike<OperationState<BlobAccessPointConfiguration>, BlobAccessPointConfiguration>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  blobAccessPointConfigurationName: string,
  options: BlobAccessPointConfigurationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobAccessPointConfigurations/{blobAccessPointConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      blobAccessPointConfigurationName: blobAccessPointConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01",
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
): Promise<BlobAccessPointConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer_1(result.body);
    }

    throw error;
  }

  return blobAccessPointConfigurationDeserializer(result.body);
}

/** Get the specified Blob Access Point configuration. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  blobAccessPointConfigurationName: string,
  options: BlobAccessPointConfigurationsGetOptionalParams = { requestOptions: {} },
): Promise<BlobAccessPointConfiguration> {
  const result = await _getSend(
    context,
    resourceGroupName,
    accountName,
    blobAccessPointConfigurationName,
    options,
  );
  return _getDeserialize(result);
}
