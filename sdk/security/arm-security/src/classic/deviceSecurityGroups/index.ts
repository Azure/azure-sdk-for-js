// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/deviceSecurityGroups/operations.js";
import type {
  DeviceSecurityGroupsListOptionalParams,
  DeviceSecurityGroupsDeleteOptionalParams,
  DeviceSecurityGroupsCreateOrUpdateOptionalParams,
  DeviceSecurityGroupsGetOptionalParams,
} from "../../api/deviceSecurityGroups/options.js";
import type { DeviceSecurityGroup } from "../../models/ioTSecurityAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DeviceSecurityGroups operations. */
export interface DeviceSecurityGroupsOperations {
  /** Use this method get the list of device security groups for the specified IoT Hub resource. */
  list: (
    resourceId: string,
    options?: DeviceSecurityGroupsListOptionalParams,
  ) => PagedAsyncIterableIterator<DeviceSecurityGroup>;
  /** User this method to deletes the device security group. */
  delete: (
    resourceId: string,
    deviceSecurityGroupName: string,
    options?: DeviceSecurityGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Use this method to creates or updates the device security group on a specified IoT Hub resource. */
  createOrUpdate: (
    resourceId: string,
    deviceSecurityGroupName: string,
    deviceSecurityGroup: DeviceSecurityGroup,
    options?: DeviceSecurityGroupsCreateOrUpdateOptionalParams,
  ) => Promise<DeviceSecurityGroup>;
  /** Use this method to get the device security group for the specified IoT Hub resource. */
  get: (
    resourceId: string,
    deviceSecurityGroupName: string,
    options?: DeviceSecurityGroupsGetOptionalParams,
  ) => Promise<DeviceSecurityGroup>;
}

function _getDeviceSecurityGroups(context: SecurityCenterContext) {
  return {
    list: (resourceId: string, options?: DeviceSecurityGroupsListOptionalParams) =>
      list(context, resourceId, options),
    delete: (
      resourceId: string,
      deviceSecurityGroupName: string,
      options?: DeviceSecurityGroupsDeleteOptionalParams,
    ) => $delete(context, resourceId, deviceSecurityGroupName, options),
    createOrUpdate: (
      resourceId: string,
      deviceSecurityGroupName: string,
      deviceSecurityGroup: DeviceSecurityGroup,
      options?: DeviceSecurityGroupsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceId, deviceSecurityGroupName, deviceSecurityGroup, options),
    get: (
      resourceId: string,
      deviceSecurityGroupName: string,
      options?: DeviceSecurityGroupsGetOptionalParams,
    ) => get(context, resourceId, deviceSecurityGroupName, options),
  };
}

export function _getDeviceSecurityGroupsOperations(
  context: SecurityCenterContext,
): DeviceSecurityGroupsOperations {
  return {
    ..._getDeviceSecurityGroups(context),
  };
}
