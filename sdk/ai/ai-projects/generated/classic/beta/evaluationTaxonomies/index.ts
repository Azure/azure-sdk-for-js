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
    foundryFeatures: "Evaluations=V1Preview",
    name: string,
    taxonomy: EvaluationTaxonomy,
    options?: BetaEvaluationTaxonomiesUpdateOptionalParams,
  ) => Promise<EvaluationTaxonomy>;
  /** Creates or replaces the specified evaluation taxonomy with the provided definition. */
  create: (
    foundryFeatures: "Evaluations=V1Preview",
    name: string,
    taxonomy: EvaluationTaxonomy,
    options?: BetaEvaluationTaxonomiesCreateOptionalParams,
  ) => Promise<EvaluationTaxonomy>;
  /** Removes the specified evaluation taxonomy from the project. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    name: string,
    foundryFeatures: "Evaluations=V1Preview",
    options?: BetaEvaluationTaxonomiesDeleteOptionalParams,
  ) => Promise<void>;
  /** Returns the evaluation taxonomies available in the project, optionally filtered by input name or input type. */
  list: (
    foundryFeatures: "Evaluations=V1Preview",
    options?: BetaEvaluationTaxonomiesListOptionalParams,
  ) => PagedAsyncIterableIterator<EvaluationTaxonomy>;
  /** Retrieves the specified evaluation taxonomy. */
  get: (
    name: string,
    foundryFeatures: "Evaluations=V1Preview",
    options?: BetaEvaluationTaxonomiesGetOptionalParams,
  ) => Promise<EvaluationTaxonomy>;
}

function _getBetaEvaluationTaxonomies(context: AIProjectContext) {
  return {
    update: (
      foundryFeatures: "Evaluations=V1Preview",
      name: string,
      taxonomy: EvaluationTaxonomy,
      options?: BetaEvaluationTaxonomiesUpdateOptionalParams,
    ) => update(context, foundryFeatures, name, taxonomy, options),
    create: (
      foundryFeatures: "Evaluations=V1Preview",
      name: string,
      taxonomy: EvaluationTaxonomy,
      options?: BetaEvaluationTaxonomiesCreateOptionalParams,
    ) => create(context, foundryFeatures, name, taxonomy, options),
    delete: (
      name: string,
      foundryFeatures: "Evaluations=V1Preview",
      options?: BetaEvaluationTaxonomiesDeleteOptionalParams,
    ) => $delete(context, name, foundryFeatures, options),
    list: (
      foundryFeatures: "Evaluations=V1Preview",
      options?: BetaEvaluationTaxonomiesListOptionalParams,
    ) => list(context, foundryFeatures, options),
    get: (
      name: string,
      foundryFeatures: "Evaluations=V1Preview",
      options?: BetaEvaluationTaxonomiesGetOptionalParams,
    ) => get(context, name, foundryFeatures, options),
  };
}

export function _getBetaEvaluationTaxonomiesOperations(
  context: AIProjectContext,
): BetaEvaluationTaxonomiesOperations {
  return {
    ..._getBetaEvaluationTaxonomies(context),
  };
}
