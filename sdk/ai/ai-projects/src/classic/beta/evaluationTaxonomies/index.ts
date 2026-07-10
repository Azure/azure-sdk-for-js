// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  update,
  create,
  $delete,
  list,
  get,
} from "../../../api/beta/evaluationTaxonomies/operations.js";
import type {
  BetaEvaluationTaxonomiesUpdateOptionalParams,
  BetaEvaluationTaxonomiesCreateOptionalParams,
  BetaEvaluationTaxonomiesDeleteOptionalParams,
  BetaEvaluationTaxonomiesListOptionalParams,
  BetaEvaluationTaxonomiesGetOptionalParams,
} from "../../../api/beta/evaluationTaxonomies/options.js";
import type { EvaluationTaxonomy } from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";

/** Interface representing a BetaEvaluationTaxonomies operations. */
export interface BetaEvaluationTaxonomiesOperations {
  /** Modifies the specified evaluation taxonomy with the provided changes. */
  update: (
    name: string,
    taxonomy: EvaluationTaxonomy,
    options?: BetaEvaluationTaxonomiesUpdateOptionalParams,
  ) => Promise<EvaluationTaxonomy>;
  /** Creates or replaces the specified evaluation taxonomy with the provided definition. */
  create: (
    name: string,
    taxonomy: EvaluationTaxonomy,
    options?: BetaEvaluationTaxonomiesCreateOptionalParams,
  ) => Promise<EvaluationTaxonomy>;
  /** Removes the specified evaluation taxonomy from the project. */
  delete: (name: string, options?: BetaEvaluationTaxonomiesDeleteOptionalParams) => Promise<void>;
  /** Returns the evaluation taxonomies available in the project, optionally filtered by input name or input type. */
  list: (
    options?: BetaEvaluationTaxonomiesListOptionalParams,
  ) => PagedAsyncIterableIterator<EvaluationTaxonomy>;
  /** Retrieves the specified evaluation taxonomy. */
  get: (
    name: string,
    options?: BetaEvaluationTaxonomiesGetOptionalParams,
  ) => Promise<EvaluationTaxonomy>;
}

function _getBetaEvaluationTaxonomies(context: AIProjectContext) {
  return {
    update: (
      name: string,
      taxonomy: EvaluationTaxonomy,
      options?: BetaEvaluationTaxonomiesUpdateOptionalParams,
    ) => update(context, name, taxonomy, options),
    create: (
      name: string,
      taxonomy: EvaluationTaxonomy,
      options?: BetaEvaluationTaxonomiesCreateOptionalParams,
    ) => create(context, name, taxonomy, options),
    delete: (name: string, options?: BetaEvaluationTaxonomiesDeleteOptionalParams) =>
      $delete(context, name, options),
    list: (options?: BetaEvaluationTaxonomiesListOptionalParams) => list(context, options),
    get: (name: string, options?: BetaEvaluationTaxonomiesGetOptionalParams) =>
      get(context, name, options),
  };
}

export function _getBetaEvaluationTaxonomiesOperations(
  context: AIProjectContext,
): BetaEvaluationTaxonomiesOperations {
  return {
    ..._getBetaEvaluationTaxonomies(context),
  };
}
