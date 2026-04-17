// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import {
  listByLocation,
  scaleOut,
  start,
  listSkus,
  setOrchestrationServiceState,
  restart,
  reimageAll,
  reimage,
  redeploy,
  reapply,
  powerOff,
  performMaintenance,
  getOSUpgradeHistory,
  updateInstances,
  getInstanceView,
  forceRecoveryServiceFabricPlatformUpdateDomainWalk,
  deleteInstances,
  deallocate,
  convertToSinglePlacementGroup,
  approveRollingUpgrade,
  listAll,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/virtualMachineScaleSets/operations.js";
import type {
  VirtualMachineScaleSetsListByLocationOptionalParams,
  VirtualMachineScaleSetsScaleOutOptionalParams,
  VirtualMachineScaleSetsStartOptionalParams,
  VirtualMachineScaleSetsListSkusOptionalParams,
  VirtualMachineScaleSetsSetOrchestrationServiceStateOptionalParams,
  VirtualMachineScaleSetsRestartOptionalParams,
  VirtualMachineScaleSetsReimageAllOptionalParams,
  VirtualMachineScaleSetsReimageOptionalParams,
  VirtualMachineScaleSetsRedeployOptionalParams,
  VirtualMachineScaleSetsReapplyOptionalParams,
  VirtualMachineScaleSetsPowerOffOptionalParams,
  VirtualMachineScaleSetsPerformMaintenanceOptionalParams,
  VirtualMachineScaleSetsGetOSUpgradeHistoryOptionalParams,
  VirtualMachineScaleSetsUpdateInstancesOptionalParams,
  VirtualMachineScaleSetsGetInstanceViewOptionalParams,
  VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkOptionalParams,
  VirtualMachineScaleSetsDeleteInstancesOptionalParams,
  VirtualMachineScaleSetsDeallocateOptionalParams,
  VirtualMachineScaleSetsConvertToSinglePlacementGroupOptionalParams,
  VirtualMachineScaleSetsApproveRollingUpgradeOptionalParams,
  VirtualMachineScaleSetsListAllOptionalParams,
  VirtualMachineScaleSetsListOptionalParams,
  VirtualMachineScaleSetsDeleteOptionalParams,
  VirtualMachineScaleSetsUpdateOptionalParams,
  VirtualMachineScaleSetsCreateOrUpdateOptionalParams,
  VirtualMachineScaleSetsGetOptionalParams,
} from "../../api/virtualMachineScaleSets/options.js";
import type {
  VirtualMachineScaleSet,
  VirtualMachineScaleSetUpdate,
  VMScaleSetConvertToSinglePlacementGroupInput,
  VirtualMachineScaleSetVMInstanceRequiredIDs,
  RecoveryWalkResponse,
  VirtualMachineScaleSetInstanceView,
  UpgradeOperationHistoricalStatusInfo,
  OrchestrationServiceStateInput,
  VirtualMachineScaleSetSku,
  VMScaleSetScaleOutInput,
} from "../../models/compute/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualMachineScaleSets operations. */
export interface VirtualMachineScaleSetsOperations {
  /** Gets all the VM scale sets under the specified subscription for the specified location. */
  listByLocation: (
    location: string,
    options?: VirtualMachineScaleSetsListByLocationOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachineScaleSet>;
  /** Scales out one or more virtual machines in a VM scale set. */
  scaleOut: (
    resourceGroupName: string,
    vmScaleSetName: string,
    parameters: VMScaleSetScaleOutInput,
    options?: VirtualMachineScaleSetsScaleOutOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use scaleOut instead */
  beginScaleOut: (
    resourceGroupName: string,
    vmScaleSetName: string,
    parameters: VMScaleSetScaleOutInput,
    options?: VirtualMachineScaleSetsScaleOutOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use scaleOut instead */
  beginScaleOutAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    parameters: VMScaleSetScaleOutInput,
    options?: VirtualMachineScaleSetsScaleOutOptionalParams,
  ) => Promise<void>;
  /** Starts one or more virtual machines in a VM scale set. */
  start: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsStartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use start instead */
  beginStart: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsStartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use start instead */
  beginStartAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsStartOptionalParams,
  ) => Promise<void>;
  /** Gets a list of SKUs available for your VM scale set, including the minimum and maximum VM instances allowed for each SKU. */
  listSkus: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsListSkusOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachineScaleSetSku>;
  /** Changes ServiceState property for a given service */
  setOrchestrationServiceState: (
    resourceGroupName: string,
    vmScaleSetName: string,
    parameters: OrchestrationServiceStateInput,
    options?: VirtualMachineScaleSetsSetOrchestrationServiceStateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use setOrchestrationServiceState instead */
  beginSetOrchestrationServiceState: (
    resourceGroupName: string,
    vmScaleSetName: string,
    parameters: OrchestrationServiceStateInput,
    options?: VirtualMachineScaleSetsSetOrchestrationServiceStateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use setOrchestrationServiceState instead */
  beginSetOrchestrationServiceStateAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    parameters: OrchestrationServiceStateInput,
    options?: VirtualMachineScaleSetsSetOrchestrationServiceStateOptionalParams,
  ) => Promise<void>;
  /** Restarts one or more virtual machines in a VM scale set. */
  restart: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsRestartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use restart instead */
  beginRestart: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsRestartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use restart instead */
  beginRestartAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsRestartOptionalParams,
  ) => Promise<void>;
  /** Reimages all the disks ( including data disks ) in the virtual machines in a VM scale set. This operation is only supported for managed disks. */
  reimageAll: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsReimageAllOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use reimageAll instead */
  beginReimageAll: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsReimageAllOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use reimageAll instead */
  beginReimageAllAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsReimageAllOptionalParams,
  ) => Promise<void>;
  /** Reimages (upgrade the operating system) one or more virtual machines in a VM scale set which don't have a ephemeral OS disk, for virtual machines who have a ephemeral OS disk the virtual machine is reset to initial state. */
  reimage: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsReimageOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use reimage instead */
  beginReimage: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsReimageOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use reimage instead */
  beginReimageAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsReimageOptionalParams,
  ) => Promise<void>;
  /** Shuts down all the virtual machines in the virtual machine scale set, moves them to a new node, and powers them back on. */
  redeploy: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsRedeployOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use redeploy instead */
  beginRedeploy: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsRedeployOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use redeploy instead */
  beginRedeployAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsRedeployOptionalParams,
  ) => Promise<void>;
  /** Reapplies the Virtual Machine Scale Set Virtual Machine Profile to the Virtual Machine Instances */
  reapply: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsReapplyOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use reapply instead */
  beginReapply: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsReapplyOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use reapply instead */
  beginReapplyAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsReapplyOptionalParams,
  ) => Promise<void>;
  /** Power off (stop) one or more virtual machines in a VM scale set. Note that resources are still attached and you are getting charged for the resources. Instead, use deallocate to release resources and avoid charges. */
  powerOff: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsPowerOffOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use powerOff instead */
  beginPowerOff: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsPowerOffOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use powerOff instead */
  beginPowerOffAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsPowerOffOptionalParams,
  ) => Promise<void>;
  /** Perform maintenance on one or more virtual machines in a VM scale set. Operation on instances which are not eligible for perform maintenance will be failed. Please refer to best practices for more details: https://docs.microsoft.com/azure/virtual-machine-scale-sets/virtual-machine-scale-sets-maintenance-notifications */
  performMaintenance: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsPerformMaintenanceOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use performMaintenance instead */
  beginPerformMaintenance: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsPerformMaintenanceOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use performMaintenance instead */
  beginPerformMaintenanceAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsPerformMaintenanceOptionalParams,
  ) => Promise<void>;
  /** Gets list of OS upgrades on a VM scale set instance. */
  getOSUpgradeHistory: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsGetOSUpgradeHistoryOptionalParams,
  ) => PagedAsyncIterableIterator<UpgradeOperationHistoricalStatusInfo>;
  /** Upgrades one or more virtual machines to the latest SKU set in the VM scale set model. */
  updateInstances: (
    resourceGroupName: string,
    vmScaleSetName: string,
    vmInstanceIDs: VirtualMachineScaleSetVMInstanceRequiredIDs,
    options?: VirtualMachineScaleSetsUpdateInstancesOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use updateInstances instead */
  beginUpdateInstances: (
    resourceGroupName: string,
    vmScaleSetName: string,
    vmInstanceIDs: VirtualMachineScaleSetVMInstanceRequiredIDs,
    options?: VirtualMachineScaleSetsUpdateInstancesOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use updateInstances instead */
  beginUpdateInstancesAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    vmInstanceIDs: VirtualMachineScaleSetVMInstanceRequiredIDs,
    options?: VirtualMachineScaleSetsUpdateInstancesOptionalParams,
  ) => Promise<void>;
  /** Gets the status of a VM scale set instance. */
  getInstanceView: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsGetInstanceViewOptionalParams,
  ) => Promise<VirtualMachineScaleSetInstanceView>;
  /** Manual platform update domain walk to update virtual machines in a service fabric virtual machine scale set. */
  forceRecoveryServiceFabricPlatformUpdateDomainWalk: (
    resourceGroupName: string,
    vmScaleSetName: string,
    platformUpdateDomain: number,
    options?: VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkOptionalParams,
  ) => Promise<RecoveryWalkResponse>;
  /** Deletes virtual machines in a VM scale set. */
  deleteInstances: (
    resourceGroupName: string,
    vmScaleSetName: string,
    vmInstanceIDs: VirtualMachineScaleSetVMInstanceRequiredIDs,
    options?: VirtualMachineScaleSetsDeleteInstancesOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteInstances instead */
  beginDeleteInstances: (
    resourceGroupName: string,
    vmScaleSetName: string,
    vmInstanceIDs: VirtualMachineScaleSetVMInstanceRequiredIDs,
    options?: VirtualMachineScaleSetsDeleteInstancesOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteInstances instead */
  beginDeleteInstancesAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    vmInstanceIDs: VirtualMachineScaleSetVMInstanceRequiredIDs,
    options?: VirtualMachineScaleSetsDeleteInstancesOptionalParams,
  ) => Promise<void>;
  /** Deallocates specific virtual machines in a VM scale set. Shuts down the virtual machines and releases the compute resources. You are not billed for the compute resources that this virtual machine scale set deallocates. */
  deallocate: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsDeallocateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deallocate instead */
  beginDeallocate: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsDeallocateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deallocate instead */
  beginDeallocateAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsDeallocateOptionalParams,
  ) => Promise<void>;
  /** Converts SinglePlacementGroup property to false for a existing virtual machine scale set. */
  convertToSinglePlacementGroup: (
    resourceGroupName: string,
    vmScaleSetName: string,
    parameters: VMScaleSetConvertToSinglePlacementGroupInput,
    options?: VirtualMachineScaleSetsConvertToSinglePlacementGroupOptionalParams,
  ) => Promise<void>;
  /** Approve upgrade on deferred rolling upgrades for OS disks in the virtual machines in a VM scale set. */
  approveRollingUpgrade: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsApproveRollingUpgradeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use approveRollingUpgrade instead */
  beginApproveRollingUpgrade: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsApproveRollingUpgradeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use approveRollingUpgrade instead */
  beginApproveRollingUpgradeAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsApproveRollingUpgradeOptionalParams,
  ) => Promise<void>;
  /** Gets a list of all VM Scale Sets in the subscription, regardless of the associated resource group. Use nextLink property in the response to get the next page of VM Scale Sets. Do this till nextLink is null to fetch all the VM Scale Sets. */
  listAll: (
    options?: VirtualMachineScaleSetsListAllOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachineScaleSet>;
  /** Gets a list of all VM scale sets under a resource group. */
  list: (
    resourceGroupName: string,
    options?: VirtualMachineScaleSetsListOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachineScaleSet>;
  /** Deletes a VM scale set. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a VM scale set. */
  update: (
    resourceGroupName: string,
    vmScaleSetName: string,
    parameters: VirtualMachineScaleSetUpdate,
    options?: VirtualMachineScaleSetsUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualMachineScaleSet>, VirtualMachineScaleSet>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    vmScaleSetName: string,
    parameters: VirtualMachineScaleSetUpdate,
    options?: VirtualMachineScaleSetsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VirtualMachineScaleSet>, VirtualMachineScaleSet>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    parameters: VirtualMachineScaleSetUpdate,
    options?: VirtualMachineScaleSetsUpdateOptionalParams,
  ) => Promise<VirtualMachineScaleSet>;
  /** Create or update a VM scale set. */
  createOrUpdate: (
    resourceGroupName: string,
    vmScaleSetName: string,
    parameters: VirtualMachineScaleSet,
    options?: VirtualMachineScaleSetsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualMachineScaleSet>, VirtualMachineScaleSet>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    vmScaleSetName: string,
    parameters: VirtualMachineScaleSet,
    options?: VirtualMachineScaleSetsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VirtualMachineScaleSet>, VirtualMachineScaleSet>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    parameters: VirtualMachineScaleSet,
    options?: VirtualMachineScaleSetsCreateOrUpdateOptionalParams,
  ) => Promise<VirtualMachineScaleSet>;
  /** Display information about a virtual machine scale set. */
  get: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsGetOptionalParams,
  ) => Promise<VirtualMachineScaleSet>;
}

function _getVirtualMachineScaleSets(context: ComputeContext) {
  return {
    listByLocation: (
      location: string,
      options?: VirtualMachineScaleSetsListByLocationOptionalParams,
    ) => listByLocation(context, location, options),
    scaleOut: (
      resourceGroupName: string,
      vmScaleSetName: string,
      parameters: VMScaleSetScaleOutInput,
      options?: VirtualMachineScaleSetsScaleOutOptionalParams,
    ) => scaleOut(context, resourceGroupName, vmScaleSetName, parameters, options),
    beginScaleOut: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      parameters: VMScaleSetScaleOutInput,
      options?: VirtualMachineScaleSetsScaleOutOptionalParams,
    ) => {
      const poller = scaleOut(context, resourceGroupName, vmScaleSetName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginScaleOutAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      parameters: VMScaleSetScaleOutInput,
      options?: VirtualMachineScaleSetsScaleOutOptionalParams,
    ) => {
      return await scaleOut(context, resourceGroupName, vmScaleSetName, parameters, options);
    },
    start: (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsStartOptionalParams,
    ) => start(context, resourceGroupName, vmScaleSetName, options),
    beginStart: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsStartOptionalParams,
    ) => {
      const poller = start(context, resourceGroupName, vmScaleSetName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsStartOptionalParams,
    ) => {
      return await start(context, resourceGroupName, vmScaleSetName, options);
    },
    listSkus: (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsListSkusOptionalParams,
    ) => listSkus(context, resourceGroupName, vmScaleSetName, options),
    setOrchestrationServiceState: (
      resourceGroupName: string,
      vmScaleSetName: string,
      parameters: OrchestrationServiceStateInput,
      options?: VirtualMachineScaleSetsSetOrchestrationServiceStateOptionalParams,
    ) =>
      setOrchestrationServiceState(context, resourceGroupName, vmScaleSetName, parameters, options),
    beginSetOrchestrationServiceState: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      parameters: OrchestrationServiceStateInput,
      options?: VirtualMachineScaleSetsSetOrchestrationServiceStateOptionalParams,
    ) => {
      const poller = setOrchestrationServiceState(
        context,
        resourceGroupName,
        vmScaleSetName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginSetOrchestrationServiceStateAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      parameters: OrchestrationServiceStateInput,
      options?: VirtualMachineScaleSetsSetOrchestrationServiceStateOptionalParams,
    ) => {
      return await setOrchestrationServiceState(
        context,
        resourceGroupName,
        vmScaleSetName,
        parameters,
        options,
      );
    },
    restart: (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsRestartOptionalParams,
    ) => restart(context, resourceGroupName, vmScaleSetName, options),
    beginRestart: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsRestartOptionalParams,
    ) => {
      const poller = restart(context, resourceGroupName, vmScaleSetName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestartAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsRestartOptionalParams,
    ) => {
      return await restart(context, resourceGroupName, vmScaleSetName, options);
    },
    reimageAll: (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsReimageAllOptionalParams,
    ) => reimageAll(context, resourceGroupName, vmScaleSetName, options),
    beginReimageAll: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsReimageAllOptionalParams,
    ) => {
      const poller = reimageAll(context, resourceGroupName, vmScaleSetName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReimageAllAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsReimageAllOptionalParams,
    ) => {
      return await reimageAll(context, resourceGroupName, vmScaleSetName, options);
    },
    reimage: (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsReimageOptionalParams,
    ) => reimage(context, resourceGroupName, vmScaleSetName, options),
    beginReimage: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsReimageOptionalParams,
    ) => {
      const poller = reimage(context, resourceGroupName, vmScaleSetName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReimageAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsReimageOptionalParams,
    ) => {
      return await reimage(context, resourceGroupName, vmScaleSetName, options);
    },
    redeploy: (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsRedeployOptionalParams,
    ) => redeploy(context, resourceGroupName, vmScaleSetName, options),
    beginRedeploy: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsRedeployOptionalParams,
    ) => {
      const poller = redeploy(context, resourceGroupName, vmScaleSetName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRedeployAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsRedeployOptionalParams,
    ) => {
      return await redeploy(context, resourceGroupName, vmScaleSetName, options);
    },
    reapply: (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsReapplyOptionalParams,
    ) => reapply(context, resourceGroupName, vmScaleSetName, options),
    beginReapply: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsReapplyOptionalParams,
    ) => {
      const poller = reapply(context, resourceGroupName, vmScaleSetName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReapplyAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsReapplyOptionalParams,
    ) => {
      return await reapply(context, resourceGroupName, vmScaleSetName, options);
    },
    powerOff: (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsPowerOffOptionalParams,
    ) => powerOff(context, resourceGroupName, vmScaleSetName, options),
    beginPowerOff: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsPowerOffOptionalParams,
    ) => {
      const poller = powerOff(context, resourceGroupName, vmScaleSetName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPowerOffAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsPowerOffOptionalParams,
    ) => {
      return await powerOff(context, resourceGroupName, vmScaleSetName, options);
    },
    performMaintenance: (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsPerformMaintenanceOptionalParams,
    ) => performMaintenance(context, resourceGroupName, vmScaleSetName, options),
    beginPerformMaintenance: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsPerformMaintenanceOptionalParams,
    ) => {
      const poller = performMaintenance(context, resourceGroupName, vmScaleSetName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPerformMaintenanceAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsPerformMaintenanceOptionalParams,
    ) => {
      return await performMaintenance(context, resourceGroupName, vmScaleSetName, options);
    },
    getOSUpgradeHistory: (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsGetOSUpgradeHistoryOptionalParams,
    ) => getOSUpgradeHistory(context, resourceGroupName, vmScaleSetName, options),
    updateInstances: (
      resourceGroupName: string,
      vmScaleSetName: string,
      vmInstanceIDs: VirtualMachineScaleSetVMInstanceRequiredIDs,
      options?: VirtualMachineScaleSetsUpdateInstancesOptionalParams,
    ) => updateInstances(context, resourceGroupName, vmScaleSetName, vmInstanceIDs, options),
    beginUpdateInstances: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      vmInstanceIDs: VirtualMachineScaleSetVMInstanceRequiredIDs,
      options?: VirtualMachineScaleSetsUpdateInstancesOptionalParams,
    ) => {
      const poller = updateInstances(
        context,
        resourceGroupName,
        vmScaleSetName,
        vmInstanceIDs,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateInstancesAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      vmInstanceIDs: VirtualMachineScaleSetVMInstanceRequiredIDs,
      options?: VirtualMachineScaleSetsUpdateInstancesOptionalParams,
    ) => {
      return await updateInstances(
        context,
        resourceGroupName,
        vmScaleSetName,
        vmInstanceIDs,
        options,
      );
    },
    getInstanceView: (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsGetInstanceViewOptionalParams,
    ) => getInstanceView(context, resourceGroupName, vmScaleSetName, options),
    forceRecoveryServiceFabricPlatformUpdateDomainWalk: (
      resourceGroupName: string,
      vmScaleSetName: string,
      platformUpdateDomain: number,
      options?: VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkOptionalParams,
    ) =>
      forceRecoveryServiceFabricPlatformUpdateDomainWalk(
        context,
        resourceGroupName,
        vmScaleSetName,
        platformUpdateDomain,
        options,
      ),
    deleteInstances: (
      resourceGroupName: string,
      vmScaleSetName: string,
      vmInstanceIDs: VirtualMachineScaleSetVMInstanceRequiredIDs,
      options?: VirtualMachineScaleSetsDeleteInstancesOptionalParams,
    ) => deleteInstances(context, resourceGroupName, vmScaleSetName, vmInstanceIDs, options),
    beginDeleteInstances: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      vmInstanceIDs: VirtualMachineScaleSetVMInstanceRequiredIDs,
      options?: VirtualMachineScaleSetsDeleteInstancesOptionalParams,
    ) => {
      const poller = deleteInstances(
        context,
        resourceGroupName,
        vmScaleSetName,
        vmInstanceIDs,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteInstancesAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      vmInstanceIDs: VirtualMachineScaleSetVMInstanceRequiredIDs,
      options?: VirtualMachineScaleSetsDeleteInstancesOptionalParams,
    ) => {
      return await deleteInstances(
        context,
        resourceGroupName,
        vmScaleSetName,
        vmInstanceIDs,
        options,
      );
    },
    deallocate: (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsDeallocateOptionalParams,
    ) => deallocate(context, resourceGroupName, vmScaleSetName, options),
    beginDeallocate: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsDeallocateOptionalParams,
    ) => {
      const poller = deallocate(context, resourceGroupName, vmScaleSetName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeallocateAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsDeallocateOptionalParams,
    ) => {
      return await deallocate(context, resourceGroupName, vmScaleSetName, options);
    },
    convertToSinglePlacementGroup: (
      resourceGroupName: string,
      vmScaleSetName: string,
      parameters: VMScaleSetConvertToSinglePlacementGroupInput,
      options?: VirtualMachineScaleSetsConvertToSinglePlacementGroupOptionalParams,
    ) =>
      convertToSinglePlacementGroup(
        context,
        resourceGroupName,
        vmScaleSetName,
        parameters,
        options,
      ),
    approveRollingUpgrade: (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsApproveRollingUpgradeOptionalParams,
    ) => approveRollingUpgrade(context, resourceGroupName, vmScaleSetName, options),
    beginApproveRollingUpgrade: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsApproveRollingUpgradeOptionalParams,
    ) => {
      const poller = approveRollingUpgrade(context, resourceGroupName, vmScaleSetName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginApproveRollingUpgradeAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsApproveRollingUpgradeOptionalParams,
    ) => {
      return await approveRollingUpgrade(context, resourceGroupName, vmScaleSetName, options);
    },
    listAll: (options?: VirtualMachineScaleSetsListAllOptionalParams) => listAll(context, options),
    list: (resourceGroupName: string, options?: VirtualMachineScaleSetsListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, vmScaleSetName, options),
    beginDelete: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, vmScaleSetName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, vmScaleSetName, options);
    },
    update: (
      resourceGroupName: string,
      vmScaleSetName: string,
      parameters: VirtualMachineScaleSetUpdate,
      options?: VirtualMachineScaleSetsUpdateOptionalParams,
    ) => update(context, resourceGroupName, vmScaleSetName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      parameters: VirtualMachineScaleSetUpdate,
      options?: VirtualMachineScaleSetsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, vmScaleSetName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      parameters: VirtualMachineScaleSetUpdate,
      options?: VirtualMachineScaleSetsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, vmScaleSetName, parameters, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      vmScaleSetName: string,
      parameters: VirtualMachineScaleSet,
      options?: VirtualMachineScaleSetsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, vmScaleSetName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      parameters: VirtualMachineScaleSet,
      options?: VirtualMachineScaleSetsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        vmScaleSetName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      parameters: VirtualMachineScaleSet,
      options?: VirtualMachineScaleSetsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, vmScaleSetName, parameters, options);
    },
    get: (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetsGetOptionalParams,
    ) => get(context, resourceGroupName, vmScaleSetName, options),
  };
}

export function _getVirtualMachineScaleSetsOperations(
  context: ComputeContext,
): VirtualMachineScaleSetsOperations {
  return {
    ..._getVirtualMachineScaleSets(context),
  };
}
