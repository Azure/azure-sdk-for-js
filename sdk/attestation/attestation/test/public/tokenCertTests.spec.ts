// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, use as chaiUse } from "chai";
import chaiPromises from "chai-as-promised";
chaiUse(chaiPromises);

import { Recorder } from "@azure/test-utils-recorder";

import { createRecordedClient, createRecorder } from "../utils/recordedClient";
import { AttestationClient } from "../../src";
import { Buffer } from "../utils/Buffer";

describe("TokenCertTests", function() {
  let recorder: Recorder;

  beforeEach(function() {
    // eslint-disable-next-line no-invalid-this
    recorder = createRecorder(this);
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("#GetCertificatesAAD", async () => {
    let client: AttestationClient;
    client = createRecordedClient("AAD");
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
  it("#GetCertificatesIsolated", async () => {
    let client: AttestationClient;
    client = createRecordedClient("Isolated");
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

  it("#GetCertificatesShared", async () => {
    let client: AttestationClient;
    client = createRecordedClient("Shared");
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
