// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { getSendCertificateChain } from "$internal/credentials/environmentCredential.js";
import { describe, it, assert, vi, afterEach } from "vitest";

describe("EnvironmentCredential (internal)", function () {
  afterEach(function () {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  describe("#getSendCertificateChain", () => {
    it("should parse 'true' correctly", async () => {
      vi.stubEnv("AZURE_CLIENT_SEND_CERTIFICATE_CHAIN", "true");

      const sendCertificateChain = getSendCertificateChain();
      assert.isTrue(sendCertificateChain);
    });

    it("should parse '1' correctly", async () => {
      vi.stubEnv("AZURE_CLIENT_SEND_CERTIFICATE_CHAIN", "1");

      const sendCertificateChain = getSendCertificateChain();
      assert.isTrue(sendCertificateChain);
    });

    it("is case insensitive", async () => {
      vi.stubEnv("AZURE_CLIENT_SEND_CERTIFICATE_CHAIN", "TrUe");

      const sendCertificateChain = getSendCertificateChain();
      assert.isTrue(sendCertificateChain);
    });

    it("should parse undefined correctly", async () => {
      vi.stubEnv("AZURE_CLIENT_SEND_CERTIFICATE_CHAIN", undefined);

      const sendCertificateChain = getSendCertificateChain();
      assert.isFalse(sendCertificateChain);
    });

    it("should default other values to false", async () => {
      vi.stubEnv("AZURE_CLIENT_SEND_CERTIFICATE_CHAIN", "foobar");

      const sendCertificateChain = getSendCertificateChain();
      assert.isFalse(sendCertificateChain);
    });
  });
});
