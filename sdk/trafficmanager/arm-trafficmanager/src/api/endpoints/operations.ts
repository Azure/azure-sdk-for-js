// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TrafficManagerManagementContext as Client } from "../index.js";
import type {
  Endpoint,
  EndpointUpdate,
  DeleteOperationResult,
  EndpointType,
} from "../../models/models.js";
import {
  endpointSerializer,
  endpointDeserializer,
  cloudErrorDeserializer,
  endpointUpdateSerializer,
  deleteOperationResultDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  EndpointsDeleteOptionalParams,
  EndpointsUpdateV2OptionalParams,
  EndpointsCreateOrUpdateOptionalParams,
  EndpointsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointType: EndpointType,
  endpointName: string,
  options: EndpointsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/trafficmanagerprofiles/{profileName}/{endpointType}/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      endpointType: endpointType,
      endpointName: endpointName,
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

/** Deletes a Traffic Manager endpoint. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointType: EndpointType,
  endpointName: string,
  options: EndpointsDeleteOptionalParams = { requestOptions: {} },
): Promise<DeleteOperationResult> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    profileName,
    endpointType,
    endpointName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateV2Send(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointType: EndpointType,
  endpointName: string,
  parameters: EndpointUpdate,
  options: EndpointsUpdateV2OptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/trafficmanagerprofiles/{profileName}/{endpointType}/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      endpointType: endpointType,
      endpointName: endpointName,
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
    body: endpointUpdateSerializer(parameters),
  });
}

export async function _updateV2Deserialize(result: PathUncheckedResponse): Promise<Endpoint> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return endpointDeserializer(result.body);
}

/** Update a Traffic Manager endpoint. */
export async function updateV2(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointType: EndpointType,
  endpointName: string,
  parameters: EndpointUpdate,
  options: EndpointsUpdateV2OptionalParams = { requestOptions: {} },
): Promise<Endpoint> {
  const result = await _updateV2Send(
    context,
    resourceGroupName,
    profileName,
    endpointType,
    endpointName,
    parameters,
    options,
  );
  return _updateV2Deserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointType: EndpointType,
  endpointName: string,
  parameters: Endpoint,
  options: EndpointsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/trafficmanagerprofiles/{profileName}/{endpointType}/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      endpointType: endpointType,
      endpointName: endpointName,
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
    body: endpointSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Endpoint> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return endpointDeserializer(result.body);
}

/** Create or update a Traffic Manager endpoint. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointType: EndpointType,
  endpointName: string,
  parameters: Endpoint,
  options: EndpointsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Endpoint> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    profileName,
    endpointType,
    endpointName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointType: EndpointType,
  endpointName: string,
  options: EndpointsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/trafficmanagerprofiles/{profileName}/{endpointType}/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      endpointType: endpointType,
      endpointName: endpointName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Endpoint> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return endpointDeserializer(result.body);
}

/** Gets a Traffic Manager endpoint. */
export async function get(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointType: EndpointType,
  endpointName: string,
  options: EndpointsGetOptionalParams = { requestOptions: {} },
): Promise<Endpoint> {
  const result = await _getSend(
    context,
    resourceGroupName,
    profileName,
    endpointType,
    endpointName,
    options,
  );
  return _getDeserialize(result);
}
