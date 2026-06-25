// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  DeviceCapacityRequestInfo,
  deviceCapacityRequestInfoSerializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { DeviceCapacityCheckCheckResourceCreationFeasibilityOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _checkResourceCreationFeasibilitySend(
  context: Client,
  resourceGroupName: string,
  deviceName: string,
  deviceCapacityRequestInfo: DeviceCapacityRequestInfo,
  options: DeviceCapacityCheckCheckResourceCreationFeasibilityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/deviceCapacityCheck{?api%2Dversion,capacityName}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
      capacityName: options?.capacityName,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      body: deviceCapacityRequestInfoSerializer(deviceCapacityRequestInfo),
    });
}

export async function _checkResourceCreationFeasibilityDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Posts the device capacity request info to check feasibility. */
export function checkResourceCreationFeasibility(
  context: Client,
  resourceGroupName: string,
  deviceName: string,
  deviceCapacityRequestInfo: DeviceCapacityRequestInfo,
  options: DeviceCapacityCheckCheckResourceCreationFeasibilityOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _checkResourceCreationFeasibilityDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _checkResourceCreationFeasibilitySend(
          context,
          resourceGroupName,
          deviceName,
          deviceCapacityRequestInfo,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
      apiVersion: context.apiVersion ?? "2023-12-01",
    },
  ) as PollerLike<OperationState<void>, void>;
}
