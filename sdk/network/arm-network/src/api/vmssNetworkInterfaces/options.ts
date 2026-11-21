// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VmssNetworkInterfacesListVirtualMachineScaleSetVMNetworkInterfacesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VmssNetworkInterfacesGetVirtualMachineScaleSetNetworkInterfaceOptionalParams extends OperationOptions {
  /** Expands referenced resources. */
  expand?: string;
}
