// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  list,
  createOrUpdate,
  $delete,
  get,
} from "../../../api/beta/evaluationRules/operations.js";
import {
  BetaEvaluationRulesListOptionalParams,
  BetaEvaluationRulesCreateOrUpdateOptionalParams,
  BetaEvaluationRulesDeleteOptionalParams,
  BetaEvaluationRulesGetOptionalParams,
} from "../../../api/beta/evaluationRules/options.js";
import { EvaluationRule } from "../../../models/models.js";
import { PagedAsyncIterableIterator } from "../../../static-helpers/pagingHelpers.js";

/** Interface representing a BetaEvaluationRules operations. */
export interface BetaEvaluationRulesOperations {
  /** List all evaluation rules. */
  list: (
    options?: BetaEvaluationRulesListOptionalParams,
  ) => PagedAsyncIterableIterator<EvaluationRule>;
  /** Create or update an evaluation rule. */
  createOrUpdate: (
    id: string,
    evaluationRule: EvaluationRule,
    options?: BetaEvaluationRulesCreateOrUpdateOptionalParams,
  ) => Promise<EvaluationRule>;
  /** Delete an evaluation rule. */
  delete: (id: string, options?: BetaEvaluationRulesDeleteOptionalParams) => Promise<void>;
  /** Get an evaluation rule. */
  get: (id: string, options?: BetaEvaluationRulesGetOptionalParams) => Promise<EvaluationRule>;
}

function _getBetaEvaluationRules(context: AIProjectContext) {
  return {
    list: (options?: BetaEvaluationRulesListOptionalParams) => list(context, options),
    createOrUpdate: (
      id: string,
      evaluationRule: EvaluationRule,
      options?: BetaEvaluationRulesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, id, evaluationRule, options),
    delete: (id: string, options?: BetaEvaluationRulesDeleteOptionalParams) =>
      $delete(context, id, options),
    get: (id: string, options?: BetaEvaluationRulesGetOptionalParams) => get(context, id, options),
  };
}

export function _getBetaEvaluationRulesOperations(
  context: AIProjectContext,
): BetaEvaluationRulesOperations {
  return {
    ..._getBetaEvaluationRules(context),
  };
}
