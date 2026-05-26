// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VmFamiliesListBySubscriptionLocationResourceOptionalParams extends OperationOptions {
  /** The filter to apply to the list operation. Filter can be applied to the 'category' property. Example: $filter=category eq 'generalPurposeCategory'. */
  filter?: string;
}

/** Optional parameters. */
export interface VmFamiliesGetOptionalParams extends OperationOptions {}
