// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ReplicationEventsListOptionalParams extends OperationOptions {
  /** OData filter options. */
  filter?: string;
}

/** Optional parameters. */
export interface ReplicationEventsGetOptionalParams extends OperationOptions {}
