// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { getClient } from "@azure-rest/core-client";
import { createDefaultHttpClient, createHttpHeaders, createPipelineRequest, } from "@azure/core-rest-pipeline";
const TeamsExtensionScopePrefix = "https://auth.msft.communication.azure.com/";
const CommunicationClientsScopePrefix = "https://communication.azure.com/clients/";
const TeamsExtensionEndpoint = "/access/teamsExtension/:exchangeAccessToken";
const TeamsExtensionApiVersion = "2025-06-30";
const CommunicationClientsEndpoint = "/access/entra/:exchangeAccessToken";
const CommunicationClientsApiVersion = "2025-03-02-preview";
/**
 * Represents a credential that exchanges an Entra token for an Azure Communication Services (ACS) token, enabling access to ACS resources.
 */
export class EntraTokenCredential {
    constructor(options) {
        this.options = options;
        this.result = {
            entraToken: undefined,
            acsToken: { token: "", expiresOnTimestamp: 0 },
        };
        this.client = getClient(options.resourceEndpoint);
        this.httpClient = createDefaultHttpClient();
        this.options = options;
        this.options.scopes = this.options.scopes || [
            "https://communication.azure.com/clients/.default",
        ];
        // immediately fetch the token to pre-warm
        this.isPending = this.getToken();
    }
    async getToken(options) {
        var _a;
        if ((_a = options === null || options === void 0 ? void 0 : options.abortSignal) === null || _a === void 0 ? void 0 : _a.aborted) {
            return { token: "", expiresOnTimestamp: 0 };
        }
        // we're awaiting the token fetch, so we don't want to start another one
        // however, we're ignoring the new abortSignal, unfortunately
        if (!this.isPending) {
            this.isPending = this.getTokenInternal(options);
        }
        try {
            await this.isPending;
        }
        finally {
            this.isPending = null;
        }
        return this.result.acsToken;
    }
    async getTokenInternal(options) {
        const getTokenOptions = (options === null || options === void 0 ? void 0 : options.abortSignal) ? { abortSignal: options.abortSignal } : undefined;
        const token = await this.options.tokenCredential.getToken(this.options.scopes
            ? this.options.scopes
            : ["https://communication.azure.com/clients/.default"], getTokenOptions);
        const currentDateTime = new Date();
        const tokenExpiresOn = new Date(this.result.acsToken.expiresOnTimestamp);
        if (token === null) {
            this.result = {
                entraToken: undefined,
                acsToken: { token: "", expiresOnTimestamp: 0 },
            };
        }
        else if (this.result.acsToken.token === "" ||
            token.token !== this.result.entraToken ||
            tokenExpiresOn < currentDateTime) {
            const acsToken = await this.exchangeEntraToken(this.options.resourceEndpoint, token.token, getTokenOptions);
            this.result = {
                entraToken: token.token,
                acsToken,
            };
        }
        return this.result.acsToken;
    }
    dispose() {
        this.result = {
            entraToken: undefined,
            acsToken: { token: "", expiresOnTimestamp: 0 },
        };
    }
    async exchangeEntraToken(resourceEndpoint, entraToken, options) {
        const request = createPipelineRequest({
            url: this.createRequestUri(resourceEndpoint),
            method: "POST",
            headers: createHttpHeaders({
                Authorization: `Bearer ${entraToken}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            }),
            abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
            body: JSON.stringify({}),
        });
        const response = await this.client.pipeline.sendRequest(this.httpClient, request);
        if (response.status !== 200 || !response.bodyAsText) {
            throw new Error(`Service request failed. Status: ${response.status}, Body: ${response.bodyAsText}`);
        }
        const json = JSON.parse(response.bodyAsText);
        return {
            token: json.accessToken.token,
            expiresOnTimestamp: Date.parse(json.accessToken.expiresOn),
        };
    }
    createRequestUri(resourceEndpoint) {
        const [endpoint, apiVersion] = this.determineEndpointAndApiVersion();
        const requestUri = `${resourceEndpoint}${endpoint}?api-version=${apiVersion}`;
        return requestUri;
    }
    determineEndpointAndApiVersion() {
        if (!this.options.scopes || this.options.scopes.length === 0) {
            throw new Error(`Scopes validation failed. Ensure all scopes start with either {TeamsExtensionScopePrefix} or {CommunicationClientsScopePrefix}.`);
        }
        else if (this.options.scopes.every((scope) => scope.startsWith(TeamsExtensionScopePrefix))) {
            return [TeamsExtensionEndpoint, TeamsExtensionApiVersion];
        }
        else if (this.options.scopes.every((scope) => scope.startsWith(CommunicationClientsScopePrefix))) {
            return [CommunicationClientsEndpoint, CommunicationClientsApiVersion];
        }
        else {
            throw new Error(`Scopes validation failed. Ensure all scopes start with either {TeamsExtensionScopePrefix} or {CommunicationClientsScopePrefix}.`);
        }
    }
}
//# sourceMappingURL=entraTokenCredential.js.map