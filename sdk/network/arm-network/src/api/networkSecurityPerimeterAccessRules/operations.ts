// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type { NspAccessRule } from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  nspAccessRuleSerializer,
  nspAccessRuleDeserializer,
} from "../../models/microsoft/network/models.js";
import type {
  _NspAccessRuleListResult,
  NetworkSecurityPerimeterAccessRulesReconcileResponse,
} from "../../models/models.js";
import { _nspAccessRuleListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NetworkSecurityPerimeterAccessRulesReconcileOptionalParams,
  NetworkSecurityPerimeterAccessRulesListOptionalParams,
  NetworkSecurityPerimeterAccessRulesDeleteOptionalParams,
  NetworkSecurityPerimeterAccessRulesCreateOrUpdateOptionalParams,
  NetworkSecurityPerimeterAccessRulesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _reconcileSend(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  profileName: string,
  accessRuleName: string,
  parameters: any,
  options: NetworkSecurityPerimeterAccessRulesReconcileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityPerimeters/{networkSecurityPerimeterName}/profiles/{profileName}/accessRules/{accessRuleName}/reconcile{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkSecurityPerimeterName: networkSecurityPerimeterName,
      profileName: profileName,
      accessRuleName: accessRuleName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: parameters,
  });
}

export async function _reconcileDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkSecurityPerimeterAccessRulesReconcileResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return { body: result.body };
}

/** Reconcile NSP access rules */
export async function reconcile(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  profileName: string,
  accessRuleName: string,
  parameters: any,
  options: NetworkSecurityPerimeterAccessRulesReconcileOptionalParams = { requestOptions: {} },
): Promise<NetworkSecurityPerimeterAccessRulesReconcileResponse> {
  const result = await _reconcileSend(
    context,
    resourceGroupName,
    networkSecurityPerimeterName,
    profileName,
    accessRuleName,
    parameters,
    options,
  );
  return _reconcileDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  profileName: string,
  options: NetworkSecurityPerimeterAccessRulesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityPerimeters/{networkSecurityPerimeterName}/profiles/{profileName}/accessRules{?api%2Dversion,%24top,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkSecurityPerimeterName: networkSecurityPerimeterName,
      profileName: profileName,
      "api%2Dversion": "2025-05-01",
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
): Promise<_NspAccessRuleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _nspAccessRuleListResultDeserializer(result.body);
}

/** Lists the NSP access rules in the specified NSP profile. */
export function list(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  profileName: string,
  options: NetworkSecurityPerimeterAccessRulesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NspAccessRule> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, networkSecurityPerimeterName, profileName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  profileName: string,
  accessRuleName: string,
  options: NetworkSecurityPerimeterAccessRulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityPerimeters/{networkSecurityPerimeterName}/profiles/{profileName}/accessRules/{accessRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkSecurityPerimeterName: networkSecurityPerimeterName,
      profileName: profileName,
      accessRuleName: accessRuleName,
      "api%2Dversion": "2025-05-01",
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

/** Deletes an NSP access rule. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  profileName: string,
  accessRuleName: string,
  options: NetworkSecurityPerimeterAccessRulesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    networkSecurityPerimeterName,
    profileName,
    accessRuleName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  profileName: string,
  accessRuleName: string,
  parameters: NspAccessRule,
  options: NetworkSecurityPerimeterAccessRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityPerimeters/{networkSecurityPerimeterName}/profiles/{profileName}/accessRules/{accessRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkSecurityPerimeterName: networkSecurityPerimeterName,
      profileName: profileName,
      accessRuleName: accessRuleName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: nspAccessRuleSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<NspAccessRule> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return nspAccessRuleDeserializer(result.body);
}

/** Creates or updates a network access rule. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  profileName: string,
  accessRuleName: string,
  parameters: NspAccessRule,
  options: NetworkSecurityPerimeterAccessRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<NspAccessRule> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    networkSecurityPerimeterName,
    profileName,
    accessRuleName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  profileName: string,
  accessRuleName: string,
  options: NetworkSecurityPerimeterAccessRulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityPerimeters/{networkSecurityPerimeterName}/profiles/{profileName}/accessRules/{accessRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkSecurityPerimeterName: networkSecurityPerimeterName,
      profileName: profileName,
      accessRuleName: accessRuleName,
      "api%2Dversion": "2025-05-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<NspAccessRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return nspAccessRuleDeserializer(result.body);
}

/** Gets the specified NSP access rule by name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  profileName: string,
  accessRuleName: string,
  options: NetworkSecurityPerimeterAccessRulesGetOptionalParams = { requestOptions: {} },
): Promise<NspAccessRule> {
  const result = await _getSend(
    context,
    resourceGroupName,
    networkSecurityPerimeterName,
    profileName,
    accessRuleName,
    options,
  );
  return _getDeserialize(result);
}
