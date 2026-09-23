// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ListVersionsExpandOptions } from "../../models/compute/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VirtualMachineExtensionImagesListVersionsOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. */
  filter?: string;
  top?: number;
  orderby?: string;
  /** Expand the response to include additional read-only metadata. Allowed values: `properties` — returns extended metadata (`releaseCategory`, `urgencyLevel`, `runProfile`). */
  expand?: ListVersionsExpandOptions;
}
/** Optional parameters. */
export interface VirtualMachineExtensionImagesListTypesOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface VirtualMachineExtensionImagesGetOptionalParams extends OperationOptions {}
