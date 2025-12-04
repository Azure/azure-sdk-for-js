// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EvaluationTaxonomiesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EvaluationTaxonomiesCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EvaluationTaxonomiesDeleteOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface EvaluationTaxonomiesListOptionalParams extends OperationOptions {
  /** Filter by the evaluation input name. */
  inputName?: string;
  /** Filter by taxonomy input type. */
  inputType?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface EvaluationTaxonomiesGetOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}
