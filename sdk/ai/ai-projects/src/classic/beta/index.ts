// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../api/aiProjectContext.js";
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

/** Interface representing a Beta operations. */
export interface BetaOperations {
  /** Operations for managing evaluation schedules. */
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
    schedules: _getBetaSchedulesOperations(context),
    redTeams: _getBetaRedTeamsOperations(context),
    memoryStores: _getBetaMemoryStoresOperations(context),
    insights: _getBetaInsightsOperations(context),
    evaluators: _getBetaEvaluatorsOperations(context),
    evaluationTaxonomies: _getBetaEvaluationTaxonomiesOperations(context),
  };
}
