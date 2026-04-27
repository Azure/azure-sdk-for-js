// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AdooAuthCallRequest } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AdooAuthResponsesGetAdooAuthInfoOptionalParams extends OperationOptions {
  /** The fields required in ADO OAuth call request. */
  parameters?: AdooAuthCallRequest;
}
