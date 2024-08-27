// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure/core-client";
import { DocumentModelOperationState } from "../lro/administration";
import { PollerOptions } from "./PollerOptions";

/**
 * Options for the copy model operation.
 */
export interface BeginCopyModelOptions
  extends OperationOptions,
    PollerOptions<DocumentModelOperationState> {}
