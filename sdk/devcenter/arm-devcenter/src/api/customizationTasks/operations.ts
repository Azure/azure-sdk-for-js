// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext as Client } from "../index.js";
import type {
  CatalogResourceValidationErrorDetails,
  CustomizationTask,
  _CustomizationTaskListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  catalogResourceValidationErrorDetailsDeserializer,
  customizationTaskDeserializer,
  _customizationTaskListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  CustomizationTasksGetErrorDetailsOptionalParams,
  CustomizationTasksListByCatalogOptionalParams,
  CustomizationTasksGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getErrorDetailsSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  taskName: string,
  options: CustomizationTasksGetErrorDetailsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}/tasks/{taskName}/getErrorDetails{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      catalogName: catalogName,
      taskName: taskName,
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

export async function _getErrorDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<CatalogResourceValidationErrorDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return catalogResourceValidationErrorDetailsDeserializer(result.body);
}

/** Gets Customization Task error details. */
export async function getErrorDetails(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  taskName: string,
  options: CustomizationTasksGetErrorDetailsOptionalParams = { requestOptions: {} },
): Promise<CatalogResourceValidationErrorDetails> {
  const result = await _getErrorDetailsSend(
    context,
    resourceGroupName,
    devCenterName,
    catalogName,
    taskName,
    options,
  );
  return _getErrorDetailsDeserialize(result);
}

export function _listByCatalogSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  options: CustomizationTasksListByCatalogOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}/tasks{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      catalogName: catalogName,
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

export async function _listByCatalogDeserialize(
  result: PathUncheckedResponse,
): Promise<_CustomizationTaskListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _customizationTaskListResultDeserializer(result.body);
}

/** List Tasks in the catalog. */
export function listByCatalog(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  options: CustomizationTasksListByCatalogOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CustomizationTask> {
  return buildPagedAsyncIterator(
    context,
    () => _listByCatalogSend(context, resourceGroupName, devCenterName, catalogName, options),
    _listByCatalogDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  taskName: string,
  options: CustomizationTasksGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}/tasks/{taskName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      catalogName: catalogName,
      taskName: taskName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<CustomizationTask> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return customizationTaskDeserializer(result.body);
}

/** Gets a Task from the catalog. */
export async function get(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  taskName: string,
  options: CustomizationTasksGetOptionalParams = { requestOptions: {} },
): Promise<CustomizationTask> {
  const result = await _getSend(
    context,
    resourceGroupName,
    devCenterName,
    catalogName,
    taskName,
    options,
  );
  return _getDeserialize(result);
}
