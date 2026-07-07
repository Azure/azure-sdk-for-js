// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureArcDataContext as Client } from "../index.js";
import type {
  SqlServerEsuLicense,
  SqlServerEsuLicenseUpdate,
  _SqlServerEsuLicenseListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  sqlServerEsuLicenseSerializer,
  sqlServerEsuLicenseDeserializer,
  sqlServerEsuLicenseUpdateSerializer,
  _sqlServerEsuLicenseListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SqlServerEsuLicensesListOptionalParams,
  SqlServerEsuLicensesListByResourceGroupOptionalParams,
  SqlServerEsuLicensesDeleteOptionalParams,
  SqlServerEsuLicensesUpdateOptionalParams,
  SqlServerEsuLicensesCreateOptionalParams,
  SqlServerEsuLicensesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: SqlServerEsuLicensesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AzureArcData/sqlServerEsuLicenses{?api%2Dversion}",
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
): Promise<_SqlServerEsuLicenseListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _sqlServerEsuLicenseListResultDeserializer(result.body);
}

/** List sqlServerEsuLicense resources in the subscription */
export function list(
  context: Client,
  options: SqlServerEsuLicensesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SqlServerEsuLicense> {
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
  options: SqlServerEsuLicensesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerEsuLicenses{?api%2Dversion}",
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
): Promise<_SqlServerEsuLicenseListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _sqlServerEsuLicenseListResultDeserializer(result.body);
}

/** Gets all sqlServerEsuLicenses in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: SqlServerEsuLicensesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SqlServerEsuLicense> {
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
  sqlServerEsuLicenseName: string,
  options: SqlServerEsuLicensesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerEsuLicenses/{sqlServerEsuLicenseName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerEsuLicenseName: sqlServerEsuLicenseName,
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

/** Deletes a SQL Server ESU license resource */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  sqlServerEsuLicenseName: string,
  options: SqlServerEsuLicensesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, sqlServerEsuLicenseName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  sqlServerEsuLicenseName: string,
  parameters: SqlServerEsuLicenseUpdate,
  options: SqlServerEsuLicensesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerEsuLicenses/{sqlServerEsuLicenseName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerEsuLicenseName: sqlServerEsuLicenseName,
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
    body: sqlServerEsuLicenseUpdateSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlServerEsuLicense> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerEsuLicenseDeserializer(result.body);
}

/** Updates a SQL Server ESU license resource */
export async function update(
  context: Client,
  resourceGroupName: string,
  sqlServerEsuLicenseName: string,
  parameters: SqlServerEsuLicenseUpdate,
  options: SqlServerEsuLicensesUpdateOptionalParams = { requestOptions: {} },
): Promise<SqlServerEsuLicense> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    sqlServerEsuLicenseName,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  sqlServerEsuLicenseName: string,
  sqlServerEsuLicense: SqlServerEsuLicense,
  options: SqlServerEsuLicensesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerEsuLicenses/{sqlServerEsuLicenseName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerEsuLicenseName: sqlServerEsuLicenseName,
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
    body: sqlServerEsuLicenseSerializer(sqlServerEsuLicense),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlServerEsuLicense> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerEsuLicenseDeserializer(result.body);
}

/** Creates or replaces a SQL Server ESU license resource */
export async function create(
  context: Client,
  resourceGroupName: string,
  sqlServerEsuLicenseName: string,
  sqlServerEsuLicense: SqlServerEsuLicense,
  options: SqlServerEsuLicensesCreateOptionalParams = { requestOptions: {} },
): Promise<SqlServerEsuLicense> {
  const result = await _createSend(
    context,
    resourceGroupName,
    sqlServerEsuLicenseName,
    sqlServerEsuLicense,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  sqlServerEsuLicenseName: string,
  options: SqlServerEsuLicensesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerEsuLicenses/{sqlServerEsuLicenseName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerEsuLicenseName: sqlServerEsuLicenseName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SqlServerEsuLicense> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerEsuLicenseDeserializer(result.body);
}

/** Retrieves a SQL Server ESU license resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  sqlServerEsuLicenseName: string,
  options: SqlServerEsuLicensesGetOptionalParams = { requestOptions: {} },
): Promise<SqlServerEsuLicense> {
  const result = await _getSend(context, resourceGroupName, sqlServerEsuLicenseName, options);
  return _getDeserialize(result);
}
