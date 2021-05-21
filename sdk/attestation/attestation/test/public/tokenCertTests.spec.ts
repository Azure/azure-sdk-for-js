// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, use as chaiUse } from "chai";
import { Context } from "mocha";
import chaiPromises from "chai-as-promised";
chaiUse(chaiPromises);

import { Recorder } from "@azure/test-utils-recorder";

import { createRecordedClient, createRecorder } from "../utils/recordedClient";
import { Buffer } from "../utils/Buffer";

describe("TokenCertTests", function() {
  let recorder: Recorder;

  beforeEach(function(this: Context) {
    recorder = createRecorder(this);
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("#GetCertificateAAD", async() => {
    const client = createRecordedClient("AAD");
    const signingCertificates = await client.get_attestation_signers();
    for (const key of signingCertificates) {
      assert.isDefined(key.key_id);
      assert.isDefined(key.certificates);

    }

  });

  it("#GetCertificatesAAD_Old", async () => {
    const client = createRecordedClient("AAD");
    const signingCertificates = await client.signingCertificates.get();
    const certs = signingCertificates.keys!;
    assert(certs.length > 0);
    for (const key of certs) {
      assert.isDefined(key.x5C);
      for (const cert of key.x5C!) {
        const berCert = Buffer.from(cert, "base64");
        assert(berCert);
      }
    }
  });
  it("#GetCertificatesIsolated_Old", async () => {
    const client = createRecordedClient("Isolated");
    const signingCertificates = await client.signingCertificates.get();
    const certs = signingCertificates.keys!;
    assert(certs.length > 0);
    for (const key of certs) {
      assert.isDefined(key.x5C);
      for (const cert of key.x5C!) {
        const berCert = Buffer.from(cert, "base64");
        assert(berCert);
      }
    }
  });

  it("#GetCertificatesShared_Old", async () => {
    const client = createRecordedClient("Shared");
    const signingCertificates = await client.signingCertificates.get();
    const certs = signingCertificates.keys!;
    assert(certs.length > 0);
    for (const key of certs) {
      assert.isDefined(key.x5C);
      for (const cert of key.x5C!) {
        const berCert = Buffer.from(cert, "base64");
        assert(berCert);
      }
    }
  });
});
