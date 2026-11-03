// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext as Client } from "../index.js";
import type {
  _ManagedTrafficConfigCollection,
  ManagedTrafficConfigResource,
} from "../../models/models.js";
import {
  defaultErrorResponseDeserializer,
  _managedTrafficConfigCollectionDeserializer,
  managedTrafficConfigResourceSerializer,
  managedTrafficConfigResourceDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ManagedTrafficConfigResourcesUpdateManagedTrafficConfigOptionalParams,
  ManagedTrafficConfigResourcesGetManagedTrafficConfigOptionalParams,
  ManagedTrafficConfigResourcesListManagedTrafficConfigsOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _updateManagedTrafficConfigSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  resource: ManagedTrafficConfigResource,
  options: ManagedTrafficConfigResourcesUpdateManagedTrafficConfigOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/managedTrafficConfig/default{?api%2Dversion}",
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
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: managedTrafficConfigResourceSerializer(resource),
  });
}

export async function _updateManagedTrafficConfigDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedTrafficConfigResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return managedTrafficConfigResourceDeserializer(result.body);
}

/** Updates managed traffic configuration for a Web App. */
export async function updateManagedTrafficConfig(
  context: Client,
  resourceGroupName: string,
  name: string,
  resource: ManagedTrafficConfigResource,
  options: ManagedTrafficConfigResourcesUpdateManagedTrafficConfigOptionalParams = {
    requestOptions: {},
  },
): Promise<ManagedTrafficConfigResource> {
  const result = await _updateManagedTrafficConfigSend(
    context,
    resourceGroupName,
    name,
    resource,
    options,
  );
  return _updateManagedTrafficConfigDeserialize(result);
}

export function _getManagedTrafficConfigSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ManagedTrafficConfigResourcesGetManagedTrafficConfigOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/managedTrafficConfig/default{?api%2Dversion}",
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

export async function _getManagedTrafficConfigDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedTrafficConfigResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return managedTrafficConfigResourceDeserializer(result.body);
}

/** Gets managed traffic configuration for a Web App. */
export async function getManagedTrafficConfig(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ManagedTrafficConfigResourcesGetManagedTrafficConfigOptionalParams = {
    requestOptions: {},
  },
): Promise<ManagedTrafficConfigResource> {
  const result = await _getManagedTrafficConfigSend(context, resourceGroupName, name, options);
  return _getManagedTrafficConfigDeserialize(result);
}

export function _listManagedTrafficConfigsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ManagedTrafficConfigResourcesListManagedTrafficConfigsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/managedTrafficConfig{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-08-01",
      "%24expand": options?.expand,
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

export async function _listManagedTrafficConfigsDeserialize(
  result: PathUncheckedResponse,
): Promise<_ManagedTrafficConfigCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _managedTrafficConfigCollectionDeserializer(result.body);
}

/** Lists managed traffic configuration resources for a Web App. */
export function listManagedTrafficConfigs(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ManagedTrafficConfigResourcesListManagedTrafficConfigsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ManagedTrafficConfigResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listManagedTrafficConfigsSend(context, resourceGroupName, name, options),
    _listManagedTrafficConfigsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-08-01" },
  );
}
