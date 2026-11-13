// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../api/aiProjectContext.js";
import type { EvaluationRule } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type {
  EvaluationRulesListOptionalParams,
  EvaluationRulesCreateOrUpdateOptionalParams,
  EvaluationRulesDeleteOptionalParams,
  EvaluationRulesGetOptionalParams,
} from "../../api/evaluationRules/options.js";
import { list, createOrUpdate, $delete, get } from "../../api/evaluationRules/operations.js";

/** Operations for EvaluationRulesOperations. */
export interface EvaluationRulesOperations {
  /** Returns the evaluation rules configured for the project, including scheduled trace and dataset evaluations, optionally filtered by action type, agent name, or enabled state. */
  list: (options?: EvaluationRulesListOptionalParams) => PagedAsyncIterableIterator<EvaluationRule>;
  /** Creates a new evaluation rule, or replaces the existing rule when the identifier matches. */
  createOrUpdate: (
    id: string,
    evaluationRule: EvaluationRule,
    options?: EvaluationRulesCreateOrUpdateOptionalParams,
  ) => Promise<EvaluationRule>;
  /** Removes the specified evaluation rule from the project. */
  delete: (id: string, options?: EvaluationRulesDeleteOptionalParams) => Promise<void>;
  /** Retrieves the specified evaluation rule and its configuration. */
  get: (id: string, options?: EvaluationRulesGetOptionalParams) => Promise<EvaluationRule>;
}

export function _getEvaluationRulesOperations(
  context: AIProjectContext,
): EvaluationRulesOperations {
  return {
    list: (options?: EvaluationRulesListOptionalParams) => list(context, options),
    createOrUpdate: (
      id: string,
      evaluationRule: EvaluationRule,
      options?: EvaluationRulesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, id, evaluationRule, options),
    delete: (id: string, options?: EvaluationRulesDeleteOptionalParams) =>
      $delete(context, id, options),
    get: (id: string, options?: EvaluationRulesGetOptionalParams) => get(context, id, options),
  };
}
