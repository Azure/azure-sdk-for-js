// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  SchemaReference,
  schemaReferenceSerializer,
  schemaReferenceDeserializer,
  _SchemaReferenceListResult,
  _schemaReferenceListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SchemaReferencesListByResourceGroupOptionalParams,
  SchemaReferencesDeleteOptionalParams,
  SchemaReferencesUpdateOptionalParams,
  SchemaReferencesCreateOrUpdateOptionalParams,
  SchemaReferencesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listByResourceGroupSend(
  context: Client,
  resourceUri: string,
  options: SchemaReferencesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Edge/schemaReferences{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_SchemaReferenceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _schemaReferenceListResultDeserializer(result.body);
}

/** List by specified resource group */
export function listByResourceGroup(
  context: Client,
  resourceUri: string,
  options: SchemaReferencesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SchemaReference> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceUri, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-06-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceUri: string,
  schemaReferenceName: string,
  options: SchemaReferencesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Edge/schemaReferences/{schemaReferenceName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      schemaReferenceName: schemaReferenceName,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a Schema Reference Resource */
export function $delete(
  context: Client,
  resourceUri: string,
  schemaReferenceName: string,
  options: SchemaReferencesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceUri, schemaReferenceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-06-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceUri: string,
  schemaReferenceName: string,
  properties: SchemaReference,
  options: SchemaReferencesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Edge/schemaReferences/{schemaReferenceName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      schemaReferenceName: schemaReferenceName,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: schemaReferenceSerializer(properties),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<SchemaReference> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return schemaReferenceDeserializer(result.body);
}

/** update a Schema Reference Resource */
export async function update(
  context: Client,
  resourceUri: string,
  schemaReferenceName: string,
  properties: SchemaReference,
  options: SchemaReferencesUpdateOptionalParams = { requestOptions: {} },
): Promise<SchemaReference> {
  const result = await _updateSend(context, resourceUri, schemaReferenceName, properties, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceUri: string,
  schemaReferenceName: string,
  resource: SchemaReference,
  options: SchemaReferencesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Edge/schemaReferences/{schemaReferenceName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      schemaReferenceName: schemaReferenceName,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: schemaReferenceSerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SchemaReference> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return schemaReferenceDeserializer(result.body);
}

/** Create or update a Schema Reference Resource */
export function createOrUpdate(
  context: Client,
  resourceUri: string,
  schemaReferenceName: string,
  resource: SchemaReference,
  options: SchemaReferencesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SchemaReference>, SchemaReference> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceUri, schemaReferenceName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-06-01",
  }) as PollerLike<OperationState<SchemaReference>, SchemaReference>;
}

export function _getSend(
  context: Client,
  resourceUri: string,
  schemaReferenceName: string,
  options: SchemaReferencesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Edge/schemaReferences/{schemaReferenceName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      schemaReferenceName: schemaReferenceName,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SchemaReference> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return schemaReferenceDeserializer(result.body);
}

/** Get a Schema Reference Resource */
export async function get(
  context: Client,
  resourceUri: string,
  schemaReferenceName: string,
  options: SchemaReferencesGetOptionalParams = { requestOptions: {} },
): Promise<SchemaReference> {
  const result = await _getSend(context, resourceUri, schemaReferenceName, options);
  return _getDeserialize(result);
}
