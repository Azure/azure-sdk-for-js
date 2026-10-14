// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EvaluatorType, PageOrder } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EvaluatorsDeleteGenerationJobOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EvaluatorsCancelGenerationJobOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EvaluatorsListGenerationJobsOptionalParams extends OperationOptions {
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
}

/** Optional parameters. */
export interface EvaluatorsGetGenerationJobOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EvaluatorsCreateGenerationJobOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Client-generated unique ID for idempotent retries. When absent, the server creates the job unconditionally. */
  operationId?: string;
}

/** Optional parameters. */
export interface EvaluatorsUpdateVersionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EvaluatorsCreateVersionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EvaluatorsDeleteVersionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EvaluatorsGetVersionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EvaluatorsListOptionalParams extends OperationOptions {
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
