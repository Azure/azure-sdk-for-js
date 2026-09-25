// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IdentityContext } from "../../api/identityContext.js";
import {
  issueAccessToken,
  revokeAccessTokens,
  deleteIdentityOperation,
  create,
} from "../../api/identityOperations/operations.js";
import {
  IdentityOperationsIssueAccessTokenOptionalParams,
  IdentityOperationsRevokeAccessTokensOptionalParams,
  IdentityOperationsDeleteOptionalParams,
  IdentityOperationsCreateOptionalParams,
} from "../../api/identityOperations/options.js";
import {
  CommunicationIdentityAccessTokenResult,
  CommunicationIdentityAccessToken,
  CommunicationIdentityAccessTokenRequest,
} from "../../models/models.js";

/** Interface representing a IdentityOperations operations. */
export interface IdentityOperationsOperations {
  /** Issue a new token for an identity. */
  issueAccessToken: (
    id: string,
    body: CommunicationIdentityAccessTokenRequest,
    options?: IdentityOperationsIssueAccessTokenOptionalParams,
  ) => Promise<CommunicationIdentityAccessToken>;
  /** Revoke all access tokens for the specific identity. */
  revokeAccessTokens: (
    id: string,
    options?: IdentityOperationsRevokeAccessTokensOptionalParams,
  ) => Promise<void>;
  /** Delete the identity, revoke all tokens for the identity and delete all associated data. */
  deleteIdentityOperation: (
    id: string,
    options?: IdentityOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a new identity, and optionally, an access token. */
  create: (
    options?: IdentityOperationsCreateOptionalParams,
  ) => Promise<CommunicationIdentityAccessTokenResult>;
}

function _getIdentityOperations(context: IdentityContext) {
  return {
    issueAccessToken: (
      id: string,
      body: CommunicationIdentityAccessTokenRequest,
      options?: IdentityOperationsIssueAccessTokenOptionalParams,
    ) => issueAccessToken(context, id, body, options),
    revokeAccessTokens: (
      id: string,
      options?: IdentityOperationsRevokeAccessTokensOptionalParams,
    ) => revokeAccessTokens(context, id, options),
    deleteIdentityOperation: (id: string, options?: IdentityOperationsDeleteOptionalParams) =>
      deleteIdentityOperation(context, id, options),
    create: (options?: IdentityOperationsCreateOptionalParams) => create(context, options),
  };
}

export function _getIdentityOperationsOperations(
  context: IdentityContext,
): IdentityOperationsOperations {
  return {
    ..._getIdentityOperations(context),
  };
}
