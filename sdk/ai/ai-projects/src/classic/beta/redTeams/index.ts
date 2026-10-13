// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import { create, list, get } from "../../../api/beta/redTeams/operations.js";
import type {
  BetaRedTeamsCreateOptionalParams,
  BetaRedTeamsListOptionalParams,
  BetaRedTeamsGetOptionalParams,
} from "../../../api/beta/redTeams/options.js";
<<<<<<< /tmp/azsdk-dev-toolCDQwXJ/result/src/classic/beta/redTeams/index.ts
import { RedTeam, RedTeamCreate } from "../../../models/models.js";
import { PagedAsyncIterableIterator } from "../../../static-helpers/pagingHelpers.js";
||||||| /tmp/azsdk-dev-toolCDQwXJ/base/sdk/ai/ai-projects/generated/classic/beta/redTeams/index.ts
import { RedTeam } from "../../../models/models.js";
import { PagedAsyncIterableIterator } from "../../../static-helpers/pagingHelpers.js";
=======
import type { RedTeam } from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
>>>>>>> /tmp/azsdk-dev-toolCDQwXJ/custom/sdk/ai/ai-projects/src/classic/beta/redTeams/index.ts

/** Interface representing a BetaRedTeams operations. */
export interface BetaRedTeamsOperations {
  /** Submits a new redteam run for execution with the provided configuration. */
<<<<<<< /tmp/azsdk-dev-toolCDQwXJ/result/src/classic/beta/redTeams/index.ts
  create: (
    foundryFeatures: "RedTeams=V1Preview",
    redTeam: RedTeamCreate,
    options?: BetaRedTeamsCreateOptionalParams,
  ) => Promise<RedTeam>;
||||||| /tmp/azsdk-dev-toolCDQwXJ/base/sdk/ai/ai-projects/generated/classic/beta/redTeams/index.ts
  create: (
    foundryFeatures: "RedTeams=V1Preview",
    redTeam: RedTeam,
    options?: BetaRedTeamsCreateOptionalParams,
  ) => Promise<RedTeam>;
=======
  create: (redTeam: RedTeam, options?: BetaRedTeamsCreateOptionalParams) => Promise<RedTeam>;
>>>>>>> /tmp/azsdk-dev-toolCDQwXJ/custom/sdk/ai/ai-projects/src/classic/beta/redTeams/index.ts
  /** Returns the redteams available in the current project. */
  list: (options?: BetaRedTeamsListOptionalParams) => PagedAsyncIterableIterator<RedTeam>;
  /** Retrieves the specified redteam and its configuration. */
  get: (name: string, options?: BetaRedTeamsGetOptionalParams) => Promise<RedTeam>;
}

function _getBetaRedTeams(context: AIProjectContext) {
  return {
<<<<<<< /tmp/azsdk-dev-toolCDQwXJ/result/src/classic/beta/redTeams/index.ts
    create: (
      foundryFeatures: "RedTeams=V1Preview",
      redTeam: RedTeamCreate,
      options?: BetaRedTeamsCreateOptionalParams,
    ) => create(context, foundryFeatures, redTeam, options),
    list: (foundryFeatures: "RedTeams=V1Preview", options?: BetaRedTeamsListOptionalParams) =>
      list(context, foundryFeatures, options),
    get: (
      name: string,
      foundryFeatures: "RedTeams=V1Preview",
      options?: BetaRedTeamsGetOptionalParams,
    ) => get(context, name, foundryFeatures, options),
||||||| /tmp/azsdk-dev-toolCDQwXJ/base/sdk/ai/ai-projects/generated/classic/beta/redTeams/index.ts
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
=======
    create: (redTeam: RedTeam, options?: BetaRedTeamsCreateOptionalParams) =>
      create(context, redTeam, options),
    list: (options?: BetaRedTeamsListOptionalParams) => list(context, options),
    get: (name: string, options?: BetaRedTeamsGetOptionalParams) => get(context, name, options),
>>>>>>> /tmp/azsdk-dev-toolCDQwXJ/custom/sdk/ai/ai-projects/src/classic/beta/redTeams/index.ts
  };
}

export function _getBetaRedTeamsOperations(context: AIProjectContext): BetaRedTeamsOperations {
  return {
    ..._getBetaRedTeams(context),
  };
}
