// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistrySoftwareUpdateContext } from "../../api/deviceRegistrySoftwareUpdateContext.js";
import { deleteDeviceClass, getDeviceClass, list } from "../../api/deviceClasses/operations.js";
import {
  DeviceClassesDeleteOptionalParams,
  DeviceClassesGetDeviceClassOptionalParams,
  DeviceClassesListOptionalParams,
} from "../../api/deviceClasses/options.js";
import { DeviceClass } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DeviceClasses operations. */
export interface DeviceClassesOperations {
  /** Deletes a device class. */
  deleteDeviceClass: (
    deviceClassId: string,
    options?: DeviceClassesDeleteOptionalParams,
  ) => Promise<void>;
  /** Gets the properties of a device class. */
  getDeviceClass: (
    deviceClassId: string,
    options?: DeviceClassesGetDeviceClassOptionalParams,
  ) => Promise<DeviceClass>;
  /** Gets a list of device classes. */
  list: (options?: DeviceClassesListOptionalParams) => PagedAsyncIterableIterator<DeviceClass>;
}

function _getDeviceClasses(context: DeviceRegistrySoftwareUpdateContext) {
  return {
    deleteDeviceClass: (deviceClassId: string, options?: DeviceClassesDeleteOptionalParams) =>
      deleteDeviceClass(context, deviceClassId, options),
    getDeviceClass: (deviceClassId: string, options?: DeviceClassesGetDeviceClassOptionalParams) =>
      getDeviceClass(context, deviceClassId, options),
    list: (options?: DeviceClassesListOptionalParams) => list(context, options),
  };
}

export function _getDeviceClassesOperations(
  context: DeviceRegistrySoftwareUpdateContext,
): DeviceClassesOperations {
  return {
    ..._getDeviceClasses(context),
  };
}
