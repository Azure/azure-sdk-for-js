// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  update,
  create,
  $delete,
  list,
  get,
} from "../../../api/beta/evaluationTaxonomies/operations.js";
import {
  BetaEvaluationTaxonomiesUpdateOptionalParams,
  BetaEvaluationTaxonomiesCreateOptionalParams,
  BetaEvaluationTaxonomiesDeleteOptionalParams,
  BetaEvaluationTaxonomiesListOptionalParams,
  BetaEvaluationTaxonomiesGetOptionalParams,
} from "../../../api/beta/evaluationTaxonomies/options.js";
import { EvaluationTaxonomy } from "../../../models/models.js";
import { PagedAsyncIterableIterator } from "../../../static-helpers/pagingHelpers.js";

/** Interface representing a BetaEvaluationTaxonomies operations. */
export interface BetaEvaluationTaxonomiesOperations {
  /** Update an evaluation taxonomy. */
  update: (
    name: string,
    body: EvaluationTaxonomy,
    options?: BetaEvaluationTaxonomiesUpdateOptionalParams,
  ) => Promise<EvaluationTaxonomy>;
  /** Create an evaluation taxonomy. */
  create: (
    name: string,
    body: EvaluationTaxonomy,
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
      body: EvaluationTaxonomy,
      options?: BetaEvaluationTaxonomiesUpdateOptionalParams,
    ) => update(context, name, body, options),
    create: (
      name: string,
      body: EvaluationTaxonomy,
      options?: BetaEvaluationTaxonomiesCreateOptionalParams,
    ) => create(context, name, body, options),
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
