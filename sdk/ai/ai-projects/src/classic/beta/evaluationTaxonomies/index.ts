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
import type { PagedAsyncIterableIterator } from "../../../static-helpers/pagingHelpers.js";

/** Interface representing a BetaEvaluationTaxonomies operations. */
export interface BetaEvaluationTaxonomiesOperations {
  /** Update an evaluation taxonomy. */
  update: (
    foundryFeatures: "Evaluations=V1Preview",
    name: string,
    body: EvaluationTaxonomy,
    options?: BetaEvaluationTaxonomiesUpdateOptionalParams,
  ) => Promise<EvaluationTaxonomy>;
  /** Create an evaluation taxonomy. */
  create: (
    foundryFeatures: "Evaluations=V1Preview",
    name: string,
    body: EvaluationTaxonomy,
    options?: BetaEvaluationTaxonomiesCreateOptionalParams,
  ) => Promise<EvaluationTaxonomy>;
  /** Delete an evaluation taxonomy by name. */
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
  /** List evaluation taxonomies */
  list: (
    foundryFeatures: "Evaluations=V1Preview",
    options?: BetaEvaluationTaxonomiesListOptionalParams,
  ) => PagedAsyncIterableIterator<EvaluationTaxonomy>;
  /** Get an evaluation run by name. */
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
      body: EvaluationTaxonomy,
      options?: BetaEvaluationTaxonomiesUpdateOptionalParams,
    ) => update(context, foundryFeatures, name, body, options),
    create: (
      foundryFeatures: "Evaluations=V1Preview",
      name: string,
      body: EvaluationTaxonomy,
      options?: BetaEvaluationTaxonomiesCreateOptionalParams,
    ) => create(context, foundryFeatures, name, body, options),
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
