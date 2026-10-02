// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventHubManagementContext as Client } from "../index.js";
import type { FabricShortcut, _FabricShortcutListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  fabricShortcutSerializer,
  fabricShortcutDeserializer,
  _fabricShortcutListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  FabricShortcutsRejectOptionalParams,
  FabricShortcutsApproveOptionalParams,
  FabricShortcutsDeleteOptionalParams,
  FabricShortcutsListByEventHubOptionalParams,
  FabricShortcutsCreateOrUpdateOptionalParams,
  FabricShortcutsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _rejectSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  eventHubName: string,
  fabricShortcutName: string,
  options: FabricShortcutsRejectOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs/{eventHubName}/fabricShortcuts/{fabricShortcutName}/reject{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      eventHubName: eventHubName,
      fabricShortcutName: fabricShortcutName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
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

export async function _rejectDeserialize(result: PathUncheckedResponse): Promise<FabricShortcut> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return fabricShortcutDeserializer(result.body);
}
/** Rejects a Microsoft Fabric shortcut. */
export async function reject(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  eventHubName: string,
  fabricShortcutName: string,
  options: FabricShortcutsRejectOptionalParams = { requestOptions: {} },
): Promise<FabricShortcut> {
  const result = await _rejectSend(
    context,
    resourceGroupName,
    namespaceName,
    eventHubName,
    fabricShortcutName,
    options,
  );
  return _rejectDeserialize(result);
}

export function _approveSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  eventHubName: string,
  fabricShortcutName: string,
  options: FabricShortcutsApproveOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs/{eventHubName}/fabricShortcuts/{fabricShortcutName}/approve{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      eventHubName: eventHubName,
      fabricShortcutName: fabricShortcutName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
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

export async function _approveDeserialize(result: PathUncheckedResponse): Promise<FabricShortcut> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return fabricShortcutDeserializer(result.body);
}
/** Approves a Microsoft Fabric shortcut. */
export async function approve(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  eventHubName: string,
  fabricShortcutName: string,
  options: FabricShortcutsApproveOptionalParams = { requestOptions: {} },
): Promise<FabricShortcut> {
  const result = await _approveSend(
    context,
    resourceGroupName,
    namespaceName,
    eventHubName,
    fabricShortcutName,
    options,
  );
  return _approveDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  eventHubName: string,
  fabricShortcutName: string,
  options: FabricShortcutsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs/{eventHubName}/fabricShortcuts/{fabricShortcutName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      eventHubName: eventHubName,
      fabricShortcutName: fabricShortcutName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}
/** Deletes a Microsoft Fabric shortcut. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  eventHubName: string,
  fabricShortcutName: string,
  options: FabricShortcutsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    namespaceName,
    eventHubName,
    fabricShortcutName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _listByEventHubSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  eventHubName: string,
  options: FabricShortcutsListByEventHubOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs/{eventHubName}/fabricShortcuts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      eventHubName: eventHubName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
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

export async function _listByEventHubDeserialize(
  result: PathUncheckedResponse,
): Promise<_FabricShortcutListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _fabricShortcutListResultDeserializer(result.body);
}
/** Lists Microsoft Fabric shortcuts for an Event Hub. */
export function listByEventHub(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  eventHubName: string,
  options: FabricShortcutsListByEventHubOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FabricShortcut> {
  return buildPagedAsyncIterator(
    context,
    () => _listByEventHubSend(context, resourceGroupName, namespaceName, eventHubName, options),
    _listByEventHubDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-07-01-preview",
    },
  );
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  eventHubName: string,
  fabricShortcutName: string,
  resource: FabricShortcut,
  options: FabricShortcutsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs/{eventHubName}/fabricShortcuts/{fabricShortcutName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      eventHubName: eventHubName,
      fabricShortcutName: fabricShortcutName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: fabricShortcutSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<FabricShortcut> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return fabricShortcutDeserializer(result.body);
}
/** Creates or updates a Microsoft Fabric shortcut. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  eventHubName: string,
  fabricShortcutName: string,
  resource: FabricShortcut,
  options: FabricShortcutsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<FabricShortcut> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    namespaceName,
    eventHubName,
    fabricShortcutName,
    resource,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  eventHubName: string,
  fabricShortcutName: string,
  options: FabricShortcutsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs/{eventHubName}/fabricShortcuts/{fabricShortcutName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      eventHubName: eventHubName,
      fabricShortcutName: fabricShortcutName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<FabricShortcut> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return fabricShortcutDeserializer(result.body);
}
/** Gets a Microsoft Fabric shortcut. */
export async function get(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  eventHubName: string,
  fabricShortcutName: string,
  options: FabricShortcutsGetOptionalParams = { requestOptions: {} },
): Promise<FabricShortcut> {
  const result = await _getSend(
    context,
    resourceGroupName,
    namespaceName,
    eventHubName,
    fabricShortcutName,
    options,
  );
  return _getDeserialize(result);
}
