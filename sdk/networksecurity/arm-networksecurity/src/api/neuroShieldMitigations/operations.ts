// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkSecurityManagementContext as Client } from "../index.js";
import type {
  NeuroShieldMitigation,
  _NeuroShieldMitigationListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  neuroShieldMitigationDeserializer,
  _neuroShieldMitigationListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NeuroShieldMitigationsRollbackOptionalParams,
  NeuroShieldMitigationsExecuteOptionalParams,
  NeuroShieldMitigationsListByNeuroShieldOptionalParams,
  NeuroShieldMitigationsListOptionalParams,
  NeuroShieldMitigationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _rollbackSend(
  context: Client,
  resourceGroupName: string,
  neuroShieldName: string,
  protectedResourceName: string,
  mitigationId: string,
  options: NeuroShieldMitigationsRollbackOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/neuroShields/{neuroShieldName}/protectedResources/{protectedResourceName}/mitigations/{mitigationId}/rollback{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      neuroShieldName: neuroShieldName,
      protectedResourceName: protectedResourceName,
      mitigationId: mitigationId,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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

export async function _rollbackDeserialize(
  result: PathUncheckedResponse,
): Promise<NeuroShieldMitigation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return neuroShieldMitigationDeserializer(result.body);
}

/** Rolls back a mitigation when rollback is available. */
export async function rollback(
  context: Client,
  resourceGroupName: string,
  neuroShieldName: string,
  protectedResourceName: string,
  mitigationId: string,
  options: NeuroShieldMitigationsRollbackOptionalParams = { requestOptions: {} },
): Promise<NeuroShieldMitigation> {
  const result = await _rollbackSend(
    context,
    resourceGroupName,
    neuroShieldName,
    protectedResourceName,
    mitigationId,
    options,
  );
  return _rollbackDeserialize(result);
}

export function _executeSend(
  context: Client,
  resourceGroupName: string,
  neuroShieldName: string,
  protectedResourceName: string,
  mitigationId: string,
  options: NeuroShieldMitigationsExecuteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/neuroShields/{neuroShieldName}/protectedResources/{protectedResourceName}/mitigations/{mitigationId}/execute{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      neuroShieldName: neuroShieldName,
      protectedResourceName: protectedResourceName,
      mitigationId: mitigationId,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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

export async function _executeDeserialize(
  result: PathUncheckedResponse,
): Promise<NeuroShieldMitigation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return neuroShieldMitigationDeserializer(result.body);
}

/** Approves and queues a mitigation for execution. */
export async function execute(
  context: Client,
  resourceGroupName: string,
  neuroShieldName: string,
  protectedResourceName: string,
  mitigationId: string,
  options: NeuroShieldMitigationsExecuteOptionalParams = { requestOptions: {} },
): Promise<NeuroShieldMitigation> {
  const result = await _executeSend(
    context,
    resourceGroupName,
    neuroShieldName,
    protectedResourceName,
    mitigationId,
    options,
  );
  return _executeDeserialize(result);
}

export function _listByNeuroShieldSend(
  context: Client,
  resourceGroupName: string,
  neuroShieldName: string,
  options: NeuroShieldMitigationsListByNeuroShieldOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/neuroShields/{neuroShieldName}/mitigations{?api%2Dversion,%24top,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      neuroShieldName: neuroShieldName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
      "%24top": options?.top,
      "%24skipToken": options?.skipToken,
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

export async function _listByNeuroShieldDeserialize(
  result: PathUncheckedResponse,
): Promise<_NeuroShieldMitigationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _neuroShieldMitigationListResultDeserializer(result.body);
}

/** Lists mitigations across all protected resources under a NeuroShield resource. */
export function listByNeuroShield(
  context: Client,
  resourceGroupName: string,
  neuroShieldName: string,
  options: NeuroShieldMitigationsListByNeuroShieldOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NeuroShieldMitigation> {
  return buildPagedAsyncIterator(
    context,
    () => _listByNeuroShieldSend(context, resourceGroupName, neuroShieldName, options),
    _listByNeuroShieldDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-10-01-preview",
    },
  );
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  neuroShieldName: string,
  protectedResourceName: string,
  options: NeuroShieldMitigationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/neuroShields/{neuroShieldName}/protectedResources/{protectedResourceName}/mitigations{?api%2Dversion,%24top,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      neuroShieldName: neuroShieldName,
      protectedResourceName: protectedResourceName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
      "%24top": options?.top,
      "%24skipToken": options?.skipToken,
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
): Promise<_NeuroShieldMitigationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _neuroShieldMitigationListResultDeserializer(result.body);
}

/** Lists mitigations under a protected resource. */
export function list(
  context: Client,
  resourceGroupName: string,
  neuroShieldName: string,
  protectedResourceName: string,
  options: NeuroShieldMitigationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NeuroShieldMitigation> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, neuroShieldName, protectedResourceName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-10-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  neuroShieldName: string,
  protectedResourceName: string,
  mitigationId: string,
  options: NeuroShieldMitigationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/neuroShields/{neuroShieldName}/protectedResources/{protectedResourceName}/mitigations/{mitigationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      neuroShieldName: neuroShieldName,
      protectedResourceName: protectedResourceName,
      mitigationId: mitigationId,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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
): Promise<NeuroShieldMitigation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return neuroShieldMitigationDeserializer(result.body);
}

/** Gets a mitigation under a protected resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  neuroShieldName: string,
  protectedResourceName: string,
  mitigationId: string,
  options: NeuroShieldMitigationsGetOptionalParams = { requestOptions: {} },
): Promise<NeuroShieldMitigation> {
  const result = await _getSend(
    context,
    resourceGroupName,
    neuroShieldName,
    protectedResourceName,
    mitigationId,
    options,
  );
  return _getDeserialize(result);
}
