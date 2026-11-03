// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ReplicationAppliancesListOptionalParams extends OperationOptions {
  /** OData filter options. */
  filter?: string;
}
