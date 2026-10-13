// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../api/aiProjectContext.js";
import { list, createOrUpdate, $delete, get } from "../../api/evaluationRules/operations.js";
import type {
  EvaluationRulesListOptionalParams,
  EvaluationRulesCreateOrUpdateOptionalParams,
  EvaluationRulesDeleteOptionalParams,
  EvaluationRulesGetOptionalParams,
} from "../../api/evaluationRules/options.js";
<<<<<<< /tmp/azsdk-dev-toolCDQwXJ/result/src/classic/evaluationRules/index.ts
import { EvaluationRule, EvaluationRuleCreateOrUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
||||||| /tmp/azsdk-dev-toolCDQwXJ/base/sdk/ai/ai-projects/generated/classic/evaluationRules/index.ts
import { EvaluationRule } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
=======
import type { EvaluationRule } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
>>>>>>> /tmp/azsdk-dev-toolCDQwXJ/custom/sdk/ai/ai-projects/src/classic/evaluationRules/index.ts

/** Interface representing a EvaluationRules operations. */
export interface EvaluationRulesOperations {
  /** List all evaluation rules. */
  list: (options?: EvaluationRulesListOptionalParams) => PagedAsyncIterableIterator<EvaluationRule>;
  /** Create or update an evaluation rule. */
  createOrUpdate: (
    id: string,
    evaluationRule: EvaluationRuleCreateOrUpdate,
    options?: EvaluationRulesCreateOrUpdateOptionalParams,
  ) => Promise<EvaluationRule>;
  /** Delete an evaluation rule. */
  delete: (id: string, options?: EvaluationRulesDeleteOptionalParams) => Promise<void>;
  /** Get an evaluation rule. */
  get: (id: string, options?: EvaluationRulesGetOptionalParams) => Promise<EvaluationRule>;
}

function _getEvaluationRules(context: AIProjectContext) {
  return {
    list: (options?: EvaluationRulesListOptionalParams) => list(context, options),
    createOrUpdate: (
      id: string,
      evaluationRule: EvaluationRuleCreateOrUpdate,
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
