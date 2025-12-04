// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EvaluatorType } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EvaluatorsUpdateVersionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EvaluatorsCreateVersionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EvaluatorsDeleteVersionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EvaluatorsGetVersionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EvaluatorsListLatestVersionsOptionalParams extends OperationOptions {
  /** Filter evaluators by type. Possible values: 'all', 'custom', 'builtin'. */
  typeParam?: EvaluatorType | "all";
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
}

/** Optional parameters. */
export interface EvaluatorsListVersionsOptionalParams extends OperationOptions {
  /** Filter evaluators by type. Possible values: 'all', 'custom', 'builtin'. */
  typeParam?: EvaluatorType | "all";
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
}
