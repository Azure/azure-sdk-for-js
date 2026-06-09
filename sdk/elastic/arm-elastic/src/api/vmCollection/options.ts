// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VMCollectionUpdate } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VMCollectionUpdateOptionalParams extends OperationOptions {
  /** VM resource Id */
  body?: VMCollectionUpdate;
}
