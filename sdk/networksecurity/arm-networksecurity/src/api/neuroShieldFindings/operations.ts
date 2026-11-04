// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkSecurityManagementContext as Client } from "../index.js";
import type {
  NeuroShieldFinding,
  _NeuroShieldFindingListResult,
  NeuroShieldMitigationActionResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  neuroShieldFindingDeserializer,
  _neuroShieldFindingListResultDeserializer,
  neuroShieldMitigationActionResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NeuroShieldFindingsRollbackOptionalParams,
  NeuroShieldFindingsMitigateOptionalParams,
  NeuroShieldFindingsListByNeuroShieldOptionalParams,
  NeuroShieldFindingsListOptionalParams,
  NeuroShieldFindingsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _rollbackSend(
  context: Client,
  resourceGroupName: string,
  neuroShieldName: string,
  protectedResourceName: string,
  findingId: string,
  options: NeuroShieldFindingsRollbackOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/neuroShields/{neuroShieldName}/protectedResources/{protectedResourceName}/findings/{findingId}/rollback{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      neuroShieldName: neuroShieldName,
      protectedResourceName: protectedResourceName,
      findingId: findingId,
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
): Promise<NeuroShieldMitigationActionResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return neuroShieldMitigationActionResultDeserializer(result.body);
}

/** Rolls back succeeded rollbackable mitigations under a finding. */
export async function rollback(
  context: Client,
  resourceGroupName: string,
  neuroShieldName: string,
  protectedResourceName: string,
  findingId: string,
  options: NeuroShieldFindingsRollbackOptionalParams = { requestOptions: {} },
): Promise<NeuroShieldMitigationActionResult> {
  const result = await _rollbackSend(
    context,
    resourceGroupName,
    neuroShieldName,
    protectedResourceName,
    findingId,
    options,
  );
  return _rollbackDeserialize(result);
}

export function _mitigateSend(
  context: Client,
  resourceGroupName: string,
  neuroShieldName: string,
  protectedResourceName: string,
  findingId: string,
  options: NeuroShieldFindingsMitigateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/neuroShields/{neuroShieldName}/protectedResources/{protectedResourceName}/findings/{findingId}/mitigate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      neuroShieldName: neuroShieldName,
      protectedResourceName: protectedResourceName,
      findingId: findingId,
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

export async function _mitigateDeserialize(
  result: PathUncheckedResponse,
): Promise<NeuroShieldMitigationActionResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return neuroShieldMitigationActionResultDeserializer(result.body);
}

/** Triggers mitigation for all awaiting-approval mitigations under a finding. */
export async function mitigate(
  context: Client,
  resourceGroupName: string,
  neuroShieldName: string,
  protectedResourceName: string,
  findingId: string,
  options: NeuroShieldFindingsMitigateOptionalParams = { requestOptions: {} },
): Promise<NeuroShieldMitigationActionResult> {
  const result = await _mitigateSend(
    context,
    resourceGroupName,
    neuroShieldName,
    protectedResourceName,
    findingId,
    options,
  );
  return _mitigateDeserialize(result);
}

export function _listByNeuroShieldSend(
  context: Client,
  resourceGroupName: string,
  neuroShieldName: string,
  options: NeuroShieldFindingsListByNeuroShieldOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/neuroShields/{neuroShieldName}/findings{?api%2Dversion,%24top,%24skipToken}",
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
): Promise<_NeuroShieldFindingListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _neuroShieldFindingListResultDeserializer(result.body);
}

/** Lists findings across all protected resources under a NeuroShield resource. */
export function listByNeuroShield(
  context: Client,
  resourceGroupName: string,
  neuroShieldName: string,
  options: NeuroShieldFindingsListByNeuroShieldOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NeuroShieldFinding> {
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
  options: NeuroShieldFindingsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/neuroShields/{neuroShieldName}/protectedResources/{protectedResourceName}/findings{?api%2Dversion,%24top,%24skipToken}",
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
): Promise<_NeuroShieldFindingListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _neuroShieldFindingListResultDeserializer(result.body);
}

/** Lists findings under a protected resource. */
export function list(
  context: Client,
  resourceGroupName: string,
  neuroShieldName: string,
  protectedResourceName: string,
  options: NeuroShieldFindingsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NeuroShieldFinding> {
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
  findingId: string,
  options: NeuroShieldFindingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/neuroShields/{neuroShieldName}/protectedResources/{protectedResourceName}/findings/{findingId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      neuroShieldName: neuroShieldName,
      protectedResourceName: protectedResourceName,
      findingId: findingId,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<NeuroShieldFinding> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return neuroShieldFindingDeserializer(result.body);
}

/** Gets a finding under a protected resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  neuroShieldName: string,
  protectedResourceName: string,
  findingId: string,
  options: NeuroShieldFindingsGetOptionalParams = { requestOptions: {} },
): Promise<NeuroShieldFinding> {
  const result = await _getSend(
    context,
    resourceGroupName,
    neuroShieldName,
    protectedResourceName,
    findingId,
    options,
  );
  return _getDeserialize(result);
}
