// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../api/aiProjectContext.js";
import type { BetaSkillsOperations } from "./skills/index.js";
import { _getBetaSkillsOperations } from "./skills/index.js";
import type { BetaManagedAgentIdentityBlueprintsOperations } from "./managedAgentIdentityBlueprints/index.js";
import { _getBetaManagedAgentIdentityBlueprintsOperations } from "./managedAgentIdentityBlueprints/index.js";
import type { BetaAgentSessionFilesOperations } from "./agentSessionFiles/index.js";
import { _getBetaAgentSessionFilesOperations } from "./agentSessionFiles/index.js";
import type { BetaEvaluationTaxonomiesOperations } from "./evaluationTaxonomies/index.js";
import { _getBetaEvaluationTaxonomiesOperations } from "./evaluationTaxonomies/index.js";
import type { BetaEvaluatorsOperations } from "./evaluators/index.js";
import { _getBetaEvaluatorsOperations } from "./evaluators/index.js";
import type { BetaInsightsOperations } from "./insights/index.js";
import { _getBetaInsightsOperations } from "./insights/index.js";
import type { BetaMemoryStoresOperations } from "./memoryStores/index.js";
import { _getBetaMemoryStoresOperations } from "./memoryStores/index.js";
import type { BetaRedTeamsOperations } from "./redTeams/index.js";
import { _getBetaRedTeamsOperations } from "./redTeams/index.js";
import type { BetaSchedulesOperations } from "./schedules/index.js";
import { _getBetaSchedulesOperations } from "./schedules/index.js";
import type { BetaToolboxesOperations } from "./toolboxes/index.js";
import { _getBetaToolboxesOperations } from "./toolboxes/index.js";

/** Interface representing a Beta operations. */
export interface BetaOperations {
  managedAgentIdentityBlueprints: BetaManagedAgentIdentityBlueprintsOperations;
  agentSessionFiles: BetaAgentSessionFilesOperations;
  skills: BetaSkillsOperations;
  toolboxes: BetaToolboxesOperations;
  schedules: BetaSchedulesOperations;
  /** Operations for managing red team evaluations. */
  redTeams: BetaRedTeamsOperations;
  /** Operations for managing memory stores. */
  memoryStores: BetaMemoryStoresOperations;
  /** Operations for managing evaluation insights. */
  insights: BetaInsightsOperations;
  /** Operations for managing evaluators. */
  evaluators: BetaEvaluatorsOperations;
  /** Operations for managing evaluation taxonomies. */
  evaluationTaxonomies: BetaEvaluationTaxonomiesOperations;
}

export function _getBetaOperations(context: AIProjectContext): BetaOperations {
  return {
    managedAgentIdentityBlueprints: _getBetaManagedAgentIdentityBlueprintsOperations(context),
    agentSessionFiles: _getBetaAgentSessionFilesOperations(context),
    skills: _getBetaSkillsOperations(context),
    toolboxes: _getBetaToolboxesOperations(context),
    schedules: _getBetaSchedulesOperations(context),
    /** Operations for managing red team evaluations. */
    redTeams: _getBetaRedTeamsOperations(context),
    /** Operations for managing memory stores. */
    memoryStores: _getBetaMemoryStoresOperations(context),
    /** Operations for managing evaluation insights. */
    insights: _getBetaInsightsOperations(context),
    /** Operations for managing evaluators. */
    evaluators: _getBetaEvaluatorsOperations(context),
    /** Operations for managing evaluation taxonomies. */
    evaluationTaxonomies: _getBetaEvaluationTaxonomiesOperations(context),
  };
}
