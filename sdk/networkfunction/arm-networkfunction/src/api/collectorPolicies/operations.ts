// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureTrafficCollectorContext as Client } from "../index.js";
import type {
  TagsObject,
  CollectorPolicy,
  _CollectorPolicyListResult,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  tagsObjectSerializer,
  collectorPolicySerializer,
  collectorPolicyDeserializer,
  _collectorPolicyListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  CollectorPoliciesListOptionalParams,
  CollectorPoliciesDeleteOptionalParams,
  CollectorPoliciesUpdateTagsOptionalParams,
  CollectorPoliciesCreateOrUpdateOptionalParams,
  CollectorPoliciesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  azureTrafficCollectorName: string,
  options: CollectorPoliciesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkFunction/azureTrafficCollectors/{azureTrafficCollectorName}/collectorPolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureTrafficCollectorName: azureTrafficCollectorName,
      "api%2Dversion": context.apiVersion ?? "2022-11-01",
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
): Promise<_CollectorPolicyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _collectorPolicyListResultDeserializer(result.body);
}

/** Return list of Collector policies in a Azure Traffic Collector */
export function list(
  context: Client,
  resourceGroupName: string,
  azureTrafficCollectorName: string,
  options: CollectorPoliciesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CollectorPolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, azureTrafficCollectorName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2022-11-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  azureTrafficCollectorName: string,
  collectorPolicyName: string,
  options: CollectorPoliciesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkFunction/azureTrafficCollectors/{azureTrafficCollectorName}/collectorPolicies/{collectorPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureTrafficCollectorName: azureTrafficCollectorName,
      collectorPolicyName: collectorPolicyName,
      "api%2Dversion": context.apiVersion ?? "2022-11-01",
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

/** Deletes a specified Collector Policy resource. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  azureTrafficCollectorName: string,
  collectorPolicyName: string,
  options: CollectorPoliciesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        azureTrafficCollectorName,
        collectorPolicyName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2022-11-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  azureTrafficCollectorName: string,
  collectorPolicyName: string,
  parameters: TagsObject,
  options: CollectorPoliciesUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkFunction/azureTrafficCollectors/{azureTrafficCollectorName}/collectorPolicies/{collectorPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureTrafficCollectorName: azureTrafficCollectorName,
      collectorPolicyName: collectorPolicyName,
      "api%2Dversion": context.apiVersion ?? "2022-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: tagsObjectSerializer(parameters),
  });
}

export async function _updateTagsDeserialize(
  result: PathUncheckedResponse,
): Promise<CollectorPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return collectorPolicyDeserializer(result.body);
}

/** Updates the specified Collector Policy tags. */
export async function updateTags(
  context: Client,
  resourceGroupName: string,
  azureTrafficCollectorName: string,
  collectorPolicyName: string,
  parameters: TagsObject,
  options: CollectorPoliciesUpdateTagsOptionalParams = { requestOptions: {} },
): Promise<CollectorPolicy> {
  const result = await _updateTagsSend(
    context,
    resourceGroupName,
    azureTrafficCollectorName,
    collectorPolicyName,
    parameters,
    options,
  );
  return _updateTagsDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  azureTrafficCollectorName: string,
  collectorPolicyName: string,
  parameters: CollectorPolicy,
  options: CollectorPoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkFunction/azureTrafficCollectors/{azureTrafficCollectorName}/collectorPolicies/{collectorPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureTrafficCollectorName: azureTrafficCollectorName,
      collectorPolicyName: collectorPolicyName,
      "api%2Dversion": context.apiVersion ?? "2022-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: collectorPolicySerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<CollectorPolicy> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return collectorPolicyDeserializer(result.body);
}

/** Creates or updates a Collector Policy resource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  azureTrafficCollectorName: string,
  collectorPolicyName: string,
  parameters: CollectorPolicy,
  options: CollectorPoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CollectorPolicy>, CollectorPolicy> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        azureTrafficCollectorName,
        collectorPolicyName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2022-11-01",
  }) as PollerLike<OperationState<CollectorPolicy>, CollectorPolicy>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  azureTrafficCollectorName: string,
  collectorPolicyName: string,
  options: CollectorPoliciesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkFunction/azureTrafficCollectors/{azureTrafficCollectorName}/collectorPolicies/{collectorPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureTrafficCollectorName: azureTrafficCollectorName,
      collectorPolicyName: collectorPolicyName,
      "api%2Dversion": context.apiVersion ?? "2022-11-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<CollectorPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return collectorPolicyDeserializer(result.body);
}

/** Gets the collector policy in a specified Traffic Collector */
export async function get(
  context: Client,
  resourceGroupName: string,
  azureTrafficCollectorName: string,
  collectorPolicyName: string,
  options: CollectorPoliciesGetOptionalParams = { requestOptions: {} },
): Promise<CollectorPolicy> {
  const result = await _getSend(
    context,
    resourceGroupName,
    azureTrafficCollectorName,
    collectorPolicyName,
    options,
  );
  return _getDeserialize(result);
}
