// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VirtualMachineImagesEdgeZoneGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualMachineImagesEdgeZoneListOptionalParams extends OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: string;
  /** An integer value specifying the number of images to return that matches supplied values. */
  top?: number;
  /** Specifies the order of the results returned. Formatted as an OData query. */
  orderby?: string;
}

/** Optional parameters. */
export interface VirtualMachineImagesEdgeZoneListSkusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualMachineImagesEdgeZoneListOffersOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualMachineImagesEdgeZoneListPublishersOptionalParams extends OperationOptions {}
