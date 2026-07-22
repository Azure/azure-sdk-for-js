// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  VirtualMachinePatchParameters,
  VirtualMachineAssignRelayParameters,
  VirtualMachinePowerOffParameters,
} from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VirtualMachinesStartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachinesRestartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachinesReimageOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachinesPowerOffOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The request body. */
  virtualMachinePowerOffParameters?: VirtualMachinePowerOffParameters;
}

/** Optional parameters. */
export interface VirtualMachinesAssignRelayOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The request body. */
  virtualMachineAssignRelayParameters?: VirtualMachineAssignRelayParameters;
}

/** Optional parameters. */
export interface VirtualMachinesListBySubscriptionOptionalParams extends OperationOptions {
  /** The maximum number of resources to return from the operation. Example: '$top=10'. */
  top?: number;
  /** The opaque token that the server returns to indicate where to continue listing resources from. This is used for paging through large result sets. */
  skipToken?: string;
}

/** Optional parameters. */
export interface VirtualMachinesListByResourceGroupOptionalParams extends OperationOptions {
  /** The maximum number of resources to return from the operation. Example: '$top=10'. */
  top?: number;
  /** The opaque token that the server returns to indicate where to continue listing resources from. This is used for paging through large result sets. */
  skipToken?: string;
}

/** Optional parameters. */
export interface VirtualMachinesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The ETag of the transformation. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes. */
  ifMatch?: string;
  /** Set to '*' to allow a new record set to be created, but to prevent updating an existing resource. Other values will result in error from server as they are not supported. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface VirtualMachinesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The ETag of the transformation. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes. */
  ifMatch?: string;
  /** Set to '*' to allow a new record set to be created, but to prevent updating an existing resource. Other values will result in error from server as they are not supported. */
  ifNoneMatch?: string;
  /** The request body. */
  virtualMachineUpdateParameters?: VirtualMachinePatchParameters;
}

/** Optional parameters. */
export interface VirtualMachinesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The ETag of the transformation. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes. */
  ifMatch?: string;
  /** Set to '*' to allow a new record set to be created, but to prevent updating an existing resource. Other values will result in error from server as they are not supported. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface VirtualMachinesGetOptionalParams extends OperationOptions {}
