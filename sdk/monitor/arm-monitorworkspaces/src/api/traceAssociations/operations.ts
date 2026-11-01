// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import type {
  TraceAssociationResource,
  _TraceAssociationResourceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  traceAssociationResourceSerializer,
  traceAssociationResourceDeserializer,
  _traceAssociationResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  TraceAssociationsListOptionalParams,
  TraceAssociationsDeleteOptionalParams,
  TraceAssociationsCreateOrUpdateOptionalParams,
  TraceAssociationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  providerName: string,
  providerType: string,
  resourceName: string,
  options: TraceAssociationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{providerName}/{providerType}/{resourceName}/providers/Microsoft.Monitor/traceAssociations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      providerName: providerName,
      providerType: providerType,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-09-03-preview",
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
): Promise<_TraceAssociationResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _traceAssociationResourceListResultDeserializer(result.body);
}

/** Lists the trace associations that apply to the resource scope. */
export function list(
  context: Client,
  resourceGroupName: string,
  providerName: string,
  providerType: string,
  resourceName: string,
  options: TraceAssociationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TraceAssociationResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, providerName, providerType, resourceName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-09-03-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  providerName: string,
  providerType: string,
  resourceName: string,
  options: TraceAssociationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{providerName}/{providerType}/{resourceName}/providers/Microsoft.Monitor/traceAssociations/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      providerName: providerName,
      providerType: providerType,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-09-03-preview",
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

/** Deletes the trace association at the resource scope. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  providerName: string,
  providerType: string,
  resourceName: string,
  options: TraceAssociationsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    providerName,
    providerType,
    resourceName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  providerName: string,
  providerType: string,
  resourceName: string,
  resource: TraceAssociationResource,
  options: TraceAssociationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{providerName}/{providerType}/{resourceName}/providers/Microsoft.Monitor/traceAssociations/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      providerName: providerName,
      providerType: providerType,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-09-03-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: traceAssociationResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<TraceAssociationResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return traceAssociationResourceDeserializer(result.body);
}

/** Creates or replaces the trace association at the resource scope. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  providerName: string,
  providerType: string,
  resourceName: string,
  resource: TraceAssociationResource,
  options: TraceAssociationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<TraceAssociationResource> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    providerName,
    providerType,
    resourceName,
    resource,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  providerName: string,
  providerType: string,
  resourceName: string,
  options: TraceAssociationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{providerName}/{providerType}/{resourceName}/providers/Microsoft.Monitor/traceAssociations/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      providerName: providerName,
      providerType: providerType,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-09-03-preview",
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
): Promise<TraceAssociationResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return traceAssociationResourceDeserializer(result.body);
}

/** Gets the trace association at the resource scope. */
export async function get(
  context: Client,
  resourceGroupName: string,
  providerName: string,
  providerType: string,
  resourceName: string,
  options: TraceAssociationsGetOptionalParams = { requestOptions: {} },
): Promise<TraceAssociationResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    providerName,
    providerType,
    resourceName,
    options,
  );
  return _getDeserialize(result);
}
