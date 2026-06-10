// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlVirtualMachineContext } from "../../api/sqlVirtualMachineContext.js";
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
  /** Creates or updates an availability group listener. */
  createOrUpdate: (
    resourceGroupName: string,
    sqlVirtualMachineGroupName: string,
    availabilityGroupListenerName: string,
    parameters: AvailabilityGroupListener,
    options?: AvailabilityGroupListenersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AvailabilityGroupListener>, AvailabilityGroupListener>;
  /** Gets an availability group listener. */
  get: (
    resourceGroupName: string,
    sqlVirtualMachineGroupName: string,
    availabilityGroupListenerName: string,
    options?: AvailabilityGroupListenersGetOptionalParams,
  ) => Promise<AvailabilityGroupListener>;
}

function _getAvailabilityGroupListeners(context: SqlVirtualMachineContext) {
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
  context: SqlVirtualMachineContext,
): AvailabilityGroupListenersOperations {
  return {
    ..._getAvailabilityGroupListeners(context),
  };
}
