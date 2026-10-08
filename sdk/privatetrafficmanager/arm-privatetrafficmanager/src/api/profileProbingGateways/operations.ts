// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PrivateTrafficManagerManagementContext as Client } from "../index.js";
import type {
  ProfileProbingGateway,
  ProfileProbingGatewayUpdate,
  _ProfileProbingGatewayListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  profileProbingGatewaySerializer,
  profileProbingGatewayDeserializer,
  profileProbingGatewayUpdateSerializer,
  _profileProbingGatewayListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ProfileProbingGatewaysListByParentOptionalParams,
  ProfileProbingGatewaysDeleteOptionalParams,
  ProfileProbingGatewaysUpdateOptionalParams,
  ProfileProbingGatewaysCreateOrUpdateOptionalParams,
  ProfileProbingGatewaysGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByParentSend(
  context: Client,
  resourceGroupName: string,
  privateTrafficManagerProfileName: string,
  options: ProfileProbingGatewaysListByParentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateTrafficManagerProfiles/{privateTrafficManagerProfileName}/probingGateways{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateTrafficManagerProfileName: privateTrafficManagerProfileName,
      "api%2Dversion": context.apiVersion ?? "2026-02-09-preview",
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
): Promise<_ProfileProbingGatewayListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _profileProbingGatewayListResultDeserializer(result.body);
}

/** Lists all probing gateways associated with a Private Traffic Manager profile. Only available when the parent profile has `customTopologyMapMode` set to `Disabled`. */
export function listByParent(
  context: Client,
  resourceGroupName: string,
  privateTrafficManagerProfileName: string,
  options: ProfileProbingGatewaysListByParentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ProfileProbingGateway> {
  return buildPagedAsyncIterator(
    context,
    () => _listByParentSend(context, resourceGroupName, privateTrafficManagerProfileName, options),
    _listByParentDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-02-09-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  privateTrafficManagerProfileName: string,
  profileProbingGatewayName: string,
  options: ProfileProbingGatewaysDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateTrafficManagerProfiles/{privateTrafficManagerProfileName}/probingGateways/{profileProbingGatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateTrafficManagerProfileName: privateTrafficManagerProfileName,
      profileProbingGatewayName: profileProbingGatewayName,
      "api%2Dversion": context.apiVersion ?? "2026-02-09-preview",
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

/** Deletes a probing gateway association from a Private Traffic Manager profile. Only available when the parent profile has `customTopologyMapMode` set to `Disabled`. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  privateTrafficManagerProfileName: string,
  profileProbingGatewayName: string,
  options: ProfileProbingGatewaysDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        privateTrafficManagerProfileName,
        profileProbingGatewayName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-09-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  privateTrafficManagerProfileName: string,
  profileProbingGatewayName: string,
  properties: ProfileProbingGatewayUpdate,
  options: ProfileProbingGatewaysUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateTrafficManagerProfiles/{privateTrafficManagerProfileName}/probingGateways/{profileProbingGatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateTrafficManagerProfileName: privateTrafficManagerProfileName,
      profileProbingGatewayName: profileProbingGatewayName,
      "api%2Dversion": context.apiVersion ?? "2026-02-09-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: profileProbingGatewayUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ProfileProbingGateway> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return profileProbingGatewayDeserializer(result.body);
}

/** Updates a probing gateway association with a Private Traffic Manager profile. Only available when the parent profile has `customTopologyMapMode` set to `Disabled`. */
export function update(
  context: Client,
  resourceGroupName: string,
  privateTrafficManagerProfileName: string,
  profileProbingGatewayName: string,
  properties: ProfileProbingGatewayUpdate,
  options: ProfileProbingGatewaysUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ProfileProbingGateway>, ProfileProbingGateway> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        privateTrafficManagerProfileName,
        profileProbingGatewayName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-09-preview",
  }) as PollerLike<OperationState<ProfileProbingGateway>, ProfileProbingGateway>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  privateTrafficManagerProfileName: string,
  profileProbingGatewayName: string,
  resource: ProfileProbingGateway,
  options: ProfileProbingGatewaysCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateTrafficManagerProfiles/{privateTrafficManagerProfileName}/probingGateways/{profileProbingGatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateTrafficManagerProfileName: privateTrafficManagerProfileName,
      profileProbingGatewayName: profileProbingGatewayName,
      "api%2Dversion": context.apiVersion ?? "2026-02-09-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: profileProbingGatewaySerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ProfileProbingGateway> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return profileProbingGatewayDeserializer(result.body);
}

/** Creates or updates a probing gateway association with a Private Traffic Manager profile. Only available when the parent profile has `customTopologyMapMode` set to `Disabled`. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  privateTrafficManagerProfileName: string,
  profileProbingGatewayName: string,
  resource: ProfileProbingGateway,
  options: ProfileProbingGatewaysCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ProfileProbingGateway>, ProfileProbingGateway> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        privateTrafficManagerProfileName,
        profileProbingGatewayName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-02-09-preview",
  }) as PollerLike<OperationState<ProfileProbingGateway>, ProfileProbingGateway>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  privateTrafficManagerProfileName: string,
  profileProbingGatewayName: string,
  options: ProfileProbingGatewaysGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateTrafficManagerProfiles/{privateTrafficManagerProfileName}/probingGateways/{profileProbingGatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateTrafficManagerProfileName: privateTrafficManagerProfileName,
      profileProbingGatewayName: profileProbingGatewayName,
      "api%2Dversion": context.apiVersion ?? "2026-02-09-preview",
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
): Promise<ProfileProbingGateway> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return profileProbingGatewayDeserializer(result.body);
}

/** Gets a probing gateway associated with a Private Traffic Manager profile. Only available when the parent profile has `customTopologyMapMode` set to `Disabled`. */
export async function get(
  context: Client,
  resourceGroupName: string,
  privateTrafficManagerProfileName: string,
  profileProbingGatewayName: string,
  options: ProfileProbingGatewaysGetOptionalParams = { requestOptions: {} },
): Promise<ProfileProbingGateway> {
  const result = await _getSend(
    context,
    resourceGroupName,
    privateTrafficManagerProfileName,
    profileProbingGatewayName,
    options,
  );
  return _getDeserialize(result);
}
