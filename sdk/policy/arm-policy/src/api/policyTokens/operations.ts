// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyContext as Client } from "../index.js";
import type { PolicyTokenRequest, PolicyTokenResponse } from "../../models/models.js";
import {
  errorResponseDeserializer,
  policyTokenRequestSerializer,
  policyTokenResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PolicyTokensAcquireAtManagementGroupOptionalParams,
  PolicyTokensAcquireOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _acquireAtManagementGroupSend(
  context: Client,
  managementGroupName: string,
  parameters: PolicyTokenRequest,
  options: PolicyTokensAcquireAtManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupName}/providers/Microsoft.Authorization/acquirePolicyToken{?api%2Dversion}",
    {
      managementGroupName: managementGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: policyTokenRequestSerializer(parameters),
  });
}

export async function _acquireAtManagementGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<PolicyTokenResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return policyTokenResponseDeserializer(result.body);
}

/** This operation acquires a policy token in the given management group for the given request body. */
export async function acquireAtManagementGroup(
  context: Client,
  managementGroupName: string,
  parameters: PolicyTokenRequest,
  options: PolicyTokensAcquireAtManagementGroupOptionalParams = { requestOptions: {} },
): Promise<PolicyTokenResponse> {
  const result = await _acquireAtManagementGroupSend(
    context,
    managementGroupName,
    parameters,
    options,
  );
  return _acquireAtManagementGroupDeserialize(result);
}

export function _acquireSend(
  context: Client,
  parameters: PolicyTokenRequest,
  options: PolicyTokensAcquireOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/acquirePolicyToken{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: policyTokenRequestSerializer(parameters),
  });
}

export async function _acquireDeserialize(
  result: PathUncheckedResponse,
): Promise<PolicyTokenResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return policyTokenResponseDeserializer(result.body);
}

/** This operation acquires a policy token in the given subscription for the given request body. */
export async function acquire(
  context: Client,
  parameters: PolicyTokenRequest,
  options: PolicyTokensAcquireOptionalParams = { requestOptions: {} },
): Promise<PolicyTokenResponse> {
  const result = await _acquireSend(context, parameters, options);
  return _acquireDeserialize(result);
}
