// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
import { update, create, $delete, list, get } from "../../api/evaluationTaxonomies/operations.js";
import {
  EvaluationTaxonomiesUpdateOptionalParams,
  EvaluationTaxonomiesCreateOptionalParams,
  EvaluationTaxonomiesDeleteOptionalParams,
  EvaluationTaxonomiesListOptionalParams,
  EvaluationTaxonomiesGetOptionalParams,
} from "../../api/evaluationTaxonomies/options.js";
import { EvaluationTaxonomy } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a EvaluationTaxonomies operations. */
export interface EvaluationTaxonomiesOperations {
  /** Update an evaluation taxonomy. */
  update: (
    name: string,
    body: EvaluationTaxonomy,
    options?: EvaluationTaxonomiesUpdateOptionalParams,
  ) => Promise<EvaluationTaxonomy>;
  /** Create an evaluation taxonomy. */
  create: (
    name: string,
    body: EvaluationTaxonomy,
    options?: EvaluationTaxonomiesCreateOptionalParams,
  ) => Promise<EvaluationTaxonomy>;
  /** Delete an evaluation taxonomy by name. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (name: string, options?: EvaluationTaxonomiesDeleteOptionalParams) => Promise<void>;
  /** List evaluation taxonomies */
  list: (
    options?: EvaluationTaxonomiesListOptionalParams,
  ) => PagedAsyncIterableIterator<EvaluationTaxonomy>;
  /** Get an evaluation run by name. */
  get: (
    name: string,
    options?: EvaluationTaxonomiesGetOptionalParams,
  ) => Promise<EvaluationTaxonomy>;
}

function _getEvaluationTaxonomies(context: AIProjectContext) {
  return {
    update: (
      name: string,
      body: EvaluationTaxonomy,
      options?: EvaluationTaxonomiesUpdateOptionalParams,
    ) => update(context, name, body, options),
    create: (
      name: string,
      body: EvaluationTaxonomy,
      options?: EvaluationTaxonomiesCreateOptionalParams,
    ) => create(context, name, body, options),
    delete: (name: string, options?: EvaluationTaxonomiesDeleteOptionalParams) =>
      $delete(context, name, options),
    list: (options?: EvaluationTaxonomiesListOptionalParams) => list(context, options),
    get: (name: string, options?: EvaluationTaxonomiesGetOptionalParams) =>
      get(context, name, options),
  };
}

export function _getEvaluationTaxonomiesOperations(
  context: AIProjectContext,
): EvaluationTaxonomiesOperations {
  return {
    ..._getEvaluationTaxonomies(context),
  };
}
