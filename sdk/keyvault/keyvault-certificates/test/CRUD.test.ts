// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import { CertificateClient } from "../src";
import { isNode } from "@azure/core-http";
import { env } from "@azure/test-utils-recorder";
import { isPlayingBack, testPollerProperties } from "./utils/recorderUtils";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";
import { AbortController } from "@azure/abort-controller";
import { assertThrowsAbortError } from "./utils/utils.common";

describe("Certificates client - create, read, update and delete", () => {
  const prefix = `recover${env.CERTIFICATE_NAME || "CertificateName"}`;
  let suffix: string;
  let client: CertificateClient;
  let testClient: TestClient;
  let recorder: any;

  const basicCertificatePolicy = {
    issuerName: "Self",
    subject: "cn=MyCert"
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
    const poller = await client.beginCreateCertificate(
      certificateName,
      basicCertificatePolicy,
      testPollerProperties
    );
    const pendingCertificate = poller.getResult(); // Pending certificate
    assert.equal(
      pendingCertificate!.properties.name,
      certificateName,
      "Unexpected name in result from beginCreateCertificate()."
    );
    await testClient.flushCertificate(certificateName);
  });

  // If this test is not skipped in the browser's playback, no other test will be played back.
  // This is a bug related to the browser features of the recorder.
  if (isNode && !isPlayingBack) {
    // On playback mode, the tests happen too fast for the timeout to work
    it("can abort creating a certificate", async function() {
      const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
      const controller = new AbortController();

      await assertThrowsAbortError(async () => {
        const poller = await client.beginCreateCertificate(
          certificateName,
          basicCertificatePolicy,
          {
            ...testPollerProperties,
            abortSignal: controller.signal
          }
        );
        controller.abort();
        await poller.pollUntilDone();
      });
    });
  }

  if (isNode && !isPlayingBack) {
    // On playback mode, the tests happen too fast for the timeout to work
    it("can create a certificate with requestOptions timeout", async function() {
      const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);

      await assertThrowsAbortError(async () => {
        await client.beginCreateCertificate(
          certificateName,
          basicCertificatePolicy,
          {
            ...testPollerProperties,
            requestOptions: {
              timeout: 1
            }
          }
        );
      });
    });
  }

  it("cannot create a certificate with an empty name", async function() {
    const certificateName = "";
    let error;
    try {
      await client.beginCreateCertificate(
        certificateName,
        basicCertificatePolicy,
        testPollerProperties
      );
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(
      error.message,
      `"certificateName" with value "" should satisfy the constraint "Pattern": /^[0-9a-zA-Z-]+$/.`,
      "Unexpected error while running beginCreateCertificate with an empty string as the name."
    );
  });

  it("can update the tags of a certificate", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);

    await client.beginCreateCertificate(
      certificateName,
      basicCertificatePolicy,
      testPollerProperties
    );
    await client.updateCertificate(certificateName, "", {
      tags: {
        customTag: "value"
      }
    });

    const updated = await client.getCertificate(certificateName);
    assert.equal(
      updated!.properties.tags!.customTag!,
      "value",
      "Expect attribute 'tags' to be updated."
    );
    await testClient.flushCertificate(certificateName);
  });

  if (isNode && !isPlayingBack) {
    // On playback mode, the tests happen too fast for the timeout to work
    it("can update certificate with requestOptions timeout", async function() {
      const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);

      const poller = await client.beginCreateCertificate(
        certificateName,
        basicCertificatePolicy,
        testPollerProperties
      );
      const { version } = poller.getResult()!.properties;

      await assertThrowsAbortError(async () => {
        await client.updateCertificate(certificateName, version || "", {
          tags: {
            customTag: "value"
          },
          requestOptions: { timeout: 1 }
        });
      });
    });
  }

  it("can get a certificate", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    await client.beginCreateCertificate(
      certificateName,
      basicCertificatePolicy,
      testPollerProperties
    );
    const result = await client.getCertificate(certificateName);
    assert.equal(
      result.properties.name,
      certificateName,
      "Unexpected certificate name in result from beginCreateCertificate()."
    );
    await testClient.flushCertificate(certificateName);
  });

  if (isNode && !isPlayingBack) {
    // On playback mode, the tests happen too fast for the timeout to work
    it("can get a certificate with requestOptions timeout", async function() {
      const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
      await client.beginCreateCertificate(
        certificateName,
        basicCertificatePolicy,
        testPollerProperties
      );
      await assertThrowsAbortError(async () => {
        await client.getCertificate(certificateName, { requestOptions: { timeout: 1 } });
      });
    });
  }

  it("can retrieve the latest version of a certificate value", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    await client.beginCreateCertificate(
      certificateName,
      basicCertificatePolicy,
      testPollerProperties
    );

    const result = await client.getCertificate(certificateName);

    assert.equal(
      result.properties.name,
      certificateName,
      "Unexpected certificate name in result from beginCreateCertificate()."
    );
    await testClient.flushCertificate(certificateName);
  });

  it("can get a certificate (Non Existing)", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    let error;
    try {
      await client.getCertificate(certificateName);
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
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    await client.beginCreateCertificate(
      certificateName,
      basicCertificatePolicy,
      testPollerProperties
    );
    const poller = await client.beginDeleteCertificate(certificateName, testPollerProperties);
    const result = poller.getResult()!;

    assert.equal(typeof result.recoveryId, "string");
    assert.ok(result.deletedOn instanceof Date);
    assert.ok(result.scheduledPurgeDate instanceof Date);

    try {
      await client.getCertificate(certificateName);
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

  if (isNode && !isPlayingBack) {
    // On playback mode, the tests happen too fast for the timeout to work
    it("can delete a certificate with requestOptions timeout", async function() {
      const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
      await client.beginCreateCertificate(
        certificateName,
        basicCertificatePolicy,
        testPollerProperties
      );
      await assertThrowsAbortError(async () => {
        await client.beginDeleteCertificate(certificateName, {
          ...testPollerProperties,
          requestOptions: {
            timeout: 1
          }
        });
      });
    });
  }

  it("can delete a certificate (Non Existing)", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    let error;
    try {
      await client.beginDeleteCertificate(certificateName, testPollerProperties);
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
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    await client.beginCreateCertificate(
      certificateName,
      basicCertificatePolicy,
      testPollerProperties
    );
    const deletePoller = await client.beginDeleteCertificate(certificateName, testPollerProperties);
    const deletedCertificate = await deletePoller.pollUntilDone();
    assert.equal(
      deletedCertificate.properties.name,
      certificateName,
      "Unexpected certificate name in result from getCertificate()."
    );
    await testClient.purgeCertificate(certificateName);
  });

  it("can get a deleted certificate (Non Existing)", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    let error;
    try {
      await client.beginDeleteCertificate(certificateName, testPollerProperties);
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

  it("can create, read, and delete a certificate issuer", async function() {
    const issuerName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);

    // Create
    await client.createIssuer(issuerName, "Test", {
      credentials: {
        accountId: "keyvaultuser"
      },
      organizationDetails: {
        adminDetails: [
          {
            firstName: "John",
            lastName: "Doe",
            emailAddress: "admin@microsoft.com",
            phone: "4255555555"
          }
        ]
      }
    });

    // Creating a certificate with that issuer
    await client.beginCreateCertificate(
      certificateName,
      {
        issuerName,
        subject: "cn=MyCert"
      },
      testPollerProperties
    );

    // Reading the issuer from the certificate
    const certificate = await client.getCertificate(certificateName);
    assert.equal(certificate.policy!.issuerName, issuerName);

    let getResponse: any;

    // Read
    getResponse = await client.getIssuer(issuerName);
    assert.equal(getResponse.provider, "Test");

    // Update
    await client.updateIssuer(issuerName, {
      organizationDetails: {
        adminDetails: [
          {
            firstName: "John",
            lastName: "Doe",
            emailAddress: "admin@microsoft.com",
            phone: "4255555555"
          }
        ]
      }
    });
    getResponse = await client.getIssuer(issuerName);
    assert.equal(
      getResponse.organizationDetails.adminDetails[0].emailAddress,
      "admin@microsoft.com"
    );

    // Delete
    await client.deleteIssuer(issuerName);
    let error;
    try {
      await client.getIssuer(issuerName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(error.message, "Issuer not found");

    await testClient.flushCertificate(certificateName);
  });

  it("can update a certificate's policy", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);

    await client.beginCreateCertificate(
      certificateName,
      basicCertificatePolicy,
      testPollerProperties
    );
    const result = await client.getCertificate(certificateName);
    assert.equal(result.policy!.issuerName, "Self");
    assert.equal(result.policy!.subject, "cn=MyCert");

    await client.updateCertificatePolicy(certificateName, {
      issuerName: "Self",
      subject: "cn=MyOtherCert"
    });
    const updated = await client.getCertificate(certificateName);
    assert.equal(updated.policy!.subject, "cn=MyOtherCert");

    await testClient.flushCertificate(certificateName);
  });

  it("can read, cancel and delete a certificate's operation", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    await client.beginCreateCertificate(
      certificateName,
      basicCertificatePolicy,
      testPollerProperties
    );

    let getResponse: any;

    // Read
    let operationPoller = await client.getCertificateOperation(certificateName);
    getResponse = operationPoller.getResult();
    assert.equal(getResponse.status, "inProgress");
    assert.equal(getResponse.cancellationRequested, false);

    // Cancel
    await client.cancelCertificateOperation(certificateName);
    operationPoller = await client.getCertificateOperation(certificateName);
    getResponse = operationPoller.getResult();
    assert.equal(getResponse.cancellationRequested, true);

    // Delete
    await client.deleteCertificateOperation(certificateName);

    let error;
    try {
      await client.getCertificateOperation(certificateName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(error.message, `Pending certificate not found: ${certificateName}`);

    await testClient.flushCertificate(certificateName);
  });

  it("can set, read and delete a certificate's contacts", async function() {
    const contacts = [
      {
        emailAddress: "a@a.com",
        name: "a",
        phone: "111111111111"
      },
      {
        emailAddress: "b@b.com",
        name: "b",
        phone: "222222222222"
      }
    ];

    let getResponse: any;

    await client.setContacts(contacts);

    getResponse = await client.getContacts();
    assert.equal(getResponse.contactList![0].name, "a");
    assert.equal(getResponse.contactList![1].name, "b");

    await client.deleteContacts();

    let error;
    try {
      await client.getContacts();
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(error.message, "Contacts not found");
  });
});
