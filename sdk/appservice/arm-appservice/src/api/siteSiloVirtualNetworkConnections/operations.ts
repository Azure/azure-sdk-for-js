// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext as Client } from "../index.js";
import type {
  SwiftVirtualNetwork,
  _SiteSiloVirtualNetworkConnectionCollection,
} from "../../models/models.js";
import {
  defaultErrorResponseDeserializer,
  swiftVirtualNetworkSerializer,
  swiftVirtualNetworkDeserializer,
  _siteSiloVirtualNetworkConnectionCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SiteSiloVirtualNetworkConnectionsDeleteSiteSiloVnetConnectionOptionalParams,
  SiteSiloVirtualNetworkConnectionsUpdateSiteSiloVnetConnectionOptionalParams,
  SiteSiloVirtualNetworkConnectionsCreateOrUpdateSiteSiloVnetConnectionOptionalParams,
  SiteSiloVirtualNetworkConnectionsGetSiteSiloVnetConnectionOptionalParams,
  SiteSiloVirtualNetworkConnectionsListSiteSiloVnetConnectionsOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _deleteSiteSiloVnetConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  siloName: string,
  options: SiteSiloVirtualNetworkConnectionsDeleteSiteSiloVnetConnectionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/silos/{siloName}/virtualNetworkConnections/virtualNetwork{?api%2Dversion}",
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

export async function _deleteSiteSiloVnetConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes the virtual network connection from a silo. */
export async function deleteSiteSiloVnetConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  siloName: string,
  options: SiteSiloVirtualNetworkConnectionsDeleteSiteSiloVnetConnectionOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _deleteSiteSiloVnetConnectionSend(
    context,
    resourceGroupName,
    name,
    siloName,
    options,
  );
  return _deleteSiteSiloVnetConnectionDeserialize(result);
}

export function _updateSiteSiloVnetConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  siloName: string,
  properties: SwiftVirtualNetwork,
  options: SiteSiloVirtualNetworkConnectionsUpdateSiteSiloVnetConnectionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/silos/{siloName}/virtualNetworkConnections/virtualNetwork{?api%2Dversion}",
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
    body: swiftVirtualNetworkSerializer(properties),
  });
}

export async function _updateSiteSiloVnetConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<SwiftVirtualNetwork> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return swiftVirtualNetworkDeserializer(result.body);
}

/** Updates the properties of a virtual network connection on a silo. */
export async function updateSiteSiloVnetConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  siloName: string,
  properties: SwiftVirtualNetwork,
  options: SiteSiloVirtualNetworkConnectionsUpdateSiteSiloVnetConnectionOptionalParams = {
    requestOptions: {},
  },
): Promise<SwiftVirtualNetwork> {
  const result = await _updateSiteSiloVnetConnectionSend(
    context,
    resourceGroupName,
    name,
    siloName,
    properties,
    options,
  );
  return _updateSiteSiloVnetConnectionDeserialize(result);
}

export function _createOrUpdateSiteSiloVnetConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  siloName: string,
  resource: SwiftVirtualNetwork,
  options: SiteSiloVirtualNetworkConnectionsCreateOrUpdateSiteSiloVnetConnectionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/silos/{siloName}/virtualNetworkConnections/virtualNetwork{?api%2Dversion}",
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
    body: swiftVirtualNetworkSerializer(resource),
  });
}

export async function _createOrUpdateSiteSiloVnetConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<SwiftVirtualNetwork> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return swiftVirtualNetworkDeserializer(result.body);
}

/** Adds a virtual network connection to a silo, or updates the connection properties. */
export async function createOrUpdateSiteSiloVnetConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  siloName: string,
  resource: SwiftVirtualNetwork,
  options: SiteSiloVirtualNetworkConnectionsCreateOrUpdateSiteSiloVnetConnectionOptionalParams = {
    requestOptions: {},
  },
): Promise<SwiftVirtualNetwork> {
  const result = await _createOrUpdateSiteSiloVnetConnectionSend(
    context,
    resourceGroupName,
    name,
    siloName,
    resource,
    options,
  );
  return _createOrUpdateSiteSiloVnetConnectionDeserialize(result);
}

export function _getSiteSiloVnetConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  siloName: string,
  options: SiteSiloVirtualNetworkConnectionsGetSiteSiloVnetConnectionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/silos/{siloName}/virtualNetworkConnections/virtualNetwork{?api%2Dversion}",
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

export async function _getSiteSiloVnetConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<SwiftVirtualNetwork> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return swiftVirtualNetworkDeserializer(result.body);
}

/** Gets the virtual network the silo is connected to. */
export async function getSiteSiloVnetConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  siloName: string,
  options: SiteSiloVirtualNetworkConnectionsGetSiteSiloVnetConnectionOptionalParams = {
    requestOptions: {},
  },
): Promise<SwiftVirtualNetwork> {
  const result = await _getSiteSiloVnetConnectionSend(
    context,
    resourceGroupName,
    name,
    siloName,
    options,
  );
  return _getSiteSiloVnetConnectionDeserialize(result);
}

export function _listSiteSiloVnetConnectionsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  siloName: string,
  options: SiteSiloVirtualNetworkConnectionsListSiteSiloVnetConnectionsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/silos/{siloName}/virtualNetworkConnections{?api%2Dversion}",
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

export async function _listSiteSiloVnetConnectionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_SiteSiloVirtualNetworkConnectionCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _siteSiloVirtualNetworkConnectionCollectionDeserializer(result.body);
}

/** Lists the virtual network connections of a Web App silo. Returns the singleton virtualNetwork connection when configured, or an empty collection otherwise. */
export function listSiteSiloVnetConnections(
  context: Client,
  resourceGroupName: string,
  name: string,
  siloName: string,
  options: SiteSiloVirtualNetworkConnectionsListSiteSiloVnetConnectionsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SwiftVirtualNetwork> {
  return buildPagedAsyncIterator(
    context,
    () => _listSiteSiloVnetConnectionsSend(context, resourceGroupName, name, siloName, options),
    _listSiteSiloVnetConnectionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-08-01" },
  );
}
