// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResourceManagementContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  _ProviderListResult,
  _providerListResultDeserializer,
  Provider,
  providerDeserializer,
  ProviderPermissionListResult,
  providerPermissionListResultDeserializer,
  providerRegistrationRequestSerializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ProvidersGetAtTenantScopeOptionalParams,
  ProvidersGetOptionalParams,
  ProvidersListOptionalParams,
  ProvidersRegisterOptionalParams,
  ProvidersProviderPermissionsOptionalParams,
  ProvidersRegisterAtManagementGroupScopeOptionalParams,
  ProvidersUnregisterOptionalParams,
  ProvidersListAtTenantScopeOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getAtTenantScopeSend(
  context: Client,
  resourceProviderNamespace: string,
  options: ProvidersGetAtTenantScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/{resourceProviderNamespace}{?api%2Dversion,%24expand}",
    {
      resourceProviderNamespace: resourceProviderNamespace,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
      "%24expand": options?.expand,
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

export async function _getAtTenantScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<Provider> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return providerDeserializer(result.body);
}

/** Gets the specified resource provider at the tenant level. */
export async function getAtTenantScope(
  context: Client,
  resourceProviderNamespace: string,
  options: ProvidersGetAtTenantScopeOptionalParams = { requestOptions: {} },
): Promise<Provider> {
  const result = await _getAtTenantScopeSend(context, resourceProviderNamespace, options);
  return _getAtTenantScopeDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceProviderNamespace: string,
  options: ProvidersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/{resourceProviderNamespace}{?api%2Dversion,%24expand}",
    {
      resourceProviderNamespace: resourceProviderNamespace,
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
      "%24expand": options?.expand,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Provider> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return providerDeserializer(result.body);
}

/** Gets the specified resource provider. */
export async function get(
  context: Client,
  resourceProviderNamespace: string,
  options: ProvidersGetOptionalParams = { requestOptions: {} },
): Promise<Provider> {
  const result = await _getSend(context, resourceProviderNamespace, options);
  return _getDeserialize(result);
}

export function _listSend(
  context: Client,
  options: ProvidersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
      "%24expand": options?.expand,
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
): Promise<_ProviderListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _providerListResultDeserializer(result.body);
}

/** Gets all resource providers for a subscription. */
export function list(
  context: Client,
  options: ProvidersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Provider> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-04-01" },
  );
}

export function _registerSend(
  context: Client,
  resourceProviderNamespace: string,
  options: ProvidersRegisterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/{resourceProviderNamespace}/register{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceProviderNamespace: resourceProviderNamespace,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["properties"]
      ? options["properties"]
      : providerRegistrationRequestSerializer(options["properties"]),
  });
}

export async function _registerDeserialize(result: PathUncheckedResponse): Promise<Provider> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return providerDeserializer(result.body);
}

/** Registers a subscription with a resource provider. */
export async function register(
  context: Client,
  resourceProviderNamespace: string,
  options: ProvidersRegisterOptionalParams = { requestOptions: {} },
): Promise<Provider> {
  const result = await _registerSend(context, resourceProviderNamespace, options);
  return _registerDeserialize(result);
}

export function _providerPermissionsSend(
  context: Client,
  resourceProviderNamespace: string,
  options: ProvidersProviderPermissionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/{resourceProviderNamespace}/providerPermissions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceProviderNamespace: resourceProviderNamespace,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
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

export async function _providerPermissionsDeserialize(
  result: PathUncheckedResponse,
): Promise<ProviderPermissionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return providerPermissionListResultDeserializer(result.body);
}

/** Get the provider permissions. */
export async function providerPermissions(
  context: Client,
  resourceProviderNamespace: string,
  options: ProvidersProviderPermissionsOptionalParams = { requestOptions: {} },
): Promise<ProviderPermissionListResult> {
  const result = await _providerPermissionsSend(context, resourceProviderNamespace, options);
  return _providerPermissionsDeserialize(result);
}

export function _registerAtManagementGroupScopeSend(
  context: Client,
  resourceProviderNamespace: string,
  groupId: string,
  options: ProvidersRegisterAtManagementGroupScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{groupId}/providers/{resourceProviderNamespace}/register{?api%2Dversion}",
    {
      resourceProviderNamespace: resourceProviderNamespace,
      groupId: groupId,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _registerAtManagementGroupScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Registers a management group with a resource provider. Use this operation to register a resource provider with resource types that can be deployed at the management group scope. It does not recursively register subscriptions within the management group. Instead, you must register subscriptions individually. */
export async function registerAtManagementGroupScope(
  context: Client,
  resourceProviderNamespace: string,
  groupId: string,
  options: ProvidersRegisterAtManagementGroupScopeOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _registerAtManagementGroupScopeSend(
    context,
    resourceProviderNamespace,
    groupId,
    options,
  );
  return _registerAtManagementGroupScopeDeserialize(result);
}

export function _unregisterSend(
  context: Client,
  resourceProviderNamespace: string,
  options: ProvidersUnregisterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/{resourceProviderNamespace}/unregister{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceProviderNamespace: resourceProviderNamespace,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _unregisterDeserialize(result: PathUncheckedResponse): Promise<Provider> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return providerDeserializer(result.body);
}

/** Unregisters a subscription from a resource provider. */
export async function unregister(
  context: Client,
  resourceProviderNamespace: string,
  options: ProvidersUnregisterOptionalParams = { requestOptions: {} },
): Promise<Provider> {
  const result = await _unregisterSend(context, resourceProviderNamespace, options);
  return _unregisterDeserialize(result);
}

export function _listAtTenantScopeSend(
  context: Client,
  options: ProvidersListAtTenantScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers{?api%2Dversion,%24expand}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
      "%24expand": options?.expand,
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

export async function _listAtTenantScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<_ProviderListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _providerListResultDeserializer(result.body);
}

/** Gets all resource providers for the tenant. */
export function listAtTenantScope(
  context: Client,
  options: ProvidersListAtTenantScopeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Provider> {
  return buildPagedAsyncIterator(
    context,
    () => _listAtTenantScopeSend(context, options),
    _listAtTenantScopeDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-04-01" },
  );
}
