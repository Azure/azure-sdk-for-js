// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IdentityContext } from "../../api/identityContext.js";
import { exchangeTeamsUserAccessToken } from "../../api/teamsUserOperations/operations.js";
import { TeamsUserOperationsExchangeTeamsUserAccessTokenOptionalParams } from "../../api/teamsUserOperations/options.js";
import {
  CommunicationIdentityAccessToken,
  TeamsUserExchangeTokenRequest,
} from "../../models/models.js";

/** Interface representing a TeamsUserOperations operations. */
export interface TeamsUserOperationsOperations {
  /** Exchange an Entra ID access token of a Teams user for a new Communication Identity access token with a matching expiration time. */
  exchangeTeamsUserAccessToken: (
    body: TeamsUserExchangeTokenRequest,
    options?: TeamsUserOperationsExchangeTeamsUserAccessTokenOptionalParams,
  ) => Promise<CommunicationIdentityAccessToken>;
}

function _getTeamsUserOperations(context: IdentityContext) {
  return {
    exchangeTeamsUserAccessToken: (
      body: TeamsUserExchangeTokenRequest,
      options?: TeamsUserOperationsExchangeTeamsUserAccessTokenOptionalParams,
    ) => exchangeTeamsUserAccessToken(context, body, options),
  };
}

export function _getTeamsUserOperationsOperations(
  context: IdentityContext,
): TeamsUserOperationsOperations {
  return {
    ..._getTeamsUserOperations(context),
  };
}
