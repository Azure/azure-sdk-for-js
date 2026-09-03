// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedNetworkProvisionOptions } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ManagedNetworkProvisionsProvisionManagedNetworkOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Managed Network Provisioning Options for a machine learning workspace. */
  body?: ManagedNetworkProvisionOptions;
}
