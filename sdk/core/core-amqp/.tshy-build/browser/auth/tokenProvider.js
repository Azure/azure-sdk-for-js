// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { isNamedKeyCredential, isSASCredential } from "@azure/core-auth";
import { signString } from "../util/hmacSha256.js";
/**
 * Creates a token provider from the provided shared access data.
 * @param data - The sharedAccessKeyName/sharedAccessKey pair or the sharedAccessSignature.
 * @hidden
 */
export function createSasTokenProvider(data) {
    if (isNamedKeyCredential(data) || isSASCredential(data)) {
        return new SasTokenProviderImpl(data);
    }
    else if ("sharedAccessKeyName" in data && "sharedAccessKey" in data) {
        return new SasTokenProviderImpl({ name: data.sharedAccessKeyName, key: data.sharedAccessKey });
    }
    else {
        return new SasTokenProviderImpl({ signature: data.sharedAccessSignature });
    }
}
/**
 * A TokenProvider that generates a Sas token:
 * `SharedAccessSignature sr=<resource>&sig=<signature>&se=<expiry>&skn=<keyname>`
 *
 * @internal
 */
export class SasTokenProviderImpl {
    /**
     * Property used to distinguish TokenProvider from TokenCredential.
     */
    get isSasTokenProvider() {
        return true;
    }
    /**
     * Initializes a new instance of SasTokenProvider
     * @param credential - The source `NamedKeyCredential` or `SASCredential`.
     */
    constructor(credential) {
        this._credential = credential;
    }
    /**
     * Gets the sas token for the specified audience
     * @param audience - The audience for which the token is desired.
     */
    async getToken(audience) {
        if (isNamedKeyCredential(this._credential)) {
            return createToken(this._credential.name, this._credential.key, Math.floor(Date.now() / 1000) + 3600, audience);
        }
        else {
            return {
                token: this._credential.signature,
                expiresOnTimestamp: 0,
            };
        }
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
    audience = encodeURIComponent(audience);
    keyName = encodeURIComponent(keyName);
    const stringToSign = audience + "\n" + expiry;
    const sig = await signString(key, stringToSign);
    return {
        token: `SharedAccessSignature sr=${audience}&sig=${sig}&se=${expiry}&skn=${keyName}`,
        expiresOnTimestamp: expiry,
    };
}
//# sourceMappingURL=tokenProvider.js.map