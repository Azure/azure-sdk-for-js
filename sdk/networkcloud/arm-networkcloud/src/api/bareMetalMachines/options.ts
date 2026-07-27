// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  BareMetalMachinePatchParameters,
  BareMetalMachineCordonParameters,
  BareMetalMachinePowerOffParameters,
  BareMetalMachineReimageParameters,
  BareMetalMachineReplaceParameters,
} from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BareMetalMachinesUncordonOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BareMetalMachinesStartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BareMetalMachinesRunReadCommandsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BareMetalMachinesRunDataExtractsRestrictedOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BareMetalMachinesRunDataExtractsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BareMetalMachinesRunCommandOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BareMetalMachinesRestartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BareMetalMachinesReplaceOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The request body. */
  bareMetalMachineReplaceParameters?: BareMetalMachineReplaceParameters;
}

/** Optional parameters. */
export interface BareMetalMachinesReimageOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The content of the action request */
  body?: BareMetalMachineReimageParameters;
}

/** Optional parameters. */
export interface BareMetalMachinesPowerOffOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The request body. */
  bareMetalMachinePowerOffParameters?: BareMetalMachinePowerOffParameters;
}

/** Optional parameters. */
export interface BareMetalMachinesCordonOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The request body. */
  bareMetalMachineCordonParameters?: BareMetalMachineCordonParameters;
}

/** Optional parameters. */
export interface BareMetalMachinesListBySubscriptionOptionalParams extends OperationOptions {
  /** The maximum number of resources to return from the operation. Example: '$top=10'. */
  top?: number;
  /** The opaque token that the server returns to indicate where to continue listing resources from. This is used for paging through large result sets. */
  skipToken?: string;
}

/** Optional parameters. */
export interface BareMetalMachinesListByResourceGroupOptionalParams extends OperationOptions {
  /** The maximum number of resources to return from the operation. Example: '$top=10'. */
  top?: number;
  /** The opaque token that the server returns to indicate where to continue listing resources from. This is used for paging through large result sets. */
  skipToken?: string;
}

/** Optional parameters. */
export interface BareMetalMachinesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The ETag of the transformation. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes. */
  ifMatch?: string;
  /** Set to '*' to allow a new record set to be created, but to prevent updating an existing resource. Other values will result in error from server as they are not supported. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface BareMetalMachinesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The ETag of the transformation. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes. */
  ifMatch?: string;
  /** Set to '*' to allow a new record set to be created, but to prevent updating an existing resource. Other values will result in error from server as they are not supported. */
  ifNoneMatch?: string;
  /** The request body. */
  bareMetalMachineUpdateParameters?: BareMetalMachinePatchParameters;
}

/** Optional parameters. */
export interface BareMetalMachinesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The ETag of the transformation. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes. */
  ifMatch?: string;
  /** Set to '*' to allow a new record set to be created, but to prevent updating an existing resource. Other values will result in error from server as they are not supported. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface BareMetalMachinesGetOptionalParams extends OperationOptions {}
