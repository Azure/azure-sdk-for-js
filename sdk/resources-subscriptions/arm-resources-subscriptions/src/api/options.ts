// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ResourceName } from "../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CheckResourceNameOptionalParams extends OperationOptions {
  /** The request body */
  resourceNameDefinition?: ResourceName;
}
