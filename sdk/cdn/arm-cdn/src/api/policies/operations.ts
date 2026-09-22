// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext as Client } from "../index.js";
import type {
  CdnWebApplicationFirewallPolicy,
  CdnWebApplicationFirewallPolicyPatchParameters,
  _CdnWebApplicationFirewallPolicyList,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  cdnWebApplicationFirewallPolicySerializer,
  cdnWebApplicationFirewallPolicyDeserializer,
  cdnWebApplicationFirewallPolicyPatchParametersSerializer,
  _cdnWebApplicationFirewallPolicyListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PoliciesListOptionalParams,
  PoliciesDeleteOptionalParams,
  PoliciesUpdateOptionalParams,
  PoliciesCreateOrUpdateOptionalParams,
  PoliciesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  options: PoliciesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/cdnWebApplicationFirewallPolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
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
): Promise<_CdnWebApplicationFirewallPolicyList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _cdnWebApplicationFirewallPolicyListDeserializer(result.body);
}

/** Lists all of the protection policies within a resource group. */
export function list(
  context: Client,
  resourceGroupName: string,
  options: PoliciesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CdnWebApplicationFirewallPolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-12-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  policyName: string,
  options: PoliciesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/cdnWebApplicationFirewallPolicies/{policyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      policyName: policyName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes Policy */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  policyName: string,
  options: PoliciesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, policyName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  policyName: string,
  cdnWebApplicationFirewallPolicyPatchParameters: CdnWebApplicationFirewallPolicyPatchParameters,
  options: PoliciesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/cdnWebApplicationFirewallPolicies/{policyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      policyName: policyName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: cdnWebApplicationFirewallPolicyPatchParametersSerializer(
      cdnWebApplicationFirewallPolicyPatchParameters,
    ),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<CdnWebApplicationFirewallPolicy> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return cdnWebApplicationFirewallPolicyDeserializer(result.body);
}

/** Update an existing CdnWebApplicationFirewallPolicy with the specified policy name under the specified subscription and resource group */
export function update(
  context: Client,
  resourceGroupName: string,
  policyName: string,
  cdnWebApplicationFirewallPolicyPatchParameters: CdnWebApplicationFirewallPolicyPatchParameters,
  options: PoliciesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CdnWebApplicationFirewallPolicy>, CdnWebApplicationFirewallPolicy> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        policyName,
        cdnWebApplicationFirewallPolicyPatchParameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<
    OperationState<CdnWebApplicationFirewallPolicy>,
    CdnWebApplicationFirewallPolicy
  >;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  policyName: string,
  cdnWebApplicationFirewallPolicy: CdnWebApplicationFirewallPolicy,
  options: PoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/cdnWebApplicationFirewallPolicies/{policyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      policyName: policyName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: cdnWebApplicationFirewallPolicySerializer(cdnWebApplicationFirewallPolicy),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<CdnWebApplicationFirewallPolicy> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return cdnWebApplicationFirewallPolicyDeserializer(result.body);
}

/** Create or update policy with specified rule set name within a resource group. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  policyName: string,
  cdnWebApplicationFirewallPolicy: CdnWebApplicationFirewallPolicy,
  options: PoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CdnWebApplicationFirewallPolicy>, CdnWebApplicationFirewallPolicy> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        policyName,
        cdnWebApplicationFirewallPolicy,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<
    OperationState<CdnWebApplicationFirewallPolicy>,
    CdnWebApplicationFirewallPolicy
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  policyName: string,
  options: PoliciesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/cdnWebApplicationFirewallPolicies/{policyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      policyName: policyName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
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
): Promise<CdnWebApplicationFirewallPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return cdnWebApplicationFirewallPolicyDeserializer(result.body);
}

/** Retrieve protection policy with specified name within a resource group. */
export async function get(
  context: Client,
  resourceGroupName: string,
  policyName: string,
  options: PoliciesGetOptionalParams = { requestOptions: {} },
): Promise<CdnWebApplicationFirewallPolicy> {
  const result = await _getSend(context, resourceGroupName, policyName, options);
  return _getDeserialize(result);
}
