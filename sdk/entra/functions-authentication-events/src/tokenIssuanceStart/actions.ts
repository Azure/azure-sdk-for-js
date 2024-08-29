// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TokenIssuanceStartAction } from "./context";

/**
 * An Interface for the Provide Claims for token action.
 */
export interface ProvideClaimsForToken extends TokenIssuanceStartAction {
  /** The 'Name' of the action in the JSON. */
  actionType: "microsoft.graph.ProvideClaimsForToken";
  /** Collection of claims to add to the token. */
  claims: TokenClaim;
  /** Helper constructor to easily add claims to the action. */
}

/** Helper function to create a provider claims for token */
export function createProvideClaimsForToken(claims: TokenClaim): ProvideClaimsForToken {
  return {
    actionType: "microsoft.graph.ProvideClaimsForToken",
    claims: claims,
  };
}

/**
 * An type representing a claim.
 */
export type TokenClaim = Record<string, string | string[]>;
