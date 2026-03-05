"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCertificateTest = exports.CertificateTest = void 0;
const test_perf_1 = require("@azure-tools/test-perf");
const utils_js_1 = require("./utils.js");
const keyvault_certificates_1 = require("@azure/keyvault-certificates");
const node_crypto_1 = require("node:crypto");
class CertificateTest extends test_perf_1.PerfTest {
    options = {};
    certificateClient;
    static certificateName = `c-${(0, node_crypto_1.randomUUID)()}`;
    constructor() {
        super();
        this.certificateClient = new keyvault_certificates_1.CertificateClient(utils_js_1.keyVaultUri, utils_js_1.credential);
    }
    async globalSetup() {
        const poller = await this.certificateClient.beginCreateCertificate(CertificateTest.certificateName, { issuerName: keyvault_certificates_1.WellKnownIssuer.Self, subject: "CN=Azure SDK" });
        await poller.pollUntilDone();
    }
    async globalCleanup() {
        const poller = await this.certificateClient.beginDeleteCertificate(CertificateTest.certificateName);
        const result = await poller.pollUntilDone();
        if (result.recoveryId) {
            await this.certificateClient.purgeDeletedCertificate(CertificateTest.certificateName);
        }
    }
}
exports.CertificateTest = CertificateTest;
class GetCertificateTest extends CertificateTest {
    options = {};
    async run() {
        await this.certificateClient.getCertificate(CertificateTest.certificateName);
    }
}
exports.GetCertificateTest = GetCertificateTest;
//# sourceMappingURL=getCertificate.spec.js.map