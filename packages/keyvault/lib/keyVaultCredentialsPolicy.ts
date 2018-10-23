// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as url from "url";
import { RequestPolicy, WebResource, HttpOperationResponse, RequestPolicyOptions, Constants } from "ms-rest-js";

const AuthorizationHeaderName = Constants.HeaderConstants.AUTHORIZATION;

export class KeyVaultCredentialsPolicy implements RequestPolicy {
    private _challengeCache: Map<string, string>;

    constructor(private _nextPolicy: RequestPolicy,
        private _options: RequestPolicyOptions,
        private _authenticator: (challenge: object) => string) {
        this._challengeCache = new Map();

    }

    sendRequest(httpRequest: WebResource): Promise<HttpOperationResponse> {
        const cachedChallenge = this._getCachedChallenge(httpRequest);
        if (!cachedChallenge) {
            // Resume without any challenge. The service may return a 401-unauthorized that will be handled afterwards.
            return this._nextPolicy.sendRequest(httpRequest).then((response: HttpOperationResponse) => {
                // If this is not a 401 result, just resume.
                if (!response || response.status !== 401 || !response.headers) {
                    return response;
                }

                // Otherwise we must handle the 401.
                const challenge = this._getAuthorizationHeader(response);
                if (!challenge || !challenge.authorization || !challenge.resource) {
                    return response;
                }

                this._addChallengeToCache(httpRequest, challenge);
                const retryRequest = httpRequest.clone();
                this._setAuthorizationHeader(httpRequest, challenge);
                return this._nextPolicy.sendRequest(retryRequest);
            });
        }

        this._setAuthorizationHeader(httpRequest, cachedChallenge);
        return this._nextPolicy.sendRequest(httpRequest);
    }

    private _setAuthorizationHeader(httpRequest: WebResource, challenge: any) {
        const authroizationToken = this._authenticator(challenge);
        httpRequest.headers.set(AuthorizationHeaderName, authroizationToken);
    }

    private _getCachedChallenge(webResource: WebResource): any {
        const authority = this._getAuthority(webResource.url);
        return this._challengeCache.get(authority);
    }

    private _addChallengeToCache(webResource: WebResource, challenge: string): void {
        const authority = this._getAuthority(webResource.url);
        this._challengeCache.set(authority, challenge);
    }

    private _getAuthorizationHeader(response: HttpOperationResponse): any | undefined {
        const wwwAuthenticate = response.headers.get("www-authenticate");
        return wwwAuthenticate ? this._parseAuthorizationHeader(wwwAuthenticate) : undefined;
    }

    private _parseAuthorizationHeader(header: string): any {
        if (!header) {
            return undefined;
        }

        const headerParts = header.match(/^(\w+)(?:\s+(.*))?$/); // Header: scheme[ something]
        if (!headerParts) {
            return undefined;
        }

        const scheme = headerParts[1];
        if (scheme.toLowerCase() !== "bearer") {
            return undefined;
        }

        const attributesString = headerParts[2];
        if (!attributesString) {
            return undefined;
        }

        const attributes: any = {};
        const attrStrings = attributesString.split(",");
        for (let i = 0; i < attrStrings.length; ++i) {
            const attrString = attrStrings[i];
            const j = attrString.indexOf("=");
            const name = attrString.substring(0, j).trim();
            const value = attrString.substring(j + 1).trim();
            attributes[name] = JSON.parse('{"value":' + value + "}").value;
        }

        return attributes;
    }

    private _getAuthority(uri: string): string {
        const v = url.parse(uri, true, true);
        const protocol = v.protocol ? v.protocol : ":";
        const host = v.host;
        let result = protocol;
        if (v.slashes) {
            result += "//";
        }
        result += host;
        return result;
    }
}
