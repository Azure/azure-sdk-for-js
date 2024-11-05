// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure/core-client";
import type { DocumentAnalysisPollOperationState } from "../lro/analysis";
import type { PollerOptions } from "./PollerOptions";

/**
 * Options for the document classification operation.
 */
export interface ClassifyDocumentOptions
  extends OperationOptions,
    PollerOptions<DocumentAnalysisPollOperationState> {}
