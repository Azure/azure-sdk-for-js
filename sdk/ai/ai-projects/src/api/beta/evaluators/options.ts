// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";
import type { EvaluatorDiagnosticType, PageOrder } from "../../../models/models.js";

/** Optional parameters. */
export interface BetaEvaluatorsGetCredentialsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaEvaluatorsPendingUploadOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaEvaluatorsListDiagnosticsOptionalParams extends OperationOptions {
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
  /** The maximum number of lineage entries to return, between 1 and 100. The default is 20. */
  limit?: number;
  /** Sort completed diagnostics by `occurred_at`, then diagnostic identifier. The default is `desc`. */
  order?: PageOrder;
  /** Inclusive lower bound for the diagnostic occurrence time, expressed as Unix seconds. */
  startTime?: Date;
  /** Inclusive upper bound for the diagnostic occurrence time, expressed as Unix seconds. Includes all entries occurring within that second. */
  endTime?: Date;
  /** Filter lineage diagnostics by the exact published evaluator version. */
  evaluatorVersion?: string;
  /** Filter completed diagnostics for one public rubric dimension identifier. */
  dimensionId?: string;
  /** Filter by one or more completed diagnostic types by repeating the query parameter. */
  typeParam?: EvaluatorDiagnosticType[];
}
