// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServerBackupV2 } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface LongRunningBackupDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LongRunningBackupCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The required parameters for creating and exporting backup of the given server. */
  parameters?: ServerBackupV2;
}
