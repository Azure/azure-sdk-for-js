// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import {
  listByLocation,
  migrateToVMScaleSet,
  runCommand,
  listAvailableSizes,
  start,
  simulateEviction,
  retrieveBootDiagnosticsData,
  restart,
  reimage,
  redeploy,
  reapply,
  powerOff,
  performMaintenance,
  instanceView,
  installPatches,
  generalize,
  deallocate,
  convertToManagedDisks,
  capture,
  attachDetachDataDisks,
  assessPatches,
  listAll,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/virtualMachines/operations.js";
import type {
  VirtualMachinesListByLocationOptionalParams,
  VirtualMachinesMigrateToVMScaleSetOptionalParams,
  VirtualMachinesRunCommandOptionalParams,
  VirtualMachinesListAvailableSizesOptionalParams,
  VirtualMachinesStartOptionalParams,
  VirtualMachinesSimulateEvictionOptionalParams,
  VirtualMachinesRetrieveBootDiagnosticsDataOptionalParams,
  VirtualMachinesRestartOptionalParams,
  VirtualMachinesReimageOptionalParams,
  VirtualMachinesRedeployOptionalParams,
  VirtualMachinesReapplyOptionalParams,
  VirtualMachinesPowerOffOptionalParams,
  VirtualMachinesPerformMaintenanceOptionalParams,
  VirtualMachinesInstanceViewOptionalParams,
  VirtualMachinesInstallPatchesOptionalParams,
  VirtualMachinesGeneralizeOptionalParams,
  VirtualMachinesDeallocateOptionalParams,
  VirtualMachinesConvertToManagedDisksOptionalParams,
  VirtualMachinesCaptureOptionalParams,
  VirtualMachinesAttachDetachDataDisksOptionalParams,
  VirtualMachinesAssessPatchesOptionalParams,
  VirtualMachinesListAllOptionalParams,
  VirtualMachinesListOptionalParams,
  VirtualMachinesDeleteOptionalParams,
  VirtualMachinesUpdateOptionalParams,
  VirtualMachinesCreateOrUpdateOptionalParams,
  VirtualMachinesGetOptionalParams,
} from "../../api/virtualMachines/options.js";
import type {
  VirtualMachine,
  StorageProfile,
  VirtualMachineInstanceView,
  VirtualMachineUpdate,
  VirtualMachineAssessPatchesResult,
  AttachDetachDataDisksRequest,
  VirtualMachineCaptureParameters,
  VirtualMachineCaptureResult,
  VirtualMachineInstallPatchesParameters,
  VirtualMachineInstallPatchesResult,
  RetrieveBootDiagnosticsDataResult,
  VirtualMachineSize,
  RunCommandInput,
  RunCommandResult,
} from "../../models/compute/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualMachines operations. */
export interface VirtualMachinesOperations {
  /** Gets all the virtual machines under the specified subscription for the specified location. */
  listByLocation: (
    location: string,
    options?: VirtualMachinesListByLocationOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachine>;
  /** Migrate a virtual machine from availability set to Flexible Virtual Machine Scale Set. */
  migrateToVMScaleSet: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesMigrateToVMScaleSetOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use migrateToVMScaleSet instead */
  beginMigrateToVMScaleSet: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesMigrateToVMScaleSetOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use migrateToVMScaleSet instead */
  beginMigrateToVMScaleSetAndWait: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesMigrateToVMScaleSetOptionalParams,
  ) => Promise<void>;
  /** Run command on the VM. */
  runCommand: (
    resourceGroupName: string,
    vmName: string,
    parameters: RunCommandInput,
    options?: VirtualMachinesRunCommandOptionalParams,
  ) => PollerLike<OperationState<RunCommandResult>, RunCommandResult>;
  /** @deprecated use runCommand instead */
  beginRunCommand: (
    resourceGroupName: string,
    vmName: string,
    parameters: RunCommandInput,
    options?: VirtualMachinesRunCommandOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RunCommandResult>, RunCommandResult>>;
  /** @deprecated use runCommand instead */
  beginRunCommandAndWait: (
    resourceGroupName: string,
    vmName: string,
    parameters: RunCommandInput,
    options?: VirtualMachinesRunCommandOptionalParams,
  ) => Promise<RunCommandResult>;
  /** Lists all available virtual machine sizes to which the specified virtual machine can be resized. */
  listAvailableSizes: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesListAvailableSizesOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachineSize>;
  /** The operation to start a virtual machine. */
  start: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesStartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use start instead */
  beginStart: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesStartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use start instead */
  beginStartAndWait: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesStartOptionalParams,
  ) => Promise<void>;
  /** The operation to simulate the eviction of spot virtual machine. */
  simulateEviction: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesSimulateEvictionOptionalParams,
  ) => Promise<void>;
  /** The operation to retrieve SAS URIs for a virtual machine's boot diagnostic logs. */
  retrieveBootDiagnosticsData: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesRetrieveBootDiagnosticsDataOptionalParams,
  ) => Promise<RetrieveBootDiagnosticsDataResult>;
  /** The operation to restart a virtual machine. */
  restart: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesRestartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use restart instead */
  beginRestart: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesRestartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use restart instead */
  beginRestartAndWait: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesRestartOptionalParams,
  ) => Promise<void>;
  /** Reimages (upgrade the operating system) a virtual machine which don't have a ephemeral OS disk, for virtual machines who have a ephemeral OS disk the virtual machine is reset to initial state. NOTE: The retaining of old OS disk depends on the value of deleteOption of OS disk. If deleteOption is detach, the old OS disk will be preserved after reimage. If deleteOption is delete, the old OS disk will be deleted after reimage. The deleteOption of the OS disk should be updated accordingly before performing the reimage. */
  reimage: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesReimageOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use reimage instead */
  beginReimage: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesReimageOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use reimage instead */
  beginReimageAndWait: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesReimageOptionalParams,
  ) => Promise<void>;
  /** Shuts down the virtual machine, moves it to a new node, and powers it back on. */
  redeploy: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesRedeployOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use redeploy instead */
  beginRedeploy: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesRedeployOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use redeploy instead */
  beginRedeployAndWait: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesRedeployOptionalParams,
  ) => Promise<void>;
  /** The operation to reapply a virtual machine's state. */
  reapply: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesReapplyOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use reapply instead */
  beginReapply: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesReapplyOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use reapply instead */
  beginReapplyAndWait: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesReapplyOptionalParams,
  ) => Promise<void>;
  /** The operation to power off (stop) a virtual machine. The virtual machine can be restarted with the same provisioned resources. You are still charged for this virtual machine. */
  powerOff: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesPowerOffOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use powerOff instead */
  beginPowerOff: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesPowerOffOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use powerOff instead */
  beginPowerOffAndWait: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesPowerOffOptionalParams,
  ) => Promise<void>;
  /** The operation to perform maintenance on a virtual machine. */
  performMaintenance: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesPerformMaintenanceOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use performMaintenance instead */
  beginPerformMaintenance: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesPerformMaintenanceOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use performMaintenance instead */
  beginPerformMaintenanceAndWait: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesPerformMaintenanceOptionalParams,
  ) => Promise<void>;
  /** Retrieves information about the run-time state of a virtual machine. */
  instanceView: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesInstanceViewOptionalParams,
  ) => Promise<VirtualMachineInstanceView>;
  /** Installs patches on the VM. */
  installPatches: (
    resourceGroupName: string,
    vmName: string,
    installPatchesInput: VirtualMachineInstallPatchesParameters,
    options?: VirtualMachinesInstallPatchesOptionalParams,
  ) => PollerLike<
    OperationState<VirtualMachineInstallPatchesResult>,
    VirtualMachineInstallPatchesResult
  >;
  /** @deprecated use installPatches instead */
  beginInstallPatches: (
    resourceGroupName: string,
    vmName: string,
    installPatchesInput: VirtualMachineInstallPatchesParameters,
    options?: VirtualMachinesInstallPatchesOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<VirtualMachineInstallPatchesResult>,
      VirtualMachineInstallPatchesResult
    >
  >;
  /** @deprecated use installPatches instead */
  beginInstallPatchesAndWait: (
    resourceGroupName: string,
    vmName: string,
    installPatchesInput: VirtualMachineInstallPatchesParameters,
    options?: VirtualMachinesInstallPatchesOptionalParams,
  ) => Promise<VirtualMachineInstallPatchesResult>;
  /** Sets the OS state of the virtual machine to generalized. It is recommended to sysprep the virtual machine before performing this operation. For Windows, please refer to [Create a managed image of a generalized VM in Azure](https://docs.microsoft.com/azure/virtual-machines/windows/capture-image-resource). For Linux, please refer to [How to create an image of a virtual machine or VHD](https://docs.microsoft.com/azure/virtual-machines/linux/capture-image). */
  generalize: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesGeneralizeOptionalParams,
  ) => Promise<void>;
  /** Shuts down the virtual machine and releases the compute resources. You are not billed for the compute resources that this virtual machine uses. */
  deallocate: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesDeallocateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deallocate instead */
  beginDeallocate: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesDeallocateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deallocate instead */
  beginDeallocateAndWait: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesDeallocateOptionalParams,
  ) => Promise<void>;
  /** Converts virtual machine disks from blob-based to managed disks. Virtual machine must be stop-deallocated before invoking this operation. */
  convertToManagedDisks: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesConvertToManagedDisksOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use convertToManagedDisks instead */
  beginConvertToManagedDisks: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesConvertToManagedDisksOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use convertToManagedDisks instead */
  beginConvertToManagedDisksAndWait: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesConvertToManagedDisksOptionalParams,
  ) => Promise<void>;
  /** Captures the VM by copying virtual hard disks of the VM and outputs a template that can be used to create similar VMs. */
  capture: (
    resourceGroupName: string,
    vmName: string,
    parameters: VirtualMachineCaptureParameters,
    options?: VirtualMachinesCaptureOptionalParams,
  ) => PollerLike<OperationState<VirtualMachineCaptureResult>, VirtualMachineCaptureResult>;
  /** @deprecated use capture instead */
  beginCapture: (
    resourceGroupName: string,
    vmName: string,
    parameters: VirtualMachineCaptureParameters,
    options?: VirtualMachinesCaptureOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<VirtualMachineCaptureResult>, VirtualMachineCaptureResult>
  >;
  /** @deprecated use capture instead */
  beginCaptureAndWait: (
    resourceGroupName: string,
    vmName: string,
    parameters: VirtualMachineCaptureParameters,
    options?: VirtualMachinesCaptureOptionalParams,
  ) => Promise<VirtualMachineCaptureResult>;
  /** Attach and detach data disks to/from the virtual machine. */
  attachDetachDataDisks: (
    resourceGroupName: string,
    vmName: string,
    parameters: AttachDetachDataDisksRequest,
    options?: VirtualMachinesAttachDetachDataDisksOptionalParams,
  ) => PollerLike<OperationState<StorageProfile>, StorageProfile>;
  /** @deprecated use attachDetachDataDisks instead */
  beginAttachDetachDataDisks: (
    resourceGroupName: string,
    vmName: string,
    parameters: AttachDetachDataDisksRequest,
    options?: VirtualMachinesAttachDetachDataDisksOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<StorageProfile>, StorageProfile>>;
  /** @deprecated use attachDetachDataDisks instead */
  beginAttachDetachDataDisksAndWait: (
    resourceGroupName: string,
    vmName: string,
    parameters: AttachDetachDataDisksRequest,
    options?: VirtualMachinesAttachDetachDataDisksOptionalParams,
  ) => Promise<StorageProfile>;
  /** Assess patches on the VM. */
  assessPatches: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesAssessPatchesOptionalParams,
  ) => PollerLike<
    OperationState<VirtualMachineAssessPatchesResult>,
    VirtualMachineAssessPatchesResult
  >;
  /** @deprecated use assessPatches instead */
  beginAssessPatches: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesAssessPatchesOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<VirtualMachineAssessPatchesResult>,
      VirtualMachineAssessPatchesResult
    >
  >;
  /** @deprecated use assessPatches instead */
  beginAssessPatchesAndWait: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesAssessPatchesOptionalParams,
  ) => Promise<VirtualMachineAssessPatchesResult>;
  /** Lists all of the virtual machines in the specified subscription. Use the nextLink property in the response to get the next page of virtual machines. */
  listAll: (
    options?: VirtualMachinesListAllOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachine>;
  /** Lists all of the virtual machines in the specified resource group. Use the nextLink property in the response to get the next page of virtual machines. */
  list: (
    resourceGroupName: string,
    options?: VirtualMachinesListOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachine>;
  /** The operation to delete a virtual machine. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesDeleteOptionalParams,
  ) => Promise<void>;
  /** The operation to update a virtual machine. */
  update: (
    resourceGroupName: string,
    vmName: string,
    parameters: VirtualMachineUpdate,
    options?: VirtualMachinesUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualMachine>, VirtualMachine>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    vmName: string,
    parameters: VirtualMachineUpdate,
    options?: VirtualMachinesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VirtualMachine>, VirtualMachine>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    vmName: string,
    parameters: VirtualMachineUpdate,
    options?: VirtualMachinesUpdateOptionalParams,
  ) => Promise<VirtualMachine>;
  /** The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation. */
  createOrUpdate: (
    resourceGroupName: string,
    vmName: string,
    parameters: VirtualMachine,
    options?: VirtualMachinesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualMachine>, VirtualMachine>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    vmName: string,
    parameters: VirtualMachine,
    options?: VirtualMachinesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VirtualMachine>, VirtualMachine>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    vmName: string,
    parameters: VirtualMachine,
    options?: VirtualMachinesCreateOrUpdateOptionalParams,
  ) => Promise<VirtualMachine>;
  /** Retrieves information about the model view or the instance view of a virtual machine. */
  get: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachinesGetOptionalParams,
  ) => Promise<VirtualMachine>;
}

function _getVirtualMachines(context: ComputeContext) {
  return {
    listByLocation: (location: string, options?: VirtualMachinesListByLocationOptionalParams) =>
      listByLocation(context, location, options),
    migrateToVMScaleSet: (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesMigrateToVMScaleSetOptionalParams,
    ) => migrateToVMScaleSet(context, resourceGroupName, vmName, options),
    beginMigrateToVMScaleSet: async (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesMigrateToVMScaleSetOptionalParams,
    ) => {
      const poller = migrateToVMScaleSet(context, resourceGroupName, vmName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMigrateToVMScaleSetAndWait: async (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesMigrateToVMScaleSetOptionalParams,
    ) => {
      return await migrateToVMScaleSet(context, resourceGroupName, vmName, options);
    },
    runCommand: (
      resourceGroupName: string,
      vmName: string,
      parameters: RunCommandInput,
      options?: VirtualMachinesRunCommandOptionalParams,
    ) => runCommand(context, resourceGroupName, vmName, parameters, options),
    beginRunCommand: async (
      resourceGroupName: string,
      vmName: string,
      parameters: RunCommandInput,
      options?: VirtualMachinesRunCommandOptionalParams,
    ) => {
      const poller = runCommand(context, resourceGroupName, vmName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRunCommandAndWait: async (
      resourceGroupName: string,
      vmName: string,
      parameters: RunCommandInput,
      options?: VirtualMachinesRunCommandOptionalParams,
    ) => {
      return await runCommand(context, resourceGroupName, vmName, parameters, options);
    },
    listAvailableSizes: (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesListAvailableSizesOptionalParams,
    ) => listAvailableSizes(context, resourceGroupName, vmName, options),
    start: (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesStartOptionalParams,
    ) => start(context, resourceGroupName, vmName, options),
    beginStart: async (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesStartOptionalParams,
    ) => {
      const poller = start(context, resourceGroupName, vmName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartAndWait: async (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesStartOptionalParams,
    ) => {
      return await start(context, resourceGroupName, vmName, options);
    },
    simulateEviction: (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesSimulateEvictionOptionalParams,
    ) => simulateEviction(context, resourceGroupName, vmName, options),
    retrieveBootDiagnosticsData: (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesRetrieveBootDiagnosticsDataOptionalParams,
    ) => retrieveBootDiagnosticsData(context, resourceGroupName, vmName, options),
    restart: (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesRestartOptionalParams,
    ) => restart(context, resourceGroupName, vmName, options),
    beginRestart: async (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesRestartOptionalParams,
    ) => {
      const poller = restart(context, resourceGroupName, vmName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestartAndWait: async (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesRestartOptionalParams,
    ) => {
      return await restart(context, resourceGroupName, vmName, options);
    },
    reimage: (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesReimageOptionalParams,
    ) => reimage(context, resourceGroupName, vmName, options),
    beginReimage: async (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesReimageOptionalParams,
    ) => {
      const poller = reimage(context, resourceGroupName, vmName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReimageAndWait: async (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesReimageOptionalParams,
    ) => {
      return await reimage(context, resourceGroupName, vmName, options);
    },
    redeploy: (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesRedeployOptionalParams,
    ) => redeploy(context, resourceGroupName, vmName, options),
    beginRedeploy: async (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesRedeployOptionalParams,
    ) => {
      const poller = redeploy(context, resourceGroupName, vmName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRedeployAndWait: async (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesRedeployOptionalParams,
    ) => {
      return await redeploy(context, resourceGroupName, vmName, options);
    },
    reapply: (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesReapplyOptionalParams,
    ) => reapply(context, resourceGroupName, vmName, options),
    beginReapply: async (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesReapplyOptionalParams,
    ) => {
      const poller = reapply(context, resourceGroupName, vmName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReapplyAndWait: async (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesReapplyOptionalParams,
    ) => {
      return await reapply(context, resourceGroupName, vmName, options);
    },
    powerOff: (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesPowerOffOptionalParams,
    ) => powerOff(context, resourceGroupName, vmName, options),
    beginPowerOff: async (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesPowerOffOptionalParams,
    ) => {
      const poller = powerOff(context, resourceGroupName, vmName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPowerOffAndWait: async (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesPowerOffOptionalParams,
    ) => {
      return await powerOff(context, resourceGroupName, vmName, options);
    },
    performMaintenance: (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesPerformMaintenanceOptionalParams,
    ) => performMaintenance(context, resourceGroupName, vmName, options),
    beginPerformMaintenance: async (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesPerformMaintenanceOptionalParams,
    ) => {
      const poller = performMaintenance(context, resourceGroupName, vmName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPerformMaintenanceAndWait: async (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesPerformMaintenanceOptionalParams,
    ) => {
      return await performMaintenance(context, resourceGroupName, vmName, options);
    },
    instanceView: (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesInstanceViewOptionalParams,
    ) => instanceView(context, resourceGroupName, vmName, options),
    installPatches: (
      resourceGroupName: string,
      vmName: string,
      installPatchesInput: VirtualMachineInstallPatchesParameters,
      options?: VirtualMachinesInstallPatchesOptionalParams,
    ) => installPatches(context, resourceGroupName, vmName, installPatchesInput, options),
    beginInstallPatches: async (
      resourceGroupName: string,
      vmName: string,
      installPatchesInput: VirtualMachineInstallPatchesParameters,
      options?: VirtualMachinesInstallPatchesOptionalParams,
    ) => {
      const poller = installPatches(
        context,
        resourceGroupName,
        vmName,
        installPatchesInput,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginInstallPatchesAndWait: async (
      resourceGroupName: string,
      vmName: string,
      installPatchesInput: VirtualMachineInstallPatchesParameters,
      options?: VirtualMachinesInstallPatchesOptionalParams,
    ) => {
      return await installPatches(context, resourceGroupName, vmName, installPatchesInput, options);
    },
    generalize: (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesGeneralizeOptionalParams,
    ) => generalize(context, resourceGroupName, vmName, options),
    deallocate: (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesDeallocateOptionalParams,
    ) => deallocate(context, resourceGroupName, vmName, options),
    beginDeallocate: async (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesDeallocateOptionalParams,
    ) => {
      const poller = deallocate(context, resourceGroupName, vmName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeallocateAndWait: async (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesDeallocateOptionalParams,
    ) => {
      return await deallocate(context, resourceGroupName, vmName, options);
    },
    convertToManagedDisks: (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesConvertToManagedDisksOptionalParams,
    ) => convertToManagedDisks(context, resourceGroupName, vmName, options),
    beginConvertToManagedDisks: async (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesConvertToManagedDisksOptionalParams,
    ) => {
      const poller = convertToManagedDisks(context, resourceGroupName, vmName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginConvertToManagedDisksAndWait: async (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesConvertToManagedDisksOptionalParams,
    ) => {
      return await convertToManagedDisks(context, resourceGroupName, vmName, options);
    },
    capture: (
      resourceGroupName: string,
      vmName: string,
      parameters: VirtualMachineCaptureParameters,
      options?: VirtualMachinesCaptureOptionalParams,
    ) => capture(context, resourceGroupName, vmName, parameters, options),
    beginCapture: async (
      resourceGroupName: string,
      vmName: string,
      parameters: VirtualMachineCaptureParameters,
      options?: VirtualMachinesCaptureOptionalParams,
    ) => {
      const poller = capture(context, resourceGroupName, vmName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCaptureAndWait: async (
      resourceGroupName: string,
      vmName: string,
      parameters: VirtualMachineCaptureParameters,
      options?: VirtualMachinesCaptureOptionalParams,
    ) => {
      return await capture(context, resourceGroupName, vmName, parameters, options);
    },
    attachDetachDataDisks: (
      resourceGroupName: string,
      vmName: string,
      parameters: AttachDetachDataDisksRequest,
      options?: VirtualMachinesAttachDetachDataDisksOptionalParams,
    ) => attachDetachDataDisks(context, resourceGroupName, vmName, parameters, options),
    beginAttachDetachDataDisks: async (
      resourceGroupName: string,
      vmName: string,
      parameters: AttachDetachDataDisksRequest,
      options?: VirtualMachinesAttachDetachDataDisksOptionalParams,
    ) => {
      const poller = attachDetachDataDisks(context, resourceGroupName, vmName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginAttachDetachDataDisksAndWait: async (
      resourceGroupName: string,
      vmName: string,
      parameters: AttachDetachDataDisksRequest,
      options?: VirtualMachinesAttachDetachDataDisksOptionalParams,
    ) => {
      return await attachDetachDataDisks(context, resourceGroupName, vmName, parameters, options);
    },
    assessPatches: (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesAssessPatchesOptionalParams,
    ) => assessPatches(context, resourceGroupName, vmName, options),
    beginAssessPatches: async (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesAssessPatchesOptionalParams,
    ) => {
      const poller = assessPatches(context, resourceGroupName, vmName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginAssessPatchesAndWait: async (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesAssessPatchesOptionalParams,
    ) => {
      return await assessPatches(context, resourceGroupName, vmName, options);
    },
    listAll: (options?: VirtualMachinesListAllOptionalParams) => listAll(context, options),
    list: (resourceGroupName: string, options?: VirtualMachinesListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, vmName, options),
    beginDelete: async (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, vmName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachinesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, vmName, options);
    },
    update: (
      resourceGroupName: string,
      vmName: string,
      parameters: VirtualMachineUpdate,
      options?: VirtualMachinesUpdateOptionalParams,
    ) => update(context, resourceGroupName, vmName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      vmName: string,
      parameters: VirtualMachineUpdate,
      options?: VirtualMachinesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, vmName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      vmName: string,
      parameters: VirtualMachineUpdate,
      options?: VirtualMachinesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, vmName, parameters, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      vmName: string,
      parameters: VirtualMachine,
      options?: VirtualMachinesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, vmName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      vmName: string,
      parameters: VirtualMachine,
      options?: VirtualMachinesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, vmName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      vmName: string,
      parameters: VirtualMachine,
      options?: VirtualMachinesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, vmName, parameters, options);
    },
    get: (resourceGroupName: string, vmName: string, options?: VirtualMachinesGetOptionalParams) =>
      get(context, resourceGroupName, vmName, options),
  };
}

export function _getVirtualMachinesOperations(context: ComputeContext): VirtualMachinesOperations {
  return {
    ..._getVirtualMachines(context),
  };
}
