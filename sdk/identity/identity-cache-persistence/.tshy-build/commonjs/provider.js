"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPersistence = createPersistence;
exports.createPersistenceCachePlugin = createPersistenceCachePlugin;
const platforms_js_1 = require("./platforms.js");
const msal_node_extensions_1 = require("@azure/msal-node-extensions");
/**
 * This is used to gain access to the underlying Persistence instance, which we use for testing
 *
 * @returns a raw persistence instance
 * @internal
 */
async function createPersistence(options) {
    var _a;
    const persistence = await ((_a = platforms_js_1.msalPersistencePlatforms[process.platform]) === null || _a === void 0 ? void 0 : _a.call(platforms_js_1.msalPersistencePlatforms, options));
    if (persistence === undefined) {
        throw new Error("no persistence providers are available on this platform");
    }
    return persistence;
}
async function createPersistenceCachePlugin(options) {
    const persistence = await createPersistence(options !== null && options !== void 0 ? options : {});
    return new msal_node_extensions_1.PersistenceCachePlugin(persistence, {
        retryNumber: 100,
        retryDelay: 50,
    });
}
//# sourceMappingURL=provider.js.map