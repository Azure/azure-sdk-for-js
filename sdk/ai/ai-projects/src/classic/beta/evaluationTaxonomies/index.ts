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
  /** Update an evaluation taxonomy. */
  update: (
    name: string,
    taxonomy: EvaluationTaxonomy,
    options?: BetaEvaluationTaxonomiesUpdateOptionalParams,
  ) => Promise<EvaluationTaxonomy>;
  /** Create an evaluation taxonomy. */
  create: (
    name: string,
    taxonomy: EvaluationTaxonomy,
    options?: BetaEvaluationTaxonomiesCreateOptionalParams,
  ) => Promise<EvaluationTaxonomy>;
  /** Delete an evaluation taxonomy by name. */
  delete: (name: string, options?: BetaEvaluationTaxonomiesDeleteOptionalParams) => Promise<void>;
  /** List evaluation taxonomies */
  list: (
    options?: BetaEvaluationTaxonomiesListOptionalParams,
  ) => PagedAsyncIterableIterator<EvaluationTaxonomy>;
  /** Get an evaluation run by name. */
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
