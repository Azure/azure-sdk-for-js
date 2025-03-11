// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IdentityClient } from "./identityClient.js";
import { TokenCredentialOptions } from "../tokenCredentialOptions.js";

export class sniIdentityClient extends IdentityClient {
    constructor(options: TokenCredentialOptions) {
        super(options);
    }
}