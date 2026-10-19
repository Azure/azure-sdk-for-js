// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  VirtualMachineScaleSetVMReimageParameters,
  InstanceViewTypes,
} from "../../models/compute/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VirtualMachineScaleSetVMsRunCommandOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMsStartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMsRetrieveBootDiagnosticsDataOptionalParams extends OperationOptions {
  /** Expiration duration in minutes for the SAS URIs with a value between 1 to 1440 minutes. **Note:** If not specified, SAS URIs will be generated with a default expiration duration of 120 minutes. */
  sasUriExpirationTimeInMinutes?: number;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMsRestartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMsRedeployOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMsPowerOffOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The parameter to request non-graceful VM shutdown. True value for this flag indicates non-graceful shutdown whereas false indicates otherwise. Default value for this flag is false if not specified */
  skipShutdown?: boolean;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMsPerformMaintenanceOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMsAttachDetachDataDisksOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMsSimulateEvictionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMsReimageAllOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMsReimageOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Parameters for the Reimaging Virtual machine in ScaleSet. */
  vmScaleSetVMReimageInput?: VirtualMachineScaleSetVMReimageParameters;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMsGetInstanceViewOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMsDeallocateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMsApproveRollingUpgradeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMsListOptionalParams extends OperationOptions {
  /** The filter to apply to the operation. Allowed values are 'startswith(instanceView/statuses/code, 'PowerState') eq true', 'properties/latestModelApplied eq true', 'properties/latestModelApplied eq false'. */
  filter?: string;
  /** The list parameters. Allowed values are 'instanceView', 'instanceView/statuses'. */
  select?: string;
  /** The expand expression to apply to the operation. Allowed values are 'instanceView'. */
  expand?: string;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Optional parameter to force delete a virtual machine from a VM scale set. (Feature in Preview) */
  forceDeletion?: boolean;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The ETag of the transformation. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes. */
  ifMatch?: string;
  /** Set to '*' to allow a new record set to be created, but to prevent updating an existing record set. Other values will result in error from server as they are not supported. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMsGetOptionalParams extends OperationOptions {
  /** The expand expression to apply on the operation. 'InstanceView' will retrieve the instance view of the virtual machine. 'UserData' will retrieve the UserData of the virtual machine. */
  expand?: InstanceViewTypes;
}
