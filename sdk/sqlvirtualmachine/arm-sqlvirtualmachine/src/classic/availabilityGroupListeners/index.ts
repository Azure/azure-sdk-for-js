// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlVirtualMachineManagementContext } from "../../api/sqlVirtualMachineManagementContext.js";
import {
  listByGroup,
  $delete,
  createOrUpdate,
  get,
} from "../../api/availabilityGroupListeners/operations.js";
import type {
  AvailabilityGroupListenersListByGroupOptionalParams,
  AvailabilityGroupListenersDeleteOptionalParams,
  AvailabilityGroupListenersCreateOrUpdateOptionalParams,
  AvailabilityGroupListenersGetOptionalParams,
} from "../../api/availabilityGroupListeners/options.js";
import type { AvailabilityGroupListener } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AvailabilityGroupListeners operations. */
export interface AvailabilityGroupListenersOperations {
  /** Lists all availability group listeners in a SQL virtual machine group. */
  listByGroup: (
    resourceGroupName: string,
    sqlVirtualMachineGroupName: string,
    options?: AvailabilityGroupListenersListByGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AvailabilityGroupListener>;
  /** Deletes an availability group listener. */
  delete: (
    resourceGroupName: string,
    sqlVirtualMachineGroupName: string,
    availabilityGroupListenerName: string,
    options?: AvailabilityGroupListenersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    sqlVirtualMachineGroupName: string,
    availabilityGroupListenerName: string,
    options?: AvailabilityGroupListenersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    sqlVirtualMachineGroupName: string,
    availabilityGroupListenerName: string,
    options?: AvailabilityGroupListenersDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an availability group listener. */
  createOrUpdate: (
    resourceGroupName: string,
    sqlVirtualMachineGroupName: string,
    availabilityGroupListenerName: string,
    parameters: AvailabilityGroupListener,
    options?: AvailabilityGroupListenersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AvailabilityGroupListener>, AvailabilityGroupListener>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    sqlVirtualMachineGroupName: string,
    availabilityGroupListenerName: string,
    parameters: AvailabilityGroupListener,
    options?: AvailabilityGroupListenersCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<AvailabilityGroupListener>, AvailabilityGroupListener>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    sqlVirtualMachineGroupName: string,
    availabilityGroupListenerName: string,
    parameters: AvailabilityGroupListener,
    options?: AvailabilityGroupListenersCreateOrUpdateOptionalParams,
  ) => Promise<AvailabilityGroupListener>;
  /** Gets an availability group listener. */
  get: (
    resourceGroupName: string,
    sqlVirtualMachineGroupName: string,
    availabilityGroupListenerName: string,
    options?: AvailabilityGroupListenersGetOptionalParams,
  ) => Promise<AvailabilityGroupListener>;
}

function _getAvailabilityGroupListeners(context: SqlVirtualMachineManagementContext) {
  return {
    listByGroup: (
      resourceGroupName: string,
      sqlVirtualMachineGroupName: string,
      options?: AvailabilityGroupListenersListByGroupOptionalParams,
    ) => listByGroup(context, resourceGroupName, sqlVirtualMachineGroupName, options),
    delete: (
      resourceGroupName: string,
      sqlVirtualMachineGroupName: string,
      availabilityGroupListenerName: string,
      options?: AvailabilityGroupListenersDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        sqlVirtualMachineGroupName,
        availabilityGroupListenerName,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      sqlVirtualMachineGroupName: string,
      availabilityGroupListenerName: string,
      options?: AvailabilityGroupListenersDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        sqlVirtualMachineGroupName,
        availabilityGroupListenerName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      sqlVirtualMachineGroupName: string,
      availabilityGroupListenerName: string,
      options?: AvailabilityGroupListenersDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        sqlVirtualMachineGroupName,
        availabilityGroupListenerName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      sqlVirtualMachineGroupName: string,
      availabilityGroupListenerName: string,
      parameters: AvailabilityGroupListener,
      options?: AvailabilityGroupListenersCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        sqlVirtualMachineGroupName,
        availabilityGroupListenerName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      sqlVirtualMachineGroupName: string,
      availabilityGroupListenerName: string,
      parameters: AvailabilityGroupListener,
      options?: AvailabilityGroupListenersCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        sqlVirtualMachineGroupName,
        availabilityGroupListenerName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      sqlVirtualMachineGroupName: string,
      availabilityGroupListenerName: string,
      parameters: AvailabilityGroupListener,
      options?: AvailabilityGroupListenersCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        sqlVirtualMachineGroupName,
        availabilityGroupListenerName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      sqlVirtualMachineGroupName: string,
      availabilityGroupListenerName: string,
      options?: AvailabilityGroupListenersGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        sqlVirtualMachineGroupName,
        availabilityGroupListenerName,
        options,
      ),
  };
}

export function _getAvailabilityGroupListenersOperations(
  context: SqlVirtualMachineManagementContext,
): AvailabilityGroupListenersOperations {
  return {
    ..._getAvailabilityGroupListeners(context),
  };
}
