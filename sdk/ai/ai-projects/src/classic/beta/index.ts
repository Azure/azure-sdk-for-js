// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
import { EvaluationRulesOperations, _getEvaluationRulesOperations } from "./evaluationRules/index.js";
import {
  EvaluationTaxonomiesOperations,
  _getEvaluationTaxonomiesOperations,
} from "./evaluationTaxonomies/index.js";
import { EvaluatorsOperations, _getEvaluatorsOperations } from "./evaluators/index.js";
import { InsightsOperations, _getInsightsOperations } from "./insights/index.js";
import { MemoryStoresOperations, _getMemoryStoresOperations } from "./memoryStores/index.js";
import { RedTeamsOperations, _getRedTeamsOperations } from "./redTeams/index.js";
import { SchedulesOperations, _getSchedulesOperations } from "./schedules/index.js";

export interface BetaOperations {
  /** The operation groups for evaluation rules. */
  evaluationRules: EvaluationRulesOperations;
  /** The operation groups for evaluation taxonomies. */
  evaluationTaxonomies: EvaluationTaxonomiesOperations;
  /** The operation groups for evaluators. */
  evaluators: EvaluatorsOperations;
  /** The operation groups for insights. */
  insights: InsightsOperations;
  /** The operation groups for memory stores. */
  memoryStores: MemoryStoresOperations;
  /** The operation groups for red teams. */
  redTeams: RedTeamsOperations;
  /** The operation groups for schedules. */
  schedules: SchedulesOperations;
}

export function _getBetaOperations(context: AIProjectContext): BetaOperations {
  return {
    evaluationRules: _getEvaluationRulesOperations(context),
    evaluationTaxonomies: _getEvaluationTaxonomiesOperations(context),
    evaluators: _getEvaluatorsOperations(context),
    insights: _getInsightsOperations(context),
    memoryStores: _getMemoryStoresOperations(context),
    redTeams: _getRedTeamsOperations(context),
    schedules: _getSchedulesOperations(context),
  };
}
