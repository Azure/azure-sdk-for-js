// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { signString } from "./hmacSha256.js";
/**
 * A TokenProvider that generates a Sas token:
 * `SharedAccessSignature sr=<resource>&sig=<signature>&se=<expiry>&skn=<keyname>`
 *
 * @internal
 */
export class SasTokenCredential {
    /**
     * Initializes a new instance of SasTokenProvider
     * @param credential - The source `NamedKeyCredential` or `SASCredential`.
     */
    constructor(credential) {
        this._credential = credential;
    }
    /**
     * Gets the sas token for the specified audience
     * @param scopes - The scope for which the token is desired.
     */
    async getToken(scopes) {
        const audience = Array.isArray(scopes) ? scopes[0] : scopes;
        return createToken(this._credential.sharedAccessKeyName, this._credential.sharedAccessKey, Math.floor(Date.now() / 1000) + 3600, audience);
    }
}
/**
 * Creates the sas token based on the provided information.
 * @param keyName - The shared access key name.
 * @param key - The shared access key.
 * @param expiry - The time period in unix time after which the token will expire.
 * @param audience - The audience for which the token is desired.
 * @internal
 */
async function createToken(keyName, key, expiry, audience) {
    audience = encodeURIComponent(audience.toLowerCase());
    keyName = encodeURIComponent(keyName);
    const stringToSign = audience + "\n" + expiry;
    const sig = await signString(key, stringToSign);
    return {
        token: `SharedAccessSignature sr=${audience}&sig=${sig}&se=${expiry}&skn=${keyName}`,
        expiresOnTimestamp: expiry,
    };
}
//# sourceMappingURL=sasTokenCredential.js.map