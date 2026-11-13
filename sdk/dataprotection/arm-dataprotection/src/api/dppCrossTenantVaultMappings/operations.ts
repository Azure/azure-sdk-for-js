// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext as Client } from "../index.js";
import type { CrossTenantVaultMapping, _CrossTenantVaultMappingList } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  crossTenantVaultMappingSerializer,
  crossTenantVaultMappingDeserializer,
  _crossTenantVaultMappingListDeserializer,
  crossTenantVaultMappingRemoveRequestSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DppCrossTenantVaultMappingsRemoveOptionalParams,
  DppCrossTenantVaultMappingsListOptionalParams,
  DppCrossTenantVaultMappingsCreateOrUpdateOptionalParams,
  DppCrossTenantVaultMappingsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _removeSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  mappingName: string,
  options: DppCrossTenantVaultMappingsRemoveOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/crossTenantVaultMappings/{mappingName}/remove{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      mappingName: mappingName,
      "api%2Dversion": context.apiVersion ?? "2026-08-31-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: !options?.body
      ? options?.body
      : crossTenantVaultMappingRemoveRequestSerializer(options?.body),
  });
}

export async function _removeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Removes a cross-tenant vault mapping from the target vault. */
export async function remove(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  mappingName: string,
  options: DppCrossTenantVaultMappingsRemoveOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _removeSend(context, resourceGroupName, vaultName, mappingName, options);
  return _removeDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: DppCrossTenantVaultMappingsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/crossTenantVaultMappings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      "api%2Dversion": context.apiVersion ?? "2026-08-31-preview",
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
): Promise<_CrossTenantVaultMappingList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _crossTenantVaultMappingListDeserializer(result.body);
}

/** Lists the cross-tenant vault mappings under the target vault. */
export function list(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: DppCrossTenantVaultMappingsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CrossTenantVaultMapping> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, vaultName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-08-31-preview",
    },
  );
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  mappingName: string,
  resource: CrossTenantVaultMapping,
  options: DppCrossTenantVaultMappingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/crossTenantVaultMappings/{mappingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      mappingName: mappingName,
      "api%2Dversion": context.apiVersion ?? "2026-08-31-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: crossTenantVaultMappingSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<CrossTenantVaultMapping> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return crossTenantVaultMappingDeserializer(result.body);
}

/** Creates or updates a cross-tenant vault mapping under the target vault. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  mappingName: string,
  resource: CrossTenantVaultMapping,
  options: DppCrossTenantVaultMappingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<CrossTenantVaultMapping> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    vaultName,
    mappingName,
    resource,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  mappingName: string,
  options: DppCrossTenantVaultMappingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/crossTenantVaultMappings/{mappingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      mappingName: mappingName,
      "api%2Dversion": context.apiVersion ?? "2026-08-31-preview",
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
): Promise<CrossTenantVaultMapping> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return crossTenantVaultMappingDeserializer(result.body);
}

/** Gets a cross-tenant vault mapping by name from the target vault. */
export async function get(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  mappingName: string,
  options: DppCrossTenantVaultMappingsGetOptionalParams = { requestOptions: {} },
): Promise<CrossTenantVaultMapping> {
  const result = await _getSend(context, resourceGroupName, vaultName, mappingName, options);
  return _getDeserialize(result);
}
