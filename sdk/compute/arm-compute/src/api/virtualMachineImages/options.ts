// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VirtualMachineImagesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualMachineImagesListWithPropertiesOptionalParams extends OperationOptions {
  top?: number;
  orderby?: string;
}

/** Optional parameters. */
export interface VirtualMachineImagesListOptionalParams extends OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: string;
  top?: number;
  orderby?: string;
}

/** Optional parameters. */
export interface VirtualMachineImagesListSkusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualMachineImagesListOffersOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualMachineImagesListPublishersOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualMachineImagesListByEdgeZoneOptionalParams extends OperationOptions {}
