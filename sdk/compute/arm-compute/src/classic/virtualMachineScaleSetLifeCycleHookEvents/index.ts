// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext } from "../../api/computeManagementContext.js";
import {
  list,
  update,
  get,
} from "../../api/virtualMachineScaleSetLifeCycleHookEvents/operations.js";
import type {
  VirtualMachineScaleSetLifeCycleHookEventsListOptionalParams,
  VirtualMachineScaleSetLifeCycleHookEventsUpdateOptionalParams,
  VirtualMachineScaleSetLifeCycleHookEventsGetOptionalParams,
} from "../../api/virtualMachineScaleSetLifeCycleHookEvents/options.js";
import type {
  VMScaleSetLifecycleHookEvent,
  VMScaleSetLifecycleHookEventUpdate,
} from "../../models/compute/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a VirtualMachineScaleSetLifeCycleHookEvents operations. */
export interface VirtualMachineScaleSetLifeCycleHookEventsOperations {
  /** Gets a list of virtual machine scale set lifecycle hook events created for a virtual machine scale set resource. */
  list: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetLifeCycleHookEventsListOptionalParams,
  ) => PagedAsyncIterableIterator<VMScaleSetLifecycleHookEvent>;
  /** The operation to update a virtual machine scale set lifecycle hook event. */
  update: (
    resourceGroupName: string,
    vmScaleSetName: string,
    lifecycleHookEventName: string,
    properties: VMScaleSetLifecycleHookEventUpdate,
    options?: VirtualMachineScaleSetLifeCycleHookEventsUpdateOptionalParams,
  ) => Promise<VMScaleSetLifecycleHookEvent>;
  /** Gets a virtual machine scale set lifecycle hook event. */
  get: (
    resourceGroupName: string,
    vmScaleSetName: string,
    lifecycleHookEventName: string,
    options?: VirtualMachineScaleSetLifeCycleHookEventsGetOptionalParams,
  ) => Promise<VMScaleSetLifecycleHookEvent>;
}

function _getVirtualMachineScaleSetLifeCycleHookEvents(context: ComputeManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetLifeCycleHookEventsListOptionalParams,
    ) => list(context, resourceGroupName, vmScaleSetName, options),
    update: (
      resourceGroupName: string,
      vmScaleSetName: string,
      lifecycleHookEventName: string,
      properties: VMScaleSetLifecycleHookEventUpdate,
      options?: VirtualMachineScaleSetLifeCycleHookEventsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        vmScaleSetName,
        lifecycleHookEventName,
        properties,
        options,
      ),
    get: (
      resourceGroupName: string,
      vmScaleSetName: string,
      lifecycleHookEventName: string,
      options?: VirtualMachineScaleSetLifeCycleHookEventsGetOptionalParams,
    ) => get(context, resourceGroupName, vmScaleSetName, lifecycleHookEventName, options),
  };
}

export function _getVirtualMachineScaleSetLifeCycleHookEventsOperations(
  context: ComputeManagementContext,
): VirtualMachineScaleSetLifeCycleHookEventsOperations {
  return {
    ..._getVirtualMachineScaleSetLifeCycleHookEvents(context),
  };
}
