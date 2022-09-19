// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpResponse } from "@azure-rest/core-client";
import {
  ComputeOperationListResultOutput,
  CloudErrorOutput,
  ListUsagesResultOutput,
  VirtualMachineSizeListResultOutput,
  VirtualMachineScaleSetListResultOutput,
  VirtualMachineScaleSetOutput,
  VirtualMachineScaleSetInstanceViewOutput,
  VirtualMachineScaleSetListWithLinkResultOutput,
  VirtualMachineScaleSetListSkusResultOutput,
  VirtualMachineScaleSetListOSUpgradeHistoryOutput,
  RecoveryWalkResponseOutput,
  VirtualMachineScaleSetExtensionOutput,
  VirtualMachineScaleSetExtensionListResultOutput,
  RollingUpgradeStatusInfoOutput,
  VirtualMachineScaleSetVMExtensionOutput,
  VirtualMachineScaleSetVMExtensionsListResultOutput,
  VirtualMachineScaleSetVMOutput,
  VirtualMachineScaleSetVMInstanceViewOutput,
  VirtualMachineScaleSetVMListResultOutput,
  RetrieveBootDiagnosticsDataResultOutput,
  RunCommandResultOutput,
  VirtualMachineExtensionOutput,
  VirtualMachineExtensionsListResultOutput,
  VirtualMachineListResultOutput,
  VirtualMachineCaptureResultOutput,
  VirtualMachineOutput,
  VirtualMachineInstanceViewOutput,
  VirtualMachineAssessPatchesResultOutput,
  VirtualMachineInstallPatchesResultOutput,
  VirtualMachineImageOutput,
  VirtualMachineImageResourceOutput,
  VmImagesInEdgeZoneListResultOutput,
  VirtualMachineExtensionImageOutput,
  AvailabilitySetOutput,
  AvailabilitySetListResultOutput,
  ProximityPlacementGroupOutput,
  ProximityPlacementGroupListResultOutput,
  DedicatedHostGroupOutput,
  DedicatedHostGroupListResultOutput,
  DedicatedHostOutput,
  DedicatedHostListResultOutput,
  SshPublicKeysGroupListResultOutput,
  SshPublicKeyResourceOutput,
  SshPublicKeyGenerateKeyPairResultOutput,
  ImageOutput,
  ImageListResultOutput,
  RestorePointCollectionOutput,
  RestorePointCollectionListResultOutput,
  RestorePointOutput,
  CapacityReservationGroupOutput,
  CapacityReservationGroupListResultOutput,
  CapacityReservationOutput,
  CapacityReservationListResultOutput,
  LogAnalyticsOperationResultOutput,
  RunCommandListResultOutput,
  RunCommandDocumentOutput,
  VirtualMachineRunCommandOutput,
  VirtualMachineRunCommandsListResultOutput,
  DiskOutput,
  DiskListOutput,
  AccessUriOutput,
  DiskAccessOutput,
  DiskAccessListOutput,
  PrivateLinkResourceListResultOutput,
  PrivateEndpointConnectionOutput,
  PrivateEndpointConnectionListResultOutput,
  DiskEncryptionSetOutput,
  DiskEncryptionSetListOutput,
  ResourceUriListOutput,
  DiskRestorePointOutput,
  DiskRestorePointListOutput,
  SnapshotOutput,
  SnapshotListOutput,
  ResourceSkusResultOutput,
  GalleryOutput,
  GalleryListOutput,
  GalleryImageOutput,
  GalleryImageListOutput,
  GalleryImageVersionOutput,
  GalleryImageVersionListOutput,
  GalleryApplicationOutput,
  GalleryApplicationListOutput,
  GalleryApplicationVersionOutput,
  GalleryApplicationVersionListOutput,
  SharingUpdateOutput,
  SharedGalleryListOutput,
  SharedGalleryOutput,
  SharedGalleryImageListOutput,
  SharedGalleryImageOutput,
  SharedGalleryImageVersionListOutput,
  SharedGalleryImageVersionOutput,
  CommunityGalleryOutput,
  CommunityGalleryImageOutput,
  CommunityGalleryImageListOutput,
  CommunityGalleryImageVersionOutput,
  CommunityGalleryImageVersionListOutput,
  RoleInstanceOutput,
  RoleInstanceViewOutput,
  RoleInstanceListResultOutput,
  CloudServiceRoleOutput,
  CloudServiceRoleListResultOutput,
  CloudServiceOutput,
  CloudServiceInstanceViewOutput,
  CloudServiceListResultOutput,
  UpdateDomainOutput,
  UpdateDomainListResultOutput,
  OSVersionOutput,
  OSVersionListResultOutput,
  OSFamilyOutput,
  OSFamilyListResultOutput
} from "./outputModels";

/** Gets a list of compute operations. */
export interface OperationsList200Response extends HttpResponse {
  status: "200";
  body: ComputeOperationListResultOutput;
}

/** Gets a list of compute operations. */
export interface OperationsListdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets, for the specified location, the current compute resource usage information as well as the limits for compute resources under the subscription. */
export interface UsageList200Response extends HttpResponse {
  status: "200";
  body: ListUsagesResultOutput;
}

/** Gets, for the specified location, the current compute resource usage information as well as the limits for compute resources under the subscription. */
export interface UsageListdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** This API is deprecated. Use [Resources Skus](https://docs.microsoft.com/rest/api/compute/resourceskus/list) */
export interface VirtualMachineSizesList200Response extends HttpResponse {
  status: "200";
  body: VirtualMachineSizeListResultOutput;
}

/** This API is deprecated. Use [Resources Skus](https://docs.microsoft.com/rest/api/compute/resourceskus/list) */
export interface VirtualMachineSizesListdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the VM scale sets under the specified subscription for the specified location. */
export interface VirtualMachineScaleSetsListByLocation200Response
  extends HttpResponse {
  status: "200";
  body: VirtualMachineScaleSetListResultOutput;
}

/** Gets all the VM scale sets under the specified subscription for the specified location. */
export interface VirtualMachineScaleSetsListByLocationdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Create or update a VM scale set. */
export interface VirtualMachineScaleSetsCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: VirtualMachineScaleSetOutput;
}

/** Create or update a VM scale set. */
export interface VirtualMachineScaleSetsCreateOrUpdate201Response
  extends HttpResponse {
  status: "201";
  body: VirtualMachineScaleSetOutput;
}

/** Create or update a VM scale set. */
export interface VirtualMachineScaleSetsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Update a VM scale set. */
export interface VirtualMachineScaleSetsUpdate200Response extends HttpResponse {
  status: "200";
  body: VirtualMachineScaleSetOutput;
}

/** Update a VM scale set. */
export interface VirtualMachineScaleSetsUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a VM scale set. */
export interface VirtualMachineScaleSetsDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a VM scale set. */
export interface VirtualMachineScaleSetsDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deletes a VM scale set. */
export interface VirtualMachineScaleSetsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a VM scale set. */
export interface VirtualMachineScaleSetsDeletedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Display information about a virtual machine scale set. */
export interface VirtualMachineScaleSetsGet200Response extends HttpResponse {
  status: "200";
  body: VirtualMachineScaleSetOutput;
}

/** Display information about a virtual machine scale set. */
export interface VirtualMachineScaleSetsGetdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deallocates specific virtual machines in a VM scale set. Shuts down the virtual machines and releases the compute resources. You are not billed for the compute resources that this virtual machine scale set deallocates. */
export interface VirtualMachineScaleSetsDeallocate200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deallocates specific virtual machines in a VM scale set. Shuts down the virtual machines and releases the compute resources. You are not billed for the compute resources that this virtual machine scale set deallocates. */
export interface VirtualMachineScaleSetsDeallocate202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deallocates specific virtual machines in a VM scale set. Shuts down the virtual machines and releases the compute resources. You are not billed for the compute resources that this virtual machine scale set deallocates. */
export interface VirtualMachineScaleSetsDeallocatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes virtual machines in a VM scale set. */
export interface VirtualMachineScaleSetsDeleteInstances200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes virtual machines in a VM scale set. */
export interface VirtualMachineScaleSetsDeleteInstances202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deletes virtual machines in a VM scale set. */
export interface VirtualMachineScaleSetsDeleteInstancesdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the status of a VM scale set instance. */
export interface VirtualMachineScaleSetsGetInstanceView200Response
  extends HttpResponse {
  status: "200";
  body: VirtualMachineScaleSetInstanceViewOutput;
}

/** Gets the status of a VM scale set instance. */
export interface VirtualMachineScaleSetsGetInstanceViewdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a list of all VM scale sets under a resource group. */
export interface VirtualMachineScaleSetsList200Response extends HttpResponse {
  status: "200";
  body: VirtualMachineScaleSetListResultOutput;
}

/** Gets a list of all VM scale sets under a resource group. */
export interface VirtualMachineScaleSetsListdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a list of all VM Scale Sets in the subscription, regardless of the associated resource group. Use nextLink property in the response to get the next page of VM Scale Sets. Do this till nextLink is null to fetch all the VM Scale Sets. */
export interface VirtualMachineScaleSetsListAll200Response
  extends HttpResponse {
  status: "200";
  body: VirtualMachineScaleSetListWithLinkResultOutput;
}

/** Gets a list of all VM Scale Sets in the subscription, regardless of the associated resource group. Use nextLink property in the response to get the next page of VM Scale Sets. Do this till nextLink is null to fetch all the VM Scale Sets. */
export interface VirtualMachineScaleSetsListAlldefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a list of SKUs available for your VM scale set, including the minimum and maximum VM instances allowed for each SKU. */
export interface VirtualMachineScaleSetsListSkus200Response
  extends HttpResponse {
  status: "200";
  body: VirtualMachineScaleSetListSkusResultOutput;
}

/** Gets a list of SKUs available for your VM scale set, including the minimum and maximum VM instances allowed for each SKU. */
export interface VirtualMachineScaleSetsListSkusdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets list of OS upgrades on a VM scale set instance. */
export interface VirtualMachineScaleSetsGetOSUpgradeHistory200Response
  extends HttpResponse {
  status: "200";
  body: VirtualMachineScaleSetListOSUpgradeHistoryOutput;
}

/** Gets list of OS upgrades on a VM scale set instance. */
export interface VirtualMachineScaleSetsGetOSUpgradeHistorydefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Power off (stop) one or more virtual machines in a VM scale set. Note that resources are still attached and you are getting charged for the resources. Instead, use deallocate to release resources and avoid charges. */
export interface VirtualMachineScaleSetsPowerOff200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Power off (stop) one or more virtual machines in a VM scale set. Note that resources are still attached and you are getting charged for the resources. Instead, use deallocate to release resources and avoid charges. */
export interface VirtualMachineScaleSetsPowerOff202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Power off (stop) one or more virtual machines in a VM scale set. Note that resources are still attached and you are getting charged for the resources. Instead, use deallocate to release resources and avoid charges. */
export interface VirtualMachineScaleSetsPowerOffdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Restarts one or more virtual machines in a VM scale set. */
export interface VirtualMachineScaleSetsRestart200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Restarts one or more virtual machines in a VM scale set. */
export interface VirtualMachineScaleSetsRestart202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Restarts one or more virtual machines in a VM scale set. */
export interface VirtualMachineScaleSetsRestartdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Starts one or more virtual machines in a VM scale set. */
export interface VirtualMachineScaleSetsStart200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Starts one or more virtual machines in a VM scale set. */
export interface VirtualMachineScaleSetsStart202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Starts one or more virtual machines in a VM scale set. */
export interface VirtualMachineScaleSetsStartdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Shuts down all the virtual machines in the virtual machine scale set, moves them to a new node, and powers them back on. */
export interface VirtualMachineScaleSetsRedeploy200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Shuts down all the virtual machines in the virtual machine scale set, moves them to a new node, and powers them back on. */
export interface VirtualMachineScaleSetsRedeploy202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Shuts down all the virtual machines in the virtual machine scale set, moves them to a new node, and powers them back on. */
export interface VirtualMachineScaleSetsRedeploydefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Perform maintenance on one or more virtual machines in a VM scale set. Operation on instances which are not eligible for perform maintenance will be failed. Please refer to best practices for more details: https://docs.microsoft.com/azure/virtual-machine-scale-sets/virtual-machine-scale-sets-maintenance-notifications */
export interface VirtualMachineScaleSetsPerformMaintenance200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Perform maintenance on one or more virtual machines in a VM scale set. Operation on instances which are not eligible for perform maintenance will be failed. Please refer to best practices for more details: https://docs.microsoft.com/azure/virtual-machine-scale-sets/virtual-machine-scale-sets-maintenance-notifications */
export interface VirtualMachineScaleSetsPerformMaintenance202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Perform maintenance on one or more virtual machines in a VM scale set. Operation on instances which are not eligible for perform maintenance will be failed. Please refer to best practices for more details: https://docs.microsoft.com/azure/virtual-machine-scale-sets/virtual-machine-scale-sets-maintenance-notifications */
export interface VirtualMachineScaleSetsPerformMaintenancedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Upgrades one or more virtual machines to the latest SKU set in the VM scale set model. */
export interface VirtualMachineScaleSetsUpdateInstances200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Upgrades one or more virtual machines to the latest SKU set in the VM scale set model. */
export interface VirtualMachineScaleSetsUpdateInstances202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Upgrades one or more virtual machines to the latest SKU set in the VM scale set model. */
export interface VirtualMachineScaleSetsUpdateInstancesdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Reimages (upgrade the operating system) one or more virtual machines in a VM scale set which don't have a ephemeral OS disk, for virtual machines who have a ephemeral OS disk the virtual machine is reset to initial state. */
export interface VirtualMachineScaleSetsReimage200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Reimages (upgrade the operating system) one or more virtual machines in a VM scale set which don't have a ephemeral OS disk, for virtual machines who have a ephemeral OS disk the virtual machine is reset to initial state. */
export interface VirtualMachineScaleSetsReimage202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Reimages (upgrade the operating system) one or more virtual machines in a VM scale set which don't have a ephemeral OS disk, for virtual machines who have a ephemeral OS disk the virtual machine is reset to initial state. */
export interface VirtualMachineScaleSetsReimagedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Reimages all the disks ( including data disks ) in the virtual machines in a VM scale set. This operation is only supported for managed disks. */
export interface VirtualMachineScaleSetsReimageAll200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Reimages all the disks ( including data disks ) in the virtual machines in a VM scale set. This operation is only supported for managed disks. */
export interface VirtualMachineScaleSetsReimageAll202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Reimages all the disks ( including data disks ) in the virtual machines in a VM scale set. This operation is only supported for managed disks. */
export interface VirtualMachineScaleSetsReimageAlldefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Manual platform update domain walk to update virtual machines in a service fabric virtual machine scale set. */
export interface VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalk200Response
  extends HttpResponse {
  status: "200";
  body: RecoveryWalkResponseOutput;
}

/** Manual platform update domain walk to update virtual machines in a service fabric virtual machine scale set. */
export interface VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Converts SinglePlacementGroup property to false for a existing virtual machine scale set. */
export interface VirtualMachineScaleSetsConvertToSinglePlacementGroup200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Converts SinglePlacementGroup property to false for a existing virtual machine scale set. */
export interface VirtualMachineScaleSetsConvertToSinglePlacementGroupdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Changes ServiceState property for a given service */
export interface VirtualMachineScaleSetsSetOrchestrationServiceState200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Changes ServiceState property for a given service */
export interface VirtualMachineScaleSetsSetOrchestrationServiceState202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Changes ServiceState property for a given service */
export interface VirtualMachineScaleSetsSetOrchestrationServiceStatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to create or update an extension. */
export interface VirtualMachineScaleSetExtensionsCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: VirtualMachineScaleSetExtensionOutput;
}

/** The operation to create or update an extension. */
export interface VirtualMachineScaleSetExtensionsCreateOrUpdate201Response
  extends HttpResponse {
  status: "201";
  body: VirtualMachineScaleSetExtensionOutput;
}

/** The operation to create or update an extension. */
export interface VirtualMachineScaleSetExtensionsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to update an extension. */
export interface VirtualMachineScaleSetExtensionsUpdate200Response
  extends HttpResponse {
  status: "200";
  body: VirtualMachineScaleSetExtensionOutput;
}

/** The operation to update an extension. */
export interface VirtualMachineScaleSetExtensionsUpdate201Response
  extends HttpResponse {
  status: "201";
  body: VirtualMachineScaleSetExtensionOutput;
}

/** The operation to update an extension. */
export interface VirtualMachineScaleSetExtensionsUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to delete the extension. */
export interface VirtualMachineScaleSetExtensionsDelete200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** The operation to delete the extension. */
export interface VirtualMachineScaleSetExtensionsDelete202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** The operation to delete the extension. */
export interface VirtualMachineScaleSetExtensionsDelete204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** The operation to delete the extension. */
export interface VirtualMachineScaleSetExtensionsDeletedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to get the extension. */
export interface VirtualMachineScaleSetExtensionsGet200Response
  extends HttpResponse {
  status: "200";
  body: VirtualMachineScaleSetExtensionOutput;
}

/** The operation to get the extension. */
export interface VirtualMachineScaleSetExtensionsGetdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a list of all extensions in a VM scale set. */
export interface VirtualMachineScaleSetExtensionsList200Response
  extends HttpResponse {
  status: "200";
  body: VirtualMachineScaleSetExtensionListResultOutput;
}

/** Gets a list of all extensions in a VM scale set. */
export interface VirtualMachineScaleSetExtensionsListdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Cancels the current virtual machine scale set rolling upgrade. */
export interface VirtualMachineScaleSetRollingUpgradesCancel200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Cancels the current virtual machine scale set rolling upgrade. */
export interface VirtualMachineScaleSetRollingUpgradesCancel202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Cancels the current virtual machine scale set rolling upgrade. */
export interface VirtualMachineScaleSetRollingUpgradesCanceldefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Starts a rolling upgrade to move all virtual machine scale set instances to the latest available Platform Image OS version. Instances which are already running the latest available OS version are not affected. */
export interface VirtualMachineScaleSetRollingUpgradesStartOSUpgrade200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Starts a rolling upgrade to move all virtual machine scale set instances to the latest available Platform Image OS version. Instances which are already running the latest available OS version are not affected. */
export interface VirtualMachineScaleSetRollingUpgradesStartOSUpgrade202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Starts a rolling upgrade to move all virtual machine scale set instances to the latest available Platform Image OS version. Instances which are already running the latest available OS version are not affected. */
export interface VirtualMachineScaleSetRollingUpgradesStartOSUpgradedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Starts a rolling upgrade to move all extensions for all virtual machine scale set instances to the latest available extension version. Instances which are already running the latest extension versions are not affected. */
export interface VirtualMachineScaleSetRollingUpgradesStartExtensionUpgrade200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Starts a rolling upgrade to move all extensions for all virtual machine scale set instances to the latest available extension version. Instances which are already running the latest extension versions are not affected. */
export interface VirtualMachineScaleSetRollingUpgradesStartExtensionUpgrade202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Starts a rolling upgrade to move all extensions for all virtual machine scale set instances to the latest available extension version. Instances which are already running the latest extension versions are not affected. */
export interface VirtualMachineScaleSetRollingUpgradesStartExtensionUpgradedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the status of the latest virtual machine scale set rolling upgrade. */
export interface VirtualMachineScaleSetRollingUpgradesGetLatest200Response
  extends HttpResponse {
  status: "200";
  body: RollingUpgradeStatusInfoOutput;
}

/** Gets the status of the latest virtual machine scale set rolling upgrade. */
export interface VirtualMachineScaleSetRollingUpgradesGetLatestdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to create or update the VMSS VM extension. */
export interface VirtualMachineScaleSetVMExtensionsCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: VirtualMachineScaleSetVMExtensionOutput;
}

/** The operation to create or update the VMSS VM extension. */
export interface VirtualMachineScaleSetVMExtensionsCreateOrUpdate201Response
  extends HttpResponse {
  status: "201";
  body: VirtualMachineScaleSetVMExtensionOutput;
}

/** The operation to create or update the VMSS VM extension. */
export interface VirtualMachineScaleSetVMExtensionsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to update the VMSS VM extension. */
export interface VirtualMachineScaleSetVMExtensionsUpdate200Response
  extends HttpResponse {
  status: "200";
  body: VirtualMachineScaleSetVMExtensionOutput;
}

/** The operation to update the VMSS VM extension. */
export interface VirtualMachineScaleSetVMExtensionsUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to delete the VMSS VM extension. */
export interface VirtualMachineScaleSetVMExtensionsDelete200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** The operation to delete the VMSS VM extension. */
export interface VirtualMachineScaleSetVMExtensionsDelete202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** The operation to delete the VMSS VM extension. */
export interface VirtualMachineScaleSetVMExtensionsDelete204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** The operation to delete the VMSS VM extension. */
export interface VirtualMachineScaleSetVMExtensionsDeletedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to get the VMSS VM extension. */
export interface VirtualMachineScaleSetVMExtensionsGet200Response
  extends HttpResponse {
  status: "200";
  body: VirtualMachineScaleSetVMExtensionOutput;
}

/** The operation to get the VMSS VM extension. */
export interface VirtualMachineScaleSetVMExtensionsGetdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to get all extensions of an instance in Virtual Machine Scaleset. */
export interface VirtualMachineScaleSetVMExtensionsList200Response
  extends HttpResponse {
  status: "200";
  body: VirtualMachineScaleSetVMExtensionsListResultOutput;
}

/** The operation to get all extensions of an instance in Virtual Machine Scaleset. */
export interface VirtualMachineScaleSetVMExtensionsListdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Reimages (upgrade the operating system) a specific virtual machine in a VM scale set. */
export interface VirtualMachineScaleSetVMsReimage200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Reimages (upgrade the operating system) a specific virtual machine in a VM scale set. */
export interface VirtualMachineScaleSetVMsReimage202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Reimages (upgrade the operating system) a specific virtual machine in a VM scale set. */
export interface VirtualMachineScaleSetVMsReimagedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Allows you to re-image all the disks ( including data disks ) in the a VM scale set instance. This operation is only supported for managed disks. */
export interface VirtualMachineScaleSetVMsReimageAll200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Allows you to re-image all the disks ( including data disks ) in the a VM scale set instance. This operation is only supported for managed disks. */
export interface VirtualMachineScaleSetVMsReimageAll202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Allows you to re-image all the disks ( including data disks ) in the a VM scale set instance. This operation is only supported for managed disks. */
export interface VirtualMachineScaleSetVMsReimageAlldefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deallocates a specific virtual machine in a VM scale set. Shuts down the virtual machine and releases the compute resources it uses. You are not billed for the compute resources of this virtual machine once it is deallocated. */
export interface VirtualMachineScaleSetVMsDeallocate200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deallocates a specific virtual machine in a VM scale set. Shuts down the virtual machine and releases the compute resources it uses. You are not billed for the compute resources of this virtual machine once it is deallocated. */
export interface VirtualMachineScaleSetVMsDeallocate202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deallocates a specific virtual machine in a VM scale set. Shuts down the virtual machine and releases the compute resources it uses. You are not billed for the compute resources of this virtual machine once it is deallocated. */
export interface VirtualMachineScaleSetVMsDeallocatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates a virtual machine of a VM scale set. */
export interface VirtualMachineScaleSetVMsUpdate200Response
  extends HttpResponse {
  status: "200";
  body: VirtualMachineScaleSetVMOutput;
}

/** Updates a virtual machine of a VM scale set. */
export interface VirtualMachineScaleSetVMsUpdate202Response
  extends HttpResponse {
  status: "202";
  body: VirtualMachineScaleSetVMOutput;
}

/** Updates a virtual machine of a VM scale set. */
export interface VirtualMachineScaleSetVMsUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a virtual machine from a VM scale set. */
export interface VirtualMachineScaleSetVMsDelete200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a virtual machine from a VM scale set. */
export interface VirtualMachineScaleSetVMsDelete202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deletes a virtual machine from a VM scale set. */
export interface VirtualMachineScaleSetVMsDelete204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a virtual machine from a VM scale set. */
export interface VirtualMachineScaleSetVMsDeletedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a virtual machine from a VM scale set. */
export interface VirtualMachineScaleSetVMsGet200Response extends HttpResponse {
  status: "200";
  body: VirtualMachineScaleSetVMOutput;
}

/** Gets a virtual machine from a VM scale set. */
export interface VirtualMachineScaleSetVMsGetdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the status of a virtual machine from a VM scale set. */
export interface VirtualMachineScaleSetVMsGetInstanceView200Response
  extends HttpResponse {
  status: "200";
  body: VirtualMachineScaleSetVMInstanceViewOutput;
}

/** Gets the status of a virtual machine from a VM scale set. */
export interface VirtualMachineScaleSetVMsGetInstanceViewdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a list of all virtual machines in a VM scale sets. */
export interface VirtualMachineScaleSetVMsList200Response extends HttpResponse {
  status: "200";
  body: VirtualMachineScaleSetVMListResultOutput;
}

/** Gets a list of all virtual machines in a VM scale sets. */
export interface VirtualMachineScaleSetVMsListdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Power off (stop) a virtual machine in a VM scale set. Note that resources are still attached and you are getting charged for the resources. Instead, use deallocate to release resources and avoid charges. */
export interface VirtualMachineScaleSetVMsPowerOff200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Power off (stop) a virtual machine in a VM scale set. Note that resources are still attached and you are getting charged for the resources. Instead, use deallocate to release resources and avoid charges. */
export interface VirtualMachineScaleSetVMsPowerOff202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Power off (stop) a virtual machine in a VM scale set. Note that resources are still attached and you are getting charged for the resources. Instead, use deallocate to release resources and avoid charges. */
export interface VirtualMachineScaleSetVMsPowerOffdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Restarts a virtual machine in a VM scale set. */
export interface VirtualMachineScaleSetVMsRestart200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Restarts a virtual machine in a VM scale set. */
export interface VirtualMachineScaleSetVMsRestart202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Restarts a virtual machine in a VM scale set. */
export interface VirtualMachineScaleSetVMsRestartdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Starts a virtual machine in a VM scale set. */
export interface VirtualMachineScaleSetVMsStart200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Starts a virtual machine in a VM scale set. */
export interface VirtualMachineScaleSetVMsStart202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Starts a virtual machine in a VM scale set. */
export interface VirtualMachineScaleSetVMsStartdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Shuts down the virtual machine in the virtual machine scale set, moves it to a new node, and powers it back on. */
export interface VirtualMachineScaleSetVMsRedeploy200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Shuts down the virtual machine in the virtual machine scale set, moves it to a new node, and powers it back on. */
export interface VirtualMachineScaleSetVMsRedeploy202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Shuts down the virtual machine in the virtual machine scale set, moves it to a new node, and powers it back on. */
export interface VirtualMachineScaleSetVMsRedeploydefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to retrieve SAS URIs of boot diagnostic logs for a virtual machine in a VM scale set. */
export interface VirtualMachineScaleSetVMsRetrieveBootDiagnosticsData200Response
  extends HttpResponse {
  status: "200";
  body: RetrieveBootDiagnosticsDataResultOutput;
}

/** The operation to retrieve SAS URIs of boot diagnostic logs for a virtual machine in a VM scale set. */
export interface VirtualMachineScaleSetVMsRetrieveBootDiagnosticsDatadefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Performs maintenance on a virtual machine in a VM scale set. */
export interface VirtualMachineScaleSetVMsPerformMaintenance200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Performs maintenance on a virtual machine in a VM scale set. */
export interface VirtualMachineScaleSetVMsPerformMaintenance202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Performs maintenance on a virtual machine in a VM scale set. */
export interface VirtualMachineScaleSetVMsPerformMaintenancedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to simulate the eviction of spot virtual machine in a VM scale set. */
export interface VirtualMachineScaleSetVMsSimulateEviction204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** The operation to simulate the eviction of spot virtual machine in a VM scale set. */
export interface VirtualMachineScaleSetVMsSimulateEvictiondefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Run command on a virtual machine in a VM scale set. */
export interface VirtualMachineScaleSetVMsRunCommand200Response
  extends HttpResponse {
  status: "200";
  body: RunCommandResultOutput;
}

/** Run command on a virtual machine in a VM scale set. */
export interface VirtualMachineScaleSetVMsRunCommand202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** The operation to create or update the extension. */
export interface VirtualMachineExtensionsCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: VirtualMachineExtensionOutput;
}

/** The operation to create or update the extension. */
export interface VirtualMachineExtensionsCreateOrUpdate201Response
  extends HttpResponse {
  status: "201";
  body: VirtualMachineExtensionOutput;
}

/** The operation to create or update the extension. */
export interface VirtualMachineExtensionsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to update the extension. */
export interface VirtualMachineExtensionsUpdate200Response
  extends HttpResponse {
  status: "200";
  body: VirtualMachineExtensionOutput;
}

/** The operation to update the extension. */
export interface VirtualMachineExtensionsUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to delete the extension. */
export interface VirtualMachineExtensionsDelete200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** The operation to delete the extension. */
export interface VirtualMachineExtensionsDelete202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** The operation to delete the extension. */
export interface VirtualMachineExtensionsDelete204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** The operation to delete the extension. */
export interface VirtualMachineExtensionsDeletedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to get the extension. */
export interface VirtualMachineExtensionsGet200Response extends HttpResponse {
  status: "200";
  body: VirtualMachineExtensionOutput;
}

/** The operation to get the extension. */
export interface VirtualMachineExtensionsGetdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to get all extensions of a Virtual Machine. */
export interface VirtualMachineExtensionsList200Response extends HttpResponse {
  status: "200";
  body: VirtualMachineExtensionsListResultOutput;
}

/** The operation to get all extensions of a Virtual Machine. */
export interface VirtualMachineExtensionsListdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the virtual machines under the specified subscription for the specified location. */
export interface VirtualMachinesListByLocation200Response extends HttpResponse {
  status: "200";
  body: VirtualMachineListResultOutput;
}

/** Gets all the virtual machines under the specified subscription for the specified location. */
export interface VirtualMachinesListByLocationdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Captures the VM by copying virtual hard disks of the VM and outputs a template that can be used to create similar VMs. */
export interface VirtualMachinesCapture200Response extends HttpResponse {
  status: "200";
  body: VirtualMachineCaptureResultOutput;
}

/** Captures the VM by copying virtual hard disks of the VM and outputs a template that can be used to create similar VMs. */
export interface VirtualMachinesCapture202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Captures the VM by copying virtual hard disks of the VM and outputs a template that can be used to create similar VMs. */
export interface VirtualMachinesCapturedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation. */
export interface VirtualMachinesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: VirtualMachineOutput;
}

/** The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation. */
export interface VirtualMachinesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: VirtualMachineOutput;
}

/** The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation. */
export interface VirtualMachinesCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to update a virtual machine. */
export interface VirtualMachinesUpdate200Response extends HttpResponse {
  status: "200";
  body: VirtualMachineOutput;
}

/** The operation to update a virtual machine. */
export interface VirtualMachinesUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to delete a virtual machine. */
export interface VirtualMachinesDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** The operation to delete a virtual machine. */
export interface VirtualMachinesDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** The operation to delete a virtual machine. */
export interface VirtualMachinesDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** The operation to delete a virtual machine. */
export interface VirtualMachinesDeletedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves information about the model view or the instance view of a virtual machine. */
export interface VirtualMachinesGet200Response extends HttpResponse {
  status: "200";
  body: VirtualMachineOutput;
}

/** Retrieves information about the model view or the instance view of a virtual machine. */
export interface VirtualMachinesGetdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves information about the run-time state of a virtual machine. */
export interface VirtualMachinesInstanceView200Response extends HttpResponse {
  status: "200";
  body: VirtualMachineInstanceViewOutput;
}

/** Retrieves information about the run-time state of a virtual machine. */
export interface VirtualMachinesInstanceViewdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Converts virtual machine disks from blob-based to managed disks. Virtual machine must be stop-deallocated before invoking this operation. */
export interface VirtualMachinesConvertToManagedDisks200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Converts virtual machine disks from blob-based to managed disks. Virtual machine must be stop-deallocated before invoking this operation. */
export interface VirtualMachinesConvertToManagedDisks202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Converts virtual machine disks from blob-based to managed disks. Virtual machine must be stop-deallocated before invoking this operation. */
export interface VirtualMachinesConvertToManagedDisksdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Shuts down the virtual machine and releases the compute resources. You are not billed for the compute resources that this virtual machine uses. */
export interface VirtualMachinesDeallocate200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Shuts down the virtual machine and releases the compute resources. You are not billed for the compute resources that this virtual machine uses. */
export interface VirtualMachinesDeallocate202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Shuts down the virtual machine and releases the compute resources. You are not billed for the compute resources that this virtual machine uses. */
export interface VirtualMachinesDeallocatedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Sets the OS state of the virtual machine to generalized. It is recommended to sysprep the virtual machine before performing this operation. <br>For Windows, please refer to [Create a managed image of a generalized VM in Azure](https://docs.microsoft.com/azure/virtual-machines/windows/capture-image-resource).<br>For Linux, please refer to [How to create an image of a virtual machine or VHD](https://docs.microsoft.com/azure/virtual-machines/linux/capture-image). */
export interface VirtualMachinesGeneralize200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Sets the OS state of the virtual machine to generalized. It is recommended to sysprep the virtual machine before performing this operation. <br>For Windows, please refer to [Create a managed image of a generalized VM in Azure](https://docs.microsoft.com/azure/virtual-machines/windows/capture-image-resource).<br>For Linux, please refer to [How to create an image of a virtual machine or VHD](https://docs.microsoft.com/azure/virtual-machines/linux/capture-image). */
export interface VirtualMachinesGeneralizedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all of the virtual machines in the specified resource group. Use the nextLink property in the response to get the next page of virtual machines. */
export interface VirtualMachinesList200Response extends HttpResponse {
  status: "200";
  body: VirtualMachineListResultOutput;
}

/** Lists all of the virtual machines in the specified resource group. Use the nextLink property in the response to get the next page of virtual machines. */
export interface VirtualMachinesListdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all of the virtual machines in the specified subscription. Use the nextLink property in the response to get the next page of virtual machines. */
export interface VirtualMachinesListAll200Response extends HttpResponse {
  status: "200";
  body: VirtualMachineListResultOutput;
}

/** Lists all of the virtual machines in the specified subscription. Use the nextLink property in the response to get the next page of virtual machines. */
export interface VirtualMachinesListAlldefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all available virtual machine sizes to which the specified virtual machine can be resized. */
export interface VirtualMachinesListAvailableSizes200Response
  extends HttpResponse {
  status: "200";
  body: VirtualMachineSizeListResultOutput;
}

/** Lists all available virtual machine sizes to which the specified virtual machine can be resized. */
export interface VirtualMachinesListAvailableSizesdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to power off (stop) a virtual machine. The virtual machine can be restarted with the same provisioned resources. You are still charged for this virtual machine. */
export interface VirtualMachinesPowerOff200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** The operation to power off (stop) a virtual machine. The virtual machine can be restarted with the same provisioned resources. You are still charged for this virtual machine. */
export interface VirtualMachinesPowerOff202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** The operation to power off (stop) a virtual machine. The virtual machine can be restarted with the same provisioned resources. You are still charged for this virtual machine. */
export interface VirtualMachinesPowerOffdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to reapply a virtual machine's state. */
export interface VirtualMachinesReapply200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** The operation to reapply a virtual machine's state. */
export interface VirtualMachinesReapply202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** The operation to reapply a virtual machine's state. */
export interface VirtualMachinesReapplydefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to restart a virtual machine. */
export interface VirtualMachinesRestart200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** The operation to restart a virtual machine. */
export interface VirtualMachinesRestart202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** The operation to restart a virtual machine. */
export interface VirtualMachinesRestartdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to start a virtual machine. */
export interface VirtualMachinesStart200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** The operation to start a virtual machine. */
export interface VirtualMachinesStart202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** The operation to start a virtual machine. */
export interface VirtualMachinesStartdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Shuts down the virtual machine, moves it to a new node, and powers it back on. */
export interface VirtualMachinesRedeploy200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Shuts down the virtual machine, moves it to a new node, and powers it back on. */
export interface VirtualMachinesRedeploy202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Shuts down the virtual machine, moves it to a new node, and powers it back on. */
export interface VirtualMachinesRedeploydefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Reimages the virtual machine which has an ephemeral OS disk back to its initial state. */
export interface VirtualMachinesReimage200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Reimages the virtual machine which has an ephemeral OS disk back to its initial state. */
export interface VirtualMachinesReimage202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Reimages the virtual machine which has an ephemeral OS disk back to its initial state. */
export interface VirtualMachinesReimagedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to retrieve SAS URIs for a virtual machine's boot diagnostic logs. */
export interface VirtualMachinesRetrieveBootDiagnosticsData200Response
  extends HttpResponse {
  status: "200";
  body: RetrieveBootDiagnosticsDataResultOutput;
}

/** The operation to retrieve SAS URIs for a virtual machine's boot diagnostic logs. */
export interface VirtualMachinesRetrieveBootDiagnosticsDatadefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to perform maintenance on a virtual machine. */
export interface VirtualMachinesPerformMaintenance200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** The operation to perform maintenance on a virtual machine. */
export interface VirtualMachinesPerformMaintenance202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** The operation to perform maintenance on a virtual machine. */
export interface VirtualMachinesPerformMaintenancedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to simulate the eviction of spot virtual machine. */
export interface VirtualMachinesSimulateEviction204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** The operation to simulate the eviction of spot virtual machine. */
export interface VirtualMachinesSimulateEvictiondefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Assess patches on the VM. */
export interface VirtualMachinesAssessPatches200Response extends HttpResponse {
  status: "200";
  body: VirtualMachineAssessPatchesResultOutput;
}

/** Assess patches on the VM. */
export interface VirtualMachinesAssessPatches202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Assess patches on the VM. */
export interface VirtualMachinesAssessPatchesdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Installs patches on the VM. */
export interface VirtualMachinesInstallPatches200Response extends HttpResponse {
  status: "200";
  body: VirtualMachineInstallPatchesResultOutput;
}

/** Installs patches on the VM. */
export interface VirtualMachinesInstallPatches202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Installs patches on the VM. */
export interface VirtualMachinesInstallPatchesdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Run command on the VM. */
export interface VirtualMachinesRunCommand200Response extends HttpResponse {
  status: "200";
  body: RunCommandResultOutput;
}

/** Run command on the VM. */
export interface VirtualMachinesRunCommand202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Gets a virtual machine image. */
export interface VirtualMachineImagesGet200Response extends HttpResponse {
  status: "200";
  body: VirtualMachineImageOutput;
}

/** Gets a virtual machine image. */
export interface VirtualMachineImagesGetdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a list of all virtual machine image versions for the specified location, publisher, offer, and SKU. */
export interface VirtualMachineImagesList200Response extends HttpResponse {
  status: "200";
  body: Array<VirtualMachineImageResourceOutput>;
}

/** Gets a list of all virtual machine image versions for the specified location, publisher, offer, and SKU. */
export interface VirtualMachineImagesListdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a list of virtual machine image offers for the specified location and publisher. */
export interface VirtualMachineImagesListOffers200Response
  extends HttpResponse {
  status: "200";
  body: Array<VirtualMachineImageResourceOutput>;
}

/** Gets a list of virtual machine image offers for the specified location and publisher. */
export interface VirtualMachineImagesListOffersdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a list of virtual machine image publishers for the specified Azure location. */
export interface VirtualMachineImagesListPublishers200Response
  extends HttpResponse {
  status: "200";
  body: Array<VirtualMachineImageResourceOutput>;
}

/** Gets a list of virtual machine image publishers for the specified Azure location. */
export interface VirtualMachineImagesListPublishersdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a list of virtual machine image SKUs for the specified location, publisher, and offer. */
export interface VirtualMachineImagesListSkus200Response extends HttpResponse {
  status: "200";
  body: Array<VirtualMachineImageResourceOutput>;
}

/** Gets a list of virtual machine image SKUs for the specified location, publisher, and offer. */
export interface VirtualMachineImagesListSkusdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a list of all virtual machine image versions for the specified edge zone */
export interface VirtualMachineImagesListByEdgeZone200Response
  extends HttpResponse {
  status: "200";
  body: VmImagesInEdgeZoneListResultOutput;
}

/** Gets a list of all virtual machine image versions for the specified edge zone */
export interface VirtualMachineImagesListByEdgeZonedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a virtual machine image in an edge zone. */
export interface VirtualMachineImagesEdgeZoneGet200Response
  extends HttpResponse {
  status: "200";
  body: VirtualMachineImageOutput;
}

/** Gets a virtual machine image in an edge zone. */
export interface VirtualMachineImagesEdgeZoneGetdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a list of all virtual machine image versions for the specified location, edge zone, publisher, offer, and SKU. */
export interface VirtualMachineImagesEdgeZoneList200Response
  extends HttpResponse {
  status: "200";
  body: Array<VirtualMachineImageResourceOutput>;
}

/** Gets a list of all virtual machine image versions for the specified location, edge zone, publisher, offer, and SKU. */
export interface VirtualMachineImagesEdgeZoneListdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a list of virtual machine image offers for the specified location, edge zone and publisher. */
export interface VirtualMachineImagesEdgeZoneListOffers200Response
  extends HttpResponse {
  status: "200";
  body: Array<VirtualMachineImageResourceOutput>;
}

/** Gets a list of virtual machine image offers for the specified location, edge zone and publisher. */
export interface VirtualMachineImagesEdgeZoneListOffersdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a list of virtual machine image publishers for the specified Azure location and edge zone. */
export interface VirtualMachineImagesEdgeZoneListPublishers200Response
  extends HttpResponse {
  status: "200";
  body: Array<VirtualMachineImageResourceOutput>;
}

/** Gets a list of virtual machine image publishers for the specified Azure location and edge zone. */
export interface VirtualMachineImagesEdgeZoneListPublishersdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a list of virtual machine image SKUs for the specified location, edge zone, publisher, and offer. */
export interface VirtualMachineImagesEdgeZoneListSkus200Response
  extends HttpResponse {
  status: "200";
  body: Array<VirtualMachineImageResourceOutput>;
}

/** Gets a list of virtual machine image SKUs for the specified location, edge zone, publisher, and offer. */
export interface VirtualMachineImagesEdgeZoneListSkusdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a virtual machine extension image. */
export interface VirtualMachineExtensionImagesGet200Response
  extends HttpResponse {
  status: "200";
  body: VirtualMachineExtensionImageOutput;
}

/** Gets a virtual machine extension image. */
export interface VirtualMachineExtensionImagesGetdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a list of virtual machine extension image types. */
export interface VirtualMachineExtensionImagesListTypes200Response
  extends HttpResponse {
  status: "200";
  body: Array<VirtualMachineExtensionImageOutput>;
}

/** Gets a list of virtual machine extension image types. */
export interface VirtualMachineExtensionImagesListTypesdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a list of virtual machine extension image versions. */
export interface VirtualMachineExtensionImagesListVersions200Response
  extends HttpResponse {
  status: "200";
  body: Array<VirtualMachineExtensionImageOutput>;
}

/** Gets a list of virtual machine extension image versions. */
export interface VirtualMachineExtensionImagesListVersionsdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Create or update an availability set. */
export interface AvailabilitySetsCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: AvailabilitySetOutput;
}

/** Create or update an availability set. */
export interface AvailabilitySetsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Update an availability set. */
export interface AvailabilitySetsUpdate200Response extends HttpResponse {
  status: "200";
  body: AvailabilitySetOutput;
}

/** Update an availability set. */
export interface AvailabilitySetsUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Delete an availability set. */
export interface AvailabilitySetsDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete an availability set. */
export interface AvailabilitySetsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete an availability set. */
export interface AvailabilitySetsDeletedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves information about an availability set. */
export interface AvailabilitySetsGet200Response extends HttpResponse {
  status: "200";
  body: AvailabilitySetOutput;
}

/** Retrieves information about an availability set. */
export interface AvailabilitySetsGetdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all availability sets in a subscription. */
export interface AvailabilitySetsListBySubscription200Response
  extends HttpResponse {
  status: "200";
  body: AvailabilitySetListResultOutput;
}

/** Lists all availability sets in a subscription. */
export interface AvailabilitySetsListBySubscriptiondefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all availability sets in a resource group. */
export interface AvailabilitySetsList200Response extends HttpResponse {
  status: "200";
  body: AvailabilitySetListResultOutput;
}

/** Lists all availability sets in a resource group. */
export interface AvailabilitySetsListdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all available virtual machine sizes that can be used to create a new virtual machine in an existing availability set. */
export interface AvailabilitySetsListAvailableSizes200Response
  extends HttpResponse {
  status: "200";
  body: VirtualMachineSizeListResultOutput;
}

/** Lists all available virtual machine sizes that can be used to create a new virtual machine in an existing availability set. */
export interface AvailabilitySetsListAvailableSizesdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Create or update a proximity placement group. */
export interface ProximityPlacementGroupsCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: ProximityPlacementGroupOutput;
}

/** Create or update a proximity placement group. */
export interface ProximityPlacementGroupsCreateOrUpdate201Response
  extends HttpResponse {
  status: "201";
  body: ProximityPlacementGroupOutput;
}

/** Create or update a proximity placement group. */
export interface ProximityPlacementGroupsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Update a proximity placement group. */
export interface ProximityPlacementGroupsUpdate200Response
  extends HttpResponse {
  status: "200";
  body: ProximityPlacementGroupOutput;
}

/** Update a proximity placement group. */
export interface ProximityPlacementGroupsUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Delete a proximity placement group. */
export interface ProximityPlacementGroupsDelete200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete a proximity placement group. */
export interface ProximityPlacementGroupsDeletedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves information about a proximity placement group . */
export interface ProximityPlacementGroupsGet200Response extends HttpResponse {
  status: "200";
  body: ProximityPlacementGroupOutput;
}

/** Retrieves information about a proximity placement group . */
export interface ProximityPlacementGroupsGetdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all proximity placement groups in a subscription. */
export interface ProximityPlacementGroupsListBySubscription200Response
  extends HttpResponse {
  status: "200";
  body: ProximityPlacementGroupListResultOutput;
}

/** Lists all proximity placement groups in a subscription. */
export interface ProximityPlacementGroupsListBySubscriptiondefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all proximity placement groups in a resource group. */
export interface ProximityPlacementGroupsListByResourceGroup200Response
  extends HttpResponse {
  status: "200";
  body: ProximityPlacementGroupListResultOutput;
}

/** Lists all proximity placement groups in a resource group. */
export interface ProximityPlacementGroupsListByResourceGroupdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Create or update a dedicated host group. For details of Dedicated Host and Dedicated Host Groups please see [Dedicated Host Documentation] (https://go.microsoft.com/fwlink/?linkid=2082596) */
export interface DedicatedHostGroupsCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: DedicatedHostGroupOutput;
}

/** Create or update a dedicated host group. For details of Dedicated Host and Dedicated Host Groups please see [Dedicated Host Documentation] (https://go.microsoft.com/fwlink/?linkid=2082596) */
export interface DedicatedHostGroupsCreateOrUpdate201Response
  extends HttpResponse {
  status: "201";
  body: DedicatedHostGroupOutput;
}

/** Create or update a dedicated host group. For details of Dedicated Host and Dedicated Host Groups please see [Dedicated Host Documentation] (https://go.microsoft.com/fwlink/?linkid=2082596) */
export interface DedicatedHostGroupsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Update an dedicated host group. */
export interface DedicatedHostGroupsUpdate200Response extends HttpResponse {
  status: "200";
  body: DedicatedHostGroupOutput;
}

/** Update an dedicated host group. */
export interface DedicatedHostGroupsUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Delete a dedicated host group. */
export interface DedicatedHostGroupsDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete a dedicated host group. */
export interface DedicatedHostGroupsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a dedicated host group. */
export interface DedicatedHostGroupsDeletedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves information about a dedicated host group. */
export interface DedicatedHostGroupsGet200Response extends HttpResponse {
  status: "200";
  body: DedicatedHostGroupOutput;
}

/** Retrieves information about a dedicated host group. */
export interface DedicatedHostGroupsGetdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all of the dedicated host groups in the specified resource group. Use the nextLink property in the response to get the next page of dedicated host groups. */
export interface DedicatedHostGroupsListByResourceGroup200Response
  extends HttpResponse {
  status: "200";
  body: DedicatedHostGroupListResultOutput;
}

/** Lists all of the dedicated host groups in the specified resource group. Use the nextLink property in the response to get the next page of dedicated host groups. */
export interface DedicatedHostGroupsListByResourceGroupdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all of the dedicated host groups in the subscription. Use the nextLink property in the response to get the next page of dedicated host groups. */
export interface DedicatedHostGroupsListBySubscription200Response
  extends HttpResponse {
  status: "200";
  body: DedicatedHostGroupListResultOutput;
}

/** Lists all of the dedicated host groups in the subscription. Use the nextLink property in the response to get the next page of dedicated host groups. */
export interface DedicatedHostGroupsListBySubscriptiondefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Create or update a dedicated host . */
export interface DedicatedHostsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: DedicatedHostOutput;
}

/** Create or update a dedicated host . */
export interface DedicatedHostsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: DedicatedHostOutput;
}

/** Create or update a dedicated host . */
export interface DedicatedHostsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Update an dedicated host . */
export interface DedicatedHostsUpdate200Response extends HttpResponse {
  status: "200";
  body: DedicatedHostOutput;
}

/** Update an dedicated host . */
export interface DedicatedHostsUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Delete a dedicated host. */
export interface DedicatedHostsDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete a dedicated host. */
export interface DedicatedHostsDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Delete a dedicated host. */
export interface DedicatedHostsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a dedicated host. */
export interface DedicatedHostsDeletedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves information about a dedicated host. */
export interface DedicatedHostsGet200Response extends HttpResponse {
  status: "200";
  body: DedicatedHostOutput;
}

/** Retrieves information about a dedicated host. */
export interface DedicatedHostsGetdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all of the dedicated hosts in the specified dedicated host group. Use the nextLink property in the response to get the next page of dedicated hosts. */
export interface DedicatedHostsListByHostGroup200Response extends HttpResponse {
  status: "200";
  body: DedicatedHostListResultOutput;
}

/** Lists all of the dedicated hosts in the specified dedicated host group. Use the nextLink property in the response to get the next page of dedicated hosts. */
export interface DedicatedHostsListByHostGroupdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Restart the dedicated host. The operation will complete successfully once the dedicated host has restarted and is running. To determine the health of VMs deployed on the dedicated host after the restart check the Resource Health Center in the Azure Portal. Please refer to https://docs.microsoft.com/azure/service-health/resource-health-overview for more details. */
export interface DedicatedHostsRestart200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Restart the dedicated host. The operation will complete successfully once the dedicated host has restarted and is running. To determine the health of VMs deployed on the dedicated host after the restart check the Resource Health Center in the Azure Portal. Please refer to https://docs.microsoft.com/azure/service-health/resource-health-overview for more details. */
export interface DedicatedHostsRestartdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all of the SSH public keys in the subscription. Use the nextLink property in the response to get the next page of SSH public keys. */
export interface SshPublicKeysListBySubscription200Response
  extends HttpResponse {
  status: "200";
  body: SshPublicKeysGroupListResultOutput;
}

/** Lists all of the SSH public keys in the subscription. Use the nextLink property in the response to get the next page of SSH public keys. */
export interface SshPublicKeysListBySubscriptiondefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all of the SSH public keys in the specified resource group. Use the nextLink property in the response to get the next page of SSH public keys. */
export interface SshPublicKeysListByResourceGroup200Response
  extends HttpResponse {
  status: "200";
  body: SshPublicKeysGroupListResultOutput;
}

/** Lists all of the SSH public keys in the specified resource group. Use the nextLink property in the response to get the next page of SSH public keys. */
export interface SshPublicKeysListByResourceGroupdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates a new SSH public key resource. */
export interface SshPublicKeysCreate200Response extends HttpResponse {
  status: "200";
  body: SshPublicKeyResourceOutput;
}

/** Creates a new SSH public key resource. */
export interface SshPublicKeysCreate201Response extends HttpResponse {
  status: "201";
  body: SshPublicKeyResourceOutput;
}

/** Creates a new SSH public key resource. */
export interface SshPublicKeysCreatedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates a new SSH public key resource. */
export interface SshPublicKeysUpdate200Response extends HttpResponse {
  status: "200";
  body: SshPublicKeyResourceOutput;
}

/** Updates a new SSH public key resource. */
export interface SshPublicKeysUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Delete an SSH public key. */
export interface SshPublicKeysDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete an SSH public key. */
export interface SshPublicKeysDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete an SSH public key. */
export interface SshPublicKeysDeletedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves information about an SSH public key. */
export interface SshPublicKeysGet200Response extends HttpResponse {
  status: "200";
  body: SshPublicKeyResourceOutput;
}

/** Retrieves information about an SSH public key. */
export interface SshPublicKeysGetdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Generates and returns a public/private key pair and populates the SSH public key resource with the public key. The length of the key will be 3072 bits. This operation can only be performed once per SSH public key resource. */
export interface SshPublicKeysGenerateKeyPair200Response extends HttpResponse {
  status: "200";
  body: SshPublicKeyGenerateKeyPairResultOutput;
}

/** Generates and returns a public/private key pair and populates the SSH public key resource with the public key. The length of the key will be 3072 bits. This operation can only be performed once per SSH public key resource. */
export interface SshPublicKeysGenerateKeyPairdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Create or update an image. */
export interface ImagesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ImageOutput;
}

/** Create or update an image. */
export interface ImagesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ImageOutput;
}

/** Create or update an image. */
export interface ImagesCreateOrUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Update an image. */
export interface ImagesUpdate200Response extends HttpResponse {
  status: "200";
  body: ImageOutput;
}

/** Update an image. */
export interface ImagesUpdate201Response extends HttpResponse {
  status: "201";
  body: ImageOutput;
}

/** Update an image. */
export interface ImagesUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes an Image. */
export interface ImagesDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes an Image. */
export interface ImagesDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deletes an Image. */
export interface ImagesDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes an Image. */
export interface ImagesDeletedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets an image. */
export interface ImagesGet200Response extends HttpResponse {
  status: "200";
  body: ImageOutput;
}

/** Gets an image. */
export interface ImagesGetdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the list of images under a resource group. */
export interface ImagesListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: ImageListResultOutput;
}

/** Gets the list of images under a resource group. */
export interface ImagesListByResourceGroupdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the list of Images in the subscription. Use nextLink property in the response to get the next page of Images. Do this till nextLink is null to fetch all the Images. */
export interface ImagesList200Response extends HttpResponse {
  status: "200";
  body: ImageListResultOutput;
}

/** Gets the list of Images in the subscription. Use nextLink property in the response to get the next page of Images. Do this till nextLink is null to fetch all the Images. */
export interface ImagesListdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to create or update the restore point collection. Please refer to https://aka.ms/RestorePoints for more details. When updating a restore point collection, only tags may be modified. */
export interface RestorePointCollectionsCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: RestorePointCollectionOutput;
}

/** The operation to create or update the restore point collection. Please refer to https://aka.ms/RestorePoints for more details. When updating a restore point collection, only tags may be modified. */
export interface RestorePointCollectionsCreateOrUpdate201Response
  extends HttpResponse {
  status: "201";
  body: RestorePointCollectionOutput;
}

/** The operation to create or update the restore point collection. Please refer to https://aka.ms/RestorePoints for more details. When updating a restore point collection, only tags may be modified. */
export interface RestorePointCollectionsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to update the restore point collection. */
export interface RestorePointCollectionsUpdate200Response extends HttpResponse {
  status: "200";
  body: RestorePointCollectionOutput;
}

/** The operation to update the restore point collection. */
export interface RestorePointCollectionsUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to delete the restore point collection. This operation will also delete all the contained restore points. */
export interface RestorePointCollectionsDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** The operation to delete the restore point collection. This operation will also delete all the contained restore points. */
export interface RestorePointCollectionsDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** The operation to delete the restore point collection. This operation will also delete all the contained restore points. */
export interface RestorePointCollectionsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** The operation to delete the restore point collection. This operation will also delete all the contained restore points. */
export interface RestorePointCollectionsDeletedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to get the restore point collection. */
export interface RestorePointCollectionsGet200Response extends HttpResponse {
  status: "200";
  body: RestorePointCollectionOutput;
}

/** The operation to get the restore point collection. */
export interface RestorePointCollectionsGetdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the list of restore point collections in a resource group. */
export interface RestorePointCollectionsList200Response extends HttpResponse {
  status: "200";
  body: RestorePointCollectionListResultOutput;
}

/** Gets the list of restore point collections in a resource group. */
export interface RestorePointCollectionsListdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the list of restore point collections in the subscription. Use nextLink property in the response to get the next page of restore point collections. Do this till nextLink is not null to fetch all the restore point collections. */
export interface RestorePointCollectionsListAll200Response
  extends HttpResponse {
  status: "200";
  body: RestorePointCollectionListResultOutput;
}

/** Gets the list of restore point collections in the subscription. Use nextLink property in the response to get the next page of restore point collections. Do this till nextLink is not null to fetch all the restore point collections. */
export interface RestorePointCollectionsListAlldefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to create the restore point. Updating properties of an existing restore point is not allowed */
export interface RestorePointsCreate201Response extends HttpResponse {
  status: "201";
  body: RestorePointOutput;
}

/** The operation to create the restore point. Updating properties of an existing restore point is not allowed */
export interface RestorePointsCreatedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to delete the restore point. */
export interface RestorePointsDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** The operation to delete the restore point. */
export interface RestorePointsDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** The operation to delete the restore point. */
export interface RestorePointsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** The operation to delete the restore point. */
export interface RestorePointsDeletedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to get the restore point. */
export interface RestorePointsGet200Response extends HttpResponse {
  status: "200";
  body: RestorePointOutput;
}

/** The operation to get the restore point. */
export interface RestorePointsGetdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to create or update a capacity reservation group. When updating a capacity reservation group, only tags may be modified. Please refer to https://aka.ms/CapacityReservation for more details. */
export interface CapacityReservationGroupsCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: CapacityReservationGroupOutput;
}

/** The operation to create or update a capacity reservation group. When updating a capacity reservation group, only tags may be modified. Please refer to https://aka.ms/CapacityReservation for more details. */
export interface CapacityReservationGroupsCreateOrUpdate201Response
  extends HttpResponse {
  status: "201";
  body: CapacityReservationGroupOutput;
}

/** The operation to create or update a capacity reservation group. When updating a capacity reservation group, only tags may be modified. Please refer to https://aka.ms/CapacityReservation for more details. */
export interface CapacityReservationGroupsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to update a capacity reservation group. When updating a capacity reservation group, only tags may be modified. */
export interface CapacityReservationGroupsUpdate200Response
  extends HttpResponse {
  status: "200";
  body: CapacityReservationGroupOutput;
}

/** The operation to update a capacity reservation group. When updating a capacity reservation group, only tags may be modified. */
export interface CapacityReservationGroupsUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to delete a capacity reservation group. This operation is allowed only if all the associated resources are disassociated from the reservation group and all capacity reservations under the reservation group have also been deleted. Please refer to https://aka.ms/CapacityReservation for more details. */
export interface CapacityReservationGroupsDelete200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** The operation to delete a capacity reservation group. This operation is allowed only if all the associated resources are disassociated from the reservation group and all capacity reservations under the reservation group have also been deleted. Please refer to https://aka.ms/CapacityReservation for more details. */
export interface CapacityReservationGroupsDelete204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** The operation to delete a capacity reservation group. This operation is allowed only if all the associated resources are disassociated from the reservation group and all capacity reservations under the reservation group have also been deleted. Please refer to https://aka.ms/CapacityReservation for more details. */
export interface CapacityReservationGroupsDeletedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation that retrieves information about a capacity reservation group. */
export interface CapacityReservationGroupsGet200Response extends HttpResponse {
  status: "200";
  body: CapacityReservationGroupOutput;
}

/** The operation that retrieves information about a capacity reservation group. */
export interface CapacityReservationGroupsGetdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all of the capacity reservation groups in the specified resource group. Use the nextLink property in the response to get the next page of capacity reservation groups. */
export interface CapacityReservationGroupsListByResourceGroup200Response
  extends HttpResponse {
  status: "200";
  body: CapacityReservationGroupListResultOutput;
}

/** Lists all of the capacity reservation groups in the specified resource group. Use the nextLink property in the response to get the next page of capacity reservation groups. */
export interface CapacityReservationGroupsListByResourceGroupdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all of the capacity reservation groups in the subscription. Use the nextLink property in the response to get the next page of capacity reservation groups. */
export interface CapacityReservationGroupsListBySubscription200Response
  extends HttpResponse {
  status: "200";
  body: CapacityReservationGroupListResultOutput;
}

/** Lists all of the capacity reservation groups in the subscription. Use the nextLink property in the response to get the next page of capacity reservation groups. */
export interface CapacityReservationGroupsListBySubscriptiondefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to create or update a capacity reservation. Please note some properties can be set only during capacity reservation creation. Please refer to https://aka.ms/CapacityReservation for more details. */
export interface CapacityReservationsCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: CapacityReservationOutput;
}

/** The operation to create or update a capacity reservation. Please note some properties can be set only during capacity reservation creation. Please refer to https://aka.ms/CapacityReservation for more details. */
export interface CapacityReservationsCreateOrUpdate201Response
  extends HttpResponse {
  status: "201";
  body: CapacityReservationOutput;
}

/** The operation to create or update a capacity reservation. Please note some properties can be set only during capacity reservation creation. Please refer to https://aka.ms/CapacityReservation for more details. */
export interface CapacityReservationsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to update a capacity reservation. */
export interface CapacityReservationsUpdate200Response extends HttpResponse {
  status: "200";
  body: CapacityReservationOutput;
}

/** The operation to update a capacity reservation. */
export interface CapacityReservationsUpdate202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** The operation to update a capacity reservation. */
export interface CapacityReservationsUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to delete a capacity reservation. This operation is allowed only when all the associated resources are disassociated from the capacity reservation. Please refer to https://aka.ms/CapacityReservation for more details. */
export interface CapacityReservationsDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** The operation to delete a capacity reservation. This operation is allowed only when all the associated resources are disassociated from the capacity reservation. Please refer to https://aka.ms/CapacityReservation for more details. */
export interface CapacityReservationsDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** The operation to delete a capacity reservation. This operation is allowed only when all the associated resources are disassociated from the capacity reservation. Please refer to https://aka.ms/CapacityReservation for more details. */
export interface CapacityReservationsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** The operation to delete a capacity reservation. This operation is allowed only when all the associated resources are disassociated from the capacity reservation. Please refer to https://aka.ms/CapacityReservation for more details. */
export interface CapacityReservationsDeletedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation that retrieves information about the capacity reservation. */
export interface CapacityReservationsGet200Response extends HttpResponse {
  status: "200";
  body: CapacityReservationOutput;
}

/** The operation that retrieves information about the capacity reservation. */
export interface CapacityReservationsGetdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all of the capacity reservations in the specified capacity reservation group. Use the nextLink property in the response to get the next page of capacity reservations. */
export interface CapacityReservationsListByCapacityReservationGroup200Response
  extends HttpResponse {
  status: "200";
  body: CapacityReservationListResultOutput;
}

/** Lists all of the capacity reservations in the specified capacity reservation group. Use the nextLink property in the response to get the next page of capacity reservations. */
export interface CapacityReservationsListByCapacityReservationGroupdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Export logs that show Api requests made by this subscription in the given time window to show throttling activities. */
export interface LogAnalyticsExportRequestRateByInterval200Response
  extends HttpResponse {
  status: "200";
  body: LogAnalyticsOperationResultOutput;
}

/** Export logs that show Api requests made by this subscription in the given time window to show throttling activities. */
export interface LogAnalyticsExportRequestRateByInterval202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Export logs that show Api requests made by this subscription in the given time window to show throttling activities. */
export interface LogAnalyticsExportRequestRateByIntervaldefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Export logs that show total throttled Api requests for this subscription in the given time window. */
export interface LogAnalyticsExportThrottledRequests200Response
  extends HttpResponse {
  status: "200";
  body: LogAnalyticsOperationResultOutput;
}

/** Export logs that show total throttled Api requests for this subscription in the given time window. */
export interface LogAnalyticsExportThrottledRequests202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Export logs that show total throttled Api requests for this subscription in the given time window. */
export interface LogAnalyticsExportThrottledRequestsdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all available run commands for a subscription in a location. */
export interface VirtualMachineRunCommandsList200Response extends HttpResponse {
  status: "200";
  body: RunCommandListResultOutput;
}

/** Gets specific run command for a subscription in a location. */
export interface VirtualMachineRunCommandsGet200Response extends HttpResponse {
  status: "200";
  body: RunCommandDocumentOutput;
}

/** The operation to create or update the run command. */
export interface VirtualMachineRunCommandsCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: VirtualMachineRunCommandOutput;
}

/** The operation to create or update the run command. */
export interface VirtualMachineRunCommandsCreateOrUpdate201Response
  extends HttpResponse {
  status: "201";
  body: VirtualMachineRunCommandOutput;
}

/** The operation to create or update the run command. */
export interface VirtualMachineRunCommandsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to update the run command. */
export interface VirtualMachineRunCommandsUpdate200Response
  extends HttpResponse {
  status: "200";
  body: VirtualMachineRunCommandOutput;
}

/** The operation to update the run command. */
export interface VirtualMachineRunCommandsUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to delete the run command. */
export interface VirtualMachineRunCommandsDelete200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** The operation to delete the run command. */
export interface VirtualMachineRunCommandsDelete202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** The operation to delete the run command. */
export interface VirtualMachineRunCommandsDelete204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** The operation to delete the run command. */
export interface VirtualMachineRunCommandsDeletedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to get the run command. */
export interface VirtualMachineRunCommandsGetByVirtualMachine200Response
  extends HttpResponse {
  status: "200";
  body: VirtualMachineRunCommandOutput;
}

/** The operation to get the run command. */
export interface VirtualMachineRunCommandsGetByVirtualMachinedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to get all run commands of a Virtual Machine. */
export interface VirtualMachineRunCommandsListByVirtualMachine200Response
  extends HttpResponse {
  status: "200";
  body: VirtualMachineRunCommandsListResultOutput;
}

/** The operation to get all run commands of a Virtual Machine. */
export interface VirtualMachineRunCommandsListByVirtualMachinedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to create or update the VMSS VM run command. */
export interface VirtualMachineScaleSetVMRunCommandsCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: VirtualMachineRunCommandOutput;
}

/** The operation to create or update the VMSS VM run command. */
export interface VirtualMachineScaleSetVMRunCommandsCreateOrUpdate201Response
  extends HttpResponse {
  status: "201";
  body: VirtualMachineRunCommandOutput;
}

/** The operation to create or update the VMSS VM run command. */
export interface VirtualMachineScaleSetVMRunCommandsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to update the VMSS VM run command. */
export interface VirtualMachineScaleSetVMRunCommandsUpdate200Response
  extends HttpResponse {
  status: "200";
  body: VirtualMachineRunCommandOutput;
}

/** The operation to update the VMSS VM run command. */
export interface VirtualMachineScaleSetVMRunCommandsUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to delete the VMSS VM run command. */
export interface VirtualMachineScaleSetVMRunCommandsDelete200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** The operation to delete the VMSS VM run command. */
export interface VirtualMachineScaleSetVMRunCommandsDelete202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** The operation to delete the VMSS VM run command. */
export interface VirtualMachineScaleSetVMRunCommandsDelete204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** The operation to delete the VMSS VM run command. */
export interface VirtualMachineScaleSetVMRunCommandsDeletedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to get the VMSS VM run command. */
export interface VirtualMachineScaleSetVMRunCommandsGet200Response
  extends HttpResponse {
  status: "200";
  body: VirtualMachineRunCommandOutput;
}

/** The operation to get the VMSS VM run command. */
export interface VirtualMachineScaleSetVMRunCommandsGetdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The operation to get all run commands of an instance in Virtual Machine Scaleset. */
export interface VirtualMachineScaleSetVMRunCommandsList200Response
  extends HttpResponse {
  status: "200";
  body: VirtualMachineRunCommandsListResultOutput;
}

/** The operation to get all run commands of an instance in Virtual Machine Scaleset. */
export interface VirtualMachineScaleSetVMRunCommandsListdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a disk. */
export interface DisksCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: DiskOutput;
}

/** Creates or updates a disk. */
export interface DisksCreateOrUpdate202Response extends HttpResponse {
  status: "202";
  body: DiskOutput;
}

/** Updates (patches) a disk. */
export interface DisksUpdate200Response extends HttpResponse {
  status: "200";
  body: DiskOutput;
}

/** Updates (patches) a disk. */
export interface DisksUpdate202Response extends HttpResponse {
  status: "202";
  body: DiskOutput;
}

/** Gets information about a disk. */
export interface DisksGet200Response extends HttpResponse {
  status: "200";
  body: DiskOutput;
}

/** Deletes a disk. */
export interface DisksDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a disk. */
export interface DisksDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deletes a disk. */
export interface DisksDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Lists all the disks under a resource group. */
export interface DisksListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: DiskListOutput;
}

/** Lists all the disks under a subscription. */
export interface DisksList200Response extends HttpResponse {
  status: "200";
  body: DiskListOutput;
}

/** Grants access to a disk. */
export interface DisksGrantAccess200Response extends HttpResponse {
  status: "200";
  body: AccessUriOutput;
}

/** Grants access to a disk. */
export interface DisksGrantAccess202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Revokes access to a disk. */
export interface DisksRevokeAccess200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Revokes access to a disk. */
export interface DisksRevokeAccess202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Creates or updates a disk access resource */
export interface DiskAccessesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: DiskAccessOutput;
}

/** Creates or updates a disk access resource */
export interface DiskAccessesCreateOrUpdate202Response extends HttpResponse {
  status: "202";
  body: DiskAccessOutput;
}

/** Creates or updates a disk access resource */
export interface DiskAccessesCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates (patches) a disk access resource. */
export interface DiskAccessesUpdate200Response extends HttpResponse {
  status: "200";
  body: DiskAccessOutput;
}

/** Updates (patches) a disk access resource. */
export interface DiskAccessesUpdate202Response extends HttpResponse {
  status: "202";
  body: DiskAccessOutput;
}

/** Updates (patches) a disk access resource. */
export interface DiskAccessesUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets information about a disk access resource. */
export interface DiskAccessesGet200Response extends HttpResponse {
  status: "200";
  body: DiskAccessOutput;
}

/** Gets information about a disk access resource. */
export interface DiskAccessesGetdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a disk access resource. */
export interface DiskAccessesDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a disk access resource. */
export interface DiskAccessesDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deletes a disk access resource. */
export interface DiskAccessesDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a disk access resource. */
export interface DiskAccessesDeletedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all the disk access resources under a resource group. */
export interface DiskAccessesListByResourceGroup200Response
  extends HttpResponse {
  status: "200";
  body: DiskAccessListOutput;
}

/** Lists all the disk access resources under a resource group. */
export interface DiskAccessesListByResourceGroupdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all the disk access resources under a subscription. */
export interface DiskAccessesList200Response extends HttpResponse {
  status: "200";
  body: DiskAccessListOutput;
}

/** Lists all the disk access resources under a subscription. */
export interface DiskAccessesListdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the private link resources possible under disk access resource */
export interface DiskAccessesGetPrivateLinkResources200Response
  extends HttpResponse {
  status: "200";
  body: PrivateLinkResourceListResultOutput;
}

/** Approve or reject a private endpoint connection under disk access resource, this can't be used to create a new private endpoint connection. */
export interface DiskAccessesUpdateAPrivateEndpointConnection200Response
  extends HttpResponse {
  status: "200";
  body: PrivateEndpointConnectionOutput;
}

/** Approve or reject a private endpoint connection under disk access resource, this can't be used to create a new private endpoint connection. */
export interface DiskAccessesUpdateAPrivateEndpointConnection202Response
  extends HttpResponse {
  status: "202";
  body: PrivateEndpointConnectionOutput;
}

/** Approve or reject a private endpoint connection under disk access resource, this can't be used to create a new private endpoint connection. */
export interface DiskAccessesUpdateAPrivateEndpointConnectiondefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets information about a private endpoint connection under a disk access resource. */
export interface DiskAccessesGetAPrivateEndpointConnection200Response
  extends HttpResponse {
  status: "200";
  body: PrivateEndpointConnectionOutput;
}

/** Gets information about a private endpoint connection under a disk access resource. */
export interface DiskAccessesGetAPrivateEndpointConnectiondefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a private endpoint connection under a disk access resource. */
export interface DiskAccessesDeleteAPrivateEndpointConnection200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a private endpoint connection under a disk access resource. */
export interface DiskAccessesDeleteAPrivateEndpointConnection202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deletes a private endpoint connection under a disk access resource. */
export interface DiskAccessesDeleteAPrivateEndpointConnection204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a private endpoint connection under a disk access resource. */
export interface DiskAccessesDeleteAPrivateEndpointConnectiondefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** List information about private endpoint connections under a disk access resource */
export interface DiskAccessesListPrivateEndpointConnections200Response
  extends HttpResponse {
  status: "200";
  body: PrivateEndpointConnectionListResultOutput;
}

/** List information about private endpoint connections under a disk access resource */
export interface DiskAccessesListPrivateEndpointConnectionsdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a disk encryption set */
export interface DiskEncryptionSetsCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: DiskEncryptionSetOutput;
}

/** Creates or updates a disk encryption set */
export interface DiskEncryptionSetsCreateOrUpdate202Response
  extends HttpResponse {
  status: "202";
  body: DiskEncryptionSetOutput;
}

/** Creates or updates a disk encryption set */
export interface DiskEncryptionSetsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates (patches) a disk encryption set. */
export interface DiskEncryptionSetsUpdate200Response extends HttpResponse {
  status: "200";
  body: DiskEncryptionSetOutput;
}

/** Updates (patches) a disk encryption set. */
export interface DiskEncryptionSetsUpdate202Response extends HttpResponse {
  status: "202";
  body: DiskEncryptionSetOutput;
}

/** Updates (patches) a disk encryption set. */
export interface DiskEncryptionSetsUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets information about a disk encryption set. */
export interface DiskEncryptionSetsGet200Response extends HttpResponse {
  status: "200";
  body: DiskEncryptionSetOutput;
}

/** Gets information about a disk encryption set. */
export interface DiskEncryptionSetsGetdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a disk encryption set. */
export interface DiskEncryptionSetsDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a disk encryption set. */
export interface DiskEncryptionSetsDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deletes a disk encryption set. */
export interface DiskEncryptionSetsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a disk encryption set. */
export interface DiskEncryptionSetsDeletedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all the disk encryption sets under a resource group. */
export interface DiskEncryptionSetsListByResourceGroup200Response
  extends HttpResponse {
  status: "200";
  body: DiskEncryptionSetListOutput;
}

/** Lists all the disk encryption sets under a resource group. */
export interface DiskEncryptionSetsListByResourceGroupdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all the disk encryption sets under a subscription. */
export interface DiskEncryptionSetsList200Response extends HttpResponse {
  status: "200";
  body: DiskEncryptionSetListOutput;
}

/** Lists all the disk encryption sets under a subscription. */
export interface DiskEncryptionSetsListdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all resources that are encrypted with this disk encryption set. */
export interface DiskEncryptionSetsListAssociatedResources200Response
  extends HttpResponse {
  status: "200";
  body: ResourceUriListOutput;
}

/** Lists all resources that are encrypted with this disk encryption set. */
export interface DiskEncryptionSetsListAssociatedResourcesdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Get disk restorePoint resource */
export interface DiskRestorePointGet200Response extends HttpResponse {
  status: "200";
  body: DiskRestorePointOutput;
}

/** Get disk restorePoint resource */
export interface DiskRestorePointGetdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists diskRestorePoints under a vmRestorePoint. */
export interface DiskRestorePointListByRestorePoint200Response
  extends HttpResponse {
  status: "200";
  body: DiskRestorePointListOutput;
}

/** Lists diskRestorePoints under a vmRestorePoint. */
export interface DiskRestorePointListByRestorePointdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Grants access to a diskRestorePoint. */
export interface DiskRestorePointGrantAccess200Response extends HttpResponse {
  status: "200";
  body: AccessUriOutput;
}

/** Grants access to a diskRestorePoint. */
export interface DiskRestorePointGrantAccess202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Grants access to a diskRestorePoint. */
export interface DiskRestorePointGrantAccessdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Revokes access to a diskRestorePoint. */
export interface DiskRestorePointRevokeAccess200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Revokes access to a diskRestorePoint. */
export interface DiskRestorePointRevokeAccess202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Revokes access to a diskRestorePoint. */
export interface DiskRestorePointRevokeAccessdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a snapshot. */
export interface SnapshotsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: SnapshotOutput;
}

/** Creates or updates a snapshot. */
export interface SnapshotsCreateOrUpdate202Response extends HttpResponse {
  status: "202";
  body: SnapshotOutput;
}

/** Updates (patches) a snapshot. */
export interface SnapshotsUpdate200Response extends HttpResponse {
  status: "200";
  body: SnapshotOutput;
}

/** Updates (patches) a snapshot. */
export interface SnapshotsUpdate202Response extends HttpResponse {
  status: "202";
  body: SnapshotOutput;
}

/** Gets information about a snapshot. */
export interface SnapshotsGet200Response extends HttpResponse {
  status: "200";
  body: SnapshotOutput;
}

/** Deletes a snapshot. */
export interface SnapshotsDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a snapshot. */
export interface SnapshotsDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deletes a snapshot. */
export interface SnapshotsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Lists snapshots under a resource group. */
export interface SnapshotsListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: SnapshotListOutput;
}

/** Lists snapshots under a subscription. */
export interface SnapshotsList200Response extends HttpResponse {
  status: "200";
  body: SnapshotListOutput;
}

/** Grants access to a snapshot. */
export interface SnapshotsGrantAccess200Response extends HttpResponse {
  status: "200";
  body: AccessUriOutput;
}

/** Grants access to a snapshot. */
export interface SnapshotsGrantAccess202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Revokes access to a snapshot. */
export interface SnapshotsRevokeAccess200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Revokes access to a snapshot. */
export interface SnapshotsRevokeAccess202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Gets the list of Microsoft.Compute SKUs available for your Subscription. */
export interface ResourceSkusList200Response extends HttpResponse {
  status: "200";
  body: ResourceSkusResultOutput;
}

/** Create or update a Shared Image Gallery. */
export interface GalleriesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: GalleryOutput;
}

/** Create or update a Shared Image Gallery. */
export interface GalleriesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: GalleryOutput;
}

/** Create or update a Shared Image Gallery. */
export interface GalleriesCreateOrUpdate202Response extends HttpResponse {
  status: "202";
  body: GalleryOutput;
}

/** Create or update a Shared Image Gallery. */
export interface GalleriesCreateOrUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Update a Shared Image Gallery. */
export interface GalleriesUpdate200Response extends HttpResponse {
  status: "200";
  body: GalleryOutput;
}

/** Update a Shared Image Gallery. */
export interface GalleriesUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves information about a Shared Image Gallery. */
export interface GalleriesGet200Response extends HttpResponse {
  status: "200";
  body: GalleryOutput;
}

/** Retrieves information about a Shared Image Gallery. */
export interface GalleriesGetdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Delete a Shared Image Gallery. */
export interface GalleriesDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete a Shared Image Gallery. */
export interface GalleriesDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Delete a Shared Image Gallery. */
export interface GalleriesDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a Shared Image Gallery. */
export interface GalleriesDeletedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** List galleries under a resource group. */
export interface GalleriesListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: GalleryListOutput;
}

/** List galleries under a resource group. */
export interface GalleriesListByResourceGroupdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** List galleries under a subscription. */
export interface GalleriesList200Response extends HttpResponse {
  status: "200";
  body: GalleryListOutput;
}

/** List galleries under a subscription. */
export interface GalleriesListdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Create or update a gallery image definition. */
export interface GalleryImagesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: GalleryImageOutput;
}

/** Create or update a gallery image definition. */
export interface GalleryImagesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: GalleryImageOutput;
}

/** Create or update a gallery image definition. */
export interface GalleryImagesCreateOrUpdate202Response extends HttpResponse {
  status: "202";
  body: GalleryImageOutput;
}

/** Create or update a gallery image definition. */
export interface GalleryImagesCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Update a gallery image definition. */
export interface GalleryImagesUpdate200Response extends HttpResponse {
  status: "200";
  body: GalleryImageOutput;
}

/** Update a gallery image definition. */
export interface GalleryImagesUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves information about a gallery image definition. */
export interface GalleryImagesGet200Response extends HttpResponse {
  status: "200";
  body: GalleryImageOutput;
}

/** Retrieves information about a gallery image definition. */
export interface GalleryImagesGetdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Delete a gallery image. */
export interface GalleryImagesDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete a gallery image. */
export interface GalleryImagesDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Delete a gallery image. */
export interface GalleryImagesDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a gallery image. */
export interface GalleryImagesDeletedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** List gallery image definitions in a gallery. */
export interface GalleryImagesListByGallery200Response extends HttpResponse {
  status: "200";
  body: GalleryImageListOutput;
}

/** List gallery image definitions in a gallery. */
export interface GalleryImagesListByGallerydefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Create or update a gallery image version. */
export interface GalleryImageVersionsCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: GalleryImageVersionOutput;
}

/** Create or update a gallery image version. */
export interface GalleryImageVersionsCreateOrUpdate201Response
  extends HttpResponse {
  status: "201";
  body: GalleryImageVersionOutput;
}

/** Create or update a gallery image version. */
export interface GalleryImageVersionsCreateOrUpdate202Response
  extends HttpResponse {
  status: "202";
  body: GalleryImageVersionOutput;
}

/** Create or update a gallery image version. */
export interface GalleryImageVersionsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Update a gallery image version. */
export interface GalleryImageVersionsUpdate200Response extends HttpResponse {
  status: "200";
  body: GalleryImageVersionOutput;
}

/** Update a gallery image version. */
export interface GalleryImageVersionsUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves information about a gallery image version. */
export interface GalleryImageVersionsGet200Response extends HttpResponse {
  status: "200";
  body: GalleryImageVersionOutput;
}

/** Retrieves information about a gallery image version. */
export interface GalleryImageVersionsGetdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Delete a gallery image version. */
export interface GalleryImageVersionsDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete a gallery image version. */
export interface GalleryImageVersionsDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Delete a gallery image version. */
export interface GalleryImageVersionsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a gallery image version. */
export interface GalleryImageVersionsDeletedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** List gallery image versions in a gallery image definition. */
export interface GalleryImageVersionsListByGalleryImage200Response
  extends HttpResponse {
  status: "200";
  body: GalleryImageVersionListOutput;
}

/** List gallery image versions in a gallery image definition. */
export interface GalleryImageVersionsListByGalleryImagedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Create or update a gallery Application Definition. */
export interface GalleryApplicationsCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: GalleryApplicationOutput;
}

/** Create or update a gallery Application Definition. */
export interface GalleryApplicationsCreateOrUpdate201Response
  extends HttpResponse {
  status: "201";
  body: GalleryApplicationOutput;
}

/** Create or update a gallery Application Definition. */
export interface GalleryApplicationsCreateOrUpdate202Response
  extends HttpResponse {
  status: "202";
  body: GalleryApplicationOutput;
}

/** Create or update a gallery Application Definition. */
export interface GalleryApplicationsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Update a gallery Application Definition. */
export interface GalleryApplicationsUpdate200Response extends HttpResponse {
  status: "200";
  body: GalleryApplicationOutput;
}

/** Update a gallery Application Definition. */
export interface GalleryApplicationsUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves information about a gallery Application Definition. */
export interface GalleryApplicationsGet200Response extends HttpResponse {
  status: "200";
  body: GalleryApplicationOutput;
}

/** Retrieves information about a gallery Application Definition. */
export interface GalleryApplicationsGetdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Delete a gallery Application. */
export interface GalleryApplicationsDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete a gallery Application. */
export interface GalleryApplicationsDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Delete a gallery Application. */
export interface GalleryApplicationsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a gallery Application. */
export interface GalleryApplicationsDeletedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** List gallery Application Definitions in a gallery. */
export interface GalleryApplicationsListByGallery200Response
  extends HttpResponse {
  status: "200";
  body: GalleryApplicationListOutput;
}

/** List gallery Application Definitions in a gallery. */
export interface GalleryApplicationsListByGallerydefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Create or update a gallery Application Version. */
export interface GalleryApplicationVersionsCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: GalleryApplicationVersionOutput;
}

/** Create or update a gallery Application Version. */
export interface GalleryApplicationVersionsCreateOrUpdate201Response
  extends HttpResponse {
  status: "201";
  body: GalleryApplicationVersionOutput;
}

/** Create or update a gallery Application Version. */
export interface GalleryApplicationVersionsCreateOrUpdate202Response
  extends HttpResponse {
  status: "202";
  body: GalleryApplicationVersionOutput;
}

/** Create or update a gallery Application Version. */
export interface GalleryApplicationVersionsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Update a gallery Application Version. */
export interface GalleryApplicationVersionsUpdate200Response
  extends HttpResponse {
  status: "200";
  body: GalleryApplicationVersionOutput;
}

/** Update a gallery Application Version. */
export interface GalleryApplicationVersionsUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves information about a gallery Application Version. */
export interface GalleryApplicationVersionsGet200Response extends HttpResponse {
  status: "200";
  body: GalleryApplicationVersionOutput;
}

/** Retrieves information about a gallery Application Version. */
export interface GalleryApplicationVersionsGetdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Delete a gallery Application Version. */
export interface GalleryApplicationVersionsDelete200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete a gallery Application Version. */
export interface GalleryApplicationVersionsDelete202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Delete a gallery Application Version. */
export interface GalleryApplicationVersionsDelete204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a gallery Application Version. */
export interface GalleryApplicationVersionsDeletedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** List gallery Application Versions in a gallery Application Definition. */
export interface GalleryApplicationVersionsListByGalleryApplication200Response
  extends HttpResponse {
  status: "200";
  body: GalleryApplicationVersionListOutput;
}

/** List gallery Application Versions in a gallery Application Definition. */
export interface GalleryApplicationVersionsListByGalleryApplicationdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Update sharing profile of a gallery. */
export interface GallerySharingProfileUpdate200Response extends HttpResponse {
  status: "200";
  body: SharingUpdateOutput;
}

/** Update sharing profile of a gallery. */
export interface GallerySharingProfileUpdate202Response extends HttpResponse {
  status: "202";
  body: SharingUpdateOutput;
}

/** Update sharing profile of a gallery. */
export interface GallerySharingProfileUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** List shared galleries by subscription id or tenant id. */
export interface SharedGalleriesList200Response extends HttpResponse {
  status: "200";
  body: SharedGalleryListOutput;
}

/** List shared galleries by subscription id or tenant id. */
export interface SharedGalleriesListdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Get a shared gallery by subscription id or tenant id. */
export interface SharedGalleriesGet200Response extends HttpResponse {
  status: "200";
  body: SharedGalleryOutput;
}

/** Get a shared gallery by subscription id or tenant id. */
export interface SharedGalleriesGetdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** List shared gallery images by subscription id or tenant id. */
export interface SharedGalleryImagesList200Response extends HttpResponse {
  status: "200";
  body: SharedGalleryImageListOutput;
}

/** List shared gallery images by subscription id or tenant id. */
export interface SharedGalleryImagesListdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Get a shared gallery image by subscription id or tenant id. */
export interface SharedGalleryImagesGet200Response extends HttpResponse {
  status: "200";
  body: SharedGalleryImageOutput;
}

/** Get a shared gallery image by subscription id or tenant id. */
export interface SharedGalleryImagesGetdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** List shared gallery image versions by subscription id or tenant id. */
export interface SharedGalleryImageVersionsList200Response
  extends HttpResponse {
  status: "200";
  body: SharedGalleryImageVersionListOutput;
}

/** List shared gallery image versions by subscription id or tenant id. */
export interface SharedGalleryImageVersionsListdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Get a shared gallery image version by subscription id or tenant id. */
export interface SharedGalleryImageVersionsGet200Response extends HttpResponse {
  status: "200";
  body: SharedGalleryImageVersionOutput;
}

/** Get a shared gallery image version by subscription id or tenant id. */
export interface SharedGalleryImageVersionsGetdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Get a community gallery by gallery public name. */
export interface CommunityGalleriesGet200Response extends HttpResponse {
  status: "200";
  body: CommunityGalleryOutput;
}

/** Get a community gallery by gallery public name. */
export interface CommunityGalleriesGetdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Get a community gallery image. */
export interface CommunityGalleryImagesGet200Response extends HttpResponse {
  status: "200";
  body: CommunityGalleryImageOutput;
}

/** Get a community gallery image. */
export interface CommunityGalleryImagesGetdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** List community gallery images inside a gallery. */
export interface CommunityGalleryImagesList200Response extends HttpResponse {
  status: "200";
  body: CommunityGalleryImageListOutput;
}

/** List community gallery images inside a gallery. */
export interface CommunityGalleryImagesListdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Get a community gallery image version. */
export interface CommunityGalleryImageVersionsGet200Response
  extends HttpResponse {
  status: "200";
  body: CommunityGalleryImageVersionOutput;
}

/** Get a community gallery image version. */
export interface CommunityGalleryImageVersionsGetdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** List community gallery image versions inside an image. */
export interface CommunityGalleryImageVersionsList200Response
  extends HttpResponse {
  status: "200";
  body: CommunityGalleryImageVersionListOutput;
}

/** List community gallery image versions inside an image. */
export interface CommunityGalleryImageVersionsListdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a role instance from a cloud service. */
export interface CloudServiceRoleInstancesDelete200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a role instance from a cloud service. */
export interface CloudServiceRoleInstancesDelete202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deletes a role instance from a cloud service. */
export interface CloudServiceRoleInstancesDelete204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a role instance from a cloud service. */
export interface CloudServiceRoleInstancesDeletedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a role instance from a cloud service. */
export interface CloudServiceRoleInstancesGet200Response extends HttpResponse {
  status: "200";
  body: RoleInstanceOutput;
}

/** Gets a role instance from a cloud service. */
export interface CloudServiceRoleInstancesGetdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves information about the run-time state of a role instance in a cloud service. */
export interface CloudServiceRoleInstancesGetInstanceView200Response
  extends HttpResponse {
  status: "200";
  body: RoleInstanceViewOutput;
}

/** Retrieves information about the run-time state of a role instance in a cloud service. */
export interface CloudServiceRoleInstancesGetInstanceViewdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the list of all role instances in a cloud service. Use nextLink property in the response to get the next page of role instances. Do this till nextLink is null to fetch all the role instances. */
export interface CloudServiceRoleInstancesList200Response extends HttpResponse {
  status: "200";
  body: RoleInstanceListResultOutput;
}

/** Gets the list of all role instances in a cloud service. Use nextLink property in the response to get the next page of role instances. Do this till nextLink is null to fetch all the role instances. */
export interface CloudServiceRoleInstancesListdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The Reboot Role Instance asynchronous operation requests a reboot of a role instance in the cloud service. */
export interface CloudServiceRoleInstancesRestart200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** The Reboot Role Instance asynchronous operation requests a reboot of a role instance in the cloud service. */
export interface CloudServiceRoleInstancesRestart202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** The Reboot Role Instance asynchronous operation requests a reboot of a role instance in the cloud service. */
export interface CloudServiceRoleInstancesRestartdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The Reimage Role Instance asynchronous operation reinstalls the operating system on instances of web roles or worker roles. */
export interface CloudServiceRoleInstancesReimage200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** The Reimage Role Instance asynchronous operation reinstalls the operating system on instances of web roles or worker roles. */
export interface CloudServiceRoleInstancesReimage202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** The Reimage Role Instance asynchronous operation reinstalls the operating system on instances of web roles or worker roles. */
export interface CloudServiceRoleInstancesReimagedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The Rebuild Role Instance asynchronous operation reinstalls the operating system on instances of web roles or worker roles and initializes the storage resources that are used by them. If you do not want to initialize storage resources, you can use Reimage Role Instance. */
export interface CloudServiceRoleInstancesRebuild200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** The Rebuild Role Instance asynchronous operation reinstalls the operating system on instances of web roles or worker roles and initializes the storage resources that are used by them. If you do not want to initialize storage resources, you can use Reimage Role Instance. */
export interface CloudServiceRoleInstancesRebuild202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** The Rebuild Role Instance asynchronous operation reinstalls the operating system on instances of web roles or worker roles and initializes the storage resources that are used by them. If you do not want to initialize storage resources, you can use Reimage Role Instance. */
export interface CloudServiceRoleInstancesRebuilddefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a remote desktop file for a role instance in a cloud service. */
export interface CloudServiceRoleInstancesGetRemoteDesktopFile200Response
  extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
}

/** Gets a remote desktop file for a role instance in a cloud service. */
export interface CloudServiceRoleInstancesGetRemoteDesktopFiledefaultResponse
  extends HttpResponse {
  status: string;
  body: Record<string, unknown>;
}

/** Gets a role from a cloud service. */
export interface CloudServiceRolesGet200Response extends HttpResponse {
  status: "200";
  body: CloudServiceRoleOutput;
}

/** Gets a role from a cloud service. */
export interface CloudServiceRolesGetdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a list of all roles in a cloud service. Use nextLink property in the response to get the next page of roles. Do this till nextLink is null to fetch all the roles. */
export interface CloudServiceRolesList200Response extends HttpResponse {
  status: "200";
  body: CloudServiceRoleListResultOutput;
}

/** Gets a list of all roles in a cloud service. Use nextLink property in the response to get the next page of roles. Do this till nextLink is null to fetch all the roles. */
export interface CloudServiceRolesListdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Create or update a cloud service. Please note some properties can be set only during cloud service creation. */
export interface CloudServicesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: CloudServiceOutput;
}

/** Create or update a cloud service. Please note some properties can be set only during cloud service creation. */
export interface CloudServicesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: CloudServiceOutput;
}

/** Create or update a cloud service. Please note some properties can be set only during cloud service creation. */
export interface CloudServicesCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Update a cloud service. */
export interface CloudServicesUpdate200Response extends HttpResponse {
  status: "200";
  body: CloudServiceOutput;
}

/** Update a cloud service. */
export interface CloudServicesUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a cloud service. */
export interface CloudServicesDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a cloud service. */
export interface CloudServicesDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deletes a cloud service. */
export interface CloudServicesDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a cloud service. */
export interface CloudServicesDeletedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Display information about a cloud service. */
export interface CloudServicesGet200Response extends HttpResponse {
  status: "200";
  body: CloudServiceOutput;
}

/** Display information about a cloud service. */
export interface CloudServicesGetdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the status of a cloud service. */
export interface CloudServicesGetInstanceView200Response extends HttpResponse {
  status: "200";
  body: CloudServiceInstanceViewOutput;
}

/** Gets the status of a cloud service. */
export interface CloudServicesGetInstanceViewdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a list of all cloud services in the subscription, regardless of the associated resource group. Use nextLink property in the response to get the next page of Cloud Services. Do this till nextLink is null to fetch all the Cloud Services. */
export interface CloudServicesListAll200Response extends HttpResponse {
  status: "200";
  body: CloudServiceListResultOutput;
}

/** Gets a list of all cloud services in the subscription, regardless of the associated resource group. Use nextLink property in the response to get the next page of Cloud Services. Do this till nextLink is null to fetch all the Cloud Services. */
export interface CloudServicesListAlldefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a list of all cloud services under a resource group. Use nextLink property in the response to get the next page of Cloud Services. Do this till nextLink is null to fetch all the Cloud Services. */
export interface CloudServicesList200Response extends HttpResponse {
  status: "200";
  body: CloudServiceListResultOutput;
}

/** Gets a list of all cloud services under a resource group. Use nextLink property in the response to get the next page of Cloud Services. Do this till nextLink is null to fetch all the Cloud Services. */
export interface CloudServicesListdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Starts the cloud service. */
export interface CloudServicesStart200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Starts the cloud service. */
export interface CloudServicesStart202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Starts the cloud service. */
export interface CloudServicesStartdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Power off the cloud service. Note that resources are still attached and you are getting charged for the resources. */
export interface CloudServicesPowerOff200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Power off the cloud service. Note that resources are still attached and you are getting charged for the resources. */
export interface CloudServicesPowerOff202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Power off the cloud service. Note that resources are still attached and you are getting charged for the resources. */
export interface CloudServicesPowerOffdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Restarts one or more role instances in a cloud service. */
export interface CloudServicesRestart200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Restarts one or more role instances in a cloud service. */
export interface CloudServicesRestart202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Restarts one or more role instances in a cloud service. */
export interface CloudServicesRestartdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Reimage asynchronous operation reinstalls the operating system on instances of web roles or worker roles. */
export interface CloudServicesReimage200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Reimage asynchronous operation reinstalls the operating system on instances of web roles or worker roles. */
export interface CloudServicesReimage202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Reimage asynchronous operation reinstalls the operating system on instances of web roles or worker roles. */
export interface CloudServicesReimagedefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Rebuild Role Instances reinstalls the operating system on instances of web roles or worker roles and initializes the storage resources that are used by them. If you do not want to initialize storage resources, you can use Reimage Role Instances. */
export interface CloudServicesRebuild200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Rebuild Role Instances reinstalls the operating system on instances of web roles or worker roles and initializes the storage resources that are used by them. If you do not want to initialize storage resources, you can use Reimage Role Instances. */
export interface CloudServicesRebuild202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Rebuild Role Instances reinstalls the operating system on instances of web roles or worker roles and initializes the storage resources that are used by them. If you do not want to initialize storage resources, you can use Reimage Role Instances. */
export interface CloudServicesRebuilddefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes role instances in a cloud service. */
export interface CloudServicesDeleteInstances200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes role instances in a cloud service. */
export interface CloudServicesDeleteInstances202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deletes role instances in a cloud service. */
export interface CloudServicesDeleteInstancesdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates the role instances in the specified update domain. */
export interface CloudServicesUpdateDomainWalkUpdateDomain200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Updates the role instances in the specified update domain. */
export interface CloudServicesUpdateDomainWalkUpdateDomain202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Updates the role instances in the specified update domain. */
export interface CloudServicesUpdateDomainWalkUpdateDomaindefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified update domain of a cloud service. Use nextLink property in the response to get the next page of update domains. Do this till nextLink is null to fetch all the update domains. */
export interface CloudServicesUpdateDomainGetUpdateDomain200Response
  extends HttpResponse {
  status: "200";
  body: UpdateDomainOutput;
}

/** Gets the specified update domain of a cloud service. Use nextLink property in the response to get the next page of update domains. Do this till nextLink is null to fetch all the update domains. */
export interface CloudServicesUpdateDomainGetUpdateDomaindefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a list of all update domains in a cloud service. */
export interface CloudServicesUpdateDomainListUpdateDomains200Response
  extends HttpResponse {
  status: "200";
  body: UpdateDomainListResultOutput;
}

/** Gets a list of all update domains in a cloud service. */
export interface CloudServicesUpdateDomainListUpdateDomainsdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets properties of a guest operating system version that can be specified in the XML service configuration (.cscfg) for a cloud service. */
export interface CloudServiceOperatingSystemsGetOSVersion200Response
  extends HttpResponse {
  status: "200";
  body: OSVersionOutput;
}

/** Gets properties of a guest operating system version that can be specified in the XML service configuration (.cscfg) for a cloud service. */
export interface CloudServiceOperatingSystemsGetOSVersiondefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a list of all guest operating system versions available to be specified in the XML service configuration (.cscfg) for a cloud service. Use nextLink property in the response to get the next page of OS versions. Do this till nextLink is null to fetch all the OS versions. */
export interface CloudServiceOperatingSystemsListOSVersions200Response
  extends HttpResponse {
  status: "200";
  body: OSVersionListResultOutput;
}

/** Gets a list of all guest operating system versions available to be specified in the XML service configuration (.cscfg) for a cloud service. Use nextLink property in the response to get the next page of OS versions. Do this till nextLink is null to fetch all the OS versions. */
export interface CloudServiceOperatingSystemsListOSVersionsdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets properties of a guest operating system family that can be specified in the XML service configuration (.cscfg) for a cloud service. */
export interface CloudServiceOperatingSystemsGetOSFamily200Response
  extends HttpResponse {
  status: "200";
  body: OSFamilyOutput;
}

/** Gets properties of a guest operating system family that can be specified in the XML service configuration (.cscfg) for a cloud service. */
export interface CloudServiceOperatingSystemsGetOSFamilydefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a list of all guest operating system families available to be specified in the XML service configuration (.cscfg) for a cloud service. Use nextLink property in the response to get the next page of OS Families. Do this till nextLink is null to fetch all the OS Families. */
export interface CloudServiceOperatingSystemsListOSFamilies200Response
  extends HttpResponse {
  status: "200";
  body: OSFamilyListResultOutput;
}

/** Gets a list of all guest operating system families available to be specified in the XML service configuration (.cscfg) for a cloud service. Use nextLink property in the response to get the next page of OS Families. Do this till nextLink is null to fetch all the OS Families. */
export interface CloudServiceOperatingSystemsListOSFamiliesdefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}
