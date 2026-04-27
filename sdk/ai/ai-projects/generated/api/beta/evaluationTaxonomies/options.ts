// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BetaEvaluationTaxonomiesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaEvaluationTaxonomiesCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaEvaluationTaxonomiesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaEvaluationTaxonomiesListOptionalParams extends OperationOptions {
  /** Filter by the evaluation input name. */
  inputName?: string;
  /** Filter by taxonomy input type. */
  inputType?: string;
}

/** Optional parameters. */
export interface BetaEvaluationTaxonomiesGetOptionalParams extends OperationOptions {}
