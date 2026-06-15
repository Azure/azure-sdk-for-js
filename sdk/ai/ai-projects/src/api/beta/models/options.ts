// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";
import type { FoundryModelWeightType } from "../../../models/models.js";

/** Optional parameters. */
export interface BetaModelsGetCredentialsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaModelsPendingUploadOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaModelsPendingCreateVersionOptionalParams extends OperationOptions {}
/** Options for the create method that uploads local files and registers a model version. */
export interface BetaModelsCreateFromSourceOptions extends OperationOptions {
  /** The weight type of the model (e.g. "FullWeight", "LoRA"). */
  weightType?: FoundryModelWeightType;
  /** Base model asset ID. */
  baseModel?: string;
  /** Description of the model version. */
  description?: string;
  /** Tag dictionary. */
  tags?: Record<string, string>;
  /** Polling timeout in milliseconds. Default: 300000 (5 minutes). */
  pollingTimeout?: number;
  /** Polling interval in milliseconds. Default: 2000. */
  pollingInterval?: number;
}

/** Optional parameters. */
export interface BetaModelsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaModelsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaModelsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaModelsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaModelsListVersionsOptionalParams extends OperationOptions {}
