// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ExpandControlsEnum } from "../../models/secureScoreAPI/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SecureScoreControlsListOptionalParams extends OperationOptions {
  /** OData expand. Optional. */
  expand?: ExpandControlsEnum;
}

/** Optional parameters. */
export interface SecureScoreControlsListBySecureScoreOptionalParams extends OperationOptions {
  /** OData expand. Optional. */
  expand?: ExpandControlsEnum;
}
