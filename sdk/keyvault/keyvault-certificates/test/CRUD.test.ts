// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import { CertificateClient } from "../src";
import { retry } from "./utils/recorder";
import { env } from "@azure/test-utils-recorder";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";

describe("Certificates client - create, read, update and delete", () => {
  const prefix = `recover${env.CERTIFICATE_NAME || "CertificateName"}`;
  let suffix: string;
  let client: CertificateClient;
  let testClient: TestClient;
  let recorder: any;

  const basicCertificatePolicy = {
    issuerName: "Self",
    subjectName: "cn=MyCert"
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
    const result = await client.createCertificate(certificateName, basicCertificatePolicy);
    assert.equal(
      result.properties.name,
      certificateName,
      "Unexpected key name in result from createCertificate()."
    );
    await testClient.flushCertificate(certificateName);
  });

  it("cannot create a certificate with an empty name", async function() {
    const certificateName = "";
    let error;
    try {
      await client.createCertificate(certificateName, basicCertificatePolicy);
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
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);

    await client.createCertificate(certificateName, basicCertificatePolicy);
    await client.updateCertificate(certificateName, "", {
      tags: {
        customTag: "value"
      }
    });

    const updated = await client.getCertificateWithPolicy(certificateName);
    assert.equal(
      updated!.properties.tags!.customTag!,
      "value",
      "Expect attribute 'tags' to be updated."
    );
    await testClient.flushCertificate(certificateName);
  });

  it("can get a certificate", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    await client.createCertificate(certificateName, basicCertificatePolicy);
    const result = await client.getCertificateWithPolicy(certificateName);
    assert.equal(
      result.properties.name,
      certificateName,
      "Unexpected certificate name in result from createCertificate()."
    );
    await testClient.flushCertificate(certificateName);
  });

  it("can retrieve the latest version of a certificate value", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    await client.createCertificate(certificateName, basicCertificatePolicy);

    const result = await client.getCertificateWithPolicy(certificateName);

    assert.equal(
      result.properties.name,
      certificateName,
      "Unexpected certificate name in result from createCertificate()."
    );
    await testClient.flushCertificate(certificateName);
  });

  it("can get a certificate (Non Existing)", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    let error;
    try {
      await client.getCertificateWithPolicy(certificateName);
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
    await client.createCertificate(certificateName, basicCertificatePolicy);
    const result = await client.deleteCertificate(certificateName);

    assert.equal(typeof result.recoveryId, "string");
    assert.ok(result.deletedOn instanceof Date);
    assert.ok(result.scheduledPurgeDate instanceof Date);

    try {
      await client.getCertificateWithPolicy(certificateName);
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
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
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
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    await client.createCertificate(certificateName, basicCertificatePolicy);
    await client.deleteCertificate(certificateName);
    const getResult = await retry(async () => client.getDeletedCertificate(certificateName));
    assert.equal(
      getResult.properties.name,
      certificateName,
      "Unexpected certificate name in result from getCertificateWithPolicy()."
    );
    await testClient.purgeCertificate(certificateName);
  });

  it("can get a deleted certificate (Non Existing)", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
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

  it("can create, read, and delete a certificate issuer", async function() {
    const issuerName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);

    // Create
    await client.setIssuer(issuerName, "Test", {
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
    await client.createCertificate(certificateName, {
      issuerName,
      subjectName: "cn=MyCert"
    });

    // Reading the issuer from the certificate
    const certificate = await client.getCertificateWithPolicy(certificateName);
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

    await client.createCertificate(certificateName, basicCertificatePolicy);
    const result = await client.getCertificateWithPolicy(certificateName);
    assert.equal(result.policy!.issuerName, "Self");
    assert.equal(result.policy!.subjectName, "cn=MyCert");

    await client.updateCertificatePolicy(certificateName, {
      issuerName: "Self",
      subjectName: "cn=MyOtherCert"
    });
    const updated = await client.getCertificateWithPolicy(certificateName);
    assert.equal(updated.policy!.subjectName, "cn=MyOtherCert");

    await testClient.flushCertificate(certificateName);
  });

  it("can read, cancel and delete a certificate's operation", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    await client.createCertificate(certificateName, basicCertificatePolicy);

    let getResponse: any;

    // Read
    getResponse = await client.getCertificateOperation(certificateName);
    assert.equal(getResponse.status, "inProgress");
    assert.equal(getResponse.cancellationRequested, false);

    // Cancel
    await client.cancelCertificateOperation(certificateName);
    getResponse = await client.getCertificateOperation(certificateName);
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

    await client.setCertificateContacts(contacts);

    getResponse = await client.getCertificateContacts();
    assert.equal(getResponse.contactList![0].name, "a");
    assert.equal(getResponse.contactList![1].name, "b");

    await client.deleteContacts();

    let error;
    try {
      await client.getCertificateContacts();
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(error.message, "Contacts not found");
  });
});
