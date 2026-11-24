// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkSecurityManagementContext as Client } from "../index.js";
import type {
  ClusterAssociation,
  ClusterAssociationUpdate,
} from "../../models/microsoft/networkSecurity/models.js";
import {
  clusterAssociationSerializer,
  clusterAssociationDeserializer,
  clusterAssociationUpdateSerializer,
} from "../../models/microsoft/networkSecurity/models.js";
import type { _ClusterAssociationListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  _clusterAssociationListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ClusterAssociationsListByParentOptionalParams,
  ClusterAssociationsDeleteOptionalParams,
  ClusterAssociationsUpdateOptionalParams,
  ClusterAssociationsCreateOrUpdateOptionalParams,
  ClusterAssociationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByParentSend(
  context: Client,
  resourceGroupName: string,
  agentFabricName: string,
  options: ClusterAssociationsListByParentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/agentFabrics/{agentFabricName}/clusterAssociations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      agentFabricName: agentFabricName,
      "api%2Dversion": "2026-11-03-preview",
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

export async function _listByParentDeserialize(
  result: PathUncheckedResponse,
): Promise<_ClusterAssociationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _clusterAssociationListResultDeserializer(result.body);
}

/** List ClusterAssociation resources by AgentFabric */
export function listByParent(
  context: Client,
  resourceGroupName: string,
  agentFabricName: string,
  options: ClusterAssociationsListByParentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ClusterAssociation> {
  return buildPagedAsyncIterator(
    context,
    () => _listByParentSend(context, resourceGroupName, agentFabricName, options),
    _listByParentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2026-11-03-preview" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  agentFabricName: string,
  clusterAssociationName: string,
  options: ClusterAssociationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/agentFabrics/{agentFabricName}/clusterAssociations/{clusterAssociationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      agentFabricName: agentFabricName,
      clusterAssociationName: clusterAssociationName,
      "api%2Dversion": "2026-11-03-preview",
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

/**
 * Deletes the association. Idempotent: returns `202 Accepted` when completion is
 * asynchronous, and `204 No Content` when it completes synchronously or the
 * association is already absent.
 *
 * For an association enrolling an ACI SandboxGroup (`clusterResourceId` of type
 * `Microsoft.ContainerInstance/sandboxGroups`), the service returns
 * `409 ClusterAssociationNotEmpty` while any Member still references the
 * SandboxGroup. All such Members must be deleted before the association can be
 * removed.
 *
 * ```json
 * {
 *   "error": {
 *     "code": "ClusterAssociationNotEmpty",
 *     "message": "The ClusterAssociation cannot be deleted because one or more members still reference it.",
 *     "target": "properties.clusterResourceId"
 *   }
 * }
 * ```
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  agentFabricName: string,
  clusterAssociationName: string,
  options: ClusterAssociationsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, agentFabricName, clusterAssociationName, options),
    resourceLocationConfig: "location",
    apiVersion: "2026-11-03-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  agentFabricName: string,
  clusterAssociationName: string,
  properties: ClusterAssociationUpdate,
  options: ClusterAssociationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/agentFabrics/{agentFabricName}/clusterAssociations/{clusterAssociationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      agentFabricName: agentFabricName,
      clusterAssociationName: clusterAssociationName,
      "api%2Dversion": "2026-11-03-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: clusterAssociationUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ClusterAssociation> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return clusterAssociationDeserializer(result.body);
}

/** Update a ClusterAssociation */
export function update(
  context: Client,
  resourceGroupName: string,
  agentFabricName: string,
  clusterAssociationName: string,
  properties: ClusterAssociationUpdate,
  options: ClusterAssociationsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ClusterAssociation>, ClusterAssociation> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        agentFabricName,
        clusterAssociationName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2026-11-03-preview",
  }) as PollerLike<OperationState<ClusterAssociation>, ClusterAssociation>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  agentFabricName: string,
  clusterAssociationName: string,
  resource: ClusterAssociation,
  options: ClusterAssociationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/agentFabrics/{agentFabricName}/clusterAssociations/{clusterAssociationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      agentFabricName: agentFabricName,
      clusterAssociationName: clusterAssociationName,
      "api%2Dversion": "2026-11-03-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: clusterAssociationSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ClusterAssociation> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return clusterAssociationDeserializer(result.body);
}

/** Create a ClusterAssociation */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  agentFabricName: string,
  clusterAssociationName: string,
  resource: ClusterAssociation,
  options: ClusterAssociationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ClusterAssociation>, ClusterAssociation> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        agentFabricName,
        clusterAssociationName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2026-11-03-preview",
  }) as PollerLike<OperationState<ClusterAssociation>, ClusterAssociation>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  agentFabricName: string,
  clusterAssociationName: string,
  options: ClusterAssociationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/agentFabrics/{agentFabricName}/clusterAssociations/{clusterAssociationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      agentFabricName: agentFabricName,
      clusterAssociationName: clusterAssociationName,
      "api%2Dversion": "2026-11-03-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ClusterAssociation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return clusterAssociationDeserializer(result.body);
}

/** Get a ClusterAssociation */
export async function get(
  context: Client,
  resourceGroupName: string,
  agentFabricName: string,
  clusterAssociationName: string,
  options: ClusterAssociationsGetOptionalParams = { requestOptions: {} },
): Promise<ClusterAssociation> {
  const result = await _getSend(
    context,
    resourceGroupName,
    agentFabricName,
    clusterAssociationName,
    options,
  );
  return _getDeserialize(result);
}
