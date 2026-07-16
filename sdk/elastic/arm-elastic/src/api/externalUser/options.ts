// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ExternalUserInfo } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ExternalUserCreateOrUpdateOptionalParams extends OperationOptions {
  /** Elastic External User Creation Parameters */
  body?: ExternalUserInfo;
}
