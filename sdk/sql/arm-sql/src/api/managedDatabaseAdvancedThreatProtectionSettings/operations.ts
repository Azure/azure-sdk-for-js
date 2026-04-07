// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type {
  AdvancedThreatProtectionName,
  ManagedDatabaseAdvancedThreatProtection,
  _ManagedDatabaseAdvancedThreatProtectionListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  managedDatabaseAdvancedThreatProtectionSerializer,
  managedDatabaseAdvancedThreatProtectionDeserializer,
  _managedDatabaseAdvancedThreatProtectionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ManagedDatabaseAdvancedThreatProtectionSettingsListByDatabaseOptionalParams,
  ManagedDatabaseAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams,
  ManagedDatabaseAdvancedThreatProtectionSettingsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByDatabaseSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  options: ManagedDatabaseAdvancedThreatProtectionSettingsListByDatabaseOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/advancedThreatProtectionSettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
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

export async function _listByDatabaseDeserialize(
  result: PathUncheckedResponse,
): Promise<_ManagedDatabaseAdvancedThreatProtectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _managedDatabaseAdvancedThreatProtectionListResultDeserializer(result.body);
}

/** Gets a list of managed database's Advanced Threat Protection states. */
export function listByDatabase(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  options: ManagedDatabaseAdvancedThreatProtectionSettingsListByDatabaseOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ManagedDatabaseAdvancedThreatProtection> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByDatabaseSend(context, resourceGroupName, managedInstanceName, databaseName, options),
    _listByDatabaseDeserialize,
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
  managedInstanceName: string,
  databaseName: string,
  advancedThreatProtectionName: AdvancedThreatProtectionName,
  parameters: ManagedDatabaseAdvancedThreatProtection,
  options: ManagedDatabaseAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/advancedThreatProtectionSettings/{advancedThreatProtectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
      advancedThreatProtectionName: advancedThreatProtectionName,
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
    body: managedDatabaseAdvancedThreatProtectionSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedDatabaseAdvancedThreatProtection> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedDatabaseAdvancedThreatProtectionDeserializer(result.body);
}

/** Creates or updates a managed database's Advanced Threat Protection state. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  advancedThreatProtectionName: AdvancedThreatProtectionName,
  parameters: ManagedDatabaseAdvancedThreatProtection,
  options: ManagedDatabaseAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<ManagedDatabaseAdvancedThreatProtection> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    managedInstanceName,
    databaseName,
    advancedThreatProtectionName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  advancedThreatProtectionName: AdvancedThreatProtectionName,
  options: ManagedDatabaseAdvancedThreatProtectionSettingsGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/advancedThreatProtectionSettings/{advancedThreatProtectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
      advancedThreatProtectionName: advancedThreatProtectionName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedDatabaseAdvancedThreatProtection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedDatabaseAdvancedThreatProtectionDeserializer(result.body);
}

/** Gets a managed database's Advanced Threat Protection state. */
export async function get(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  advancedThreatProtectionName: AdvancedThreatProtectionName,
  options: ManagedDatabaseAdvancedThreatProtectionSettingsGetOptionalParams = {
    requestOptions: {},
  },
): Promise<ManagedDatabaseAdvancedThreatProtection> {
  const result = await _getSend(
    context,
    resourceGroupName,
    managedInstanceName,
    databaseName,
    advancedThreatProtectionName,
    options,
  );
  return _getDeserialize(result);
}
