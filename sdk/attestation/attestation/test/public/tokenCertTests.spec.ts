// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, use as chaiUse } from "chai";
import { Context } from "mocha";
import chaiPromises from "chai-as-promised";
chaiUse(chaiPromises);

import { Recorder } from "@azure/test-utils-recorder";

import { createRecordedClient, createRecorder } from "../utils/recordedClient";
import { X509 } from "jsrsasign"
import { encodeByteArray } from "../utils/base64url"
import { AttestationClient } from "../../src";
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
    await getCertificatesTest(client);

  });

  it("#GetCertificatesIsolated", async () => {
    const client = createRecordedClient("Isolated");
    await getCertificatesTest(client);
  });

  it("#GetCertificatesShared", async () => {
    const client = createRecordedClient("Shared");
    await getCertificatesTest(client);
  });

  async function getCertificatesTest(client: AttestationClient) : Promise<void>
  {
    const signingCertificates = await client.getAttestationSigners();
    for (const key of signingCertificates) {
      assert.isDefined(key.key_id);
      assert.isDefined(key.certificates);

      key.certificates.forEach(certBuffer => {
          let pemCert: string;
          assert.isDefined(certBuffer);
          pemCert = "-----BEGIN CERTIFICATE-----\r\n";
          pemCert += encodeByteArray(certBuffer);
          pemCert += "\r\n-----END CERTIFICATE-----\r\n";
    
          const cert = new X509();
          cert.readCertPEM(pemCert);
    
          console.log(cert.getSubjectString());
      })
    }
  }
});
