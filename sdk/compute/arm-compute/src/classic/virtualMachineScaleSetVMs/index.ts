// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext } from "../../api/computeManagementContext.js";
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
} from "../../api/virtualMachineScaleSetVMs/operations.js";
import type {
  VirtualMachineScaleSetVMsRunCommandOptionalParams,
  VirtualMachineScaleSetVMsStartOptionalParams,
  VirtualMachineScaleSetVMsRetrieveBootDiagnosticsDataOptionalParams,
  VirtualMachineScaleSetVMsRestartOptionalParams,
  VirtualMachineScaleSetVMsRedeployOptionalParams,
  VirtualMachineScaleSetVMsPowerOffOptionalParams,
  VirtualMachineScaleSetVMsPerformMaintenanceOptionalParams,
  VirtualMachineScaleSetVMsAttachDetachDataDisksOptionalParams,
  VirtualMachineScaleSetVMsSimulateEvictionOptionalParams,
  VirtualMachineScaleSetVMsReimageAllOptionalParams,
  VirtualMachineScaleSetVMsReimageOptionalParams,
  VirtualMachineScaleSetVMsGetInstanceViewOptionalParams,
  VirtualMachineScaleSetVMsDeallocateOptionalParams,
  VirtualMachineScaleSetVMsApproveRollingUpgradeOptionalParams,
  VirtualMachineScaleSetVMsListOptionalParams,
  VirtualMachineScaleSetVMsDeleteOptionalParams,
  VirtualMachineScaleSetVMsUpdateOptionalParams,
  VirtualMachineScaleSetVMsGetOptionalParams,
} from "../../api/virtualMachineScaleSetVMs/options.js";
import type {
  StorageProfile,
  AttachDetachDataDisksRequest,
  RetrieveBootDiagnosticsDataResult,
  RunCommandInput,
  RunCommandResult,
  VirtualMachineScaleSetVM,
  VirtualMachineScaleSetVMInstanceView,
} from "../../models/compute/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualMachineScaleSetVMs operations. */
export interface VirtualMachineScaleSetVMsOperations {
  /** Run command on a virtual machine in a VM scale set. */
  runCommand: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    parameters: RunCommandInput,
    options?: VirtualMachineScaleSetVMsRunCommandOptionalParams,
  ) => PollerLike<OperationState<RunCommandResult>, RunCommandResult>;
  /** @deprecated use runCommand instead */
  beginRunCommand: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    parameters: RunCommandInput,
    options?: VirtualMachineScaleSetVMsRunCommandOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RunCommandResult>, RunCommandResult>>;
  /** @deprecated use runCommand instead */
  beginRunCommandAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    parameters: RunCommandInput,
    options?: VirtualMachineScaleSetVMsRunCommandOptionalParams,
  ) => Promise<RunCommandResult>;
  /** Starts a virtual machine in a VM scale set. */
  start: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsStartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use start instead */
  beginStart: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsStartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use start instead */
  beginStartAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsStartOptionalParams,
  ) => Promise<void>;
  /** The operation to retrieve SAS URIs of boot diagnostic logs for a virtual machine in a VM scale set. */
  retrieveBootDiagnosticsData: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsRetrieveBootDiagnosticsDataOptionalParams,
  ) => Promise<RetrieveBootDiagnosticsDataResult>;
  /** Restarts a virtual machine in a VM scale set. */
  restart: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsRestartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use restart instead */
  beginRestart: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsRestartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use restart instead */
  beginRestartAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsRestartOptionalParams,
  ) => Promise<void>;
  /** Shuts down the virtual machine in the virtual machine scale set, moves it to a new node, and powers it back on. */
  redeploy: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsRedeployOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use redeploy instead */
  beginRedeploy: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsRedeployOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use redeploy instead */
  beginRedeployAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsRedeployOptionalParams,
  ) => Promise<void>;
  /** Power off (stop) a virtual machine in a VM scale set. Note that resources are still attached and you are getting charged for the resources. Instead, use deallocate to release resources and avoid charges. */
  powerOff: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsPowerOffOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use powerOff instead */
  beginPowerOff: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsPowerOffOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use powerOff instead */
  beginPowerOffAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsPowerOffOptionalParams,
  ) => Promise<void>;
  /** Performs maintenance on a virtual machine in a VM scale set. */
  performMaintenance: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsPerformMaintenanceOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use performMaintenance instead */
  beginPerformMaintenance: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsPerformMaintenanceOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use performMaintenance instead */
  beginPerformMaintenanceAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsPerformMaintenanceOptionalParams,
  ) => Promise<void>;
  /** Attach and detach data disks to/from a virtual machine in a VM scale set. */
  attachDetachDataDisks: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    parameters: AttachDetachDataDisksRequest,
    options?: VirtualMachineScaleSetVMsAttachDetachDataDisksOptionalParams,
  ) => PollerLike<OperationState<StorageProfile>, StorageProfile>;
  /** @deprecated use attachDetachDataDisks instead */
  beginAttachDetachDataDisks: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    parameters: AttachDetachDataDisksRequest,
    options?: VirtualMachineScaleSetVMsAttachDetachDataDisksOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<StorageProfile>, StorageProfile>>;
  /** @deprecated use attachDetachDataDisks instead */
  beginAttachDetachDataDisksAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    parameters: AttachDetachDataDisksRequest,
    options?: VirtualMachineScaleSetVMsAttachDetachDataDisksOptionalParams,
  ) => Promise<StorageProfile>;
  /** The operation to simulate the eviction of spot virtual machine in a VM scale set. */
  simulateEviction: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsSimulateEvictionOptionalParams,
  ) => Promise<void>;
  /** Allows you to re-image all the disks ( including data disks ) in the a VM scale set instance. This operation is only supported for managed disks. */
  reimageAll: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsReimageAllOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use reimageAll instead */
  beginReimageAll: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsReimageAllOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use reimageAll instead */
  beginReimageAllAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsReimageAllOptionalParams,
  ) => Promise<void>;
  /** Reimages (upgrade the operating system) a specific virtual machine in a VM scale set. */
  reimage: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsReimageOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use reimage instead */
  beginReimage: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsReimageOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use reimage instead */
  beginReimageAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsReimageOptionalParams,
  ) => Promise<void>;
  /** Gets the status of a virtual machine from a VM scale set. */
  getInstanceView: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsGetInstanceViewOptionalParams,
  ) => Promise<VirtualMachineScaleSetVMInstanceView>;
  /** Deallocates a specific virtual machine in a VM scale set. Shuts down the virtual machine and releases the compute resources it uses. You are not billed for the compute resources of this virtual machine once it is deallocated. */
  deallocate: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsDeallocateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deallocate instead */
  beginDeallocate: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsDeallocateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deallocate instead */
  beginDeallocateAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsDeallocateOptionalParams,
  ) => Promise<void>;
  /** Approve upgrade on deferred rolling upgrade for OS disk on a VM scale set instance. */
  approveRollingUpgrade: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsApproveRollingUpgradeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use approveRollingUpgrade instead */
  beginApproveRollingUpgrade: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsApproveRollingUpgradeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use approveRollingUpgrade instead */
  beginApproveRollingUpgradeAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsApproveRollingUpgradeOptionalParams,
  ) => Promise<void>;
  /** Gets a list of all virtual machines in a VM scale sets. */
  list: (
    resourceGroupName: string,
    virtualMachineScaleSetName: string,
    options?: VirtualMachineScaleSetVMsListOptionalParams,
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
    options?: VirtualMachineScaleSetVMsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a virtual machine of a VM scale set. */
  update: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    parameters: VirtualMachineScaleSetVM,
    options?: VirtualMachineScaleSetVMsUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualMachineScaleSetVM>, VirtualMachineScaleSetVM>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    parameters: VirtualMachineScaleSetVM,
    options?: VirtualMachineScaleSetVMsUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<VirtualMachineScaleSetVM>, VirtualMachineScaleSetVM>
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    parameters: VirtualMachineScaleSetVM,
    options?: VirtualMachineScaleSetVMsUpdateOptionalParams,
  ) => Promise<VirtualMachineScaleSetVM>;
  /** Gets a virtual machine from a VM scale set. */
  get: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsGetOptionalParams,
  ) => Promise<VirtualMachineScaleSetVM>;
}

function _getVirtualMachineScaleSetVMs(context: ComputeManagementContext) {
  return {
    runCommand: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      parameters: RunCommandInput,
      options?: VirtualMachineScaleSetVMsRunCommandOptionalParams,
    ) => runCommand(context, resourceGroupName, vmScaleSetName, instanceId, parameters, options),
    beginRunCommand: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      parameters: RunCommandInput,
      options?: VirtualMachineScaleSetVMsRunCommandOptionalParams,
    ) => {
      const poller = runCommand(
        context,
        resourceGroupName,
        vmScaleSetName,
        instanceId,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRunCommandAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      parameters: RunCommandInput,
      options?: VirtualMachineScaleSetVMsRunCommandOptionalParams,
    ) => {
      return await runCommand(
        context,
        resourceGroupName,
        vmScaleSetName,
        instanceId,
        parameters,
        options,
      );
    },
    start: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsStartOptionalParams,
    ) => start(context, resourceGroupName, vmScaleSetName, instanceId, options),
    beginStart: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsStartOptionalParams,
    ) => {
      const poller = start(context, resourceGroupName, vmScaleSetName, instanceId, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsStartOptionalParams,
    ) => {
      return await start(context, resourceGroupName, vmScaleSetName, instanceId, options);
    },
    retrieveBootDiagnosticsData: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsRetrieveBootDiagnosticsDataOptionalParams,
    ) =>
      retrieveBootDiagnosticsData(context, resourceGroupName, vmScaleSetName, instanceId, options),
    restart: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsRestartOptionalParams,
    ) => restart(context, resourceGroupName, vmScaleSetName, instanceId, options),
    beginRestart: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsRestartOptionalParams,
    ) => {
      const poller = restart(context, resourceGroupName, vmScaleSetName, instanceId, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestartAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsRestartOptionalParams,
    ) => {
      return await restart(context, resourceGroupName, vmScaleSetName, instanceId, options);
    },
    redeploy: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsRedeployOptionalParams,
    ) => redeploy(context, resourceGroupName, vmScaleSetName, instanceId, options),
    beginRedeploy: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsRedeployOptionalParams,
    ) => {
      const poller = redeploy(context, resourceGroupName, vmScaleSetName, instanceId, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRedeployAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsRedeployOptionalParams,
    ) => {
      return await redeploy(context, resourceGroupName, vmScaleSetName, instanceId, options);
    },
    powerOff: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsPowerOffOptionalParams,
    ) => powerOff(context, resourceGroupName, vmScaleSetName, instanceId, options),
    beginPowerOff: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsPowerOffOptionalParams,
    ) => {
      const poller = powerOff(context, resourceGroupName, vmScaleSetName, instanceId, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPowerOffAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsPowerOffOptionalParams,
    ) => {
      return await powerOff(context, resourceGroupName, vmScaleSetName, instanceId, options);
    },
    performMaintenance: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsPerformMaintenanceOptionalParams,
    ) => performMaintenance(context, resourceGroupName, vmScaleSetName, instanceId, options),
    beginPerformMaintenance: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsPerformMaintenanceOptionalParams,
    ) => {
      const poller = performMaintenance(
        context,
        resourceGroupName,
        vmScaleSetName,
        instanceId,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPerformMaintenanceAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsPerformMaintenanceOptionalParams,
    ) => {
      return await performMaintenance(
        context,
        resourceGroupName,
        vmScaleSetName,
        instanceId,
        options,
      );
    },
    attachDetachDataDisks: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      parameters: AttachDetachDataDisksRequest,
      options?: VirtualMachineScaleSetVMsAttachDetachDataDisksOptionalParams,
    ) =>
      attachDetachDataDisks(
        context,
        resourceGroupName,
        vmScaleSetName,
        instanceId,
        parameters,
        options,
      ),
    beginAttachDetachDataDisks: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      parameters: AttachDetachDataDisksRequest,
      options?: VirtualMachineScaleSetVMsAttachDetachDataDisksOptionalParams,
    ) => {
      const poller = attachDetachDataDisks(
        context,
        resourceGroupName,
        vmScaleSetName,
        instanceId,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginAttachDetachDataDisksAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      parameters: AttachDetachDataDisksRequest,
      options?: VirtualMachineScaleSetVMsAttachDetachDataDisksOptionalParams,
    ) => {
      return await attachDetachDataDisks(
        context,
        resourceGroupName,
        vmScaleSetName,
        instanceId,
        parameters,
        options,
      );
    },
    simulateEviction: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsSimulateEvictionOptionalParams,
    ) => simulateEviction(context, resourceGroupName, vmScaleSetName, instanceId, options),
    reimageAll: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsReimageAllOptionalParams,
    ) => reimageAll(context, resourceGroupName, vmScaleSetName, instanceId, options),
    beginReimageAll: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsReimageAllOptionalParams,
    ) => {
      const poller = reimageAll(context, resourceGroupName, vmScaleSetName, instanceId, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReimageAllAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsReimageAllOptionalParams,
    ) => {
      return await reimageAll(context, resourceGroupName, vmScaleSetName, instanceId, options);
    },
    reimage: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsReimageOptionalParams,
    ) => reimage(context, resourceGroupName, vmScaleSetName, instanceId, options),
    beginReimage: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsReimageOptionalParams,
    ) => {
      const poller = reimage(context, resourceGroupName, vmScaleSetName, instanceId, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReimageAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsReimageOptionalParams,
    ) => {
      return await reimage(context, resourceGroupName, vmScaleSetName, instanceId, options);
    },
    getInstanceView: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsGetInstanceViewOptionalParams,
    ) => getInstanceView(context, resourceGroupName, vmScaleSetName, instanceId, options),
    deallocate: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsDeallocateOptionalParams,
    ) => deallocate(context, resourceGroupName, vmScaleSetName, instanceId, options),
    beginDeallocate: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsDeallocateOptionalParams,
    ) => {
      const poller = deallocate(context, resourceGroupName, vmScaleSetName, instanceId, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeallocateAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsDeallocateOptionalParams,
    ) => {
      return await deallocate(context, resourceGroupName, vmScaleSetName, instanceId, options);
    },
    approveRollingUpgrade: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsApproveRollingUpgradeOptionalParams,
    ) => approveRollingUpgrade(context, resourceGroupName, vmScaleSetName, instanceId, options),
    beginApproveRollingUpgrade: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsApproveRollingUpgradeOptionalParams,
    ) => {
      const poller = approveRollingUpgrade(
        context,
        resourceGroupName,
        vmScaleSetName,
        instanceId,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginApproveRollingUpgradeAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsApproveRollingUpgradeOptionalParams,
    ) => {
      return await approveRollingUpgrade(
        context,
        resourceGroupName,
        vmScaleSetName,
        instanceId,
        options,
      );
    },
    list: (
      resourceGroupName: string,
      virtualMachineScaleSetName: string,
      options?: VirtualMachineScaleSetVMsListOptionalParams,
    ) => list(context, resourceGroupName, virtualMachineScaleSetName, options),
    delete: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, vmScaleSetName, instanceId, options),
    beginDelete: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, vmScaleSetName, instanceId, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, vmScaleSetName, instanceId, options);
    },
    update: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      parameters: VirtualMachineScaleSetVM,
      options?: VirtualMachineScaleSetVMsUpdateOptionalParams,
    ) => update(context, resourceGroupName, vmScaleSetName, instanceId, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      parameters: VirtualMachineScaleSetVM,
      options?: VirtualMachineScaleSetVMsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        vmScaleSetName,
        instanceId,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      parameters: VirtualMachineScaleSetVM,
      options?: VirtualMachineScaleSetVMsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        vmScaleSetName,
        instanceId,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMsGetOptionalParams,
    ) => get(context, resourceGroupName, vmScaleSetName, instanceId, options),
  };
}

export function _getVirtualMachineScaleSetVMsOperations(
  context: ComputeManagementContext,
): VirtualMachineScaleSetVMsOperations {
  return {
    ..._getVirtualMachineScaleSetVMs(context),
  };
}
