// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EvaluationsCreateAgentEvaluationOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface EvaluationsCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EvaluationsListOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface EvaluationsGetOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}
