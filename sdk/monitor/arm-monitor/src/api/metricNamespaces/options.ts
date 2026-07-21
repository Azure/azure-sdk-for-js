// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface MetricNamespacesListOptionalParams extends OperationOptions {
  /** The ISO 8601 conform Date start time from which to query for metric namespaces. */
  startTime?: string;
}
