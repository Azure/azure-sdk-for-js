// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface LocationCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LocationListSupportedVirtualMachineSkusOptionalParams extends OperationOptions {
  /** The maximum number of items to return in the response. */
  maxresults?: number;
  /** OData filter expression. Valid properties for filtering are "familyName". */
  filter?: string;
}

/** Optional parameters. */
export interface LocationGetQuotasOptionalParams extends OperationOptions {}
