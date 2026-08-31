// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext as Client } from "../index.js";
import type {
  Catalog,
  CatalogUpdate,
  _CatalogListResult,
  SyncErrorDetails,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  catalogSerializer,
  catalogDeserializer,
  catalogUpdateSerializer,
  _catalogListResultDeserializer,
  syncErrorDetailsDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  CatalogsConnectOptionalParams,
  CatalogsSyncOptionalParams,
  CatalogsGetSyncErrorDetailsOptionalParams,
  CatalogsListByDevCenterOptionalParams,
  CatalogsDeleteOptionalParams,
  CatalogsUpdateOptionalParams,
  CatalogsCreateOrUpdateOptionalParams,
  CatalogsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _connectSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  options: CatalogsConnectOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}/connect{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      catalogName: catalogName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _connectDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Connects a catalog to enable syncing. */
export function connect(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  options: CatalogsConnectOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _connectDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _connectSend(context, resourceGroupName, devCenterName, catalogName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _syncSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  options: CatalogsSyncOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}/sync{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      catalogName: catalogName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _syncDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Syncs templates for a template source. */
export function sync(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  options: CatalogsSyncOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _syncDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _syncSend(context, resourceGroupName, devCenterName, catalogName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getSyncErrorDetailsSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  options: CatalogsGetSyncErrorDetailsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}/getSyncErrorDetails{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      catalogName: catalogName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getSyncErrorDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<SyncErrorDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return syncErrorDetailsDeserializer(result.body);
}

/** Gets catalog synchronization error details. */
export async function getSyncErrorDetails(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  options: CatalogsGetSyncErrorDetailsOptionalParams = { requestOptions: {} },
): Promise<SyncErrorDetails> {
  const result = await _getSyncErrorDetailsSend(
    context,
    resourceGroupName,
    devCenterName,
    catalogName,
    options,
  );
  return _getSyncErrorDetailsDeserialize(result);
}

export function _listByDevCenterSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  options: CatalogsListByDevCenterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
      "%24top": options?.top,
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

export async function _listByDevCenterDeserialize(
  result: PathUncheckedResponse,
): Promise<_CatalogListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _catalogListResultDeserializer(result.body);
}

/** Lists catalogs for a devcenter. */
export function listByDevCenter(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  options: CatalogsListByDevCenterOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Catalog> {
  return buildPagedAsyncIterator(
    context,
    () => _listByDevCenterSend(context, resourceGroupName, devCenterName, options),
    _listByDevCenterDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  options: CatalogsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      catalogName: catalogName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes a catalog resource. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  options: CatalogsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, devCenterName, catalogName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  body: CatalogUpdate,
  options: CatalogsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      catalogName: catalogName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: catalogUpdateSerializer(body),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Catalog> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return catalogDeserializer(result.body);
}

/** Partially updates a catalog. */
export function update(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  body: CatalogUpdate,
  options: CatalogsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Catalog>, Catalog> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, devCenterName, catalogName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-01-preview",
  }) as PollerLike<OperationState<Catalog>, Catalog>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  body: Catalog,
  options: CatalogsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      catalogName: catalogName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: catalogSerializer(body),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Catalog> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return catalogDeserializer(result.body);
}

/** Creates or updates a catalog. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  body: Catalog,
  options: CatalogsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Catalog>, Catalog> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, devCenterName, catalogName, body, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-01-01-preview",
  }) as PollerLike<OperationState<Catalog>, Catalog>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  options: CatalogsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      catalogName: catalogName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Catalog> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return catalogDeserializer(result.body);
}

/** Gets a catalog. */
export async function get(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  options: CatalogsGetOptionalParams = { requestOptions: {} },
): Promise<Catalog> {
  const result = await _getSend(context, resourceGroupName, devCenterName, catalogName, options);
  return _getDeserialize(result);
}
