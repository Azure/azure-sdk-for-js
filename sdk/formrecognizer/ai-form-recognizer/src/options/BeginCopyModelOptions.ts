// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure/core-client";
import type { DocumentModelOperationState } from "../lro/administration";
import type { PollerOptions } from "./PollerOptions";

/**
 * Options for the copy model operation.
 */
export interface BeginCopyModelOptions
  extends OperationOptions,
    PollerOptions<DocumentModelOperationState> {}
