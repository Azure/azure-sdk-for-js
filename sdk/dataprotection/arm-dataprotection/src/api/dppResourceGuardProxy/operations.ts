// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext as Client } from "../index.js";
import type {
  ResourceGuardProxyBaseResource,
  _ResourceGuardProxyBaseResourceList,
  UnlockDeleteRequest,
  UnlockDeleteResponse,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  resourceGuardProxyBaseResourceSerializer,
  resourceGuardProxyBaseResourceDeserializer,
  _resourceGuardProxyBaseResourceListDeserializer,
  unlockDeleteRequestSerializer,
  unlockDeleteResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DppResourceGuardProxyUnlockDeleteOptionalParams,
  DppResourceGuardProxyListOptionalParams,
  DppResourceGuardProxyDeleteOptionalParams,
  DppResourceGuardProxyCreateOrUpdateOptionalParams,
  DppResourceGuardProxyGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _unlockDeleteSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  resourceGuardProxyName: string,
  parameters: UnlockDeleteRequest,
  options: DppResourceGuardProxyUnlockDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupResourceGuardProxies/{resourceGuardProxyName}/unlockDelete{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      resourceGuardProxyName: resourceGuardProxyName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.xMsAuthorizationAuxiliary !== undefined
        ? {
            "x-ms-authorization-auxiliary": options?.xMsAuthorizationAuxiliary,
          }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: unlockDeleteRequestSerializer(parameters),
  });
}

export async function _unlockDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<UnlockDeleteResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return unlockDeleteResponseDeserializer(result.body);
}

/** UnlockDelete call for ResourceGuardProxy, executed before one can delete it */
export async function unlockDelete(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  resourceGuardProxyName: string,
  parameters: UnlockDeleteRequest,
  options: DppResourceGuardProxyUnlockDeleteOptionalParams = {
    requestOptions: {},
  },
): Promise<UnlockDeleteResponse> {
  const result = await _unlockDeleteSend(
    context,
    resourceGroupName,
    vaultName,
    resourceGuardProxyName,
    parameters,
    options,
  );
  return _unlockDeleteDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: DppResourceGuardProxyListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupResourceGuardProxies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ResourceGuardProxyBaseResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _resourceGuardProxyBaseResourceListDeserializer(result.body);
}

/** Returns the list of ResourceGuardProxies associated with the vault */
export function list(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: DppResourceGuardProxyListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ResourceGuardProxyBaseResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, vaultName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  resourceGuardProxyName: string,
  options: DppResourceGuardProxyDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupResourceGuardProxies/{resourceGuardProxyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      resourceGuardProxyName: resourceGuardProxyName,
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

/** Deletes the ResourceGuardProxy */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  resourceGuardProxyName: string,
  options: DppResourceGuardProxyDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    vaultName,
    resourceGuardProxyName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  resourceGuardProxyName: string,
  parameters: ResourceGuardProxyBaseResource,
  options: DppResourceGuardProxyCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupResourceGuardProxies/{resourceGuardProxyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      resourceGuardProxyName: resourceGuardProxyName,
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
    body: resourceGuardProxyBaseResourceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ResourceGuardProxyBaseResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return resourceGuardProxyBaseResourceDeserializer(result.body);
}

/** Creates or Updates a ResourceGuardProxy */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  resourceGuardProxyName: string,
  parameters: ResourceGuardProxyBaseResource,
  options: DppResourceGuardProxyCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<ResourceGuardProxyBaseResource> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    vaultName,
    resourceGuardProxyName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  resourceGuardProxyName: string,
  options: DppResourceGuardProxyGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupResourceGuardProxies/{resourceGuardProxyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      resourceGuardProxyName: resourceGuardProxyName,
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
): Promise<ResourceGuardProxyBaseResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return resourceGuardProxyBaseResourceDeserializer(result.body);
}

/** Returns the ResourceGuardProxy object associated with the vault, and that matches the name in the request */
export async function get(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  resourceGuardProxyName: string,
  options: DppResourceGuardProxyGetOptionalParams = { requestOptions: {} },
): Promise<ResourceGuardProxyBaseResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    vaultName,
    resourceGuardProxyName,
    options,
  );
  return _getDeserialize(result);
}
