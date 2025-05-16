// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
import {
  Evaluation,
  EvaluationWithOptionalName,
  AgentEvaluationRequest,
  AgentEvaluation,
} from "../../models/models.js";
import {
  EvaluationsCreateAgentEvaluationOptionalParams,
  EvaluationsCreateRunOptionalParams,
  EvaluationsListOptionalParams,
  EvaluationsGetOptionalParams,
} from "../../api/evaluations/options.js";
import { createAgentEvaluation, createRun, list, get } from "../../api/evaluations/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Evaluations operations. */
export interface EvaluationsOperations {
  /** Creates an agent evaluation run. */
  createAgentEvaluation: (
    evaluation: AgentEvaluationRequest,
    options?: EvaluationsCreateAgentEvaluationOptionalParams,
  ) => Promise<AgentEvaluation>;
  /** Creates an evaluation run. */
  createRun: (
    evaluation: EvaluationWithOptionalName,
    options?: EvaluationsCreateRunOptionalParams,
  ) => Promise<Evaluation>;
  /** List evaluation runs */
  list: (options?: EvaluationsListOptionalParams) => PagedAsyncIterableIterator<Evaluation>;
  /** Get an evaluation run by name. */
  get: (name: string, options?: EvaluationsGetOptionalParams) => Promise<Evaluation>;
}

function _getEvaluations(context: AIProjectContext) {
  return {
    createAgentEvaluation: (
      evaluation: AgentEvaluationRequest,
      options?: EvaluationsCreateAgentEvaluationOptionalParams,
    ) => createAgentEvaluation(context, evaluation, options),
    createRun: (
      evaluation: EvaluationWithOptionalName,
      options?: EvaluationsCreateRunOptionalParams,
    ) => createRun(context, evaluation, options),
    list: (options?: EvaluationsListOptionalParams) => list(context, options),
    get: (name: string, options?: EvaluationsGetOptionalParams) => get(context, name, options),
  };
}

export function _getEvaluationsOperations(context: AIProjectContext): EvaluationsOperations {
  return {
    ..._getEvaluations(context),
  };
}
