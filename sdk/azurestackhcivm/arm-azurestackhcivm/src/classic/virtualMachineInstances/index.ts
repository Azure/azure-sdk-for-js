// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementContext } from "../../api/azureStackHcivmManagementContext.js";
import {
  save,
  pause,
  restart,
  stop,
  start,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/virtualMachineInstances/operations.js";
import {
  VirtualMachineInstancesSaveOptionalParams,
  VirtualMachineInstancesPauseOptionalParams,
  VirtualMachineInstancesRestartOptionalParams,
  VirtualMachineInstancesStopOptionalParams,
  VirtualMachineInstancesStartOptionalParams,
  VirtualMachineInstancesListOptionalParams,
  VirtualMachineInstancesDeleteOptionalParams,
  VirtualMachineInstancesUpdateOptionalParams,
  VirtualMachineInstancesCreateOrUpdateOptionalParams,
  VirtualMachineInstancesGetOptionalParams,
} from "../../api/virtualMachineInstances/options.js";
import {
  VirtualMachineInstance,
  VirtualMachineInstanceUpdateRequest,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualMachineInstances operations. */
export interface VirtualMachineInstancesOperations {
  /** The operation to save a virtual machine instance. */
  save: (
    resourceUri: string,
    options?: VirtualMachineInstancesSaveOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** The operation to pause a virtual machine instance. */
  pause: (
    resourceUri: string,
    options?: VirtualMachineInstancesPauseOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** The operation to restart a virtual machine instance. */
  restart: (
    resourceUri: string,
    options?: VirtualMachineInstancesRestartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** The operation to stop a virtual machine instance. */
  stop: (
    resourceUri: string,
    options?: VirtualMachineInstancesStopOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** The operation to start a virtual machine instance. */
  start: (
    resourceUri: string,
    options?: VirtualMachineInstancesStartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Lists all of the virtual machine instances within the specified parent resource. */
  list: (
    resourceUri: string,
    options?: VirtualMachineInstancesListOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachineInstance>;
  /** The operation to delete a virtual machine instance. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceUri: string,
    options?: VirtualMachineInstancesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** The operation to update a virtual machine instance. */
  update: (
    resourceUri: string,
    properties: VirtualMachineInstanceUpdateRequest,
    options?: VirtualMachineInstancesUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualMachineInstance>, VirtualMachineInstance>;
  /** The operation to create or update a virtual machine instance. Please note some properties can be set only during virtual machine instance creation. */
  createOrUpdate: (
    resourceUri: string,
    resource: VirtualMachineInstance,
    options?: VirtualMachineInstancesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualMachineInstance>, VirtualMachineInstance>;
  /** Gets a virtual machine instance */
  get: (
    resourceUri: string,
    options?: VirtualMachineInstancesGetOptionalParams,
  ) => Promise<VirtualMachineInstance>;
}

function _getVirtualMachineInstances(context: AzureStackHCIVMManagementContext) {
  return {
    save: (resourceUri: string, options?: VirtualMachineInstancesSaveOptionalParams) =>
      save(context, resourceUri, options),
    pause: (resourceUri: string, options?: VirtualMachineInstancesPauseOptionalParams) =>
      pause(context, resourceUri, options),
    restart: (resourceUri: string, options?: VirtualMachineInstancesRestartOptionalParams) =>
      restart(context, resourceUri, options),
    stop: (resourceUri: string, options?: VirtualMachineInstancesStopOptionalParams) =>
      stop(context, resourceUri, options),
    start: (resourceUri: string, options?: VirtualMachineInstancesStartOptionalParams) =>
      start(context, resourceUri, options),
    list: (resourceUri: string, options?: VirtualMachineInstancesListOptionalParams) =>
      list(context, resourceUri, options),
    delete: (resourceUri: string, options?: VirtualMachineInstancesDeleteOptionalParams) =>
      $delete(context, resourceUri, options),
    update: (
      resourceUri: string,
      properties: VirtualMachineInstanceUpdateRequest,
      options?: VirtualMachineInstancesUpdateOptionalParams,
    ) => update(context, resourceUri, properties, options),
    createOrUpdate: (
      resourceUri: string,
      resource: VirtualMachineInstance,
      options?: VirtualMachineInstancesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceUri, resource, options),
    get: (resourceUri: string, options?: VirtualMachineInstancesGetOptionalParams) =>
      get(context, resourceUri, options),
  };
}

export function _getVirtualMachineInstancesOperations(
  context: AzureStackHCIVMManagementContext,
): VirtualMachineInstancesOperations {
  return {
    ..._getVirtualMachineInstances(context),
  };
}
