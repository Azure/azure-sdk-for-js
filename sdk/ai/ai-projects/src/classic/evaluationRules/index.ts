// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

<<<<<<< /tmp/azsdk-dev-toolnFGKkd/result/src/classic/evaluationRules/index.ts
import { AIProjectContext } from "../../api/aiProjectContext.js";
import {
  list,
  createOrUpdate,
  deleteEvaluationRule,
  get,
} from "../../api/evaluationRules/operations.js";
import {
||||||| /tmp/azsdk-dev-toolnFGKkd/base/sdk/ai/ai-projects/generated/classic/evaluationRules/index.ts
import { AIProjectContext } from "../../api/aiProjectContext.js";
import { list, createOrUpdate, $delete, get } from "../../api/evaluationRules/operations.js";
import {
=======
import type { AIProjectContext } from "../../api/aiProjectContext.js";
import { list, createOrUpdate, $delete, get } from "../../api/evaluationRules/operations.js";
import type {
>>>>>>> /tmp/azsdk-dev-toolnFGKkd/custom/sdk/ai/ai-projects/src/classic/evaluationRules/index.ts
  EvaluationRulesListOptionalParams,
  EvaluationRulesCreateOrUpdateOptionalParams,
  EvaluationRulesDeleteOptionalParams,
  EvaluationRulesGetOptionalParams,
} from "../../api/evaluationRules/options.js";
import type { EvaluationRule } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";

/** Interface representing a EvaluationRules operations. */
export interface EvaluationRulesOperations {
  /** List all evaluation rules. */
  list: (options?: EvaluationRulesListOptionalParams) => PagedAsyncIterableIterator<EvaluationRule>;
  /** Create or update an evaluation rule. */
  createOrUpdate: (
    id: string,
    evaluationRule: EvaluationRule,
    options?: EvaluationRulesCreateOrUpdateOptionalParams,
  ) => Promise<EvaluationRule>;
<<<<<<< /tmp/azsdk-dev-toolnFGKkd/result/src/classic/evaluationRules/index.ts
  /** Removes the specified evaluation rule from the project. */
  deleteEvaluationRule: (
    id: string,
    options?: EvaluationRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Retrieves the specified evaluation rule and its configuration. */
||||||| /tmp/azsdk-dev-toolnFGKkd/base/sdk/ai/ai-projects/generated/classic/evaluationRules/index.ts
  /** Removes the specified evaluation rule from the project. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (id: string, options?: EvaluationRulesDeleteOptionalParams) => Promise<void>;
  /** Retrieves the specified evaluation rule and its configuration. */
=======
  /** Delete an evaluation rule. */
  delete: (id: string, options?: EvaluationRulesDeleteOptionalParams) => Promise<void>;
  /** Get an evaluation rule. */
>>>>>>> /tmp/azsdk-dev-toolnFGKkd/custom/sdk/ai/ai-projects/src/classic/evaluationRules/index.ts
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
    deleteEvaluationRule: (id: string, options?: EvaluationRulesDeleteOptionalParams) =>
      deleteEvaluationRule(context, id, options),
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
