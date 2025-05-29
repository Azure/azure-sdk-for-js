"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelayAuthenticationError = void 0;
exports.createBrowserRelayCredential = createBrowserRelayCredential;
const tslib_1 = require("tslib");
/**
 * Authentication error thrown when the relay server could not authenticate.
 */
class RelayAuthenticationError extends Error {
    constructor(message, cause) {
        super(message);
        this.cause = cause;
        this.name = "RelayAuthenticationError";
    }
}
exports.RelayAuthenticationError = RelayAuthenticationError;
/**
 * Ask the relay server to create a credential
 * @param relayServer Relay server URL
 * @returns id of the created credential, to be passed back to the relay when calling getToken
 */
async function createCredential(relayServer, options = {}) {
    const response = await fetch(`${relayServer}credential/`, {
        method: "PUT",
        body: JSON.stringify(options),
        headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
        if (response.status === 400) {
            // Throw the error that the relay received
            throw new RelayAuthenticationError("Relay could not create credential", (await response.json()).error);
        }
        throw new RelayAuthenticationError(`Relay could not create credential: got error code ${response.status}`);
    }
    return (await response.json()).id;
}
/**
 * Get a token from the relay
 * @param relayServer Relay server URL
 * @param credentialId ID of the credential (created using createCredential) to get the token with
 * @param scopes Scopes
 * @param options Credential options to be passed to getToken
 * @returns Access token from the relay
 */
async function getTokenFromRelay(relayServer, credentialId, scopes, options = {}) {
    const scope = typeof scopes === "string" ? scopes : scopes[0];
    const params = new URLSearchParams({
        scopes: scope,
        options: JSON.stringify(options),
    });
    const response = await fetch(`${relayServer}credential/${credentialId}/token?${params}`);
    if (!response.ok) {
        if (response.status === 400) {
            // Throw the error that the relay received
            throw new RelayAuthenticationError("Relay was unable to get token", (await response.json()).error);
        }
        throw new RelayAuthenticationError(`Could not get token from relay server: got error code ${response.status}`);
    }
    return (await response.json());
}
/**
 * Create a credential that can be used in the browser to get tokens from a relay server.
 * This credential should be used in conjunction with the relay server provided by the dev-tool package.
 *
 * @param options options for creating the credential.
 * @returns a credential which will use the relay endpoint to get access tokens.
 */
function createBrowserRelayCredential(options = {}) {
    let credentialId = undefined;
    const { browserRelayServerUrl = "http://localhost:4895/" } = options, dacOptions = tslib_1.__rest(options, ["browserRelayServerUrl"]);
    return {
        async getToken(scopes, getTokenOptions) {
            if (!credentialId) {
                credentialId = await createCredential(browserRelayServerUrl, dacOptions);
            }
            return await getTokenFromRelay(browserRelayServerUrl, credentialId, scopes, getTokenOptions);
        },
    };
}
//# sourceMappingURL=browserRelayCredential.js.map