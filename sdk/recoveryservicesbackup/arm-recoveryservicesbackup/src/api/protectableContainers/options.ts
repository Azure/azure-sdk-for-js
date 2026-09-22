// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ProtectableContainersListOptionalParams extends OperationOptions {
  /** OData filter options. */
  filter?: string;
}
