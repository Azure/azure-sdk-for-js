// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import process from "node:process";
import { Constants } from "../common/constants.js";

export const diagnosticLevelFromEnv: string | undefined =
  process.env[Constants.CosmosDbDiagnosticLevelEnvVarName];

export function useCompetitionRankingFromEnv(): boolean {
  return process.env.AZURE_COSMOS_HYBRID_SEARCH_USE_COMPETITION_RANKING?.toLowerCase() === "true";
}
