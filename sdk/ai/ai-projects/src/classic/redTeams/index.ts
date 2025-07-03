// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
import { RedTeam } from "../../models/models.js";
import {
  RedTeamsCreateOptionalParams,
  RedTeamsListOptionalParams,
  RedTeamsGetOptionalParams,
} from "../../api/redTeams/options.js";
import { create, list, get } from "../../api/redTeams/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RedTeams operations. */
export interface RedTeamsOperations {
  /** Creates a redteam run. */
  create: (
    redTeam: RedTeam,
    options?: RedTeamsCreateOptionalParams,
  ) => Promise<RedTeam>;
  /** List a redteam by name. */
  list: (
    options?: RedTeamsListOptionalParams,
  ) => PagedAsyncIterableIterator<RedTeam>;
  /** Get a redteam by name. */
  get: (name: string, options?: RedTeamsGetOptionalParams) => Promise<RedTeam>;
}

function _getRedTeams(context: AIProjectContext) {
  return {
    create: (redTeam: RedTeam, options?: RedTeamsCreateOptionalParams) =>
      create(context, redTeam, options),
    list: (options?: RedTeamsListOptionalParams) => list(context, options),
    get: (name: string, options?: RedTeamsGetOptionalParams) =>
      get(context, name, options),
  };
}

export function _getRedTeamsOperations(
  context: AIProjectContext,
): RedTeamsOperations {
  return {
    ..._getRedTeams(context),
  };
}
