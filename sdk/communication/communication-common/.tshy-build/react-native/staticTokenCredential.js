// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * StaticTokenCredential
 */
export class StaticTokenCredential {
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
//# sourceMappingURL=staticTokenCredential.js.map