// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createCommunicationAuthPolicy, isKeyCredential, parseClientArguments, } from "@azure/communication-common";
import { isTokenCredential } from "@azure/core-auth";
import { IdentityRestClient } from "./generated/src/identityRestClient.js";
import { logger } from "./common/logger.js";
import { tracingClient } from "./generated/src/tracing.js";
const isCommunicationIdentityClientOptions = (options) => options && !isTokenCredential(options) && !isKeyCredential(options);
/**
 * Client class for interacting with Azure Communication Services User Token Management.
 */
export class CommunicationIdentityClient {
    constructor(connectionStringOrEndpoint, credentialOrOptions, maybeOptions = {}) {
        const { url, credential } = parseClientArguments(connectionStringOrEndpoint, credentialOrOptions);
        const options = isCommunicationIdentityClientOptions(credentialOrOptions)
            ? credentialOrOptions
            : maybeOptions;
        const internalPipelineOptions = Object.assign(Object.assign({}, options), {
            loggingOptions: {
                logger: logger.info,
            },
        });
        this.client = new IdentityRestClient(url, Object.assign({ endpoint: url }, internalPipelineOptions));
        const authPolicy = createCommunicationAuthPolicy(credential);
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
        return tracingClient.withSpan("CommunicationIdentity-issueToken", options, (updatedOptions) => {
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
        return tracingClient.withSpan("CommunicationIdentity-revokeTokens", options, async (updatedOptions) => {
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
        return tracingClient.withSpan("CommunicationIdentity-getUser", options, async (updatedOptions) => {
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
        return tracingClient.withSpan("CommunicationIdentity-createUser", options, async (updatedOptions) => {
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
        return tracingClient.withSpan("CommunicationIdentity-createUserAndToken", options, async (updatedOptions) => {
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
        return tracingClient.withSpan("CommunicationIdentity-deleteUser", options, async (updatedOptions) => {
            await this.client.communicationIdentityOperations.delete(user.communicationUserId, updatedOptions);
        });
    }
    /**
     * Exchanges an Azure AD access token of a Teams user for a new Communication Identity access token with a matching expiration time.
     *
     * @param options - Options used to exchange an Azure AD access token of a Teams user for a new Communication Identity access token.
     */
    getTokenForTeamsUser(options) {
        return tracingClient.withSpan("CommunicationIdentity-getTokenForTeamsUser", options, (updatedOptions) => {
            const { teamsUserAadToken, clientId, userObjectId } = updatedOptions;
            return this.client.communicationIdentityOperations.exchangeTeamsUserAccessToken(teamsUserAadToken, clientId, userObjectId, updatedOptions);
        });
    }
}
//# sourceMappingURL=communicationIdentityClient.js.map