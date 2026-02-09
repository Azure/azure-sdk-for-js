// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EvaluatorType } from "../../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BetaEvaluatorsUpdateVersionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaEvaluatorsCreateVersionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaEvaluatorsDeleteVersionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaEvaluatorsGetVersionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaEvaluatorsListLatestVersionsOptionalParams extends OperationOptions {
  /** Filter evaluators by type. Possible values: 'all', 'custom', 'builtin'. */
  typeParam?: EvaluatorType | "all";
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
}

/** Optional parameters. */
export interface BetaEvaluatorsListVersionsOptionalParams extends OperationOptions {
  /** Filter evaluators by type. Possible values: 'all', 'custom', 'builtin'. */
  typeParam?: EvaluatorType | "all";
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
}
