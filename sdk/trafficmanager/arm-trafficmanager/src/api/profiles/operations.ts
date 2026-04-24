// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TrafficManagerManagementContext as Client } from "../index.js";
import type {
  DeleteOperationResult,
  Profile,
  ProfileUpdate,
  _ProfileListResult,
  CheckTrafficManagerRelativeDnsNameAvailabilityParameters,
  TrafficManagerNameAvailability,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  deleteOperationResultDeserializer,
  profileSerializer,
  profileDeserializer,
  profileUpdateSerializer,
  _profileListResultDeserializer,
  checkTrafficManagerRelativeDnsNameAvailabilityParametersSerializer,
  trafficManagerNameAvailabilityDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ProfilesCheckTrafficManagerNameAvailabilityV2OptionalParams,
  ProfilesCheckTrafficManagerRelativeDnsNameAvailabilityOptionalParams,
  ProfilesListByResourceGroupOptionalParams,
  ProfilesListBySubscriptionOptionalParams,
  ProfilesDeleteOptionalParams,
  ProfilesUpdateV2OptionalParams,
  ProfilesCreateOrUpdateOptionalParams,
  ProfilesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _checkTrafficManagerNameAvailabilityV2Send(
  context: Client,
  parameters: CheckTrafficManagerRelativeDnsNameAvailabilityParameters,
  options: ProfilesCheckTrafficManagerNameAvailabilityV2OptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/checkTrafficManagerNameAvailabilityV2{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: checkTrafficManagerRelativeDnsNameAvailabilityParametersSerializer(parameters),
  });
}

export async function _checkTrafficManagerNameAvailabilityV2Deserialize(
  result: PathUncheckedResponse,
): Promise<TrafficManagerNameAvailability> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return trafficManagerNameAvailabilityDeserializer(result.body);
}

/** Checks the availability of a Traffic Manager Relative DNS name. */
export async function checkTrafficManagerNameAvailabilityV2(
  context: Client,
  parameters: CheckTrafficManagerRelativeDnsNameAvailabilityParameters,
  options: ProfilesCheckTrafficManagerNameAvailabilityV2OptionalParams = { requestOptions: {} },
): Promise<TrafficManagerNameAvailability> {
  const result = await _checkTrafficManagerNameAvailabilityV2Send(context, parameters, options);
  return _checkTrafficManagerNameAvailabilityV2Deserialize(result);
}

export function _checkTrafficManagerRelativeDnsNameAvailabilitySend(
  context: Client,
  parameters: CheckTrafficManagerRelativeDnsNameAvailabilityParameters,
  options: ProfilesCheckTrafficManagerRelativeDnsNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Network/checkTrafficManagerNameAvailability{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: checkTrafficManagerRelativeDnsNameAvailabilityParametersSerializer(parameters),
  });
}

export async function _checkTrafficManagerRelativeDnsNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<TrafficManagerNameAvailability> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return trafficManagerNameAvailabilityDeserializer(result.body);
}

/** Checks the availability of a Traffic Manager Relative DNS name. */
export async function checkTrafficManagerRelativeDnsNameAvailability(
  context: Client,
  parameters: CheckTrafficManagerRelativeDnsNameAvailabilityParameters,
  options: ProfilesCheckTrafficManagerRelativeDnsNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): Promise<TrafficManagerNameAvailability> {
  const result = await _checkTrafficManagerRelativeDnsNameAvailabilitySend(
    context,
    parameters,
    options,
  );
  return _checkTrafficManagerRelativeDnsNameAvailabilityDeserialize(result);
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ProfilesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/trafficmanagerprofiles{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
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
): Promise<_ProfileListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _profileListResultDeserializer(result.body);
}

/** Lists all Traffic Manager profiles within a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ProfilesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Profile> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2024-04-01-preview",
    },
  );
}

export function _listBySubscriptionSend(
  context: Client,
  options: ProfilesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/trafficmanagerprofiles{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
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
): Promise<_ProfileListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _profileListResultDeserializer(result.body);
}

/** Lists all Traffic Manager profiles within a subscription. */
export function listBySubscription(
  context: Client,
  options: ProfilesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Profile> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2024-04-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: ProfilesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/trafficmanagerprofiles/{profileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _$deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<DeleteOperationResult> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return deleteOperationResultDeserializer(result.body);
}

/** Deletes a Traffic Manager profile. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: ProfilesDeleteOptionalParams = { requestOptions: {} },
): Promise<DeleteOperationResult> {
  const result = await _$deleteSend(context, resourceGroupName, profileName, options);
  return _$deleteDeserialize(result);
}

export function _updateV2Send(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  parameters: ProfileUpdate,
  options: ProfilesUpdateV2OptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/trafficmanagerprofiles/{profileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: profileUpdateSerializer(parameters),
  });
}

export async function _updateV2Deserialize(result: PathUncheckedResponse): Promise<Profile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return profileDeserializer(result.body);
}

/** Update a Traffic Manager profile. */
export async function updateV2(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  parameters: ProfileUpdate,
  options: ProfilesUpdateV2OptionalParams = { requestOptions: {} },
): Promise<Profile> {
  const result = await _updateV2Send(context, resourceGroupName, profileName, parameters, options);
  return _updateV2Deserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  parameters: Profile,
  options: ProfilesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/trafficmanagerprofiles/{profileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: profileSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Profile> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return profileDeserializer(result.body);
}

/** Create or update a Traffic Manager profile. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  parameters: Profile,
  options: ProfilesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Profile> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    profileName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: ProfilesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/trafficmanagerprofiles/{profileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Profile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return profileDeserializer(result.body);
}

/** Gets a Traffic Manager profile. */
export async function get(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: ProfilesGetOptionalParams = { requestOptions: {} },
): Promise<Profile> {
  const result = await _getSend(context, resourceGroupName, profileName, options);
  return _getDeserialize(result);
}
