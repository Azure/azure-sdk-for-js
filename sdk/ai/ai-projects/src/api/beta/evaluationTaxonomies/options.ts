// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BetaEvaluationTaxonomiesUpdateOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "Evaluations=V1Preview";
}

/** Optional parameters. */
export interface BetaEvaluationTaxonomiesCreateOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "Evaluations=V1Preview";
}

/** Optional parameters. */
export interface BetaEvaluationTaxonomiesDeleteOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface BetaEvaluationTaxonomiesListOptionalParams extends OperationOptions {
  /** Filter by the evaluation input name. */
  inputName?: string;
  /** Filter by taxonomy input type. */
  inputType?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface BetaEvaluationTaxonomiesGetOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}
