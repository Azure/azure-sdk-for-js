// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { InputItemUnion } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ResponsesCompactResponseConversationOptionalParams extends OperationOptions {
  input?: (string | InputItemUnion[]) | null;
  previousResponseId?: string | null;
  instructions?: string | null;
}
