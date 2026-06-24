// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotHubContext as Client } from "../index.js";
import {
  errorDetailsDeserializer,
  GroupIdInformation,
  groupIdInformationDeserializer,
  PrivateLinkResources,
  privateLinkResourcesDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  PrivateLinkResourcesOperationsListOptionalParams,
  PrivateLinkResourcesOperationsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: PrivateLinkResourcesOperationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/iotHubs/{resourceName}/privateLinkResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateLinkResources> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return privateLinkResourcesDeserializer(result.body);
}

/** List private link resources for the given IotHub */
export async function list(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: PrivateLinkResourcesOperationsListOptionalParams = { requestOptions: {} },
): Promise<PrivateLinkResources> {
  const result = await _listSend(context, resourceGroupName, resourceName, options);
  return _listDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  groupId: string,
  options: PrivateLinkResourcesOperationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/iotHubs/{resourceName}/privateLinkResources/{groupId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      groupId: groupId,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<GroupIdInformation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return groupIdInformationDeserializer(result.body);
}

/** Get the specified private link resource for the given IotHub */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  groupId: string,
  options: PrivateLinkResourcesOperationsGetOptionalParams = { requestOptions: {} },
): Promise<GroupIdInformation> {
  const result = await _getSend(context, resourceGroupName, resourceName, groupId, options);
  return _getDeserialize(result);
}
