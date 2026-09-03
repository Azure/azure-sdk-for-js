// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext as Client } from "../index.js";
import {
  defaultErrorResponseDeserializer,
  ContainerApp,
  containerAppDeserializer,
  Revision,
  revisionDeserializer,
  _RevisionCollection,
  _revisionCollectionDeserializer,
  DiagnosticsCollection,
  diagnosticsCollectionDeserializer,
  Diagnostics,
  diagnosticsDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ContainerAppsDiagnosticsGetDetectorOptionalParams,
  ContainerAppsDiagnosticsListDetectorsOptionalParams,
  ContainerAppsDiagnosticsGetRootOptionalParams,
  ContainerAppsDiagnosticsListRevisionsOptionalParams,
  ContainerAppsDiagnosticsGetRevisionOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getDetectorSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  detectorName: string,
  options: ContainerAppsDiagnosticsGetDetectorOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/detectors/{detectorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      detectorName: detectorName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _getDetectorDeserialize(result: PathUncheckedResponse): Promise<Diagnostics> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return diagnosticsDeserializer(result.body);
}

/** Get a diagnostics result of a Container App. */
export async function getDetector(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  detectorName: string,
  options: ContainerAppsDiagnosticsGetDetectorOptionalParams = { requestOptions: {} },
): Promise<Diagnostics> {
  const result = await _getDetectorSend(
    context,
    resourceGroupName,
    containerAppName,
    detectorName,
    options,
  );
  return _getDetectorDeserialize(result);
}

export function _listDetectorsSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  options: ContainerAppsDiagnosticsListDetectorsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/detectors{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _listDetectorsDeserialize(
  result: PathUncheckedResponse,
): Promise<DiagnosticsCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return diagnosticsCollectionDeserializer(result.body);
}

/** Get the list of diagnostics for a given Container App. */
export function listDetectors(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  options: ContainerAppsDiagnosticsListDetectorsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Diagnostics> {
  return buildPagedAsyncIterator(
    context,
    () => _listDetectorsSend(context, resourceGroupName, containerAppName, options),
    _listDetectorsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-10-02-preview",
    },
  );
}

export function _getRootSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  options: ContainerAppsDiagnosticsGetRootOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/detectorProperties/rootApi/{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _getRootDeserialize(result: PathUncheckedResponse): Promise<ContainerApp> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return containerAppDeserializer(result.body);
}

/** Get the properties of a Container App. */
export async function getRoot(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  options: ContainerAppsDiagnosticsGetRootOptionalParams = { requestOptions: {} },
): Promise<ContainerApp> {
  const result = await _getRootSend(context, resourceGroupName, containerAppName, options);
  return _getRootDeserialize(result);
}

export function _listRevisionsSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  options: ContainerAppsDiagnosticsListRevisionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/detectorProperties/revisionsApi/revisions/{?api%2Dversion,%24filter}",
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
  return context.path(path).get({
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
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _revisionCollectionDeserializer(result.body);
}

/** A synchronous resource action. */
export function listRevisions(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  options: ContainerAppsDiagnosticsListRevisionsOptionalParams = { requestOptions: {} },
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
  options: ContainerAppsDiagnosticsGetRevisionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/detectorProperties/revisionsApi/revisions/{revisionName}{?api%2Dversion}",
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
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getRevisionDeserialize(result: PathUncheckedResponse): Promise<Revision> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

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
  options: ContainerAppsDiagnosticsGetRevisionOptionalParams = { requestOptions: {} },
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
