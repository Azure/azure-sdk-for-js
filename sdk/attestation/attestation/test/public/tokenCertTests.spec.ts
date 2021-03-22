// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, use as chaiUse } from "chai";
import chaiPromises from "chai-as-promised";
chaiUse(chaiPromises);

import { Recorder } from "@azure/test-utils-recorder";

import { createRecordedClient, createRecorder } from "../utils/recordedClient";
import { Buffer } from "../utils/Buffer";

describe("TokenCertTests", function() {
  let recorder: Recorder;

  beforeEach(/** @this */ function() {
    recorder = createRecorder(this);
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("#GetCertificatesAAD", async () => {
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
  it("#GetCertificatesIsolated", async () => {
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

  it("#GetCertificatesShared", async () => {
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
