// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PowerPlatformContext as Client } from "../index.js";
import type {
  EnterprisePolicy,
  PatchEnterprisePolicy,
  _EnterprisePolicyList,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  enterprisePolicySerializer,
  enterprisePolicyDeserializer,
  patchEnterprisePolicySerializer,
  _enterprisePolicyListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  EnterprisePoliciesListBySubscriptionOptionalParams,
  EnterprisePoliciesListByResourceGroupOptionalParams,
  EnterprisePoliciesDeleteOptionalParams,
  EnterprisePoliciesUpdateOptionalParams,
  EnterprisePoliciesCreateOrUpdateOptionalParams,
  EnterprisePoliciesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listBySubscriptionSend(
  context: Client,
  options: EnterprisePoliciesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.PowerPlatform/enterprisePolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2020-10-30-preview",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_EnterprisePolicyList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _enterprisePolicyListDeserializer(result.body);
}

/** Retrieve a list of EnterprisePolicies within a subscription */
export function listBySubscription(
  context: Client,
  options: EnterprisePoliciesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EnterprisePolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2020-10-30-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: EnterprisePoliciesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerPlatform/enterprisePolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2020-10-30-preview",
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
): Promise<_EnterprisePolicyList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _enterprisePolicyListDeserializer(result.body);
}

/** Retrieve a list of EnterprisePolicies within a given resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: EnterprisePoliciesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EnterprisePolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2020-10-30-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  enterprisePolicyName: string,
  options: EnterprisePoliciesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerPlatform/enterprisePolicies/{enterprisePolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      enterprisePolicyName: enterprisePolicyName,
      "api%2Dversion": context.apiVersion ?? "2020-10-30-preview",
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

/** Delete an EnterprisePolicy */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  enterprisePolicyName: string,
  options: EnterprisePoliciesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, enterprisePolicyName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  enterprisePolicyName: string,
  resourceGroupName: string,
  parameters: PatchEnterprisePolicy,
  options: EnterprisePoliciesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerPlatform/enterprisePolicies/{enterprisePolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      enterprisePolicyName: enterprisePolicyName,
      "api%2Dversion": context.apiVersion ?? "2020-10-30-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: patchEnterprisePolicySerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<EnterprisePolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return enterprisePolicyDeserializer(result.body);
}

/** Updates an EnterprisePolicy */
export async function update(
  context: Client,
  enterprisePolicyName: string,
  resourceGroupName: string,
  parameters: PatchEnterprisePolicy,
  options: EnterprisePoliciesUpdateOptionalParams = { requestOptions: {} },
): Promise<EnterprisePolicy> {
  const result = await _updateSend(
    context,
    enterprisePolicyName,
    resourceGroupName,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  enterprisePolicyName: string,
  resourceGroupName: string,
  parameters: EnterprisePolicy,
  options: EnterprisePoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerPlatform/enterprisePolicies/{enterprisePolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      enterprisePolicyName: enterprisePolicyName,
      "api%2Dversion": context.apiVersion ?? "2020-10-30-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: enterprisePolicySerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<EnterprisePolicy> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return enterprisePolicyDeserializer(result.body);
}

/** Creates an EnterprisePolicy */
export async function createOrUpdate(
  context: Client,
  enterprisePolicyName: string,
  resourceGroupName: string,
  parameters: EnterprisePolicy,
  options: EnterprisePoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<EnterprisePolicy> {
  const result = await _createOrUpdateSend(
    context,
    enterprisePolicyName,
    resourceGroupName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  enterprisePolicyName: string,
  resourceGroupName: string,
  options: EnterprisePoliciesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerPlatform/enterprisePolicies/{enterprisePolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      enterprisePolicyName: enterprisePolicyName,
      "api%2Dversion": context.apiVersion ?? "2020-10-30-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<EnterprisePolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return enterprisePolicyDeserializer(result.body);
}

/** Get information about an EnterprisePolicy */
export async function get(
  context: Client,
  enterprisePolicyName: string,
  resourceGroupName: string,
  options: EnterprisePoliciesGetOptionalParams = { requestOptions: {} },
): Promise<EnterprisePolicy> {
  const result = await _getSend(context, enterprisePolicyName, resourceGroupName, options);
  return _getDeserialize(result);
}
