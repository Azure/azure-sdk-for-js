// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VirtualMachineExtensionImagesListVersionsOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. */
  filter?: string;
  top?: number;
  orderby?: string;
}

/** Optional parameters. */
export interface VirtualMachineExtensionImagesListTypesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualMachineExtensionImagesGetOptionalParams extends OperationOptions {}
