// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/** Helper function to create a provider claims for token */
export function createProvideClaimsForToken(claims) {
    return {
        actionType: "microsoft.graph.ProvideClaimsForToken",
        claims: claims,
    };
}
//# sourceMappingURL=actions.js.map