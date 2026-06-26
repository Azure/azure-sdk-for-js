// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext as Client } from "../index.js";
import {
  defaultErrorResponseDeserializer,
  Revision,
  revisionDeserializer,
  _RevisionCollection,
  _revisionCollectionDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ContainerAppsRevisionsRestartRevisionOptionalParams,
  ContainerAppsRevisionsDeactivateRevisionOptionalParams,
  ContainerAppsRevisionsActivateRevisionOptionalParams,
  ContainerAppsRevisionsListRevisionsOptionalParams,
  ContainerAppsRevisionsGetRevisionOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _restartRevisionSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  revisionName: string,
  options: ContainerAppsRevisionsRestartRevisionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/revisions/{revisionName}/restart{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      revisionName: revisionName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _restartRevisionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Restarts a revision for a Container App */
export async function restartRevision(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  revisionName: string,
  options: ContainerAppsRevisionsRestartRevisionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _restartRevisionSend(
    context,
    resourceGroupName,
    containerAppName,
    revisionName,
    options,
  );
  return _restartRevisionDeserialize(result);
}

export function _deactivateRevisionSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  revisionName: string,
  options: ContainerAppsRevisionsDeactivateRevisionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/revisions/{revisionName}/deactivate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      revisionName: revisionName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _deactivateRevisionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deactivates a revision for a Container App */
export async function deactivateRevision(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  revisionName: string,
  options: ContainerAppsRevisionsDeactivateRevisionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deactivateRevisionSend(
    context,
    resourceGroupName,
    containerAppName,
    revisionName,
    options,
  );
  return _deactivateRevisionDeserialize(result);
}

export function _activateRevisionSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  revisionName: string,
  options: ContainerAppsRevisionsActivateRevisionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/revisions/{revisionName}/activate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      revisionName: revisionName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _activateRevisionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Activates a revision for a Container App */
export async function activateRevision(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  revisionName: string,
  options: ContainerAppsRevisionsActivateRevisionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _activateRevisionSend(
    context,
    resourceGroupName,
    containerAppName,
    revisionName,
    options,
  );
  return _activateRevisionDeserialize(result);
}

export function _listRevisionsSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  options: ContainerAppsRevisionsListRevisionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/revisions{?api%2Dversion,%24filter}",
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

export async function _listRevisionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_RevisionCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _revisionCollectionDeserializer(result.body);
}

/** Get the Revisions for a given Container App. */
export function listRevisions(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  options: ContainerAppsRevisionsListRevisionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Revision> {
  return buildPagedAsyncIterator(
    context,
    () => _listRevisionsSend(context, resourceGroupName, containerAppName, options),
    _listRevisionsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-10-02-preview",
    },
  );
}

export function _getRevisionSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  revisionName: string,
  options: ContainerAppsRevisionsGetRevisionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/revisions/{revisionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      revisionName: revisionName,
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

export async function _getRevisionDeserialize(result: PathUncheckedResponse): Promise<Revision> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return revisionDeserializer(result.body);
}

/** Get a revision of a Container App. */
export async function getRevision(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  revisionName: string,
  options: ContainerAppsRevisionsGetRevisionOptionalParams = { requestOptions: {} },
): Promise<Revision> {
  const result = await _getRevisionSend(
    context,
    resourceGroupName,
    containerAppName,
    revisionName,
    options,
  );
  return _getRevisionDeserialize(result);
}
