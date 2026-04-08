// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext as Client } from "../index.js";
import type {
  SecurityAlertPolicyName,
  ServerSecurityAlertPolicy,
  _LogicalServerSecurityAlertPolicyListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  serverSecurityAlertPolicySerializer,
  serverSecurityAlertPolicyDeserializer,
  _logicalServerSecurityAlertPolicyListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ServerSecurityAlertPoliciesListByServerOptionalParams,
  ServerSecurityAlertPoliciesCreateOrUpdateOptionalParams,
  ServerSecurityAlertPoliciesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByServerSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServerSecurityAlertPoliciesListByServerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/securityAlertPolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
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

export async function _listByServerDeserialize(
  result: PathUncheckedResponse,
): Promise<_LogicalServerSecurityAlertPolicyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _logicalServerSecurityAlertPolicyListResultDeserializer(result.body);
}

/** Get the server's threat detection policies. */
export function listByServer(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServerSecurityAlertPoliciesListByServerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ServerSecurityAlertPolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listByServerSend(context, resourceGroupName, serverName, options),
    _listByServerDeserialize,
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
  serverName: string,
  securityAlertPolicyName: SecurityAlertPolicyName,
  parameters: ServerSecurityAlertPolicy,
  options: ServerSecurityAlertPoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/securityAlertPolicies/{securityAlertPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
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
    body: serverSecurityAlertPolicySerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ServerSecurityAlertPolicy> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return serverSecurityAlertPolicyDeserializer(result.body);
}

/** Creates or updates a threat detection policy. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  securityAlertPolicyName: SecurityAlertPolicyName,
  parameters: ServerSecurityAlertPolicy,
  options: ServerSecurityAlertPoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ServerSecurityAlertPolicy>, ServerSecurityAlertPolicy> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        serverName,
        securityAlertPolicyName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<ServerSecurityAlertPolicy>, ServerSecurityAlertPolicy>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  securityAlertPolicyName: SecurityAlertPolicyName,
  options: ServerSecurityAlertPoliciesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/securityAlertPolicies/{securityAlertPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
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
): Promise<ServerSecurityAlertPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return serverSecurityAlertPolicyDeserializer(result.body);
}

/** Get a server's security alert policy. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  securityAlertPolicyName: SecurityAlertPolicyName,
  options: ServerSecurityAlertPoliciesGetOptionalParams = { requestOptions: {} },
): Promise<ServerSecurityAlertPolicy> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serverName,
    securityAlertPolicyName,
    options,
  );
  return _getDeserialize(result);
}
