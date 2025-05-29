// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var _a, _b, _c;
/* eslint-disable tsdoc/syntax */
import path from "node:path";
import { DataProtectionScope, FilePersistence, FilePersistenceWithDataProtection, KeychainPersistence, LibSecretPersistence, } from "@azure/msal-node-extensions";
/**
 * Local application data folder
 * Expected values:
 * - Darwin: '/Users/user/'
 * - Windows 8+: 'C:\Users\user\AppData\Local'
 * - Linux: '/home/user/.local/share'
 * @internal
 */
const localApplicationDataFolder = (_c = (_b = (_a = process.env.APPDATA) === null || _a === void 0 ? void 0 : _a.replace) === null || _b === void 0 ? void 0 : _b.call(_a, /(.Roaming)*$/, "\\Local")) !== null && _c !== void 0 ? _c : process.env.HOME;
/**
 * Dictionary of values that we use as default as we discover, pick and enable the persistence layer.
 * @internal
 */
export const defaultMsalValues = {
    tokenCache: {
        name: "msal.cache",
        // Expected values:
        // - Darwin: '/Users/user/.IdentityService'
        // - Windows 8+: 'C:\Users\user\AppData\Local\.IdentityService'
        // - Linux: '/home/user/.IdentityService'
        directory: path.join(localApplicationDataFolder, ".IdentityService"),
    },
    keyRing: {
        label: "MSALCache",
        schema: "msal.cache",
        collection: "default",
        attributes: {
            MsalClientID: "Microsoft.Developer.IdentityService",
            "Microsoft.Developer.IdentityService": "1.0.0.0",
        },
        service: "Microsoft.Developer.IdentityService",
        account: "MSALCache",
    },
    keyChain: {
        service: "Microsoft.Developer.IdentityService",
        account: "MSALCache",
    },
};
/**
 * Expected responses:
 * - Darwin: '/Users/user/.IdentityService/<name>'
 * - Windows 8+: 'C:\Users\user\AppData\Local\.IdentityService\<name>'
 * - Linux: '/home/user/.IdentityService/<name>'
 * @internal
 */
function getPersistencePath(name) {
    return path.join(defaultMsalValues.tokenCache.directory, name);
}
/**
 * Set of the platforms we attempt to deliver persistence on.
 *
 * - On Windows we use DPAPI.
 * - On OSX (Darwin), we try to use the system's Keychain, otherwise if the property `unsafeAllowUnencryptedStorage` is set to true, we use an unencrypted file.
 * - On Linux, we try to use the system's Keyring, otherwise if the property `unsafeAllowUnencryptedStorage` is set to true, we use an unencrypted file.
 *
 * Other platforms _are not supported_ at this time.
 *
 * @internal
 */
export const msalPersistencePlatforms = {
    win32: ({ name = defaultMsalValues.tokenCache.name } = {}) => FilePersistenceWithDataProtection.create(getPersistencePath(name), DataProtectionScope.CurrentUser),
    darwin: async (options = {}) => {
        const { name, unsafeAllowUnencryptedStorage } = options;
        const { service, account } = defaultMsalValues.keyChain;
        const persistencePath = getPersistencePath(name || defaultMsalValues.tokenCache.name);
        try {
            const persistence = await KeychainPersistence.create(persistencePath, service, account);
            // If we don't encounter an error when trying to read from the keychain, then we should be good to go.
            await persistence.load();
            return persistence;
        }
        catch (e) {
            // If we got an error while trying to read from the keyring,
            // we will proceed only if the user has specified that unencrypted storage is allowed.
            if (!unsafeAllowUnencryptedStorage) {
                throw new Error("Unable to read from the macOS Keychain.");
            }
            return FilePersistence.create(persistencePath);
        }
    },
    linux: async (options = {}) => {
        const { name, unsafeAllowUnencryptedStorage } = options;
        const { service, account } = defaultMsalValues.keyRing;
        const persistencePath = getPersistencePath(name || defaultMsalValues.tokenCache.name);
        try {
            const persistence = await LibSecretPersistence.create(persistencePath, service, account);
            // If we don't encounter an error when trying to read from the keyring, then we should be good to go.
            await persistence.load();
            return persistence;
        }
        catch (e) {
            // If we got an error while trying to read from the keyring,
            // we will proceed only if the user has specified that unencrypted storage is allowed.
            if (!unsafeAllowUnencryptedStorage) {
                throw new Error("Unable to read from the system keyring (libsecret).");
            }
            return FilePersistence.create(persistencePath);
        }
    },
};
//# sourceMappingURL=platforms.js.map