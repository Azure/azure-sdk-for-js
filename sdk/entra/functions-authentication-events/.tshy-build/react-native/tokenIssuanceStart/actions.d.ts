import type { TokenIssuanceStartAction } from "./context.js";
/**
 * An Interface for the Provide Claims for token action.
 */
export interface ProvideClaimsForToken extends TokenIssuanceStartAction {
    /** The 'Name' of the action in the JSON. */
    actionType: "microsoft.graph.ProvideClaimsForToken";
    /** Collection of claims to add to the token. */
    claims: TokenClaim;
}
/** Helper function to create a provider claims for token */
export declare function createProvideClaimsForToken(claims: TokenClaim): ProvideClaimsForToken;
/**
 * An type representing a claim.
 */
export type TokenClaim = Record<string, string | string[]>;
//# sourceMappingURL=actions.d.ts.map