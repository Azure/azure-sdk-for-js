// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HybridRunbookWorkerCreateParameters } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface HybridRunbookWorkersMoveOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface HybridRunbookWorkersListByHybridRunbookWorkerGroupOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. */
  filter?: string;
}

/** Optional parameters. */
export interface HybridRunbookWorkersDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface HybridRunbookWorkersPatchOptionalParams extends OperationOptions {
  /** The create or update parameters for hybrid runbook worker. */
  hybridRunbookWorkerCreationParameters?: HybridRunbookWorkerCreateParameters;
}

/** Optional parameters. */
export interface HybridRunbookWorkersCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface HybridRunbookWorkersGetOptionalParams extends OperationOptions {}
