"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationIdentityClient = void 0;
const communication_common_1 = require("@azure/communication-common");
const core_auth_1 = require("@azure/core-auth");
const identityRestClient_js_1 = require("./generated/src/identityRestClient.js");
const logger_js_1 = require("./common/logger.js");
const tracing_js_1 = require("./generated/src/tracing.js");
const isCommunicationIdentityClientOptions = (options) => options && !(0, core_auth_1.isTokenCredential)(options) && !(0, communication_common_1.isKeyCredential)(options);
/**
 * Client class for interacting with Azure Communication Services User Token Management.
 */
class CommunicationIdentityClient {
    constructor(connectionStringOrEndpoint, credentialOrOptions, maybeOptions = {}) {
        const { url, credential } = (0, communication_common_1.parseClientArguments)(connectionStringOrEndpoint, credentialOrOptions);
        const options = isCommunicationIdentityClientOptions(credentialOrOptions)
            ? credentialOrOptions
            : maybeOptions;
        const internalPipelineOptions = Object.assign(Object.assign({}, options), {
            loggingOptions: {
                logger: logger_js_1.logger.info,
            },
        });
        this.client = new identityRestClient_js_1.IdentityRestClient(url, Object.assign({ endpoint: url }, internalPipelineOptions));
        const authPolicy = (0, communication_common_1.createCommunicationAuthPolicy)(credential);
        this.client.pipeline.addPolicy(authPolicy);
    }
    /**
     * Creates a scoped user token.
     *
     * @param user - The user whose tokens are being issued.
     * @param scopes - Scopes to include in the token.
     * @param options - Additional options for the request.
     */
    getToken(user, scopes, options = {}) {
        return tracing_js_1.tracingClient.withSpan("CommunicationIdentity-issueToken", options, (updatedOptions) => {
            return this.client.communicationIdentityOperations.issueAccessToken(user.communicationUserId, scopes, Object.assign({ expiresInMinutes: options.tokenExpiresInMinutes }, updatedOptions));
        });
    }
    /**
     * Revokes all data and tokens created for a user.
     *
     * @param user - The user whose tokens are being revoked.
     * @param options - Additional options for the request.
     */
    revokeTokens(user, options = {}) {
        return tracing_js_1.tracingClient.withSpan("CommunicationIdentity-revokeTokens", options, async (updatedOptions) => {
            await this.client.communicationIdentityOperations.revokeAccessTokens(user.communicationUserId, updatedOptions);
        });
    }
    /**
     * Get an identity by its id.
     *
     * @param user - The user to get.
     * @param options - Additional options for the request.
     */
    getUserDetail(user, options = {}) {
        return tracing_js_1.tracingClient.withSpan("CommunicationIdentity-getUser", options, async (updatedOptions) => {
            const result = await this.client.communicationIdentityOperations.get(user.communicationUserId, Object.assign({}, updatedOptions));
            return {
                user: { communicationUserId: result.id },
                customId: result.customId,
                lastTokenIssuedAt: result.lastTokenIssuedAt,
            };
        });
    }
    /**
     * Creates a single user.
     *
     * @param options - Additional options for the request.
     */
    createUser(options = {}) {
        return tracing_js_1.tracingClient.withSpan("CommunicationIdentity-createUser", options, async (updatedOptions) => {
            const result = await this.client.communicationIdentityOperations.create(Object.assign({ expiresInMinutes: undefined, customId: options.customId }, updatedOptions));
            return {
                communicationUserId: result.identity.id,
            };
        });
    }
    /**
     * Creates a single user and a token simultaneously.
     *
     * @param scopes - Scopes to include in the token.
     * @param options - Additional options for the request.
     */
    createUserAndToken(scopes, options = {}) {
        return tracing_js_1.tracingClient.withSpan("CommunicationIdentity-createUserAndToken", options, async (updatedOptions) => {
            const { identity, accessToken } = await this.client.communicationIdentityOperations.create(Object.assign({ createTokenWithScopes: scopes, expiresInMinutes: options.tokenExpiresInMinutes, customId: options.customId }, updatedOptions));
            return Object.assign(Object.assign({}, accessToken), { user: { communicationUserId: identity.id } });
        });
    }
    /**
     * Triggers revocation event for user and deletes all its data.
     *
     * @param user - The user being deleted.
     * @param options - Additional options for the request.
     */
    deleteUser(user, options = {}) {
        return tracing_js_1.tracingClient.withSpan("CommunicationIdentity-deleteUser", options, async (updatedOptions) => {
            await this.client.communicationIdentityOperations.delete(user.communicationUserId, updatedOptions);
        });
    }
    /**
     * Exchanges an Azure AD access token of a Teams user for a new Communication Identity access token with a matching expiration time.
     *
     * @param options - Options used to exchange an Azure AD access token of a Teams user for a new Communication Identity access token.
     */
    getTokenForTeamsUser(options) {
        return tracing_js_1.tracingClient.withSpan("CommunicationIdentity-getTokenForTeamsUser", options, (updatedOptions) => {
            const { teamsUserAadToken, clientId, userObjectId } = updatedOptions;
            return this.client.communicationIdentityOperations.exchangeTeamsUserAccessToken(teamsUserAadToken, clientId, userObjectId, updatedOptions);
        });
    }
}
exports.CommunicationIdentityClient = CommunicationIdentityClient;
//# sourceMappingURL=communicationIdentityClient.js.map