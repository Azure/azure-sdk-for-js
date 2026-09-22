// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataBoxEdgeManagementContext } from "../../api/dataBoxEdgeManagementContext.js";
import {
  listByDataBoxEdgeDevice,
  $delete,
  createOrUpdate,
  get,
} from "../../api/triggers/operations.js";
import type {
  TriggersListByDataBoxEdgeDeviceOptionalParams,
  TriggersDeleteOptionalParams,
  TriggersCreateOrUpdateOptionalParams,
  TriggersGetOptionalParams,
} from "../../api/triggers/options.js";
import type { TriggerUnion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Triggers operations. */
export interface TriggersOperations {
  /** Lists all the triggers configured in the device. */
  listByDataBoxEdgeDevice: (
    deviceName: string,
    resourceGroupName: string,
    options?: TriggersListByDataBoxEdgeDeviceOptionalParams,
  ) => PagedAsyncIterableIterator<TriggerUnion>;
  /** Deletes the trigger on the gateway device. */
  delete: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: TriggersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: TriggersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: TriggersDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a trigger. */
  createOrUpdate: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    trigger: TriggerUnion,
    options?: TriggersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<TriggerUnion>, TriggerUnion>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    trigger: TriggerUnion,
    options?: TriggersCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<TriggerUnion>, TriggerUnion>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    trigger: TriggerUnion,
    options?: TriggersCreateOrUpdateOptionalParams,
  ) => Promise<TriggerUnion>;
  /** Get a specific trigger by name. */
  get: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: TriggersGetOptionalParams,
  ) => Promise<TriggerUnion>;
}

function _getTriggers(context: DataBoxEdgeManagementContext) {
  return {
    listByDataBoxEdgeDevice: (
      deviceName: string,
      resourceGroupName: string,
      options?: TriggersListByDataBoxEdgeDeviceOptionalParams,
    ) => listByDataBoxEdgeDevice(context, deviceName, resourceGroupName, options),
    delete: (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      options?: TriggersDeleteOptionalParams,
    ) => $delete(context, deviceName, name, resourceGroupName, options),
    beginDelete: async (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      options?: TriggersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, deviceName, name, resourceGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      options?: TriggersDeleteOptionalParams,
    ) => {
      return await $delete(context, deviceName, name, resourceGroupName, options);
    },
    createOrUpdate: (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      trigger: TriggerUnion,
      options?: TriggersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, deviceName, name, resourceGroupName, trigger, options),
    beginCreateOrUpdate: async (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      trigger: TriggerUnion,
      options?: TriggersCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, deviceName, name, resourceGroupName, trigger, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      trigger: TriggerUnion,
      options?: TriggersCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, deviceName, name, resourceGroupName, trigger, options);
    },
    get: (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      options?: TriggersGetOptionalParams,
    ) => get(context, deviceName, name, resourceGroupName, options),
  };
}

export function _getTriggersOperations(context: DataBoxEdgeManagementContext): TriggersOperations {
  return {
    ..._getTriggers(context),
  };
}
