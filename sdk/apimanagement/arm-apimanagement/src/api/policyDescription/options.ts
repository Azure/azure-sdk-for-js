// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyScopeContract } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PolicyDescriptionListByServiceOptionalParams extends OperationOptions {
  /** Policy scope. */
  scope?: PolicyScopeContract;
}
