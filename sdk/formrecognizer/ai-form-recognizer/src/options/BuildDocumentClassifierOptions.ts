// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure/core-client";
import { DocumentClassifierOperationState } from "../lro/administration";
import { PollerOptions } from "./PollerOptions";

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
