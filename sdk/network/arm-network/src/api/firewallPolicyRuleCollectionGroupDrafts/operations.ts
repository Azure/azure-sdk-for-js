// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type { FirewallPolicyRuleCollectionGroupDraft } from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  firewallPolicyRuleCollectionGroupDraftSerializer,
  firewallPolicyRuleCollectionGroupDraftDeserializer,
} from "../../models/microsoft/network/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  FirewallPolicyRuleCollectionGroupDraftsDeleteOptionalParams,
  FirewallPolicyRuleCollectionGroupDraftsCreateOrUpdateOptionalParams,
  FirewallPolicyRuleCollectionGroupDraftsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  firewallPolicyName: string,
  ruleCollectionGroupName: string,
  options: FirewallPolicyRuleCollectionGroupDraftsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}/ruleCollectionGroups/{ruleCollectionGroupName}/ruleCollectionGroupDrafts/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firewallPolicyName: firewallPolicyName,
      ruleCollectionGroupName: ruleCollectionGroupName,
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

/** Delete Rule Collection Group Draft. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  firewallPolicyName: string,
  ruleCollectionGroupName: string,
  options: FirewallPolicyRuleCollectionGroupDraftsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    firewallPolicyName,
    ruleCollectionGroupName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  firewallPolicyName: string,
  ruleCollectionGroupName: string,
  parameters: FirewallPolicyRuleCollectionGroupDraft,
  options: FirewallPolicyRuleCollectionGroupDraftsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}/ruleCollectionGroups/{ruleCollectionGroupName}/ruleCollectionGroupDrafts/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firewallPolicyName: firewallPolicyName,
      ruleCollectionGroupName: ruleCollectionGroupName,
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
    body: firewallPolicyRuleCollectionGroupDraftSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<FirewallPolicyRuleCollectionGroupDraft> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return firewallPolicyRuleCollectionGroupDraftDeserializer(result.body);
}

/** Create or Update Rule Collection Group Draft. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  firewallPolicyName: string,
  ruleCollectionGroupName: string,
  parameters: FirewallPolicyRuleCollectionGroupDraft,
  options: FirewallPolicyRuleCollectionGroupDraftsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<FirewallPolicyRuleCollectionGroupDraft> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    firewallPolicyName,
    ruleCollectionGroupName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  firewallPolicyName: string,
  ruleCollectionGroupName: string,
  options: FirewallPolicyRuleCollectionGroupDraftsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}/ruleCollectionGroups/{ruleCollectionGroupName}/ruleCollectionGroupDrafts/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firewallPolicyName: firewallPolicyName,
      ruleCollectionGroupName: ruleCollectionGroupName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<FirewallPolicyRuleCollectionGroupDraft> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return firewallPolicyRuleCollectionGroupDraftDeserializer(result.body);
}

/** Get Rule Collection Group Draft. */
export async function get(
  context: Client,
  resourceGroupName: string,
  firewallPolicyName: string,
  ruleCollectionGroupName: string,
  options: FirewallPolicyRuleCollectionGroupDraftsGetOptionalParams = { requestOptions: {} },
): Promise<FirewallPolicyRuleCollectionGroupDraft> {
  const result = await _getSend(
    context,
    resourceGroupName,
    firewallPolicyName,
    ruleCollectionGroupName,
    options,
  );
  return _getDeserialize(result);
}
