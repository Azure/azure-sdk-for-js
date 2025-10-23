// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VirtualMachineImagesOperationGroupGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualMachineImagesOperationGroupListWithPropertiesOptionalParams
  extends OperationOptions {
  top?: number;
  orderby?: string;
}

/** Optional parameters. */
export interface VirtualMachineImagesOperationGroupListOptionalParams extends OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: string;
  top?: number;
  orderby?: string;
}

/** Optional parameters. */
export interface VirtualMachineImagesOperationGroupListSkusOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface VirtualMachineImagesOperationGroupListOffersOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface VirtualMachineImagesOperationGroupListPublishersOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface VirtualMachineImagesOperationGroupListByEdgeZoneOptionalParams
  extends OperationOptions {}
