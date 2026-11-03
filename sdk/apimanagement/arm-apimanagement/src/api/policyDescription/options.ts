// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyScopeContract } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PolicyDescriptionListByServiceOptionalParams extends OperationOptions {
  /** Policy scope. */
  scope?: PolicyScopeContract;
}
