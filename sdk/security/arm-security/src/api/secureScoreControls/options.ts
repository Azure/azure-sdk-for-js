// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecureScoreAPIExpandControlsEnum } from "../../models/secureScoreAPI/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SecureScoreControlsListOptionalParams extends OperationOptions {
  /** OData expand. Optional. */
  expand?: SecureScoreAPIExpandControlsEnum;
}

/** Optional parameters. */
export interface SecureScoreControlsListBySecureScoreOptionalParams extends OperationOptions {
  /** OData expand. Optional. */
  expand?: SecureScoreAPIExpandControlsEnum;
}
