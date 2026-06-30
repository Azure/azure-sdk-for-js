// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyInsightsContext as Client } from "../index.js";
import type {
  CheckRestrictionsRequest,
  CheckRestrictionsResult,
  CheckManagementGroupRestrictionsRequest,
} from "../../models/policyInsightsApi/models.js";
import {
  errorResponseDeserializer,
  checkRestrictionsRequestSerializer,
  checkRestrictionsResultDeserializer,
  checkManagementGroupRestrictionsRequestSerializer,
} from "../../models/policyInsightsApi/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PolicyRestrictionsCheckAtManagementGroupScopeOptionalParams,
  PolicyRestrictionsCheckAtResourceGroupScopeOptionalParams,
  PolicyRestrictionsCheckAtSubscriptionScopeOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _checkAtManagementGroupScopeSend(
  context: Client,
  managementGroupId: string,
  parameters: CheckManagementGroupRestrictionsRequest,
  options: PolicyRestrictionsCheckAtManagementGroupScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/{managementGroupsNamespace}/managementGroups/{managementGroupId}/providers/Microsoft.PolicyInsights/checkPolicyRestrictions{?api%2Dversion}",
    {
      managementGroupsNamespace: "Microsoft.Management",
      managementGroupId: managementGroupId,
      "api%2Dversion": "2024-10-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: checkManagementGroupRestrictionsRequestSerializer(parameters),
  });
}

export async function _checkAtManagementGroupScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckRestrictionsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return checkRestrictionsResultDeserializer(result.body);
}

/** Checks what restrictions Azure Policy will place on resources within a management group. */
export async function checkAtManagementGroupScope(
  context: Client,
  managementGroupId: string,
  parameters: CheckManagementGroupRestrictionsRequest,
  options: PolicyRestrictionsCheckAtManagementGroupScopeOptionalParams = { requestOptions: {} },
): Promise<CheckRestrictionsResult> {
  const result = await _checkAtManagementGroupScopeSend(
    context,
    managementGroupId,
    parameters,
    options,
  );
  return _checkAtManagementGroupScopeDeserialize(result);
}

export function _checkAtResourceGroupScopeSend(
  context: Client,
  resourceGroupName: string,
  parameters: CheckRestrictionsRequest,
  options: PolicyRestrictionsCheckAtResourceGroupScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PolicyInsights/checkPolicyRestrictions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2024-10-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: checkRestrictionsRequestSerializer(parameters),
  });
}

export async function _checkAtResourceGroupScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckRestrictionsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return checkRestrictionsResultDeserializer(result.body);
}

/** Checks what restrictions Azure Policy will place on a resource within a resource group. Use this when the resource group the resource will be created in is already known. */
export async function checkAtResourceGroupScope(
  context: Client,
  resourceGroupName: string,
  parameters: CheckRestrictionsRequest,
  options: PolicyRestrictionsCheckAtResourceGroupScopeOptionalParams = { requestOptions: {} },
): Promise<CheckRestrictionsResult> {
  const result = await _checkAtResourceGroupScopeSend(
    context,
    resourceGroupName,
    parameters,
    options,
  );
  return _checkAtResourceGroupScopeDeserialize(result);
}

export function _checkAtSubscriptionScopeSend(
  context: Client,
  parameters: CheckRestrictionsRequest,
  options: PolicyRestrictionsCheckAtSubscriptionScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.PolicyInsights/checkPolicyRestrictions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2024-10-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: checkRestrictionsRequestSerializer(parameters),
  });
}

export async function _checkAtSubscriptionScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckRestrictionsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return checkRestrictionsResultDeserializer(result.body);
}

/** Checks what restrictions Azure Policy will place on a resource within a subscription. */
export async function checkAtSubscriptionScope(
  context: Client,
  parameters: CheckRestrictionsRequest,
  options: PolicyRestrictionsCheckAtSubscriptionScopeOptionalParams = { requestOptions: {} },
): Promise<CheckRestrictionsResult> {
  const result = await _checkAtSubscriptionScopeSend(context, parameters, options);
  return _checkAtSubscriptionScopeDeserialize(result);
}
