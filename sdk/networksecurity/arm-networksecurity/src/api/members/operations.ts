// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkSecurityManagementContext as Client } from "../index.js";
import type { Member, MemberTagsUpdate } from "../../models/microsoft/networkSecurity/models.js";
import {
  memberSerializer,
  memberDeserializer,
  memberTagsUpdateSerializer,
} from "../../models/microsoft/networkSecurity/models.js";
import type { _MemberListResult } from "../../models/models.js";
import { errorResponseDeserializer, _memberListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  MembersListByParentOptionalParams,
  MembersDeleteOptionalParams,
  MembersUpdateOptionalParams,
  MembersCreateOrUpdateOptionalParams,
  MembersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByParentSend(
  context: Client,
  resourceGroupName: string,
  agentFabricName: string,
  options: MembersListByParentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/agentFabrics/{agentFabricName}/members{?api%2Dversion}",
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

export async function _listByParentDeserialize(
  result: PathUncheckedResponse,
): Promise<_MemberListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _memberListResultDeserializer(result.body);
}

/** List Member resources by AgentFabric */
export function listByParent(
  context: Client,
  resourceGroupName: string,
  agentFabricName: string,
  options: MembersListByParentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Member> {
  return buildPagedAsyncIterator(
    context,
    () => _listByParentSend(context, resourceGroupName, agentFabricName, options),
    _listByParentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2026-11-03-preview" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  agentFabricName: string,
  memberName: string,
  options: MembersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/agentFabrics/{agentFabricName}/members/{memberName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      agentFabricName: agentFabricName,
      memberName: memberName,
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

/** Delete a Member */
export function $delete(
  context: Client,
  resourceGroupName: string,
  agentFabricName: string,
  memberName: string,
  options: MembersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, agentFabricName, memberName, options),
    resourceLocationConfig: "location",
    apiVersion: "2026-11-03-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  agentFabricName: string,
  memberName: string,
  properties: MemberTagsUpdate,
  options: MembersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/agentFabrics/{agentFabricName}/members/{memberName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      agentFabricName: agentFabricName,
      memberName: memberName,
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
    body: memberTagsUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Member> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return memberDeserializer(result.body);
}

/** Update a Member */
export function update(
  context: Client,
  resourceGroupName: string,
  agentFabricName: string,
  memberName: string,
  properties: MemberTagsUpdate,
  options: MembersUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Member>, Member> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, agentFabricName, memberName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: "2026-11-03-preview",
  }) as PollerLike<OperationState<Member>, Member>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  agentFabricName: string,
  memberName: string,
  resource: Member,
  options: MembersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/agentFabrics/{agentFabricName}/members/{memberName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      agentFabricName: agentFabricName,
      memberName: memberName,
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
    body: memberSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Member> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return memberDeserializer(result.body);
}

/** Create a Member */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  agentFabricName: string,
  memberName: string,
  resource: Member,
  options: MembersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Member>, Member> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        agentFabricName,
        memberName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2026-11-03-preview",
  }) as PollerLike<OperationState<Member>, Member>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  agentFabricName: string,
  memberName: string,
  options: MembersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/agentFabrics/{agentFabricName}/members/{memberName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      agentFabricName: agentFabricName,
      memberName: memberName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Member> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return memberDeserializer(result.body);
}

/** Get a Member */
export async function get(
  context: Client,
  resourceGroupName: string,
  agentFabricName: string,
  memberName: string,
  options: MembersGetOptionalParams = { requestOptions: {} },
): Promise<Member> {
  const result = await _getSend(context, resourceGroupName, agentFabricName, memberName, options);
  return _getDeserialize(result);
}
