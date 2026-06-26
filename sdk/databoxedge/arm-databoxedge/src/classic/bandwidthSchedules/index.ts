// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementContext } from "../../api/dataBoxEdgeManagementContext.js";
import {
  listByDataBoxEdgeDevice,
  $delete,
  createOrUpdate,
  get,
} from "../../api/bandwidthSchedules/operations.js";
import {
  BandwidthSchedulesListByDataBoxEdgeDeviceOptionalParams,
  BandwidthSchedulesDeleteOptionalParams,
  BandwidthSchedulesCreateOrUpdateOptionalParams,
  BandwidthSchedulesGetOptionalParams,
} from "../../api/bandwidthSchedules/options.js";
import { BandwidthSchedule } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BandwidthSchedules operations. */
export interface BandwidthSchedulesOperations {
  /** Gets all the bandwidth schedules for a Data Box Edge/Data Box Gateway device. */
  listByDataBoxEdgeDevice: (
    deviceName: string,
    resourceGroupName: string,
    options?: BandwidthSchedulesListByDataBoxEdgeDeviceOptionalParams,
  ) => PagedAsyncIterableIterator<BandwidthSchedule>;
  /** Deletes the specified bandwidth schedule. */
  delete: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: BandwidthSchedulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: BandwidthSchedulesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: BandwidthSchedulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a bandwidth schedule. */
  createOrUpdate: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    parameters: BandwidthSchedule,
    options?: BandwidthSchedulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<BandwidthSchedule>, BandwidthSchedule>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    parameters: BandwidthSchedule,
    options?: BandwidthSchedulesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BandwidthSchedule>, BandwidthSchedule>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    parameters: BandwidthSchedule,
    options?: BandwidthSchedulesCreateOrUpdateOptionalParams,
  ) => Promise<BandwidthSchedule>;
  /** Gets the properties of the specified bandwidth schedule. */
  get: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: BandwidthSchedulesGetOptionalParams,
  ) => Promise<BandwidthSchedule>;
}

function _getBandwidthSchedules(context: DataBoxEdgeManagementContext) {
  return {
    listByDataBoxEdgeDevice: (
      deviceName: string,
      resourceGroupName: string,
      options?: BandwidthSchedulesListByDataBoxEdgeDeviceOptionalParams,
    ) => listByDataBoxEdgeDevice(context, deviceName, resourceGroupName, options),
    delete: (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      options?: BandwidthSchedulesDeleteOptionalParams,
    ) => $delete(context, deviceName, name, resourceGroupName, options),
    beginDelete: async (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      options?: BandwidthSchedulesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, deviceName, name, resourceGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      options?: BandwidthSchedulesDeleteOptionalParams,
    ) => {
      return await $delete(context, deviceName, name, resourceGroupName, options);
    },
    createOrUpdate: (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      parameters: BandwidthSchedule,
      options?: BandwidthSchedulesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, deviceName, name, resourceGroupName, parameters, options),
    beginCreateOrUpdate: async (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      parameters: BandwidthSchedule,
      options?: BandwidthSchedulesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        deviceName,
        name,
        resourceGroupName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      parameters: BandwidthSchedule,
      options?: BandwidthSchedulesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        deviceName,
        name,
        resourceGroupName,
        parameters,
        options,
      );
    },
    get: (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      options?: BandwidthSchedulesGetOptionalParams,
    ) => get(context, deviceName, name, resourceGroupName, options),
  };
}

export function _getBandwidthSchedulesOperations(
  context: DataBoxEdgeManagementContext,
): BandwidthSchedulesOperations {
  return {
    ..._getBandwidthSchedules(context),
  };
}
