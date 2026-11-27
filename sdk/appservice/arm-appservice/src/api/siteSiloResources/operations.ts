// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext as Client } from "../index.js";
import type { _SiteSiloCollection, SiteSilo, SiteSiloTagsUpdate } from "../../models/models.js";
import {
  defaultErrorResponseDeserializer,
  _siteSiloCollectionDeserializer,
  siteSiloSerializer,
  siteSiloDeserializer,
  siteSiloTagsUpdateSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SiteSiloResourcesRefreshSiteSilosOptionalParams,
  SiteSiloResourcesDeleteSiteSiloOptionalParams,
  SiteSiloResourcesUpdateSiteSiloOptionalParams,
  SiteSiloResourcesCreateOrUpdateSiteSiloOptionalParams,
  SiteSiloResourcesGetSiteSiloOptionalParams,
  SiteSiloResourcesListSiteSilosOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _refreshSiteSilosSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: SiteSiloResourcesRefreshSiteSilosOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/refreshSilos{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _refreshSiteSilosDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Forces a fresh revision for an Active Backup primary Web App and re-syncs all of its silos. The refresh request is recorded synchronously; silos then converge asynchronously — track progress through each silo's revisionNumber. */
export async function refreshSiteSilos(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: SiteSiloResourcesRefreshSiteSilosOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _refreshSiteSilosSend(context, resourceGroupName, name, options);
  return _refreshSiteSilosDeserialize(result);
}

export function _deleteSiteSiloSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  siloName: string,
  options: SiteSiloResourcesDeleteSiteSiloOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/silos/{siloName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      siloName: siloName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteSiteSiloDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes a silo for a Web App. */
export function deleteSiteSilo(
  context: Client,
  resourceGroupName: string,
  name: string,
  siloName: string,
  options: SiteSiloResourcesDeleteSiteSiloOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteSiteSiloDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteSiteSiloSend(context, resourceGroupName, name, siloName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-08-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSiteSiloSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  siloName: string,
  properties: SiteSiloTagsUpdate,
  options: SiteSiloResourcesUpdateSiteSiloOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/silos/{siloName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      siloName: siloName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: siteSiloTagsUpdateSerializer(properties),
  });
}

export async function _updateSiteSiloDeserialize(result: PathUncheckedResponse): Promise<SiteSilo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return siteSiloDeserializer(result.body);
}

/** Updates only the tags of a Web App silo. Silo configuration and provisioning state are not modified. */
export async function updateSiteSilo(
  context: Client,
  resourceGroupName: string,
  name: string,
  siloName: string,
  properties: SiteSiloTagsUpdate,
  options: SiteSiloResourcesUpdateSiteSiloOptionalParams = { requestOptions: {} },
): Promise<SiteSilo> {
  const result = await _updateSiteSiloSend(
    context,
    resourceGroupName,
    name,
    siloName,
    properties,
    options,
  );
  return _updateSiteSiloDeserialize(result);
}

export function _createOrUpdateSiteSiloSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  siloName: string,
  resource: SiteSilo,
  options: SiteSiloResourcesCreateOrUpdateSiteSiloOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/silos/{siloName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      siloName: siloName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: siteSiloSerializer(resource),
  });
}

export async function _createOrUpdateSiteSiloDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteSilo> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return siteSiloDeserializer(result.body);
}

/** Creates or updates a silo for a Web App. Returns 202 with polling headers when background work is queued, or 200 when no update is needed. */
export function createOrUpdateSiteSilo(
  context: Client,
  resourceGroupName: string,
  name: string,
  siloName: string,
  resource: SiteSilo,
  options: SiteSiloResourcesCreateOrUpdateSiteSiloOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SiteSilo>, SiteSilo> {
  return getLongRunningPoller(context, _createOrUpdateSiteSiloDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSiteSiloSend(context, resourceGroupName, name, siloName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-08-01",
  }) as PollerLike<OperationState<SiteSilo>, SiteSilo>;
}

export function _getSiteSiloSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  siloName: string,
  options: SiteSiloResourcesGetSiteSiloOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/silos/{siloName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      siloName: siloName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01",
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

export async function _getSiteSiloDeserialize(result: PathUncheckedResponse): Promise<SiteSilo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return siteSiloDeserializer(result.body);
}

/** Gets a specific silo for a Web App. */
export async function getSiteSilo(
  context: Client,
  resourceGroupName: string,
  name: string,
  siloName: string,
  options: SiteSiloResourcesGetSiteSiloOptionalParams = { requestOptions: {} },
): Promise<SiteSilo> {
  const result = await _getSiteSiloSend(context, resourceGroupName, name, siloName, options);
  return _getSiteSiloDeserialize(result);
}

export function _listSiteSilosSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: SiteSiloResourcesListSiteSilosOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/silos{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-08-01",
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

export async function _listSiteSilosDeserialize(
  result: PathUncheckedResponse,
): Promise<_SiteSiloCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _siteSiloCollectionDeserializer(result.body);
}

/** Gets all silos for a Web App. */
export function listSiteSilos(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: SiteSiloResourcesListSiteSilosOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SiteSilo> {
  return buildPagedAsyncIterator(
    context,
    () => _listSiteSilosSend(context, resourceGroupName, name, options),
    _listSiteSilosDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-08-01" },
  );
}
