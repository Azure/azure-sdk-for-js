// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import { create, list, get } from "../../../api/beta/redTeams/operations.js";
import type {
  BetaRedTeamsCreateOptionalParams,
  BetaRedTeamsListOptionalParams,
  BetaRedTeamsGetOptionalParams,
} from "../../../api/beta/redTeams/options.js";
import type { RedTeam } from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";

/** Interface representing a BetaRedTeams operations. */
export interface BetaRedTeamsOperations {
  /** Submits a new redteam run for execution with the provided configuration. */
  create: (redTeam: RedTeam, options?: BetaRedTeamsCreateOptionalParams) => Promise<RedTeam>;
  /** Returns the redteams available in the current project. */
  list: (options?: BetaRedTeamsListOptionalParams) => PagedAsyncIterableIterator<RedTeam>;
  /** Retrieves the specified redteam and its configuration. */
  get: (name: string, options?: BetaRedTeamsGetOptionalParams) => Promise<RedTeam>;
}

function _getBetaRedTeams(context: AIProjectContext) {
  return {
    create: (redTeam: RedTeam, options?: BetaRedTeamsCreateOptionalParams) =>
      create(context, redTeam, options),
    list: (options?: BetaRedTeamsListOptionalParams) => list(context, options),
    get: (name: string, options?: BetaRedTeamsGetOptionalParams) => get(context, name, options),
  };
}

export function _getBetaRedTeamsOperations(context: AIProjectContext): BetaRedTeamsOperations {
  return {
    ..._getBetaRedTeams(context),
  };
}
