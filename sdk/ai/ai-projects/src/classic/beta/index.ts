// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
import {
  BetaEvaluationTaxonomiesOperations,
  _getBetaEvaluationTaxonomiesOperations,
} from "./evaluationTaxonomies/index.js";
import { BetaEvaluatorsOperations, _getBetaEvaluatorsOperations } from "./evaluators/index.js";
import { BetaInsightsOperations, _getBetaInsightsOperations } from "./insights/index.js";
import {
  BetaMemoryStoresOperations,
  _getBetaMemoryStoresOperations,
} from "./memoryStores/index.js";
import { BetaRedTeamsOperations, _getBetaRedTeamsOperations } from "./redTeams/index.js";
import { BetaSchedulesOperations, _getBetaSchedulesOperations } from "./schedules/index.js";

/** Interface representing a Beta operations. */
export interface BetaOperations {
  schedules: BetaSchedulesOperations;
  redTeams: BetaRedTeamsOperations;
  memoryStores: BetaMemoryStoresOperations;
  insights: BetaInsightsOperations;
  evaluators: BetaEvaluatorsOperations;
  evaluationTaxonomies: BetaEvaluationTaxonomiesOperations;
}

export function _getBetaOperations(context: AIProjectContext): BetaOperations {
  return {
    schedules: _getBetaSchedulesOperations(context),
    redTeams: _getBetaRedTeamsOperations(context),
    memoryStores: _getBetaMemoryStoresOperations(context),
    insights: _getBetaInsightsOperations(context),
    evaluators: _getBetaEvaluatorsOperations(context),
    evaluationTaxonomies: _getBetaEvaluationTaxonomiesOperations(context),
  };
}
