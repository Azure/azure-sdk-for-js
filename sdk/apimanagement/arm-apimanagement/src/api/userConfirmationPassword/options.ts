// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppType } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface UserConfirmationPasswordSendOptionalParams extends OperationOptions {
  /** Determines the type of application which send the create user request. Default is legacy publisher portal. */
  appType?: AppType;
}
