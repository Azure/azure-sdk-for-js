// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { commonCloudErrorDeserializer } from "../../models/common/models.js";
import type {
  SecuritySolutionsAPIJitNetworkAccessPolicy,
  SecuritySolutionsAPIJitNetworkAccessRequest,
  _SecuritySolutionsAPIJitNetworkAccessPoliciesList,
  SecuritySolutionsAPIJitNetworkAccessPolicyInitiateRequest,
} from "../../models/securitySolutionsAPI/models.js";
import {
  securitySolutionsAPIJitNetworkAccessPolicySerializer,
  securitySolutionsAPIJitNetworkAccessPolicyDeserializer,
  securitySolutionsAPIJitNetworkAccessRequestDeserializer,
  _securitySolutionsAPIJitNetworkAccessPoliciesListDeserializer,
  securitySolutionsAPIJitNetworkAccessPolicyInitiateRequestSerializer,
} from "../../models/securitySolutionsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  JitNetworkAccessPoliciesListByResourceGroupOptionalParams,
  JitNetworkAccessPoliciesListOptionalParams,
  JitNetworkAccessPoliciesInitiateOptionalParams,
  JitNetworkAccessPoliciesListByRegionOptionalParams,
  JitNetworkAccessPoliciesListByResourceGroupAndRegionOptionalParams,
  JitNetworkAccessPoliciesDeleteOptionalParams,
  JitNetworkAccessPoliciesCreateOrUpdateOptionalParams,
  JitNetworkAccessPoliciesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: JitNetworkAccessPoliciesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/jitNetworkAccessPolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2020-01-01",
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
): Promise<_SecuritySolutionsAPIJitNetworkAccessPoliciesList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return _securitySolutionsAPIJitNetworkAccessPoliciesListDeserializer(result.body);
}

/** Policies for protecting resources using Just-in-Time access control for the subscription, location */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: JitNetworkAccessPoliciesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecuritySolutionsAPIJitNetworkAccessPolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2020-01-01" },
  );
}

export function _listSend(
  context: Client,
  options: JitNetworkAccessPoliciesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/jitNetworkAccessPolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2020-01-01",
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
): Promise<_SecuritySolutionsAPIJitNetworkAccessPoliciesList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return _securitySolutionsAPIJitNetworkAccessPoliciesListDeserializer(result.body);
}

/** Policies for protecting resources using Just-in-Time access control. */
export function list(
  context: Client,
  options: JitNetworkAccessPoliciesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecuritySolutionsAPIJitNetworkAccessPolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2020-01-01" },
  );
}

export function _initiateSend(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  jitNetworkAccessPolicyName: string,
  body: SecuritySolutionsAPIJitNetworkAccessPolicyInitiateRequest,
  options: JitNetworkAccessPoliciesInitiateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/locations/{ascLocation}/jitNetworkAccessPolicies/{jitNetworkAccessPolicyName}/{jitNetworkAccessPolicyInitiateType}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ascLocation: ascLocation,
      jitNetworkAccessPolicyName: jitNetworkAccessPolicyName,
      jitNetworkAccessPolicyInitiateType: "initiate",
      "api%2Dversion": "2020-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: securitySolutionsAPIJitNetworkAccessPolicyInitiateRequestSerializer(body),
  });
}

export async function _initiateDeserialize(
  result: PathUncheckedResponse,
): Promise<SecuritySolutionsAPIJitNetworkAccessRequest> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return securitySolutionsAPIJitNetworkAccessRequestDeserializer(result.body);
}

/** Initiate a JIT access from a specific Just-in-Time policy configuration. */
export async function initiate(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  jitNetworkAccessPolicyName: string,
  body: SecuritySolutionsAPIJitNetworkAccessPolicyInitiateRequest,
  options: JitNetworkAccessPoliciesInitiateOptionalParams = { requestOptions: {} },
): Promise<SecuritySolutionsAPIJitNetworkAccessRequest> {
  const result = await _initiateSend(
    context,
    resourceGroupName,
    ascLocation,
    jitNetworkAccessPolicyName,
    body,
    options,
  );
  return _initiateDeserialize(result);
}

export function _listByRegionSend(
  context: Client,
  ascLocation: string,
  options: JitNetworkAccessPoliciesListByRegionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/locations/{ascLocation}/jitNetworkAccessPolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      ascLocation: ascLocation,
      "api%2Dversion": "2020-01-01",
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

export async function _listByRegionDeserialize(
  result: PathUncheckedResponse,
): Promise<_SecuritySolutionsAPIJitNetworkAccessPoliciesList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return _securitySolutionsAPIJitNetworkAccessPoliciesListDeserializer(result.body);
}

/** Policies for protecting resources using Just-in-Time access control for the subscription, location */
export function listByRegion(
  context: Client,
  ascLocation: string,
  options: JitNetworkAccessPoliciesListByRegionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecuritySolutionsAPIJitNetworkAccessPolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listByRegionSend(context, ascLocation, options),
    _listByRegionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2020-01-01" },
  );
}

export function _listByResourceGroupAndRegionSend(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  options: JitNetworkAccessPoliciesListByResourceGroupAndRegionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/locations/{ascLocation}/jitNetworkAccessPolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ascLocation: ascLocation,
      "api%2Dversion": "2020-01-01",
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

export async function _listByResourceGroupAndRegionDeserialize(
  result: PathUncheckedResponse,
): Promise<_SecuritySolutionsAPIJitNetworkAccessPoliciesList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return _securitySolutionsAPIJitNetworkAccessPoliciesListDeserializer(result.body);
}

/** Policies for protecting resources using Just-in-Time access control for the subscription, location */
export function listByResourceGroupAndRegion(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  options: JitNetworkAccessPoliciesListByResourceGroupAndRegionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SecuritySolutionsAPIJitNetworkAccessPolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupAndRegionSend(context, resourceGroupName, ascLocation, options),
    _listByResourceGroupAndRegionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2020-01-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  jitNetworkAccessPolicyName: string,
  options: JitNetworkAccessPoliciesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/locations/{ascLocation}/jitNetworkAccessPolicies/{jitNetworkAccessPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ascLocation: ascLocation,
      jitNetworkAccessPolicyName: jitNetworkAccessPolicyName,
      "api%2Dversion": "2020-01-01",
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
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a Just-in-Time access control policy. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  jitNetworkAccessPolicyName: string,
  options: JitNetworkAccessPoliciesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    ascLocation,
    jitNetworkAccessPolicyName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  jitNetworkAccessPolicyName: string,
  body: SecuritySolutionsAPIJitNetworkAccessPolicy,
  options: JitNetworkAccessPoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/locations/{ascLocation}/jitNetworkAccessPolicies/{jitNetworkAccessPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ascLocation: ascLocation,
      jitNetworkAccessPolicyName: jitNetworkAccessPolicyName,
      "api%2Dversion": "2020-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: securitySolutionsAPIJitNetworkAccessPolicySerializer(body),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SecuritySolutionsAPIJitNetworkAccessPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return securitySolutionsAPIJitNetworkAccessPolicyDeserializer(result.body);
}

/** Create a policy for protecting resources using Just-in-Time access control */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  jitNetworkAccessPolicyName: string,
  body: SecuritySolutionsAPIJitNetworkAccessPolicy,
  options: JitNetworkAccessPoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<SecuritySolutionsAPIJitNetworkAccessPolicy> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    ascLocation,
    jitNetworkAccessPolicyName,
    body,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  jitNetworkAccessPolicyName: string,
  options: JitNetworkAccessPoliciesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/locations/{ascLocation}/jitNetworkAccessPolicies/{jitNetworkAccessPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ascLocation: ascLocation,
      jitNetworkAccessPolicyName: jitNetworkAccessPolicyName,
      "api%2Dversion": "2020-01-01",
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
): Promise<SecuritySolutionsAPIJitNetworkAccessPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return securitySolutionsAPIJitNetworkAccessPolicyDeserializer(result.body);
}

/** Policies for protecting resources using Just-in-Time access control for the subscription, location */
export async function get(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  jitNetworkAccessPolicyName: string,
  options: JitNetworkAccessPoliciesGetOptionalParams = { requestOptions: {} },
): Promise<SecuritySolutionsAPIJitNetworkAccessPolicy> {
  const result = await _getSend(
    context,
    resourceGroupName,
    ascLocation,
    jitNetworkAccessPolicyName,
    options,
  );
  return _getDeserialize(result);
}
