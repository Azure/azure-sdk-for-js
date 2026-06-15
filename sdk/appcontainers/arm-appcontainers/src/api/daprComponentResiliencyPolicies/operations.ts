// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext as Client } from "../index.js";
import {
  defaultErrorResponseDeserializer,
  DaprComponentResiliencyPolicy,
  daprComponentResiliencyPolicySerializer,
  daprComponentResiliencyPolicyDeserializer,
  _DaprComponentResiliencyPoliciesCollection,
  _daprComponentResiliencyPoliciesCollectionDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  DaprComponentResiliencyPoliciesListOptionalParams,
  DaprComponentResiliencyPoliciesDeleteOptionalParams,
  DaprComponentResiliencyPoliciesCreateOrUpdateOptionalParams,
  DaprComponentResiliencyPoliciesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  componentName: string,
  options: DaprComponentResiliencyPoliciesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/daprComponents/{componentName}/resiliencyPolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      environmentName: environmentName,
      componentName: componentName,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_DaprComponentResiliencyPoliciesCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _daprComponentResiliencyPoliciesCollectionDeserializer(result.body);
}

/** Get the resiliency policies for a Dapr component. */
export function list(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  componentName: string,
  options: DaprComponentResiliencyPoliciesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DaprComponentResiliencyPolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, environmentName, componentName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-10-02-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  componentName: string,
  name: string,
  options: DaprComponentResiliencyPoliciesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/daprComponents/{componentName}/resiliencyPolicies/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      environmentName: environmentName,
      componentName: componentName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a resiliency policy for a Dapr component. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  componentName: string,
  name: string,
  options: DaprComponentResiliencyPoliciesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    environmentName,
    componentName,
    name,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  componentName: string,
  name: string,
  daprComponentResiliencyPolicyEnvelope: DaprComponentResiliencyPolicy,
  options: DaprComponentResiliencyPoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/daprComponents/{componentName}/resiliencyPolicies/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      environmentName: environmentName,
      componentName: componentName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: daprComponentResiliencyPolicySerializer(daprComponentResiliencyPolicyEnvelope),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DaprComponentResiliencyPolicy> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return daprComponentResiliencyPolicyDeserializer(result.body);
}

/** Creates or updates a resiliency policy for a Dapr component. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  componentName: string,
  name: string,
  daprComponentResiliencyPolicyEnvelope: DaprComponentResiliencyPolicy,
  options: DaprComponentResiliencyPoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<DaprComponentResiliencyPolicy> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    environmentName,
    componentName,
    name,
    daprComponentResiliencyPolicyEnvelope,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  componentName: string,
  name: string,
  options: DaprComponentResiliencyPoliciesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/daprComponents/{componentName}/resiliencyPolicies/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      environmentName: environmentName,
      componentName: componentName,
      name: name,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<DaprComponentResiliencyPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return daprComponentResiliencyPolicyDeserializer(result.body);
}

/** Get a Dapr component resiliency policy. */
export async function get(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  componentName: string,
  name: string,
  options: DaprComponentResiliencyPoliciesGetOptionalParams = { requestOptions: {} },
): Promise<DaprComponentResiliencyPolicy> {
  const result = await _getSend(
    context,
    resourceGroupName,
    environmentName,
    componentName,
    name,
    options,
  );
  return _getDeserialize(result);
}
