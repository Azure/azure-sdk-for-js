// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EvaluationSuitesCreateOrUpdateVersionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EvaluationSuitesDeleteVersionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EvaluationSuitesGetVersionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EvaluationSuitesListLatestOptionalParams extends OperationOptions {
  /** Filter by associated Foundry agent name (from target). */
  agentName?: string;
}

/** Optional parameters. */
export interface EvaluationSuitesListVersionsOptionalParams extends OperationOptions {}
