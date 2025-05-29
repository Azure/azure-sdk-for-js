// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { msalPersistencePlatforms } from "./platforms.js";
import { PersistenceCachePlugin } from "@azure/msal-node-extensions";
/**
 * This is used to gain access to the underlying Persistence instance, which we use for testing
 *
 * @returns a raw persistence instance
 * @internal
 */
export async function createPersistence(options) {
    var _a;
    const persistence = await ((_a = msalPersistencePlatforms[process.platform]) === null || _a === void 0 ? void 0 : _a.call(msalPersistencePlatforms, options));
    if (persistence === undefined) {
        throw new Error("no persistence providers are available on this platform");
    }
    return persistence;
}
export async function createPersistenceCachePlugin(options) {
    const persistence = await createPersistence(options !== null && options !== void 0 ? options : {});
    return new PersistenceCachePlugin(persistence, {
        retryNumber: 100,
        retryDelay: 50,
    });
}
//# sourceMappingURL=provider.js.map