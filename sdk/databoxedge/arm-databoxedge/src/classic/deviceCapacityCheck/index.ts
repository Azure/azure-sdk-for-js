// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataBoxEdgeManagementContext } from "../../api/dataBoxEdgeManagementContext.js";
import { checkResourceCreationFeasibility } from "../../api/deviceCapacityCheck/operations.js";
import type { DeviceCapacityCheckCheckResourceCreationFeasibilityOptionalParams } from "../../api/deviceCapacityCheck/options.js";
import type { DeviceCapacityRequestInfo } from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DeviceCapacityCheck operations. */
export interface DeviceCapacityCheckOperations {
  /** Posts the device capacity request info to check feasibility. */
  checkResourceCreationFeasibility: (
    resourceGroupName: string,
    deviceName: string,
    deviceCapacityRequestInfo: DeviceCapacityRequestInfo,
    options?: DeviceCapacityCheckCheckResourceCreationFeasibilityOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use checkResourceCreationFeasibility instead */
  beginCheckResourceCreationFeasibility: (
    resourceGroupName: string,
    deviceName: string,
    deviceCapacityRequestInfo: DeviceCapacityRequestInfo,
    options?: DeviceCapacityCheckCheckResourceCreationFeasibilityOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use checkResourceCreationFeasibility instead */
  beginCheckResourceCreationFeasibilityAndWait: (
    resourceGroupName: string,
    deviceName: string,
    deviceCapacityRequestInfo: DeviceCapacityRequestInfo,
    options?: DeviceCapacityCheckCheckResourceCreationFeasibilityOptionalParams,
  ) => Promise<void>;
}

function _getDeviceCapacityCheck(context: DataBoxEdgeManagementContext) {
  return {
    checkResourceCreationFeasibility: (
      resourceGroupName: string,
      deviceName: string,
      deviceCapacityRequestInfo: DeviceCapacityRequestInfo,
      options?: DeviceCapacityCheckCheckResourceCreationFeasibilityOptionalParams,
    ) =>
      checkResourceCreationFeasibility(
        context,
        resourceGroupName,
        deviceName,
        deviceCapacityRequestInfo,
        options,
      ),
    beginCheckResourceCreationFeasibility: async (
      resourceGroupName: string,
      deviceName: string,
      deviceCapacityRequestInfo: DeviceCapacityRequestInfo,
      options?: DeviceCapacityCheckCheckResourceCreationFeasibilityOptionalParams,
    ) => {
      const poller = checkResourceCreationFeasibility(
        context,
        resourceGroupName,
        deviceName,
        deviceCapacityRequestInfo,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCheckResourceCreationFeasibilityAndWait: async (
      resourceGroupName: string,
      deviceName: string,
      deviceCapacityRequestInfo: DeviceCapacityRequestInfo,
      options?: DeviceCapacityCheckCheckResourceCreationFeasibilityOptionalParams,
    ) => {
      return await checkResourceCreationFeasibility(
        context,
        resourceGroupName,
        deviceName,
        deviceCapacityRequestInfo,
        options,
      );
    },
  };
}

export function _getDeviceCapacityCheckOperations(
  context: DataBoxEdgeManagementContext,
): DeviceCapacityCheckOperations {
  return {
    ..._getDeviceCapacityCheck(context),
  };
}
