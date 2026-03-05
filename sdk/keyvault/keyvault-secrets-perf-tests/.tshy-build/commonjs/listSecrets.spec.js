"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListSecretsTest = void 0;
const secretTest_js_1 = require("./secretTest.js");
const node_crypto_1 = require("node:crypto");
class ListSecretsTest extends secretTest_js_1.SecretTest {
    static secretsToDelete = [];
    options = {
        count: {
            required: false,
            description: "The number of secrets to create",
            shortName: "c",
            longName: "count",
            defaultValue: 10,
        },
    };
    async globalSetup() {
        // Validate that vault contains 0 secrets (including soft-deleted secrets), since additional secrets
        // (including soft-deleted) impact performance.
        if (!(await this.secretClient.listPropertiesOfSecrets().next()).done ||
            !(await this.secretClient.listDeletedSecrets().next()).done) {
            throw new Error(`KeyVault ${this.secretClient.vaultUrl} must contain 0 ` +
                "secrets (including soft-deleted) before starting perf test");
        }
        const secretToCreate = Array.from({ length: this.parsedOptions.count.value }, (_x, i) => {
            const name = `s${i}-${(0, node_crypto_1.randomUUID)()}`;
            ListSecretsTest.secretsToDelete.push(name);
            return this.secretClient.setSecret(name, "value");
        });
        await Promise.all(secretToCreate);
    }
    async run() {
        // eslint-disable-next-line no-empty
        for await (const _secret of this.secretClient.listPropertiesOfSecrets()) {
        }
    }
    async globalCleanup() {
        await this.deleteAndPurgeSecrets(...ListSecretsTest.secretsToDelete);
    }
}
exports.ListSecretsTest = ListSecretsTest;
//# sourceMappingURL=listSecrets.spec.js.map