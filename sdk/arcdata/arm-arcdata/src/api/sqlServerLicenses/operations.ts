// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureArcDataContext as Client } from "../index.js";
import type {
  SqlServerLicense,
  SqlServerLicenseUpdate,
  _SqlServerLicenseListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  sqlServerLicenseSerializer,
  sqlServerLicenseDeserializer,
  sqlServerLicenseUpdateSerializer,
  _sqlServerLicenseListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SqlServerLicensesListOptionalParams,
  SqlServerLicensesListByResourceGroupOptionalParams,
  SqlServerLicensesDeleteOptionalParams,
  SqlServerLicensesUpdateOptionalParams,
  SqlServerLicensesCreateOptionalParams,
  SqlServerLicensesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: SqlServerLicensesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AzureArcData/sqlServerLicenses{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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
): Promise<_SqlServerLicenseListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _sqlServerLicenseListResultDeserializer(result.body);
}

/** List sqlServerLicense resources in the subscription */
export function list(
  context: Client,
  options: SqlServerLicensesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SqlServerLicense> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: SqlServerLicensesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerLicenses{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_SqlServerLicenseListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _sqlServerLicenseListResultDeserializer(result.body);
}

/** Gets all sqlServerLicenses in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: SqlServerLicensesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SqlServerLicense> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  sqlServerLicenseName: string,
  options: SqlServerLicensesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerLicenses/{sqlServerLicenseName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerLicenseName: sqlServerLicenseName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes a SQL Server license resource */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  sqlServerLicenseName: string,
  options: SqlServerLicensesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, sqlServerLicenseName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  sqlServerLicenseName: string,
  parameters: SqlServerLicenseUpdate,
  options: SqlServerLicensesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerLicenses/{sqlServerLicenseName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerLicenseName: sqlServerLicenseName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sqlServerLicenseUpdateSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<SqlServerLicense> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerLicenseDeserializer(result.body);
}

/** Updates a SQL Server license resource */
export async function update(
  context: Client,
  resourceGroupName: string,
  sqlServerLicenseName: string,
  parameters: SqlServerLicenseUpdate,
  options: SqlServerLicensesUpdateOptionalParams = { requestOptions: {} },
): Promise<SqlServerLicense> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    sqlServerLicenseName,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  sqlServerLicenseName: string,
  sqlServerLicense: SqlServerLicense,
  options: SqlServerLicensesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerLicenses/{sqlServerLicenseName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerLicenseName: sqlServerLicenseName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sqlServerLicenseSerializer(sqlServerLicense),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<SqlServerLicense> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerLicenseDeserializer(result.body);
}

/** Creates or replaces a SQL Server license resource */
export async function create(
  context: Client,
  resourceGroupName: string,
  sqlServerLicenseName: string,
  sqlServerLicense: SqlServerLicense,
  options: SqlServerLicensesCreateOptionalParams = { requestOptions: {} },
): Promise<SqlServerLicense> {
  const result = await _createSend(
    context,
    resourceGroupName,
    sqlServerLicenseName,
    sqlServerLicense,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  sqlServerLicenseName: string,
  options: SqlServerLicensesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerLicenses/{sqlServerLicenseName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerLicenseName: sqlServerLicenseName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SqlServerLicense> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerLicenseDeserializer(result.body);
}

/** Retrieves a SQL Server license resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  sqlServerLicenseName: string,
  options: SqlServerLicensesGetOptionalParams = { requestOptions: {} },
): Promise<SqlServerLicense> {
  const result = await _getSend(context, resourceGroupName, sqlServerLicenseName, options);
  return _getDeserialize(result);
}
