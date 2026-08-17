// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  update,
  create,
  deleteEvaluationTaxonomy,
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
<<<<<<< /tmp/azsdk-dev-toolnFGKkd/result/src/classic/beta/evaluationTaxonomies/index.ts
  deleteEvaluationTaxonomy: (
    name: string,
    foundryFeatures: "Evaluations=V1Preview",
    options?: BetaEvaluationTaxonomiesDeleteOptionalParams,
  ) => Promise<void>;
||||||| /tmp/azsdk-dev-toolnFGKkd/base/sdk/ai/ai-projects/generated/classic/beta/evaluationTaxonomies/index.ts
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
=======
  delete: (name: string, options?: BetaEvaluationTaxonomiesDeleteOptionalParams) => Promise<void>;
>>>>>>> /tmp/azsdk-dev-toolnFGKkd/custom/sdk/ai/ai-projects/src/classic/beta/evaluationTaxonomies/index.ts
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
<<<<<<< /tmp/azsdk-dev-toolnFGKkd/result/src/classic/beta/evaluationTaxonomies/index.ts
    ) => create(context, foundryFeatures, name, taxonomy, options),
    deleteEvaluationTaxonomy: (
      name: string,
      foundryFeatures: "Evaluations=V1Preview",
      options?: BetaEvaluationTaxonomiesDeleteOptionalParams,
    ) => deleteEvaluationTaxonomy(context, name, foundryFeatures, options),
    list: (
      foundryFeatures: "Evaluations=V1Preview",
      options?: BetaEvaluationTaxonomiesListOptionalParams,
    ) => list(context, foundryFeatures, options),
    get: (
      name: string,
      foundryFeatures: "Evaluations=V1Preview",
      options?: BetaEvaluationTaxonomiesGetOptionalParams,
    ) => get(context, name, foundryFeatures, options),
||||||| /tmp/azsdk-dev-toolnFGKkd/base/sdk/ai/ai-projects/generated/classic/beta/evaluationTaxonomies/index.ts
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
=======
    ) => create(context, name, taxonomy, options),
    delete: (name: string, options?: BetaEvaluationTaxonomiesDeleteOptionalParams) =>
      $delete(context, name, options),
    list: (options?: BetaEvaluationTaxonomiesListOptionalParams) => list(context, options),
    get: (name: string, options?: BetaEvaluationTaxonomiesGetOptionalParams) =>
      get(context, name, options),
>>>>>>> /tmp/azsdk-dev-toolnFGKkd/custom/sdk/ai/ai-projects/src/classic/beta/evaluationTaxonomies/index.ts
  };
}

export function _getBetaEvaluationTaxonomiesOperations(
  context: AIProjectContext,
): BetaEvaluationTaxonomiesOperations {
  return {
    ..._getBetaEvaluationTaxonomies(context),
  };
}
