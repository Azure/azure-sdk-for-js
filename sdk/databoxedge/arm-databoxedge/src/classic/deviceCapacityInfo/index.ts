// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataBoxEdgeManagementContext } from "../../api/dataBoxEdgeManagementContext.js";
import { getDeviceCapacityInfo } from "../../api/deviceCapacityInfo/operations.js";
import type { DeviceCapacityInfoGetDeviceCapacityInfoOptionalParams } from "../../api/deviceCapacityInfo/options.js";
import type { DeviceCapacityInfo } from "../../models/models.js";

/** Interface representing a DeviceCapacityInfo operations. */
export interface DeviceCapacityInfoOperations {
  /** Gets the properties of the specified device capacity info. */
  getDeviceCapacityInfo: (
    resourceGroupName: string,
    deviceName: string,
    options?: DeviceCapacityInfoGetDeviceCapacityInfoOptionalParams,
  ) => Promise<DeviceCapacityInfo>;
}

function _getDeviceCapacityInfo(context: DataBoxEdgeManagementContext) {
  return {
    getDeviceCapacityInfo: (
      resourceGroupName: string,
      deviceName: string,
      options?: DeviceCapacityInfoGetDeviceCapacityInfoOptionalParams,
    ) => getDeviceCapacityInfo(context, resourceGroupName, deviceName, options),
  };
}

export function _getDeviceCapacityInfoOperations(
  context: DataBoxEdgeManagementContext,
): DeviceCapacityInfoOperations {
  return {
    ..._getDeviceCapacityInfo(context),
  };
}
