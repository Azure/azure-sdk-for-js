// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  SignaturesOverrides,
  SignaturesOverridesList,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  signaturesOverridesSerializer,
  signaturesOverridesDeserializer,
  signaturesOverridesListDeserializer,
} from "../../models/microsoft/network/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  FirewallPolicyIdpsSignaturesOverridesListOptionalParams,
  FirewallPolicyIdpsSignaturesOverridesPatchOptionalParams,
  FirewallPolicyIdpsSignaturesOverridesPutOptionalParams,
  FirewallPolicyIdpsSignaturesOverridesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  firewallPolicyName: string,
  options: FirewallPolicyIdpsSignaturesOverridesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}/signatureOverrides{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firewallPolicyName: firewallPolicyName,
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
): Promise<SignaturesOverridesList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return signaturesOverridesListDeserializer(result.body);
}

/** Returns all signatures overrides objects for a specific policy as a list containing a single value. */
export async function list(
  context: Client,
  resourceGroupName: string,
  firewallPolicyName: string,
  options: FirewallPolicyIdpsSignaturesOverridesListOptionalParams = { requestOptions: {} },
): Promise<SignaturesOverridesList> {
  const result = await _listSend(context, resourceGroupName, firewallPolicyName, options);
  return _listDeserialize(result);
}

export function _patchSend(
  context: Client,
  resourceGroupName: string,
  firewallPolicyName: string,
  parameters: SignaturesOverrides,
  options: FirewallPolicyIdpsSignaturesOverridesPatchOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}/signatureOverrides/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firewallPolicyName: firewallPolicyName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: signaturesOverridesSerializer(parameters),
  });
}

export async function _patchDeserialize(
  result: PathUncheckedResponse,
): Promise<SignaturesOverrides> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return signaturesOverridesDeserializer(result.body);
}

/** Will update the status of policy's signature overrides for IDPS */
export async function patch(
  context: Client,
  resourceGroupName: string,
  firewallPolicyName: string,
  parameters: SignaturesOverrides,
  options: FirewallPolicyIdpsSignaturesOverridesPatchOptionalParams = { requestOptions: {} },
): Promise<SignaturesOverrides> {
  const result = await _patchSend(
    context,
    resourceGroupName,
    firewallPolicyName,
    parameters,
    options,
  );
  return _patchDeserialize(result);
}

export function _putSend(
  context: Client,
  resourceGroupName: string,
  firewallPolicyName: string,
  parameters: SignaturesOverrides,
  options: FirewallPolicyIdpsSignaturesOverridesPutOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}/signatureOverrides/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firewallPolicyName: firewallPolicyName,
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
    body: signaturesOverridesSerializer(parameters),
  });
}

export async function _putDeserialize(result: PathUncheckedResponse): Promise<SignaturesOverrides> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return signaturesOverridesDeserializer(result.body);
}

/** Will override/create a new signature overrides for the policy's IDPS */
export async function put(
  context: Client,
  resourceGroupName: string,
  firewallPolicyName: string,
  parameters: SignaturesOverrides,
  options: FirewallPolicyIdpsSignaturesOverridesPutOptionalParams = { requestOptions: {} },
): Promise<SignaturesOverrides> {
  const result = await _putSend(
    context,
    resourceGroupName,
    firewallPolicyName,
    parameters,
    options,
  );
  return _putDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  firewallPolicyName: string,
  options: FirewallPolicyIdpsSignaturesOverridesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}/signatureOverrides/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firewallPolicyName: firewallPolicyName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SignaturesOverrides> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return signaturesOverridesDeserializer(result.body);
}

/** Returns all signatures overrides for a specific policy. */
export async function get(
  context: Client,
  resourceGroupName: string,
  firewallPolicyName: string,
  options: FirewallPolicyIdpsSignaturesOverridesGetOptionalParams = { requestOptions: {} },
): Promise<SignaturesOverrides> {
  const result = await _getSend(context, resourceGroupName, firewallPolicyName, options);
  return _getDeserialize(result);
}
