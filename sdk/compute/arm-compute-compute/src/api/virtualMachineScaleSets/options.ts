// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  VirtualMachineScaleSetVMInstanceIDs,
  VirtualMachineScaleSetReimageParameters,
  ExpandTypesForGetVMScaleSets,
} from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VirtualMachineScaleSetsScaleOutOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetsCancelOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetsStartOSUpgradeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetsStartExtensionUpgradeOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetsStartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A list of virtual machine instance IDs from the VM scale set. */
  vmInstanceIDs?: VirtualMachineScaleSetVMInstanceIDs;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetsListSkusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualMachineScaleSetsSetOrchestrationServiceStateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetsRestartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A list of virtual machine instance IDs from the VM scale set. */
  vmInstanceIDs?: VirtualMachineScaleSetVMInstanceIDs;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetsReimageAllOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A list of virtual machine instance IDs from the VM scale set. */
  vmInstanceIDs?: VirtualMachineScaleSetVMInstanceIDs;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetsReimageOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Parameters for Reimaging VM ScaleSet. */
  vmScaleSetReimageInput?: VirtualMachineScaleSetReimageParameters;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetsRedeployOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A list of virtual machine instance IDs from the VM scale set. */
  vmInstanceIDs?: VirtualMachineScaleSetVMInstanceIDs;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetsReapplyOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetsPowerOffOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The parameter to request non-graceful VM shutdown. True value for this flag indicates non-graceful shutdown whereas false indicates otherwise. Default value for this flag is false if not specified */
  skipShutdown?: boolean;
  /** A list of virtual machine instance IDs from the VM scale set. */
  vmInstanceIDs?: VirtualMachineScaleSetVMInstanceIDs;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetsPerformMaintenanceOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A list of virtual machine instance IDs from the VM scale set. */
  vmInstanceIDs?: VirtualMachineScaleSetVMInstanceIDs;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetsGetOSUpgradeHistoryOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface VirtualMachineScaleSetsUpdateInstancesOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetsGetInstanceViewOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkOptionalParams
  extends OperationOptions {
  /** The zone in which the manual recovery walk is requested for cross zone virtual machine scale set */
  zone?: string;
  /** The placement group id for which the manual recovery walk is requested. */
  placementGroupId?: string;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetsDeleteInstancesOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Optional parameter to force delete virtual machines from the VM scale set. (Feature in Preview) */
  forceDeletion?: boolean;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetsDeallocateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Optional parameter to hibernate a virtual machine from the VM scale set. (This feature is available for VMSS with Flexible OrchestrationMode only) */
  hibernate?: boolean;
  /** A list of virtual machine instance IDs from the VM scale set. */
  vmInstanceIDs?: VirtualMachineScaleSetVMInstanceIDs;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetsConvertToSinglePlacementGroupOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface VirtualMachineScaleSetsApproveRollingUpgradeOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A list of virtual machine instance IDs from the VM scale set. */
  vmInstanceIDs?: VirtualMachineScaleSetVMInstanceIDs;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetsListAllOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualMachineScaleSetsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualMachineScaleSetsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Optional parameter to force delete a VM scale set. (Feature in Preview) */
  forceDeletion?: boolean;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The ETag of the transformation. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes. */
  ifMatch?: string;
  /** Set to '*' to allow a new record set to be created, but to prevent updating an existing record set. Other values will result in error from server as they are not supported. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The ETag of the transformation. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes. */
  ifMatch?: string;
  /** Set to '*' to allow a new record set to be created, but to prevent updating an existing record set. Other values will result in error from server as they are not supported. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetsGetOptionalParams extends OperationOptions {
  /** The expand expression to apply on the operation. 'UserData' retrieves the UserData property of the VM scale set that was provided by the user during the VM scale set Create/Update operation */
  expand?: ExpandTypesForGetVMScaleSets;
}
