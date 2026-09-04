// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { IdentityClient } from "./identityClient.js";
export type {
  CommunicationIdentityCreateRequest,
  CommunicationIdentityTokenScope,
  CommunicationIdentityAccessTokenResult,
  CommunicationIdentity,
  CommunicationIdentityAccessToken,
  CommunicationErrorResponse,
  CommunicationError,
  CommunicationIdentityAccessTokenRequest,
  TeamsUserExchangeTokenRequest,
  TeamsExtensionExchangeTokenRequest,
  TeamsExtensionAssignmentResponse,
  TeamsExtensionPrincipalType,
  TeamsExtensionAssignmentCreateOrUpdateRequest,
} from "./models/index.js";
export { KnownVersions } from "./models/index.js";
export type { IdentityClientOptionalParams } from "./api/index.js";
export type {
  IdentityOperationsIssueAccessTokenOptionalParams,
  IdentityOperationsRevokeAccessTokensOptionalParams,
  IdentityOperationsDeleteOptionalParams,
  IdentityOperationsCreateOptionalParams,
} from "./api/identityOperations/index.js";
export type {
  TeamsExtensionOperationsDeleteAssignmentOptionalParams,
  TeamsExtensionOperationsUpsertAssignmentOptionalParams,
  TeamsExtensionOperationsGetAssignmentOptionalParams,
  TeamsExtensionOperationsExchangeTokenOptionalParams,
} from "./api/teamsExtensionOperations/index.js";
export type { TeamsUserOperationsExchangeTeamsUserAccessTokenOptionalParams } from "./api/teamsUserOperations/index.js";
export type {
  IdentityOperationsOperations,
  TeamsExtensionOperationsOperations,
  TeamsUserOperationsOperations,
} from "./classic/index.js";
export { RestError, isRestError } from "@azure/core-rest-pipeline";
