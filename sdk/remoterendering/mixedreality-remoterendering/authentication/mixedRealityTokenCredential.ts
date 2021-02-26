// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
    TokenCredential,
    GetTokenOptions,
    AccessToken
} from "@azure/core-http";

import { MixedRealityStsClient, MixedRealityStsClientOptions } from "@azure/mixedreality-authentication";
import { StaticAccessTokenCredential } from "./staticAccessTokenCredential"
import { v4 as uuid } from "uuid";

class MixedRealityTokenCredential implements TokenCredential {

    private stsClient : MixedRealityStsClient;

    constructor(accountId : uuid, accountDomain : string, credential : TokenCredential, options : MixedRealityStsClientOptions) {
        this.stsClient = new MixedRealityStsClient(accountId, accountDomain, credential, options);
    }

    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null> {
        return this.stsClient.getToken(options);
    }

    static getMixedRealityCredential(accountId : uuid, accountDomain : string, credential : TokenCredential, options : MixedRealityStsClientOptions) : TokenCredential {
        var token = credential as StaticAccessTokenCredential;
        if (token)
        {
            // Static access tokens are assumed to be Mixed Reality access tokens already, so we don't need to exchange
            // them using the MixedRealityTokenCredential.
            return credential;
        }

        return new MixedRealityTokenCredential(accountId, accountDomain, credential, options);
    }
}  