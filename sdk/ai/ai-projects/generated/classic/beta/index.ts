// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
import { BetaAgentsOperations, _getBetaAgentsOperations } from "./agents/index.js";
import { BetaDatasetsOperations, _getBetaDatasetsOperations } from "./datasets/index.js";
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
import { BetaModelsOperations, _getBetaModelsOperations } from "./models/index.js";
import { BetaRedTeamsOperations, _getBetaRedTeamsOperations } from "./redTeams/index.js";
import { BetaRoutinesOperations, _getBetaRoutinesOperations } from "./routines/index.js";
import { BetaSchedulesOperations, _getBetaSchedulesOperations } from "./schedules/index.js";
import { BetaSkillsOperations, _getBetaSkillsOperations } from "./skills/index.js";

/** Interface representing a Beta operations. */
export interface BetaOperations {
  agents: BetaAgentsOperations;
  datasets: BetaDatasetsOperations;
  skills: BetaSkillsOperations;
  schedules: BetaSchedulesOperations;
  routines: BetaRoutinesOperations;
  redTeams: BetaRedTeamsOperations;
  models: BetaModelsOperations;
  memoryStores: BetaMemoryStoresOperations;
  insights: BetaInsightsOperations;
  evaluators: BetaEvaluatorsOperations;
  evaluationTaxonomies: BetaEvaluationTaxonomiesOperations;
}

export function _getBetaOperations(context: AIProjectContext): BetaOperations {
  return {
    agents: _getBetaAgentsOperations(context),
    datasets: _getBetaDatasetsOperations(context),
    skills: _getBetaSkillsOperations(context),
    schedules: _getBetaSchedulesOperations(context),
    routines: _getBetaRoutinesOperations(context),
    redTeams: _getBetaRedTeamsOperations(context),
    models: _getBetaModelsOperations(context),
    memoryStores: _getBetaMemoryStoresOperations(context),
    insights: _getBetaInsightsOperations(context),
    evaluators: _getBetaEvaluatorsOperations(context),
    evaluationTaxonomies: _getBetaEvaluationTaxonomiesOperations(context),
  };
}
