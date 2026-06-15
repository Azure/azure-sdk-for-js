// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
import { list, createOrUpdate, $delete, get } from "../../api/evaluationRules/operations.js";
import {
  EvaluationRulesListOptionalParams,
  EvaluationRulesCreateOrUpdateOptionalParams,
  EvaluationRulesDeleteOptionalParams,
  EvaluationRulesGetOptionalParams,
} from "../../api/evaluationRules/options.js";
import { EvaluationRule } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a EvaluationRules operations. */
export interface EvaluationRulesOperations {
  /** Returns the evaluation rules configured for the project, optionally filtered by action type, agent name, or enabled state. */
  list: (options?: EvaluationRulesListOptionalParams) => PagedAsyncIterableIterator<EvaluationRule>;
  /** Creates a new evaluation rule, or replaces the existing rule when the identifier matches. */
  createOrUpdate: (
    id: string,
    evaluationRule: EvaluationRule,
    options?: EvaluationRulesCreateOrUpdateOptionalParams,
  ) => Promise<EvaluationRule>;
  /** Removes the specified evaluation rule from the project. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (id: string, options?: EvaluationRulesDeleteOptionalParams) => Promise<void>;
  /** Retrieves the specified evaluation rule and its configuration. */
  get: (id: string, options?: EvaluationRulesGetOptionalParams) => Promise<EvaluationRule>;
}

function _getEvaluationRules(context: AIProjectContext) {
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

export function _getEvaluationRulesOperations(
  context: AIProjectContext,
): EvaluationRulesOperations {
  return {
    ..._getEvaluationRules(context),
  };
}
