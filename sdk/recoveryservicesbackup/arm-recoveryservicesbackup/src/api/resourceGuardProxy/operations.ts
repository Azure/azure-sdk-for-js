// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext as Client } from "../index.js";
import type {
  ResourceGuardProxyBaseResource,
  UnlockDeleteRequest,
  UnlockDeleteResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  resourceGuardProxyBaseResourceSerializer,
  resourceGuardProxyBaseResourceDeserializer,
  unlockDeleteRequestSerializer,
  unlockDeleteResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ResourceGuardProxyUnlockDeleteOptionalParams,
  ResourceGuardProxyDeleteOptionalParams,
  ResourceGuardProxyPutOptionalParams,
  ResourceGuardProxyGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _unlockDeleteSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  resourceGuardProxyName: string,
  parameters: UnlockDeleteRequest,
  options: ResourceGuardProxyUnlockDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupResourceGuardProxies/{resourceGuardProxyName}/unlockDelete{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      resourceGuardProxyName: resourceGuardProxyName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: unlockDeleteRequestSerializer(parameters),
  });
}

export async function _unlockDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<UnlockDeleteResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return unlockDeleteResponseDeserializer(result.body);
}

/** Secures delete ResourceGuardProxy operations. */
export async function unlockDelete(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  resourceGuardProxyName: string,
  parameters: UnlockDeleteRequest,
  options: ResourceGuardProxyUnlockDeleteOptionalParams = { requestOptions: {} },
): Promise<UnlockDeleteResponse> {
  const result = await _unlockDeleteSend(
    context,
    vaultName,
    resourceGroupName,
    resourceGuardProxyName,
    parameters,
    options,
  );
  return _unlockDeleteDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  resourceGuardProxyName: string,
  options: ResourceGuardProxyDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupResourceGuardProxies/{resourceGuardProxyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      resourceGuardProxyName: resourceGuardProxyName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete ResourceGuardProxy under vault */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  resourceGuardProxyName: string,
  options: ResourceGuardProxyDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    vaultName,
    resourceGroupName,
    resourceGuardProxyName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _putSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  resourceGuardProxyName: string,
  parameters: ResourceGuardProxyBaseResource,
  options: ResourceGuardProxyPutOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupResourceGuardProxies/{resourceGuardProxyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      resourceGuardProxyName: resourceGuardProxyName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: resourceGuardProxyBaseResourceSerializer(parameters),
  });
}

export async function _putDeserialize(
  result: PathUncheckedResponse,
): Promise<ResourceGuardProxyBaseResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return resourceGuardProxyBaseResourceDeserializer(result.body);
}

/**
 * Add or Update ResourceGuardProxy under vault
 * Secures vault critical operations
 */
export async function put(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  resourceGuardProxyName: string,
  parameters: ResourceGuardProxyBaseResource,
  options: ResourceGuardProxyPutOptionalParams = { requestOptions: {} },
): Promise<ResourceGuardProxyBaseResource> {
  const result = await _putSend(
    context,
    vaultName,
    resourceGroupName,
    resourceGuardProxyName,
    parameters,
    options,
  );
  return _putDeserialize(result);
}

export function _getSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  resourceGuardProxyName: string,
  options: ResourceGuardProxyGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupResourceGuardProxies/{resourceGuardProxyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      resourceGuardProxyName: resourceGuardProxyName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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
): Promise<ResourceGuardProxyBaseResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return resourceGuardProxyBaseResourceDeserializer(result.body);
}

/** Returns ResourceGuardProxy under vault and with the name referenced in request */
export async function get(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  resourceGuardProxyName: string,
  options: ResourceGuardProxyGetOptionalParams = { requestOptions: {} },
): Promise<ResourceGuardProxyBaseResource> {
  const result = await _getSend(
    context,
    vaultName,
    resourceGroupName,
    resourceGuardProxyName,
    options,
  );
  return _getDeserialize(result);
}
