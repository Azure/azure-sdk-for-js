// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IdentityContext } from "../../api/identityContext.js";
import {
  deleteAssignment,
  upsertAssignment,
  getAssignment,
  exchangeToken,
} from "../../api/teamsExtensionOperations/operations.js";
import {
  TeamsExtensionOperationsDeleteAssignmentOptionalParams,
  TeamsExtensionOperationsUpsertAssignmentOptionalParams,
  TeamsExtensionOperationsGetAssignmentOptionalParams,
  TeamsExtensionOperationsExchangeTokenOptionalParams,
} from "../../api/teamsExtensionOperations/options.js";
import {
  CommunicationIdentityAccessTokenResult,
  TeamsExtensionExchangeTokenRequest,
  TeamsExtensionAssignmentResponse,
  TeamsExtensionAssignmentCreateOrUpdateRequest,
} from "../../models/models.js";

/** Interface representing a TeamsExtensionOperations operations. */
export interface TeamsExtensionOperationsOperations {
  /** Removes a Teams Phone access assignment. */
  deleteAssignment: (
    tenantId: string,
    objectId: string,
    options?: TeamsExtensionOperationsDeleteAssignmentOptionalParams,
  ) => Promise<void>;
  /** Creates or replaces a Teams Phone access assignment. */
  upsertAssignment: (
    tenantId: string,
    objectId: string,
    body: TeamsExtensionAssignmentCreateOrUpdateRequest,
    options?: TeamsExtensionOperationsUpsertAssignmentOptionalParams,
  ) => Promise<TeamsExtensionAssignmentResponse>;
  /** Get Teams Phone access assignment by object id. */
  getAssignment: (
    tenantId: string,
    objectId: string,
    options?: TeamsExtensionOperationsGetAssignmentOptionalParams,
  ) => Promise<TeamsExtensionAssignmentResponse>;
  /** Exchanges a Teams Phone token for an ACS user access token. */
  exchangeToken: (
    body: TeamsExtensionExchangeTokenRequest,
    options?: TeamsExtensionOperationsExchangeTokenOptionalParams,
  ) => Promise<CommunicationIdentityAccessTokenResult>;
}

function _getTeamsExtensionOperations(context: IdentityContext) {
  return {
    deleteAssignment: (
      tenantId: string,
      objectId: string,
      options?: TeamsExtensionOperationsDeleteAssignmentOptionalParams,
    ) => deleteAssignment(context, tenantId, objectId, options),
    upsertAssignment: (
      tenantId: string,
      objectId: string,
      body: TeamsExtensionAssignmentCreateOrUpdateRequest,
      options?: TeamsExtensionOperationsUpsertAssignmentOptionalParams,
    ) => upsertAssignment(context, tenantId, objectId, body, options),
    getAssignment: (
      tenantId: string,
      objectId: string,
      options?: TeamsExtensionOperationsGetAssignmentOptionalParams,
    ) => getAssignment(context, tenantId, objectId, options),
    exchangeToken: (
      body: TeamsExtensionExchangeTokenRequest,
      options?: TeamsExtensionOperationsExchangeTokenOptionalParams,
    ) => exchangeToken(context, body, options),
  };
}

export function _getTeamsExtensionOperationsOperations(
  context: IdentityContext,
): TeamsExtensionOperationsOperations {
  return {
    ..._getTeamsExtensionOperations(context),
  };
}
