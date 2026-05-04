// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EvaluatorType, EvaluatorCategory, PageOrder } from "../../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BetaEvaluatorsDeleteOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "Evaluations=V1Preview";
}

/** Optional parameters. */
export interface BetaEvaluatorsCancelOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "Evaluations=V1Preview";
}

/** Optional parameters. */
export interface BetaEvaluatorsListOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "Evaluations=V1Preview";
  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the
   * default is 20.
   */
  limit?: number;
  /**
   * Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and`desc`
   * for descending order.
   */
  order?: PageOrder;
  /**
   * A cursor for use in pagination. `after` is an object ID that defines your place in the list.
   * For instance, if you make a list request and receive 100 objects, ending with obj_foo, your
   * subsequent call can include after=obj_foo in order to fetch the next page of the list.
   */
  after?: string;
  /**
   * A cursor for use in pagination. `before` is an object ID that defines your place in the list.
   * For instance, if you make a list request and receive 100 objects, ending with obj_foo, your
   * subsequent call can include before=obj_foo in order to fetch the previous page of the list.
   */
  before?: string;
  /** Filter evaluator generation jobs by category. */
  category?: EvaluatorCategory;
}

/** Optional parameters. */
export interface BetaEvaluatorsGetOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "Evaluations=V1Preview";
}

/** Optional parameters. */
export interface BetaEvaluatorsCreateOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "Evaluations=V1Preview";
  /** Client-generated unique ID for idempotent retries. When absent, the server creates the job unconditionally. */
  operationId?: string;
}

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
