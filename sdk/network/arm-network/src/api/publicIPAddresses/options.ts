// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PublicIPAddressesListVirtualMachineScaleSetPublicIPAddressesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PublicIPAddressesListCloudServicePublicIPAddressesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PublicIPAddressesDisassociateCloudServiceReservedPublicIpOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PublicIPAddressesReserveCloudServicePublicIpAddressOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PublicIPAddressesDdosProtectionStatusOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PublicIPAddressesListAllOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PublicIPAddressesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PublicIPAddressesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PublicIPAddressesUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PublicIPAddressesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PublicIPAddressesGetOptionalParams extends OperationOptions {
  /** Expands referenced resources. */
  expand?: string;
}

/** Optional parameters. */
export interface PublicIPAddressesListVirtualMachineScaleSetVMPublicIPAddressesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PublicIPAddressesGetVirtualMachineScaleSetPublicIPAddressOptionalParams extends OperationOptions {
  /** Expands referenced resources. */
  expand?: string;
}

/** Optional parameters. */
export interface PublicIPAddressesListCloudServiceRoleInstancePublicIPAddressesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PublicIPAddressesGetCloudServicePublicIPAddressOptionalParams extends OperationOptions {
  /** Expands referenced resources. */
  expand?: string;
}
