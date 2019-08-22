// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import { CertificatesClient } from "../src";
import { env, retry } from "./utils/recorder";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";

describe("Certificates client - create, read, update and delete operations", () => {
  const prefix = `recover${env.CERTIFICATE_NAME || "CertificateName"}`;
  let suffix: string;
  let client: CertificatesClient;
  let testClient: TestClient;
  let recorder: any;

  const basicCertificateProperties = {
    certificatePolicy: {
      issuerParameters: { name: "Self" },
      x509CertificateProperties: { subject: "cn=MyCert" }
    }
  };

  beforeEach(async function() {
    const authentication = await authenticate(this);
    suffix = authentication.suffix;
    client = authentication.client;
    testClient = authentication.testClient;
    recorder = authentication.recorder;
  });

  afterEach(async function() {
    recorder.stop();
  });

  // The tests follow

  it("can create a certificate", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    const result = await client.createCertificate(certificateName, basicCertificateProperties);
    assert.equal(result.name, certificateName, "Unexpected key name in result from createCertificate().");
    await testClient.flushCertificate(certificateName);
  });

  it("cannot create a certificate with an empty name", async function() {
    const certificateName = "";
    let error;
    try {
      await client.createCertificate(certificateName, basicCertificateProperties);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(
      error.message,
      `"certificateName" with value "" should satisfy the constraint "Pattern": /^[0-9a-zA-Z-]+$/.`,
      "Unexpected error while running createCertificate with an empty string as the name."
    );
  });

  it("can update the tags of a certificate", async function() {
    const certificateName = testClient.formatName(
      `${prefix}-${this!.test!.title}-${suffix}`
    );

    await client.createCertificate(certificateName, basicCertificateProperties);
    await client.updateCertificate(certificateName, "", {
      tags: {
        customTag: "value"
      }
    });

    const updated = await client.getCertificate(certificateName, "");
    assert.equal(
      updated!.tags!.customTag!,
      "value",
      "Expect attribute 'tags' to be updated."
    );
    await testClient.flushCertificate(certificateName);
  });

  it("can get a certificate", async function() {
    const certificateName = testClient.formatName(
      `${prefix}-${this!.test!.title}-${suffix}`
    );
    await client.createCertificate(certificateName, basicCertificateProperties);
    const result = await client.getCertificate(certificateName, "");
    assert.equal(result.name, certificateName, "Unexpected certificate name in result from createCertificate().");
    await testClient.flushCertificate(certificateName);
  });

  it("can retrieve the latest version of a certificate value", async function() {
    const certificateName = testClient.formatName(
      `${prefix}-${this!.test!.title}-${suffix}`
    );
    await client.createCertificate(certificateName, basicCertificateProperties);

    const result = await client.getCertificate(certificateName, "");

    assert.equal(result.name, certificateName, "Unexpected certificate name in result from createCertificate().");
    await testClient.flushCertificate(certificateName);
  });

  it("can get a certificate (Non Existing)", async function() {
    const certificateName = testClient.formatName(
      `${prefix}-${this!.test!.title}-${suffix}`
    );
    let error;
    try {
      await client.getCertificate(certificateName, "");
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(
      error.message,
      `Certificate not found: ${certificateName}`,
      "Unexpected error after trying to get a certificate"
    );
  });

  it("can delete a certificate", async function() {
    const certificateName = testClient.formatName(
      `${prefix}-${this!.test!.title}-${suffix}`
    );
    await client.createCertificate(certificateName, basicCertificateProperties);
    const result = await client.deleteCertificate(certificateName);

    assert.equal(typeof result.recoveryId, "string");
    assert.ok(result.deletedDate instanceof Date);
    assert.ok(result.scheduledPurgeDate instanceof Date);

    try {
      await client.getCertificate(certificateName, "");
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      if (e.statusCode === 404) {
        assert.equal(e.message, `Certificate not found: ${certificateName}`);
      } else {
        throw e;
      }
    }
    await testClient.purgeCertificate(certificateName);
  });

  it("can delete a certificate (Non Existing)", async function() {
    const certificateName = testClient.formatName(
      `${prefix}-${this!.test!.title}-${suffix}`
    );
    let error;
    try {
      await client.deleteCertificate(certificateName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(
      error.message,
      `Certificate not found: ${certificateName}`,
      "Unexpected error after trying to get a disabled certificate"
    );
  });

  it("can get a deleted certificate", async function() {
    const certificateName = testClient.formatName(
      `${prefix}-${this!.test!.title}-${suffix}`
    );
    await client.createCertificate(certificateName, basicCertificateProperties);
    await client.deleteCertificate(certificateName);
    const getResult = await retry(async () => client.getDeletedCertificate(certificateName));
    assert.equal(getResult.name, certificateName, "Unexpected certificate name in result from getCertificate().");
    await testClient.purgeCertificate(certificateName);
  });

  it("can get a deleted certificate (Non Existing)", async function() {
    const certificateName = testClient.formatName(
      `${prefix}-${this!.test!.title}-${suffix}`
    );
    let error;
    try {
      await client.deleteCertificate(certificateName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(
      error.message,
      `Certificate not found: ${certificateName}`,
      "Unexpected certificate name in result from getKey()."
    );
  });

  it.only("can create, read, update and delete operations on a certificate's issuer", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    await client.createCertificate(certificateName, basicCertificateProperties);

    // Get
    const getResponse = await client.getCertificateIssuer(certificateName);
    console.log({ getResponse });

    await testClient.flushCertificate(certificateName);
  });
});
