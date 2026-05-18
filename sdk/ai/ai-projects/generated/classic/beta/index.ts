// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
import {
  BetaAgentOptimizationJobsOperations,
  _getBetaAgentOptimizationJobsOperations,
} from "./agentOptimizationJobs/index.js";
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
import { BetaSchedulesOperations, _getBetaSchedulesOperations } from "./schedules/index.js";
import { BetaSkillsOperations, _getBetaSkillsOperations } from "./skills/index.js";
import { BetaToolboxesOperations, _getBetaToolboxesOperations } from "./toolboxes/index.js";

/** Interface representing a Beta operations. */
export interface BetaOperations {
  agentOptimizationJobs: BetaAgentOptimizationJobsOperations;
  datasets: BetaDatasetsOperations;
  skills: BetaSkillsOperations;
  toolboxes: BetaToolboxesOperations;
  schedules: BetaSchedulesOperations;
  redTeams: BetaRedTeamsOperations;
  models: BetaModelsOperations;
  memoryStores: BetaMemoryStoresOperations;
  insights: BetaInsightsOperations;
  evaluators: BetaEvaluatorsOperations;
  evaluationTaxonomies: BetaEvaluationTaxonomiesOperations;
  agents: BetaAgentsOperations;
}

export function _getBetaOperations(context: AIProjectContext): BetaOperations {
  return {
    agentOptimizationJobs: _getBetaAgentOptimizationJobsOperations(context),
    datasets: _getBetaDatasetsOperations(context),
    skills: _getBetaSkillsOperations(context),
    toolboxes: _getBetaToolboxesOperations(context),
    schedules: _getBetaSchedulesOperations(context),
    redTeams: _getBetaRedTeamsOperations(context),
    models: _getBetaModelsOperations(context),
    memoryStores: _getBetaMemoryStoresOperations(context),
    insights: _getBetaInsightsOperations(context),
    evaluators: _getBetaEvaluatorsOperations(context),
    evaluationTaxonomies: _getBetaEvaluationTaxonomiesOperations(context),
    agents: _getBetaAgentsOperations(context),
  };
}
