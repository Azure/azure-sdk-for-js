// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  SiteReference,
  siteReferenceSerializer,
  siteReferenceDeserializer,
  _SiteReferenceListResult,
  _siteReferenceListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SiteReferencesListByContextOptionalParams,
  SiteReferencesDeleteOptionalParams,
  SiteReferencesUpdateOptionalParams,
  SiteReferencesCreateOrUpdateOptionalParams,
  SiteReferencesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listByContextSend(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  options: SiteReferencesListByContextOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/siteReferences{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      contextName: contextName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listByContextDeserialize(
  result: PathUncheckedResponse,
): Promise<_SiteReferenceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _siteReferenceListResultDeserializer(result.body);
}

/** List Site Reference Resources */
export function listByContext(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  options: SiteReferencesListByContextOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SiteReference> {
  return buildPagedAsyncIterator(
    context,
    () => _listByContextSend(context, resourceGroupName, contextName, options),
    _listByContextDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  siteReferenceName: string,
  options: SiteReferencesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/siteReferences/{siteReferenceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      contextName: contextName,
      siteReferenceName: siteReferenceName,
      "api%2Dversion": context.apiVersion,
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
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Get Site Reference Resource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  siteReferenceName: string,
  options: SiteReferencesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, contextName, siteReferenceName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  siteReferenceName: string,
  properties: SiteReference,
  options: SiteReferencesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/siteReferences/{siteReferenceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      contextName: contextName,
      siteReferenceName: siteReferenceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: siteReferenceSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<SiteReference> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return siteReferenceDeserializer(result.body);
}

/** Get Site Reference Resource */
export function update(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  siteReferenceName: string,
  properties: SiteReference,
  options: SiteReferencesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SiteReference>, SiteReference> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, contextName, siteReferenceName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<SiteReference>, SiteReference>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  siteReferenceName: string,
  resource: SiteReference,
  options: SiteReferencesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/siteReferences/{siteReferenceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      contextName: contextName,
      siteReferenceName: siteReferenceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: siteReferenceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteReference> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return siteReferenceDeserializer(result.body);
}

/** Get Site Reference Resource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  siteReferenceName: string,
  resource: SiteReference,
  options: SiteReferencesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SiteReference>, SiteReference> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        contextName,
        siteReferenceName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<SiteReference>, SiteReference>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  siteReferenceName: string,
  options: SiteReferencesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/siteReferences/{siteReferenceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      contextName: contextName,
      siteReferenceName: siteReferenceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SiteReference> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return siteReferenceDeserializer(result.body);
}

/** Get Site Reference Resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  siteReferenceName: string,
  options: SiteReferencesGetOptionalParams = { requestOptions: {} },
): Promise<SiteReference> {
  const result = await _getSend(
    context,
    resourceGroupName,
    contextName,
    siteReferenceName,
    options,
  );
  return _getDeserialize(result);
}
