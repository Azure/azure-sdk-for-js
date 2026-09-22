// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure/core-client";
import type { DocumentAnalysisPollOperationState } from "../lro/analysis.js";
import type { PollerOptions } from "./PollerOptions.js";

/**
 * Options for the document classification operation.
 */
export interface ClassifyDocumentOptions
  extends OperationOptions, PollerOptions<DocumentAnalysisPollOperationState> {}
