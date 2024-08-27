// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure/core-client";
import { DocumentAnalysisPollOperationState } from "../lro/analysis";
import { PollerOptions } from "./PollerOptions";

/**
 * Options for the document classification operation.
 */
export interface ClassifyDocumentOptions
  extends OperationOptions,
    PollerOptions<DocumentAnalysisPollOperationState> {}
