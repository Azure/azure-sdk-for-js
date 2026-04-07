// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type {
  SecurityAlertPolicyName,
  ManagedServerSecurityAlertPolicy,
  _ManagedServerSecurityAlertPolicyListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  managedServerSecurityAlertPolicySerializer,
  managedServerSecurityAlertPolicyDeserializer,
  _managedServerSecurityAlertPolicyListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ManagedServerSecurityAlertPoliciesListByInstanceOptionalParams,
  ManagedServerSecurityAlertPoliciesCreateOrUpdateOptionalParams,
  ManagedServerSecurityAlertPoliciesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByInstanceSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: ManagedServerSecurityAlertPoliciesListByInstanceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/securityAlertPolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _listByInstanceDeserialize(
  result: PathUncheckedResponse,
): Promise<_ManagedServerSecurityAlertPolicyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _managedServerSecurityAlertPolicyListResultDeserializer(result.body);
}

/** Get the managed server's threat detection policies. */
export function listByInstance(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: ManagedServerSecurityAlertPoliciesListByInstanceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ManagedServerSecurityAlertPolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listByInstanceSend(context, resourceGroupName, managedInstanceName, options),
    _listByInstanceDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  securityAlertPolicyName: SecurityAlertPolicyName,
  parameters: ManagedServerSecurityAlertPolicy,
  options: ManagedServerSecurityAlertPoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/securityAlertPolicies/{securityAlertPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      securityAlertPolicyName: securityAlertPolicyName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: managedServerSecurityAlertPolicySerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedServerSecurityAlertPolicy> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedServerSecurityAlertPolicyDeserializer(result.body);
}

/** Creates or updates a threat detection policy. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  securityAlertPolicyName: SecurityAlertPolicyName,
  parameters: ManagedServerSecurityAlertPolicy,
  options: ManagedServerSecurityAlertPoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ManagedServerSecurityAlertPolicy>, ManagedServerSecurityAlertPolicy> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        managedInstanceName,
        securityAlertPolicyName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<
    OperationState<ManagedServerSecurityAlertPolicy>,
    ManagedServerSecurityAlertPolicy
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  securityAlertPolicyName: SecurityAlertPolicyName,
  options: ManagedServerSecurityAlertPoliciesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/securityAlertPolicies/{securityAlertPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      securityAlertPolicyName: securityAlertPolicyName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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
): Promise<ManagedServerSecurityAlertPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedServerSecurityAlertPolicyDeserializer(result.body);
}

/** Get a managed server's threat detection policy. */
export async function get(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  securityAlertPolicyName: SecurityAlertPolicyName,
  options: ManagedServerSecurityAlertPoliciesGetOptionalParams = { requestOptions: {} },
): Promise<ManagedServerSecurityAlertPolicy> {
  const result = await _getSend(
    context,
    resourceGroupName,
    managedInstanceName,
    securityAlertPolicyName,
    options,
  );
  return _getDeserialize(result);
}
