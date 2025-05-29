"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProvideClaimsForToken = createProvideClaimsForToken;
/** Helper function to create a provider claims for token */
function createProvideClaimsForToken(claims) {
    return {
        actionType: "microsoft.graph.ProvideClaimsForToken",
        claims: claims,
    };
}
//# sourceMappingURL=actions.js.map