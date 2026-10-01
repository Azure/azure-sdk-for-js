// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PlansListOptionalParams extends OperationOptions {
  /** Account Id. */
  accountId?: string;
  /** Organization Id. */
  organizationId?: string;
}
