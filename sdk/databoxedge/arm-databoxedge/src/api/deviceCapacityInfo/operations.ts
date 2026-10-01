// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataBoxEdgeManagementContext as Client } from "../index.js";
import type { DeviceCapacityInfo } from "../../models/models.js";
import { cloudErrorDeserializer, deviceCapacityInfoDeserializer } from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { DeviceCapacityInfoGetDeviceCapacityInfoOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getDeviceCapacityInfoSend(
  context: Client,
  resourceGroupName: string,
  deviceName: string,
  options: DeviceCapacityInfoGetDeviceCapacityInfoOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/deviceCapacityInfo/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
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

export async function _getDeviceCapacityInfoDeserialize(
  result: PathUncheckedResponse,
): Promise<DeviceCapacityInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return deviceCapacityInfoDeserializer(result.body);
}

/** Gets the properties of the specified device capacity info. */
export async function getDeviceCapacityInfo(
  context: Client,
  resourceGroupName: string,
  deviceName: string,
  options: DeviceCapacityInfoGetDeviceCapacityInfoOptionalParams = { requestOptions: {} },
): Promise<DeviceCapacityInfo> {
  const result = await _getDeviceCapacityInfoSend(context, resourceGroupName, deviceName, options);
  return _getDeviceCapacityInfoDeserialize(result);
}
