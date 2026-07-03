// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ResubscribeProperties } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface OrganizationsResubscribeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Resubscribe Properties */
  body?: ResubscribeProperties;
}
