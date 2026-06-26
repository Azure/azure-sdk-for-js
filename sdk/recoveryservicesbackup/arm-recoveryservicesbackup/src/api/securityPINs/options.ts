// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityPinBase } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SecurityPINsGetOptionalParams extends OperationOptions {
  xMsAuthorizationAuxiliary?: string;
  /** security pin request */
  parameters?: SecurityPinBase;
}
