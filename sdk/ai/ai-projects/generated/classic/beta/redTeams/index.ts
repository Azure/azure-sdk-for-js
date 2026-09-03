// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../api/aiProjectContext.js";
import { create, list, get } from "../../../api/beta/redTeams/operations.js";
import {
  BetaRedTeamsCreateOptionalParams,
  BetaRedTeamsListOptionalParams,
  BetaRedTeamsGetOptionalParams,
} from "../../../api/beta/redTeams/options.js";
import { RedTeam } from "../../../models/models.js";
import { PagedAsyncIterableIterator } from "../../../static-helpers/pagingHelpers.js";

/** Interface representing a BetaRedTeams operations. */
export interface BetaRedTeamsOperations {
  /** Submits a new redteam run for execution with the provided configuration. */
  create: (
    foundryFeatures: "RedTeams=V1Preview",
    redTeam: RedTeam,
    options?: BetaRedTeamsCreateOptionalParams,
  ) => Promise<RedTeam>;
  /** Returns the redteams available in the current project. */
  list: (
    foundryFeatures: "RedTeams=V1Preview",
    options?: BetaRedTeamsListOptionalParams,
  ) => PagedAsyncIterableIterator<RedTeam>;
  /** Retrieves the specified redteam and its configuration. */
  get: (
    name: string,
    foundryFeatures: "RedTeams=V1Preview",
    options?: BetaRedTeamsGetOptionalParams,
  ) => Promise<RedTeam>;
}

function _getBetaRedTeams(context: AIProjectContext) {
  return {
    create: (
      foundryFeatures: "RedTeams=V1Preview",
      redTeam: RedTeam,
      options?: BetaRedTeamsCreateOptionalParams,
    ) => create(context, foundryFeatures, redTeam, options),
    list: (foundryFeatures: "RedTeams=V1Preview", options?: BetaRedTeamsListOptionalParams) =>
      list(context, foundryFeatures, options),
    get: (
      name: string,
      foundryFeatures: "RedTeams=V1Preview",
      options?: BetaRedTeamsGetOptionalParams,
    ) => get(context, name, foundryFeatures, options),
  };
}

export function _getBetaRedTeamsOperations(context: AIProjectContext): BetaRedTeamsOperations {
  return {
    ..._getBetaRedTeams(context),
  };
}
