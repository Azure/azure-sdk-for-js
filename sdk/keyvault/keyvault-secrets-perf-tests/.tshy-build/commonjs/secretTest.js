"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretTest = void 0;
const keyvault_secrets_1 = require("@azure/keyvault-secrets");
const test_perf_1 = require("@azure-tools/test-perf");
const utils_js_1 = require("./utils.js");
class SecretTest extends test_perf_1.PerfTest {
    secretClient;
    constructor() {
        super();
        this.secretClient = new keyvault_secrets_1.SecretClient(utils_js_1.keyVaultUri, utils_js_1.credential, this.configureClientOptions({}));
    }
    async deleteAndPurgeSecrets(...names) {
        await Promise.all(names.map(async (name) => {
            const poller = await this.secretClient.beginDeleteSecret(name);
            const deletedSecret = await poller.pollUntilDone();
            if (deletedSecret.recoveryId) {
                await this.secretClient.purgeDeletedSecret(name);
            }
        }));
    }
}
exports.SecretTest = SecretTest;
//# sourceMappingURL=secretTest.js.map