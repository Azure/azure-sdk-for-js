// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkSecurityManagementContext as Client } from "../index.js";
import type {
  AgentFabric,
  AgentFabricTagsUpdate,
} from "../../models/microsoft/networkSecurity/models.js";
import {
  agentFabricSerializer,
  agentFabricDeserializer,
  agentFabricTagsUpdateSerializer,
} from "../../models/microsoft/networkSecurity/models.js";
import type { _AgentFabricListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  _agentFabricListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AgentFabricsListBySubscriptionOptionalParams,
  AgentFabricsListByResourceGroupOptionalParams,
  AgentFabricsDeleteOptionalParams,
  AgentFabricsUpdateOptionalParams,
  AgentFabricsCreateOrUpdateOptionalParams,
  AgentFabricsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  options: AgentFabricsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.NetworkSecurity/agentFabrics{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2026-11-03-preview",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentFabricListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agentFabricListResultDeserializer(result.body);
}

/** List AgentFabric resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: AgentFabricsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AgentFabric> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2026-11-03-preview" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: AgentFabricsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/agentFabrics{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2026-11-03-preview",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentFabricListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agentFabricListResultDeserializer(result.body);
}

/** List AgentFabric resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: AgentFabricsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AgentFabric> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2026-11-03-preview" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  agentFabricName: string,
  options: AgentFabricsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/agentFabrics/{agentFabricName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      agentFabricName: agentFabricName,
      "api%2Dversion": "2026-11-03-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a AgentFabric */
export function $delete(
  context: Client,
  resourceGroupName: string,
  agentFabricName: string,
  options: AgentFabricsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, agentFabricName, options),
    resourceLocationConfig: "location",
    apiVersion: "2026-11-03-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  agentFabricName: string,
  properties: AgentFabricTagsUpdate,
  options: AgentFabricsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/agentFabrics/{agentFabricName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      agentFabricName: agentFabricName,
      "api%2Dversion": "2026-11-03-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: agentFabricTagsUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<AgentFabric> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentFabricDeserializer(result.body);
}

/** Update a AgentFabric */
export function update(
  context: Client,
  resourceGroupName: string,
  agentFabricName: string,
  properties: AgentFabricTagsUpdate,
  options: AgentFabricsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AgentFabric>, AgentFabric> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, agentFabricName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: "2026-11-03-preview",
  }) as PollerLike<OperationState<AgentFabric>, AgentFabric>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  agentFabricName: string,
  resource: AgentFabric,
  options: AgentFabricsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/agentFabrics/{agentFabricName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      agentFabricName: agentFabricName,
      "api%2Dversion": "2026-11-03-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: agentFabricSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentFabric> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentFabricDeserializer(result.body);
}

/**
 * Creates or replaces an AgentFabric.
 *
 * Before accepting the request or changing policy-group associations, validate the policy
 * types in every proposed defaultPolicyGroups reference against the fabric's effective
 * inspection configuration. If no connection is configured and any referenced group contains a
 * ContentInspection policy, reject the request with HTTP 409 and error code
 * ContentInspectionCapabilityDisabled, targeting properties.defaultPolicyGroups. No incompatible
 * association change is accepted. This check does not depend on whether policy selectors
 * currently match traffic.
 *
 * Omitting contentInspectionProfile or supplying {} on PUT for an existing fabric preserves its
 * customer-owned connection, legacy regional connection, or absence of connection.
 * Do not persist {} over the stored connection or cancel a pending connection update.
 * New-fabric omission or {} requests no inspection capability and no regional fallback.
 * Existing legacy fabrics without a profile retain their regional Content Safety connection,
 * which satisfies the inspection prerequisite without new probes, management calls, or key
 * retrieval. A connection still being validated is not an absent connection.
 * Error messages must not disclose associated fabric IDs the caller is not authorized to read.
 *
 * If a connection update is in progress for this fabric, reject a PUT requesting a different
 * connection with HTTP 409 Conflict, without changing the connection update already in progress.
 * A retry of the same requested connection is not a conflicting change. This does not prevent
 * later key rotations or endpoint replacements.
 *
 * In API version `2026-10-07-preview` and later, reject definite invalid customer connection input before
 * accepting PUT with HTTP 400 Bad Request. A nonempty profile must contain both endpoint and apiKey.
 * Reject a missing field before connection validation, without retrieving a saved key or comparing
 * with the saved endpoint to permit key omission. Only a truly empty object is a connection no-op;
 * partial objects or objects containing only unrecognized fields must not be treated as empty.
 * Invalid input also includes a null or nonobject profile;
 * a malformed, untrusted, or unsupported endpoint (including a non-HTTPS or unrecognized Azure
 * account host or an unsupported cloud); and explicit null, empty, or wrong-type endpoint or key.
 * An endpoint without a key is invalid even when unchanged; a key without an endpoint is invalid.
 * An omitted profile or {} is not invalid connection input. Its no-op applies only to connection
 * handling; caller authorization, other Fabric fields, policy compatibility, and ordinary
 * pending-operation rules still apply.
 *
 * For service-level connection validation rejection, return ContentInspectionConnectionValidationFailed
 * in the standard error response, targeting properties.contentInspectionProfile or its endpoint
 * or apiKey field when the invalid field is known. Ordinary schema/model validation may retain
 * its standard HTTP 400 errors. The connection code also applies to definitively rejected
 * credentials or a confirmed account/access setting or missing required Content Safety API
 * capability that prevents use of the supplied connection. Interpret upstream 401/403 responses
 * to distinguish credentials from account access, local authentication, or network restrictions;
 * do not report them as authentication/authorization failures of the Fabric caller.
 *
 * Throttling (HTTP 429), service failures (5xx), DNS/TLS failures, timeouts, and inconclusive
 * availability do not establish bad customer input and must not be classified as this HTTP 400
 * rejection. A DNS timeout or an arbitrary upstream 404 does not prove that the account is absent.
 * If a definite validation rejection is discovered after PUT acceptance, report terminal Failed
 * with the corresponding error in the established long-running operation status response;
 * the accepted PUT response does not become HTTP 400. Failed replacement preserves the previously
 * active connection; never validate or operate failed customer input using regional credentials.
 * Error responses must not contain key values or raw upstream response bodies.
 *
 * Example connection rejection response (HTTP 400 Bad Request):
 *
 * ```json
 * {
 *   "error": {
 *     "code": "ContentInspectionConnectionValidationFailed",
 *     "message": "The supplied Content Safety connection could not be validated. Verify the endpoint, API key, and account access settings.",
 *     "target": "properties.contentInspectionProfile"
 *   }
 * }
 * ```
 *
 * Example rejection response (HTTP 409 Conflict):
 *
 * ```json
 * {
 *   "error": {
 *     "code": "ContentInspectionCapabilityDisabled",
 *     "message": "The referenced policy group contains a ContentInspection policy, but this fabric has no configured inspection connection.",
 *     "target": "properties.defaultPolicyGroups"
 *   }
 * }
 * ```
 */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  agentFabricName: string,
  resource: AgentFabric,
  options: AgentFabricsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AgentFabric>, AgentFabric> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, agentFabricName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2026-11-03-preview",
  }) as PollerLike<OperationState<AgentFabric>, AgentFabric>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  agentFabricName: string,
  options: AgentFabricsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/agentFabrics/{agentFabricName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      agentFabricName: agentFabricName,
      "api%2Dversion": "2026-11-03-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AgentFabric> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentFabricDeserializer(result.body);
}

/** Get a AgentFabric */
export async function get(
  context: Client,
  resourceGroupName: string,
  agentFabricName: string,
  options: AgentFabricsGetOptionalParams = { requestOptions: {} },
): Promise<AgentFabric> {
  const result = await _getSend(context, resourceGroupName, agentFabricName, options);
  return _getDeserialize(result);
}
