// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  VirtualMachineScaleSetVMReimageParameters,
  InstanceViewTypes,
} from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VirtualMachineScaleSetVMSRunCommandOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMSStartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMSRetrieveBootDiagnosticsDataOptionalParams
  extends OperationOptions {
  /** Expiration duration in minutes for the SAS URIs with a value between 1 to 1440 minutes. **Note:** If not specified, SAS URIs will be generated with a default expiration duration of 120 minutes. */
  sasUriExpirationTimeInMinutes?: number;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMSRestartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMSRedeployOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMSPowerOffOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The parameter to request non-graceful VM shutdown. True value for this flag indicates non-graceful shutdown whereas false indicates otherwise. Default value for this flag is false if not specified */
  skipShutdown?: boolean;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMSPerformMaintenanceOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMSAttachDetachDataDisksOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMSSimulateEvictionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMSReimageAllOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMSReimageOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Parameters for the Reimaging Virtual machine in ScaleSet. */
  vmScaleSetVMReimageInput?: VirtualMachineScaleSetVMReimageParameters;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMSGetInstanceViewOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMSDeallocateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMSApproveRollingUpgradeOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMSListOptionalParams extends OperationOptions {
  /** The filter to apply to the operation. Allowed values are 'startswith(instanceView/statuses/code, 'PowerState') eq true', 'properties/latestModelApplied eq true', 'properties/latestModelApplied eq false'. */
  filter?: string;
  /** The list parameters. Allowed values are 'instanceView', 'instanceView/statuses'. */
  select?: string;
  /** The expand expression to apply to the operation. Allowed values are 'instanceView'. */
  expand?: string;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMSDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Optional parameter to force delete a virtual machine from a VM scale set. (Feature in Preview) */
  forceDeletion?: boolean;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMSUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The ETag of the transformation. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes. */
  ifMatch?: string;
  /** Set to '*' to allow a new record set to be created, but to prevent updating an existing record set. Other values will result in error from server as they are not supported. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMSGetOptionalParams extends OperationOptions {
  /** The expand expression to apply on the operation. 'InstanceView' will retrieve the instance view of the virtual machine. 'UserData' will retrieve the UserData of the virtual machine. */
  expand?: InstanceViewTypes;
}
