"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticTokenCredential = void 0;
/**
 * StaticTokenCredential
 */
class StaticTokenCredential {
    constructor(token) {
        this.token = token;
    }
    async getToken() {
        return this.token;
    }
    dispose() {
        /* intentionally empty */
    }
}
exports.StaticTokenCredential = StaticTokenCredential;
//# sourceMappingURL=staticTokenCredential.js.map