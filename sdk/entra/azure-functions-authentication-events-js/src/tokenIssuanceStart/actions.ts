import { TokenIssuanceStartAction } from ".";

/**
 * Class for the Provide Claims for token action.
 * @beta
 */
export interface ProvideClaimsForToken extends TokenIssuanceStartAction {
  /** The 'Name' of the action in the JSON. */
  actionType: "ProvideClaimsForToken";
  /** Collection of claims to add to the token. */
  claims: TokenClaim[];
  /** Helper constructor to easily add claims to the action. */
}

/**
 * A class representing a claim.
 * @beta
 */
 export interface TokenClaim {
  /** The id of the claim (i.e. Name). */
  id: string;
  /** The value of the claim. */
  value: string | string[];
}

