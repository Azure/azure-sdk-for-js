// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type { SecurityRule } from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  securityRuleDeserializer,
} from "../../models/microsoft/network/models.js";
import type { _SecurityRuleListResult } from "../../models/models.js";
import { _securityRuleListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DefaultSecurityRulesListOptionalParams,
  DefaultSecurityRulesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  networkSecurityGroupName: string,
  options: DefaultSecurityRulesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityGroups/{networkSecurityGroupName}/defaultSecurityRules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkSecurityGroupName: networkSecurityGroupName,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_SecurityRuleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _securityRuleListResultDeserializer(result.body);
}

/** Gets all default security rules in a network security group. */
export function list(
  context: Client,
  resourceGroupName: string,
  networkSecurityGroupName: string,
  options: DefaultSecurityRulesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecurityRule> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, networkSecurityGroupName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  networkSecurityGroupName: string,
  defaultSecurityRuleName: string,
  options: DefaultSecurityRulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityGroups/{networkSecurityGroupName}/defaultSecurityRules/{defaultSecurityRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkSecurityGroupName: networkSecurityGroupName,
      defaultSecurityRuleName: defaultSecurityRuleName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SecurityRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return securityRuleDeserializer(result.body);
}

/** Get the specified default network security rule. */
export async function get(
  context: Client,
  resourceGroupName: string,
  networkSecurityGroupName: string,
  defaultSecurityRuleName: string,
  options: DefaultSecurityRulesGetOptionalParams = { requestOptions: {} },
): Promise<SecurityRule> {
  const result = await _getSend(
    context,
    resourceGroupName,
    networkSecurityGroupName,
    defaultSecurityRuleName,
    options,
  );
  return _getDeserialize(result);
}
