// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface NetworkInterfacesListVirtualMachineScaleSetNetworkInterfacesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NetworkInterfacesListCloudServiceNetworkInterfacesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NetworkInterfacesListVirtualMachineScaleSetIpConfigurationsOptionalParams extends OperationOptions {
  /** Expands referenced resources. */
  expand?: string;
}

/** Optional parameters. */
export interface NetworkInterfacesGetVirtualMachineScaleSetIpConfigurationOptionalParams extends OperationOptions {
  /** Expands referenced resources. */
  expand?: string;
}

/** Optional parameters. */
export interface NetworkInterfacesListEffectiveNetworkSecurityGroupsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NetworkInterfacesGetEffectiveRouteTableOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NetworkInterfacesListAllOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NetworkInterfacesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NetworkInterfacesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NetworkInterfacesUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NetworkInterfacesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NetworkInterfacesGetOptionalParams extends OperationOptions {
  /** Expands referenced resources. */
  expand?: string;
}

/** Optional parameters. */
export interface NetworkInterfacesListVirtualMachineScaleSetVMNetworkInterfacesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NetworkInterfacesGetVirtualMachineScaleSetNetworkInterfaceOptionalParams extends OperationOptions {
  /** Expands referenced resources. */
  expand?: string;
}

/** Optional parameters. */
export interface NetworkInterfacesListCloudServiceRoleInstanceNetworkInterfacesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NetworkInterfacesGetCloudServiceNetworkInterfaceOptionalParams extends OperationOptions {
  /** Expands referenced resources. */
  expand?: string;
}
