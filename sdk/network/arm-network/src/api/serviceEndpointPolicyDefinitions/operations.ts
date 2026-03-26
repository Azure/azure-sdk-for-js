// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type { ServiceEndpointPolicyDefinition } from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  serviceEndpointPolicyDefinitionSerializer,
  serviceEndpointPolicyDefinitionDeserializer,
} from "../../models/microsoft/network/models.js";
import type { _ServiceEndpointPolicyDefinitionListResult } from "../../models/models.js";
import { _serviceEndpointPolicyDefinitionListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ServiceEndpointPolicyDefinitionsListByResourceGroupOptionalParams,
  ServiceEndpointPolicyDefinitionsDeleteOptionalParams,
  ServiceEndpointPolicyDefinitionsCreateOrUpdateOptionalParams,
  ServiceEndpointPolicyDefinitionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  serviceEndpointPolicyName: string,
  options: ServiceEndpointPolicyDefinitionsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/serviceEndpointPolicies/{serviceEndpointPolicyName}/serviceEndpointPolicyDefinitions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceEndpointPolicyName: serviceEndpointPolicyName,
      "api%2Dversion": "2025-05-01",
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
): Promise<_ServiceEndpointPolicyDefinitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _serviceEndpointPolicyDefinitionListResultDeserializer(result.body);
}

/** Gets all service endpoint policy definitions in a service end point policy. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  serviceEndpointPolicyName: string,
  options: ServiceEndpointPolicyDefinitionsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ServiceEndpointPolicyDefinition> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, serviceEndpointPolicyName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  serviceEndpointPolicyName: string,
  serviceEndpointPolicyDefinitionName: string,
  options: ServiceEndpointPolicyDefinitionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/serviceEndpointPolicies/{serviceEndpointPolicyName}/serviceEndpointPolicyDefinitions/{serviceEndpointPolicyDefinitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceEndpointPolicyName: serviceEndpointPolicyName,
      serviceEndpointPolicyDefinitionName: serviceEndpointPolicyDefinitionName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes the specified ServiceEndpoint policy definitions. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  serviceEndpointPolicyName: string,
  serviceEndpointPolicyDefinitionName: string,
  options: ServiceEndpointPolicyDefinitionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        serviceEndpointPolicyName,
        serviceEndpointPolicyDefinitionName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serviceEndpointPolicyName: string,
  serviceEndpointPolicyDefinitionName: string,
  serviceEndpointPolicyDefinitions: ServiceEndpointPolicyDefinition,
  options: ServiceEndpointPolicyDefinitionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/serviceEndpointPolicies/{serviceEndpointPolicyName}/serviceEndpointPolicyDefinitions/{serviceEndpointPolicyDefinitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceEndpointPolicyName: serviceEndpointPolicyName,
      serviceEndpointPolicyDefinitionName: serviceEndpointPolicyDefinitionName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: serviceEndpointPolicyDefinitionSerializer(serviceEndpointPolicyDefinitions),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ServiceEndpointPolicyDefinition> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return serviceEndpointPolicyDefinitionDeserializer(result.body);
}

/** Creates or updates a service endpoint policy definition in the specified service endpoint policy. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serviceEndpointPolicyName: string,
  serviceEndpointPolicyDefinitionName: string,
  serviceEndpointPolicyDefinitions: ServiceEndpointPolicyDefinition,
  options: ServiceEndpointPolicyDefinitionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ServiceEndpointPolicyDefinition>, ServiceEndpointPolicyDefinition> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        serviceEndpointPolicyName,
        serviceEndpointPolicyDefinitionName,
        serviceEndpointPolicyDefinitions,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<
    OperationState<ServiceEndpointPolicyDefinition>,
    ServiceEndpointPolicyDefinition
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serviceEndpointPolicyName: string,
  serviceEndpointPolicyDefinitionName: string,
  options: ServiceEndpointPolicyDefinitionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/serviceEndpointPolicies/{serviceEndpointPolicyName}/serviceEndpointPolicyDefinitions/{serviceEndpointPolicyDefinitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceEndpointPolicyName: serviceEndpointPolicyName,
      serviceEndpointPolicyDefinitionName: serviceEndpointPolicyDefinitionName,
      "api%2Dversion": "2025-05-01",
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
): Promise<ServiceEndpointPolicyDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return serviceEndpointPolicyDefinitionDeserializer(result.body);
}

/** Get a ServiceEndpointPolicyDefinition */
export async function get(
  context: Client,
  resourceGroupName: string,
  serviceEndpointPolicyName: string,
  serviceEndpointPolicyDefinitionName: string,
  options: ServiceEndpointPolicyDefinitionsGetOptionalParams = { requestOptions: {} },
): Promise<ServiceEndpointPolicyDefinition> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serviceEndpointPolicyName,
    serviceEndpointPolicyDefinitionName,
    options,
  );
  return _getDeserialize(result);
}
