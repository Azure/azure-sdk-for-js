// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import {
  runCommand,
  start,
  retrieveBootDiagnosticsData,
  restart,
  redeploy,
  powerOff,
  performMaintenance,
  attachDetachDataDisks,
  simulateEviction,
  reimageAll,
  reimage,
  getInstanceView,
  deallocate,
  approveRollingUpgrade,
  list,
  $delete,
  update,
  get,
} from "../../api/virtualMachineScaleSetVMS/operations.js";
import type {
  VirtualMachineScaleSetVMSRunCommandOptionalParams,
  VirtualMachineScaleSetVMSStartOptionalParams,
  VirtualMachineScaleSetVMSRetrieveBootDiagnosticsDataOptionalParams,
  VirtualMachineScaleSetVMSRestartOptionalParams,
  VirtualMachineScaleSetVMSRedeployOptionalParams,
  VirtualMachineScaleSetVMSPowerOffOptionalParams,
  VirtualMachineScaleSetVMSPerformMaintenanceOptionalParams,
  VirtualMachineScaleSetVMSAttachDetachDataDisksOptionalParams,
  VirtualMachineScaleSetVMSSimulateEvictionOptionalParams,
  VirtualMachineScaleSetVMSReimageAllOptionalParams,
  VirtualMachineScaleSetVMSReimageOptionalParams,
  VirtualMachineScaleSetVMSGetInstanceViewOptionalParams,
  VirtualMachineScaleSetVMSDeallocateOptionalParams,
  VirtualMachineScaleSetVMSApproveRollingUpgradeOptionalParams,
  VirtualMachineScaleSetVMSListOptionalParams,
  VirtualMachineScaleSetVMSDeleteOptionalParams,
  VirtualMachineScaleSetVMSUpdateOptionalParams,
  VirtualMachineScaleSetVMSGetOptionalParams,
} from "../../api/virtualMachineScaleSetVMS/options.js";
import type {
  OkResponse,
  VirtualMachineScaleSetVM,
  VirtualMachineScaleSetVMInstanceView,
  StorageProfile,
  AttachDetachDataDisksRequest,
  RetrieveBootDiagnosticsDataResult,
  RunCommandInput,
  RunCommandResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualMachineScaleSetVMS operations. */
export interface VirtualMachineScaleSetVMSOperations {
  /** Run command on a virtual machine in a VM scale set. */
  runCommand: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    parameters: RunCommandInput,
    options?: VirtualMachineScaleSetVMSRunCommandOptionalParams,
  ) => PollerLike<OperationState<RunCommandResult>, RunCommandResult>;
  /** Starts a virtual machine in a VM scale set. */
  start: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMSStartOptionalParams,
  ) => PollerLike<OperationState<OkResponse>, OkResponse>;
  /** The operation to retrieve SAS URIs of boot diagnostic logs for a virtual machine in a VM scale set. */
  retrieveBootDiagnosticsData: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMSRetrieveBootDiagnosticsDataOptionalParams,
  ) => Promise<RetrieveBootDiagnosticsDataResult>;
  /** Restarts a virtual machine in a VM scale set. */
  restart: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMSRestartOptionalParams,
  ) => PollerLike<OperationState<OkResponse>, OkResponse>;
  /** Shuts down the virtual machine in the virtual machine scale set, moves it to a new node, and powers it back on. */
  redeploy: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMSRedeployOptionalParams,
  ) => PollerLike<OperationState<OkResponse>, OkResponse>;
  /** Power off (stop) a virtual machine in a VM scale set. Note that resources are still attached and you are getting charged for the resources. Instead, use deallocate to release resources and avoid charges. */
  powerOff: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMSPowerOffOptionalParams,
  ) => PollerLike<OperationState<OkResponse>, OkResponse>;
  /** Performs maintenance on a virtual machine in a VM scale set. */
  performMaintenance: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMSPerformMaintenanceOptionalParams,
  ) => PollerLike<OperationState<OkResponse>, OkResponse>;
  /** Attach and detach data disks to/from a virtual machine in a VM scale set. */
  attachDetachDataDisks: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    parameters: AttachDetachDataDisksRequest,
    options?: VirtualMachineScaleSetVMSAttachDetachDataDisksOptionalParams,
  ) => PollerLike<OperationState<StorageProfile>, StorageProfile>;
  /** The operation to simulate the eviction of spot virtual machine in a VM scale set. */
  simulateEviction: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMSSimulateEvictionOptionalParams,
  ) => Promise<void>;
  /** Allows you to re-image all the disks ( including data disks ) in the a VM scale set instance. This operation is only supported for managed disks. */
  reimageAll: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMSReimageAllOptionalParams,
  ) => PollerLike<OperationState<OkResponse>, OkResponse>;
  /** Reimages (upgrade the operating system) a specific virtual machine in a VM scale set. */
  reimage: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMSReimageOptionalParams,
  ) => PollerLike<OperationState<OkResponse>, OkResponse>;
  /** Gets the status of a virtual machine from a VM scale set. */
  getInstanceView: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMSGetInstanceViewOptionalParams,
  ) => Promise<VirtualMachineScaleSetVMInstanceView>;
  /** Deallocates a specific virtual machine in a VM scale set. Shuts down the virtual machine and releases the compute resources it uses. You are not billed for the compute resources of this virtual machine once it is deallocated. */
  deallocate: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMSDeallocateOptionalParams,
  ) => PollerLike<OperationState<OkResponse>, OkResponse>;
  /** Approve upgrade on deferred rolling upgrade for OS disk on a VM scale set instance. */
  approveRollingUpgrade: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMSApproveRollingUpgradeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Gets a list of all virtual machines in a VM scale sets. */
  list: (
    resourceGroupName: string,
    virtualMachineScaleSetName: string,
    options?: VirtualMachineScaleSetVMSListOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachineScaleSetVM>;
  /** Deletes a virtual machine from a VM scale set. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMSDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a virtual machine of a VM scale set. */
  update: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    parameters: VirtualMachineScaleSetVM,
    options?: VirtualMachineScaleSetVMSUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Gets a virtual machine from a VM scale set. */
  get: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMSGetOptionalParams,
  ) => Promise<VirtualMachineScaleSetVM>;
}

function _getVirtualMachineScaleSetVMS(context: ComputeContext) {
  return {
    runCommand: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      parameters: RunCommandInput,
      options?: VirtualMachineScaleSetVMSRunCommandOptionalParams,
    ) => runCommand(context, resourceGroupName, vmScaleSetName, instanceId, parameters, options),
    start: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMSStartOptionalParams,
    ) => start(context, resourceGroupName, vmScaleSetName, instanceId, options),
    retrieveBootDiagnosticsData: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMSRetrieveBootDiagnosticsDataOptionalParams,
    ) =>
      retrieveBootDiagnosticsData(context, resourceGroupName, vmScaleSetName, instanceId, options),
    restart: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMSRestartOptionalParams,
    ) => restart(context, resourceGroupName, vmScaleSetName, instanceId, options),
    redeploy: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMSRedeployOptionalParams,
    ) => redeploy(context, resourceGroupName, vmScaleSetName, instanceId, options),
    powerOff: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMSPowerOffOptionalParams,
    ) => powerOff(context, resourceGroupName, vmScaleSetName, instanceId, options),
    performMaintenance: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMSPerformMaintenanceOptionalParams,
    ) => performMaintenance(context, resourceGroupName, vmScaleSetName, instanceId, options),
    attachDetachDataDisks: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      parameters: AttachDetachDataDisksRequest,
      options?: VirtualMachineScaleSetVMSAttachDetachDataDisksOptionalParams,
    ) =>
      attachDetachDataDisks(
        context,
        resourceGroupName,
        vmScaleSetName,
        instanceId,
        parameters,
        options,
      ),
    simulateEviction: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMSSimulateEvictionOptionalParams,
    ) => simulateEviction(context, resourceGroupName, vmScaleSetName, instanceId, options),
    reimageAll: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMSReimageAllOptionalParams,
    ) => reimageAll(context, resourceGroupName, vmScaleSetName, instanceId, options),
    reimage: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMSReimageOptionalParams,
    ) => reimage(context, resourceGroupName, vmScaleSetName, instanceId, options),
    getInstanceView: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMSGetInstanceViewOptionalParams,
    ) => getInstanceView(context, resourceGroupName, vmScaleSetName, instanceId, options),
    deallocate: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMSDeallocateOptionalParams,
    ) => deallocate(context, resourceGroupName, vmScaleSetName, instanceId, options),
    approveRollingUpgrade: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMSApproveRollingUpgradeOptionalParams,
    ) => approveRollingUpgrade(context, resourceGroupName, vmScaleSetName, instanceId, options),
    list: (
      resourceGroupName: string,
      virtualMachineScaleSetName: string,
      options?: VirtualMachineScaleSetVMSListOptionalParams,
    ) => list(context, resourceGroupName, virtualMachineScaleSetName, options),
    delete: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMSDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, vmScaleSetName, instanceId, options),
    update: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      parameters: VirtualMachineScaleSetVM,
      options?: VirtualMachineScaleSetVMSUpdateOptionalParams,
    ) => update(context, resourceGroupName, vmScaleSetName, instanceId, parameters, options),
    get: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMSGetOptionalParams,
    ) => get(context, resourceGroupName, vmScaleSetName, instanceId, options),
  };
}

export function _getVirtualMachineScaleSetVMSOperations(
  context: ComputeContext,
): VirtualMachineScaleSetVMSOperations {
  return {
    ..._getVirtualMachineScaleSetVMS(context),
  };
}
