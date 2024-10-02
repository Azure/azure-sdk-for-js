// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import Sinon from "sinon";
import { assert } from "@azure-tools/test-utils";
import { getSendCertificateChain } from "../../../src/credentials/environmentCredential";

describe("EnvironmentCredential (internal)", function () {
  afterEach(function () {
    Sinon.restore();
  });

  describe("#getSendCertificateChain", () => {
    it("should parse 'true' correctly", async () => {
      Sinon.stub(process, "env").value({
        AZURE_CLIENT_SEND_CERTIFICATE_CHAIN: "true",
      });

      const sendCertificateChain = getSendCertificateChain();
      assert.isTrue(sendCertificateChain);
    });

    it("should parse '1' correctly", async () => {
      Sinon.stub(process, "env").value({
        AZURE_CLIENT_SEND_CERTIFICATE_CHAIN: "1",
      });

      const sendCertificateChain = getSendCertificateChain();
      assert.isTrue(sendCertificateChain);
    });

    it("is case insensitive", async () => {
      Sinon.stub(process, "env").value({
        AZURE_CLIENT_SEND_CERTIFICATE_CHAIN: "TrUe",
      });

      const sendCertificateChain = getSendCertificateChain();
      assert.isTrue(sendCertificateChain);
    });

    it("should parse undefined correctly", async () => {
      Sinon.stub(process, "env").value({});

      const sendCertificateChain = getSendCertificateChain();
      assert.isFalse(sendCertificateChain);
    });

    it("should default other values to false", async () => {
      Sinon.stub(process, "env").value({
        AZURE_CLIENT_SEND_CERTIFICATE_CHAIN: "foobar",
      });

      const sendCertificateChain = getSendCertificateChain();
      assert.isFalse(sendCertificateChain);
    });
  });
});
