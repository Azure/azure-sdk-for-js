// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiagnosticResource } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DiagnosticsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The required request body for this insightResource invocation. */
  diagnosticResourceRequest?: DiagnosticResource;
}

/** Optional parameters. */
export interface DiagnosticsGetOptionalParams extends OperationOptions {}
