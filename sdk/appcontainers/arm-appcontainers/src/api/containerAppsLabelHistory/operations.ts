// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext as Client } from "../index.js";
import {
  defaultErrorResponseDeserializer,
  LabelHistory,
  labelHistoryDeserializer,
  _LabelHistoryCollection,
  _labelHistoryCollectionDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ContainerAppsLabelHistoryListLabelHistoryOptionalParams,
  ContainerAppsLabelHistoryDeleteLabelHistoryOptionalParams,
  ContainerAppsLabelHistoryGetLabelHistoryOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listLabelHistorySend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  options: ContainerAppsLabelHistoryListLabelHistoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/labelHistory{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
      "%24filter": options?.filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listLabelHistoryDeserialize(
  result: PathUncheckedResponse,
): Promise<_LabelHistoryCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _labelHistoryCollectionDeserializer(result.body);
}

/** Get the Label History for a given Container App. */
export function listLabelHistory(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  options: ContainerAppsLabelHistoryListLabelHistoryOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LabelHistory> {
  return buildPagedAsyncIterator(
    context,
    () => _listLabelHistorySend(context, resourceGroupName, containerAppName, options),
    _listLabelHistoryDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-10-02-preview",
    },
  );
}

export function _deleteLabelHistorySend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  labelName: string,
  options: ContainerAppsLabelHistoryDeleteLabelHistoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/labelHistory/{labelName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      labelName: labelName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteLabelHistoryDeserialize(result: PathUncheckedResponse): Promise<void> {
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

/** Delete the history of a label. */
export async function deleteLabelHistory(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  labelName: string,
  options: ContainerAppsLabelHistoryDeleteLabelHistoryOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteLabelHistorySend(
    context,
    resourceGroupName,
    containerAppName,
    labelName,
    options,
  );
  return _deleteLabelHistoryDeserialize(result);
}

export function _getLabelHistorySend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  labelName: string,
  options: ContainerAppsLabelHistoryGetLabelHistoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/labelHistory/{labelName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      labelName: labelName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getLabelHistoryDeserialize(
  result: PathUncheckedResponse,
): Promise<LabelHistory> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return labelHistoryDeserializer(result.body);
}

/** Get the history of a label. */
export async function getLabelHistory(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  labelName: string,
  options: ContainerAppsLabelHistoryGetLabelHistoryOptionalParams = { requestOptions: {} },
): Promise<LabelHistory> {
  const result = await _getLabelHistorySend(
    context,
    resourceGroupName,
    containerAppName,
    labelName,
    options,
  );
  return _getLabelHistoryDeserialize(result);
}
