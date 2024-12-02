// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure/core-client";
import type { DocumentClassifierOperationState } from "../lro/administration";
import type { PollerOptions } from "./PollerOptions";

/**
 * Options for the document classifier build operation.
 */
export interface BeginBuildDocumentClassifierOptions
  extends OperationOptions,
    PollerOptions<DocumentClassifierOperationState> {
  /**
   * A textual description of the classifier (can be any text).
   */
  description?: string;
}
