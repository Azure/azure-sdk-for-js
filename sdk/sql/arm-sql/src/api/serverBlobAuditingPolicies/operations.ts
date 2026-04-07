// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type {
  ServerBlobAuditingPolicy,
  _ServerBlobAuditingPolicyListResult,
  BlobAuditingPolicyName,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  serverBlobAuditingPolicySerializer,
  serverBlobAuditingPolicyDeserializer,
  _serverBlobAuditingPolicyListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ServerBlobAuditingPoliciesListByServerOptionalParams,
  ServerBlobAuditingPoliciesCreateOrUpdateOptionalParams,
  ServerBlobAuditingPoliciesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByServerSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServerBlobAuditingPoliciesListByServerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/auditingSettings{?api%2Dversion}",
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
): Promise<_ServerBlobAuditingPolicyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _serverBlobAuditingPolicyListResultDeserializer(result.body);
}

/** Lists auditing settings of a server. */
export function listByServer(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServerBlobAuditingPoliciesListByServerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ServerBlobAuditingPolicy> {
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
  blobAuditingPolicyName: BlobAuditingPolicyName,
  parameters: ServerBlobAuditingPolicy,
  options: ServerBlobAuditingPoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/auditingSettings/{blobAuditingPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      blobAuditingPolicyName: blobAuditingPolicyName,
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
    body: serverBlobAuditingPolicySerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ServerBlobAuditingPolicy> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return serverBlobAuditingPolicyDeserializer(result.body);
}

/** Creates or updates a server's blob auditing policy. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  blobAuditingPolicyName: BlobAuditingPolicyName,
  parameters: ServerBlobAuditingPolicy,
  options: ServerBlobAuditingPoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ServerBlobAuditingPolicy>, ServerBlobAuditingPolicy> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        serverName,
        blobAuditingPolicyName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<ServerBlobAuditingPolicy>, ServerBlobAuditingPolicy>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  blobAuditingPolicyName: BlobAuditingPolicyName,
  options: ServerBlobAuditingPoliciesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/auditingSettings/{blobAuditingPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      blobAuditingPolicyName: blobAuditingPolicyName,
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
): Promise<ServerBlobAuditingPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return serverBlobAuditingPolicyDeserializer(result.body);
}

/** Gets a server's blob auditing policy. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  blobAuditingPolicyName: BlobAuditingPolicyName,
  options: ServerBlobAuditingPoliciesGetOptionalParams = { requestOptions: {} },
): Promise<ServerBlobAuditingPolicy> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serverName,
    blobAuditingPolicyName,
    options,
  );
  return _getDeserialize(result);
}
