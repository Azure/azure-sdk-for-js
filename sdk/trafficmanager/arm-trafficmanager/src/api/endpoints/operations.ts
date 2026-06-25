// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TrafficManagerManagementContext as Client } from "../index.js";
import {
  Endpoint,
  endpointSerializer,
  endpointDeserializer,
  cloudErrorDeserializer,
  DeleteOperationResult,
  deleteOperationResultDeserializer,
  EndpointType,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  EndpointsDeleteOptionalParams,
  EndpointsUpdateOptionalParams,
  EndpointsCreateOrUpdateOptionalParams,
  EndpointsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

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
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _$deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<DeleteOperationResult | undefined> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return result.body ? deleteOperationResultDeserializer(result.body) : undefined;
}

/** Deletes a Traffic Manager endpoint. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointType: EndpointType,
  endpointName: string,
  options: EndpointsDeleteOptionalParams = { requestOptions: {} },
): Promise<DeleteOperationResult | undefined> {
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

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointType: EndpointType,
  endpointName: string,
  parameters: Endpoint,
  options: EndpointsUpdateOptionalParams = { requestOptions: {} },
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
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: endpointSerializer(parameters),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Endpoint> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return endpointDeserializer(result.body);
}

/** Update a Traffic Manager endpoint. */
export async function update(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointType: EndpointType,
  endpointName: string,
  parameters: Endpoint,
  options: EndpointsUpdateOptionalParams = { requestOptions: {} },
): Promise<Endpoint> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    profileName,
    endpointType,
    endpointName,
    parameters,
    options,
  );
  return _updateDeserialize(result);
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
  return context
    .path(path)
    .put({
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
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

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
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Endpoint> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

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
