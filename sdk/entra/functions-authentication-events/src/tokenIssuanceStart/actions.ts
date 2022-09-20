// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenIssuanceStartAction } from "./context";

/**
 * An Interface for the Provide Claims for token action.
 */
export interface ProvideClaimsForToken extends TokenIssuanceStartAction {
  /** The 'Name' of the action in the JSON. */
  actionType: "ProvideClaimsForToken";
  /** Collection of claims to add to the token. */
  claims: TokenClaim[];
  /** Helper constructor to easily add claims to the action. */
}

/**
 * An Interface representing a claim.
 */
export interface TokenClaim {
  /** The id of the claim (i.e. Name). */
  id: string;
  /** The value of the claim. */
  value: string | string[];
}
