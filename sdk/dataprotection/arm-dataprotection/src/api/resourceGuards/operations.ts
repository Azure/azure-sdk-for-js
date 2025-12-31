// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext as Client } from "../index.js";
import type {
  DppBaseResource,
  _DppBaseResourceList,
  ResourceGuardResource,
  PatchResourceGuardInput,
  _ResourceGuardResourceList,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  dppBaseResourceDeserializer,
  _dppBaseResourceListDeserializer,
  resourceGuardResourceSerializer,
  resourceGuardResourceDeserializer,
  patchResourceGuardInputSerializer,
  _resourceGuardResourceListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ResourceGuardsListBackupSecurityPINRequestsObjectsOptionalParams,
  ResourceGuardsGetDefaultBackupSecurityPINRequestsObjectOptionalParams,
  ResourceGuardsListDeleteProtectedItemRequestsObjectsOptionalParams,
  ResourceGuardsGetDefaultDeleteProtectedItemRequestsObjectOptionalParams,
  ResourceGuardsListUpdateProtectionPolicyRequestsObjectsOptionalParams,
  ResourceGuardsGetDefaultUpdateProtectionPolicyRequestsObjectOptionalParams,
  ResourceGuardsListUpdateProtectedItemRequestsObjectsOptionalParams,
  ResourceGuardsGetDefaultUpdateProtectedItemRequestsObjectOptionalParams,
  ResourceGuardsListDisableSoftDeleteRequestsObjectsOptionalParams,
  ResourceGuardsGetDefaultDisableSoftDeleteRequestsObjectOptionalParams,
  ResourceGuardsListResourcesInSubscriptionOptionalParams,
  ResourceGuardsListResourcesInResourceGroupOptionalParams,
  ResourceGuardsDeleteOptionalParams,
  ResourceGuardsPatchOptionalParams,
  ResourceGuardsPutOptionalParams,
  ResourceGuardsGetOptionalParams,
  ResourceGuardsListDeleteResourceGuardProxyRequestsObjectsOptionalParams,
  ResourceGuardsGetDefaultDeleteResourceGuardProxyRequestsObjectOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listBackupSecurityPINRequestsObjectsSend(
  context: Client,
  resourceGroupName: string,
  resourceGuardsName: string,
  options: ResourceGuardsListBackupSecurityPINRequestsObjectsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards/{resourceGuardsName}/getBackupSecurityPINRequests{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceGuardsName: resourceGuardsName,
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

export async function _listBackupSecurityPINRequestsObjectsDeserialize(
  result: PathUncheckedResponse,
): Promise<_DppBaseResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _dppBaseResourceListDeserializer(result.body);
}

/** Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource. */
export function listBackupSecurityPINRequestsObjects(
  context: Client,
  resourceGroupName: string,
  resourceGuardsName: string,
  options: ResourceGuardsListBackupSecurityPINRequestsObjectsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<DppBaseResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listBackupSecurityPINRequestsObjectsSend(
        context,
        resourceGroupName,
        resourceGuardsName,
        options,
      ),
    _listBackupSecurityPINRequestsObjectsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getDefaultBackupSecurityPINRequestsObjectSend(
  context: Client,
  resourceGroupName: string,
  resourceGuardsName: string,
  requestName: string,
  options: ResourceGuardsGetDefaultBackupSecurityPINRequestsObjectOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards/{resourceGuardsName}/getBackupSecurityPINRequests/{requestName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceGuardsName: resourceGuardsName,
      requestName: requestName,
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

export async function _getDefaultBackupSecurityPINRequestsObjectDeserialize(
  result: PathUncheckedResponse,
): Promise<DppBaseResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return dppBaseResourceDeserializer(result.body);
}

/** Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource. */
export async function getDefaultBackupSecurityPINRequestsObject(
  context: Client,
  resourceGroupName: string,
  resourceGuardsName: string,
  requestName: string,
  options: ResourceGuardsGetDefaultBackupSecurityPINRequestsObjectOptionalParams = {
    requestOptions: {},
  },
): Promise<DppBaseResource> {
  const result = await _getDefaultBackupSecurityPINRequestsObjectSend(
    context,
    resourceGroupName,
    resourceGuardsName,
    requestName,
    options,
  );
  return _getDefaultBackupSecurityPINRequestsObjectDeserialize(result);
}

export function _listDeleteProtectedItemRequestsObjectsSend(
  context: Client,
  resourceGroupName: string,
  resourceGuardsName: string,
  options: ResourceGuardsListDeleteProtectedItemRequestsObjectsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards/{resourceGuardsName}/deleteProtectedItemRequests{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceGuardsName: resourceGuardsName,
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

export async function _listDeleteProtectedItemRequestsObjectsDeserialize(
  result: PathUncheckedResponse,
): Promise<_DppBaseResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _dppBaseResourceListDeserializer(result.body);
}

/** Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource. */
export function listDeleteProtectedItemRequestsObjects(
  context: Client,
  resourceGroupName: string,
  resourceGuardsName: string,
  options: ResourceGuardsListDeleteProtectedItemRequestsObjectsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<DppBaseResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listDeleteProtectedItemRequestsObjectsSend(
        context,
        resourceGroupName,
        resourceGuardsName,
        options,
      ),
    _listDeleteProtectedItemRequestsObjectsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getDefaultDeleteProtectedItemRequestsObjectSend(
  context: Client,
  resourceGroupName: string,
  resourceGuardsName: string,
  requestName: string,
  options: ResourceGuardsGetDefaultDeleteProtectedItemRequestsObjectOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards/{resourceGuardsName}/deleteProtectedItemRequests/{requestName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceGuardsName: resourceGuardsName,
      requestName: requestName,
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

export async function _getDefaultDeleteProtectedItemRequestsObjectDeserialize(
  result: PathUncheckedResponse,
): Promise<DppBaseResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return dppBaseResourceDeserializer(result.body);
}

/** Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource. */
export async function getDefaultDeleteProtectedItemRequestsObject(
  context: Client,
  resourceGroupName: string,
  resourceGuardsName: string,
  requestName: string,
  options: ResourceGuardsGetDefaultDeleteProtectedItemRequestsObjectOptionalParams = {
    requestOptions: {},
  },
): Promise<DppBaseResource> {
  const result = await _getDefaultDeleteProtectedItemRequestsObjectSend(
    context,
    resourceGroupName,
    resourceGuardsName,
    requestName,
    options,
  );
  return _getDefaultDeleteProtectedItemRequestsObjectDeserialize(result);
}

export function _listUpdateProtectionPolicyRequestsObjectsSend(
  context: Client,
  resourceGroupName: string,
  resourceGuardsName: string,
  options: ResourceGuardsListUpdateProtectionPolicyRequestsObjectsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards/{resourceGuardsName}/updateProtectionPolicyRequests{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceGuardsName: resourceGuardsName,
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

export async function _listUpdateProtectionPolicyRequestsObjectsDeserialize(
  result: PathUncheckedResponse,
): Promise<_DppBaseResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _dppBaseResourceListDeserializer(result.body);
}

/** Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource. */
export function listUpdateProtectionPolicyRequestsObjects(
  context: Client,
  resourceGroupName: string,
  resourceGuardsName: string,
  options: ResourceGuardsListUpdateProtectionPolicyRequestsObjectsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<DppBaseResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listUpdateProtectionPolicyRequestsObjectsSend(
        context,
        resourceGroupName,
        resourceGuardsName,
        options,
      ),
    _listUpdateProtectionPolicyRequestsObjectsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getDefaultUpdateProtectionPolicyRequestsObjectSend(
  context: Client,
  resourceGroupName: string,
  resourceGuardsName: string,
  requestName: string,
  options: ResourceGuardsGetDefaultUpdateProtectionPolicyRequestsObjectOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards/{resourceGuardsName}/updateProtectionPolicyRequests/{requestName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceGuardsName: resourceGuardsName,
      requestName: requestName,
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

export async function _getDefaultUpdateProtectionPolicyRequestsObjectDeserialize(
  result: PathUncheckedResponse,
): Promise<DppBaseResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return dppBaseResourceDeserializer(result.body);
}

/** Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource. */
export async function getDefaultUpdateProtectionPolicyRequestsObject(
  context: Client,
  resourceGroupName: string,
  resourceGuardsName: string,
  requestName: string,
  options: ResourceGuardsGetDefaultUpdateProtectionPolicyRequestsObjectOptionalParams = {
    requestOptions: {},
  },
): Promise<DppBaseResource> {
  const result = await _getDefaultUpdateProtectionPolicyRequestsObjectSend(
    context,
    resourceGroupName,
    resourceGuardsName,
    requestName,
    options,
  );
  return _getDefaultUpdateProtectionPolicyRequestsObjectDeserialize(result);
}

export function _listUpdateProtectedItemRequestsObjectsSend(
  context: Client,
  resourceGroupName: string,
  resourceGuardsName: string,
  options: ResourceGuardsListUpdateProtectedItemRequestsObjectsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards/{resourceGuardsName}/updateProtectedItemRequests{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceGuardsName: resourceGuardsName,
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

export async function _listUpdateProtectedItemRequestsObjectsDeserialize(
  result: PathUncheckedResponse,
): Promise<_DppBaseResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _dppBaseResourceListDeserializer(result.body);
}

/** Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource. */
export function listUpdateProtectedItemRequestsObjects(
  context: Client,
  resourceGroupName: string,
  resourceGuardsName: string,
  options: ResourceGuardsListUpdateProtectedItemRequestsObjectsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<DppBaseResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listUpdateProtectedItemRequestsObjectsSend(
        context,
        resourceGroupName,
        resourceGuardsName,
        options,
      ),
    _listUpdateProtectedItemRequestsObjectsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getDefaultUpdateProtectedItemRequestsObjectSend(
  context: Client,
  resourceGroupName: string,
  resourceGuardsName: string,
  requestName: string,
  options: ResourceGuardsGetDefaultUpdateProtectedItemRequestsObjectOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards/{resourceGuardsName}/updateProtectedItemRequests/{requestName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceGuardsName: resourceGuardsName,
      requestName: requestName,
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

export async function _getDefaultUpdateProtectedItemRequestsObjectDeserialize(
  result: PathUncheckedResponse,
): Promise<DppBaseResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return dppBaseResourceDeserializer(result.body);
}

/** Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource. */
export async function getDefaultUpdateProtectedItemRequestsObject(
  context: Client,
  resourceGroupName: string,
  resourceGuardsName: string,
  requestName: string,
  options: ResourceGuardsGetDefaultUpdateProtectedItemRequestsObjectOptionalParams = {
    requestOptions: {},
  },
): Promise<DppBaseResource> {
  const result = await _getDefaultUpdateProtectedItemRequestsObjectSend(
    context,
    resourceGroupName,
    resourceGuardsName,
    requestName,
    options,
  );
  return _getDefaultUpdateProtectedItemRequestsObjectDeserialize(result);
}

export function _listDisableSoftDeleteRequestsObjectsSend(
  context: Client,
  resourceGroupName: string,
  resourceGuardsName: string,
  options: ResourceGuardsListDisableSoftDeleteRequestsObjectsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards/{resourceGuardsName}/disableSoftDeleteRequests{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceGuardsName: resourceGuardsName,
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

export async function _listDisableSoftDeleteRequestsObjectsDeserialize(
  result: PathUncheckedResponse,
): Promise<_DppBaseResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _dppBaseResourceListDeserializer(result.body);
}

/** Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource. */
export function listDisableSoftDeleteRequestsObjects(
  context: Client,
  resourceGroupName: string,
  resourceGuardsName: string,
  options: ResourceGuardsListDisableSoftDeleteRequestsObjectsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<DppBaseResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listDisableSoftDeleteRequestsObjectsSend(
        context,
        resourceGroupName,
        resourceGuardsName,
        options,
      ),
    _listDisableSoftDeleteRequestsObjectsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getDefaultDisableSoftDeleteRequestsObjectSend(
  context: Client,
  resourceGroupName: string,
  resourceGuardsName: string,
  requestName: string,
  options: ResourceGuardsGetDefaultDisableSoftDeleteRequestsObjectOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards/{resourceGuardsName}/disableSoftDeleteRequests/{requestName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceGuardsName: resourceGuardsName,
      requestName: requestName,
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

export async function _getDefaultDisableSoftDeleteRequestsObjectDeserialize(
  result: PathUncheckedResponse,
): Promise<DppBaseResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return dppBaseResourceDeserializer(result.body);
}

/** Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource. */
export async function getDefaultDisableSoftDeleteRequestsObject(
  context: Client,
  resourceGroupName: string,
  resourceGuardsName: string,
  requestName: string,
  options: ResourceGuardsGetDefaultDisableSoftDeleteRequestsObjectOptionalParams = {
    requestOptions: {},
  },
): Promise<DppBaseResource> {
  const result = await _getDefaultDisableSoftDeleteRequestsObjectSend(
    context,
    resourceGroupName,
    resourceGuardsName,
    requestName,
    options,
  );
  return _getDefaultDisableSoftDeleteRequestsObjectDeserialize(result);
}

export function _listResourcesInSubscriptionSend(
  context: Client,
  options: ResourceGuardsListResourcesInSubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DataProtection/resourceGuards{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listResourcesInSubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_ResourceGuardResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _resourceGuardResourceListDeserializer(result.body);
}

/** Returns ResourceGuards collection belonging to a subscription. */
export function listResourcesInSubscription(
  context: Client,
  options: ResourceGuardsListResourcesInSubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ResourceGuardResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listResourcesInSubscriptionSend(context, options),
    _listResourcesInSubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listResourcesInResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ResourceGuardsListResourcesInResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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

export async function _listResourcesInResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_ResourceGuardResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _resourceGuardResourceListDeserializer(result.body);
}

/** Returns ResourceGuards collection belonging to a ResourceGroup. */
export function listResourcesInResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ResourceGuardsListResourcesInResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ResourceGuardResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listResourcesInResourceGroupSend(context, resourceGroupName, options),
    _listResourcesInResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceGuardsName: string,
  options: ResourceGuardsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards/{resourceGuardsName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceGuardsName: resourceGuardsName,
      "api%2Dversion": context.apiVersion,
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
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a ResourceGuard resource from the resource group. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  resourceGuardsName: string,
  options: ResourceGuardsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, resourceGuardsName, options);
  return _$deleteDeserialize(result);
}

export function _patchSend(
  context: Client,
  resourceGroupName: string,
  resourceGuardsName: string,
  parameters: PatchResourceGuardInput,
  options: ResourceGuardsPatchOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards/{resourceGuardsName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceGuardsName: resourceGuardsName,
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
    body: patchResourceGuardInputSerializer(parameters),
  });
}

export async function _patchDeserialize(
  result: PathUncheckedResponse,
): Promise<ResourceGuardResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return resourceGuardResourceDeserializer(result.body);
}

/** Updates a ResourceGuard resource belonging to a resource group. For example, updating tags for a resource. */
export async function patch(
  context: Client,
  resourceGroupName: string,
  resourceGuardsName: string,
  parameters: PatchResourceGuardInput,
  options: ResourceGuardsPatchOptionalParams = { requestOptions: {} },
): Promise<ResourceGuardResource> {
  const result = await _patchSend(
    context,
    resourceGroupName,
    resourceGuardsName,
    parameters,
    options,
  );
  return _patchDeserialize(result);
}

export function _putSend(
  context: Client,
  resourceGroupName: string,
  resourceGuardsName: string,
  parameters: ResourceGuardResource,
  options: ResourceGuardsPutOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards/{resourceGuardsName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceGuardsName: resourceGuardsName,
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
    body: resourceGuardResourceSerializer(parameters),
  });
}

export async function _putDeserialize(
  result: PathUncheckedResponse,
): Promise<ResourceGuardResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return resourceGuardResourceDeserializer(result.body);
}

/** Creates or updates a ResourceGuard resource belonging to a resource group. */
export async function put(
  context: Client,
  resourceGroupName: string,
  resourceGuardsName: string,
  parameters: ResourceGuardResource,
  options: ResourceGuardsPutOptionalParams = { requestOptions: {} },
): Promise<ResourceGuardResource> {
  const result = await _putSend(
    context,
    resourceGroupName,
    resourceGuardsName,
    parameters,
    options,
  );
  return _putDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceGuardsName: string,
  options: ResourceGuardsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards/{resourceGuardsName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceGuardsName: resourceGuardsName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ResourceGuardResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return resourceGuardResourceDeserializer(result.body);
}

/** Returns a ResourceGuard belonging to a resource group. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceGuardsName: string,
  options: ResourceGuardsGetOptionalParams = { requestOptions: {} },
): Promise<ResourceGuardResource> {
  const result = await _getSend(context, resourceGroupName, resourceGuardsName, options);
  return _getDeserialize(result);
}

export function _listDeleteResourceGuardProxyRequestsObjectsSend(
  context: Client,
  resourceGroupName: string,
  resourceGuardsName: string,
  options: ResourceGuardsListDeleteResourceGuardProxyRequestsObjectsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards/{resourceGuardsName}/deleteResourceGuardProxyRequests{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceGuardsName: resourceGuardsName,
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

export async function _listDeleteResourceGuardProxyRequestsObjectsDeserialize(
  result: PathUncheckedResponse,
): Promise<_DppBaseResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _dppBaseResourceListDeserializer(result.body);
}

/** Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource. */
export function listDeleteResourceGuardProxyRequestsObjects(
  context: Client,
  resourceGroupName: string,
  resourceGuardsName: string,
  options: ResourceGuardsListDeleteResourceGuardProxyRequestsObjectsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<DppBaseResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listDeleteResourceGuardProxyRequestsObjectsSend(
        context,
        resourceGroupName,
        resourceGuardsName,
        options,
      ),
    _listDeleteResourceGuardProxyRequestsObjectsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getDefaultDeleteResourceGuardProxyRequestsObjectSend(
  context: Client,
  resourceGroupName: string,
  resourceGuardsName: string,
  requestName: string,
  options: ResourceGuardsGetDefaultDeleteResourceGuardProxyRequestsObjectOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards/{resourceGuardsName}/deleteResourceGuardProxyRequests/{requestName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceGuardsName: resourceGuardsName,
      requestName: requestName,
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

export async function _getDefaultDeleteResourceGuardProxyRequestsObjectDeserialize(
  result: PathUncheckedResponse,
): Promise<DppBaseResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return dppBaseResourceDeserializer(result.body);
}

/** Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource. */
export async function getDefaultDeleteResourceGuardProxyRequestsObject(
  context: Client,
  resourceGroupName: string,
  resourceGuardsName: string,
  requestName: string,
  options: ResourceGuardsGetDefaultDeleteResourceGuardProxyRequestsObjectOptionalParams = {
    requestOptions: {},
  },
): Promise<DppBaseResource> {
  const result = await _getDefaultDeleteResourceGuardProxyRequestsObjectSend(
    context,
    resourceGroupName,
    resourceGuardsName,
    requestName,
    options,
  );
  return _getDefaultDeleteResourceGuardProxyRequestsObjectDeserialize(result);
}
