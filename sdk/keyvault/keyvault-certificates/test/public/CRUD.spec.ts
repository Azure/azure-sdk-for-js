// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import os from "os";
import { Context } from "mocha";
import fs from "fs";
import childProcess from "child_process";
import { assert } from "@azure/test-utils";

import { env, Recorder } from "@azure-tools/test-recorder";
import { AbortController } from "@azure/abort-controller";
import { SecretClient } from "@azure/keyvault-secrets";
import { ClientSecretCredential } from "@azure/identity";
import { isNode } from "@azure/core-http";

import { CertificateClient } from "../../src";
import { assertThrowsAbortError } from "./utils/common";
import { testPollerProperties } from "./utils/recorderUtils";
import { authenticate } from "./utils/testAuthentication";
import { getServiceVersion } from "./utils/common";
import TestClient from "./utils/testClient";

describe("Certificates client - create, read, update and delete", () => {
  const prefix = `CRUD${env.CERTIFICATE_NAME || "CertificateName"}`;
  let suffix: string;
  let client: CertificateClient;
  let testClient: TestClient;
  let recorder: Recorder;
  let keyVaultUrl: string;
  let credential: ClientSecretCredential;
  let secretClient: SecretClient;

  const basicCertificatePolicy = {
    issuerName: "Self",
    subject: "cn=MyCert",
  };

  beforeEach(async function (this: Context) {
    const authentication = await authenticate(this, getServiceVersion());
    suffix = authentication.suffix;
    client = authentication.client;
    testClient = authentication.testClient;
    recorder = authentication.recorder;
    keyVaultUrl = authentication.keyVaultUrl;
    credential = authentication.credential;
    secretClient = new SecretClient(keyVaultUrl, credential);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  // The tests follow

  it("can create a certificate", async function (this: Context) {
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
  });

  it("can abort creating a certificate", async function (this: Context) {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    const controller = new AbortController();

    await assertThrowsAbortError(async () => {
      const poller = await client.beginCreateCertificate(certificateName, basicCertificatePolicy, {
        ...testPollerProperties,
        abortSignal: controller.signal,
      });
      controller.abort();
      await poller.pollUntilDone();
    });
  });

  // On playback mode, the tests happen too fast for the timeout to work - in browsers
  it("can create a certificate with requestOptions timeout", async function (this: Context) {
    recorder.skip("browser", "Timeout tests don't work on playback mode.");
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);

    await assertThrowsAbortError(async () => {
      await client.beginCreateCertificate(certificateName, basicCertificatePolicy, {
        ...testPollerProperties,
        requestOptions: {
          timeout: 1,
        },
      });
    });
  });

  it("cannot create a certificate with an empty name", async function () {
    const certificateName = "";
    try {
      await client.beginCreateCertificate(
        certificateName,
        basicCertificatePolicy,
        testPollerProperties
      );
      assert.fail("Expected an error");
    } catch (e) {
      // Ignore expected error
    }
  });

  it("can update the tags of a certificate", async function (this: Context) {
    this.retries(5);
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);

    await client.beginCreateCertificate(
      certificateName,
      basicCertificatePolicy,
      testPollerProperties
    );
    await client.updateCertificateProperties(certificateName, "", {
      tags: {
        customTag: "value",
      },
    });

    const updated = await client.getCertificate(certificateName);
    assert.equal(
      updated!.properties.tags!.customTag!,
      "value",
      "Expect attribute 'tags' to be updated."
    );
  });

  it("can disable a certificate", async function (this: Context) {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);

    const poller = await client.beginCreateCertificate(
      certificateName,
      basicCertificatePolicy,
      testPollerProperties
    );

    let result = await poller.pollUntilDone();
    assert.equal(result.properties.enabled, true);

    result = await client.updateCertificateProperties(certificateName, "", {
      enabled: false,
    });
    assert.equal(result.properties.enabled, false);

    result = await client.getCertificate(certificateName);
    assert.equal(result.properties.enabled, false);
  });

  it("can disable a certificate version", async function (this: Context) {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);

    const poller = await client.beginCreateCertificate(
      certificateName,
      basicCertificatePolicy,
      testPollerProperties
    );

    let result = await poller.pollUntilDone();

    const version = result.properties.version!;
    assert.equal(result.properties.enabled, true);

    result = await client.updateCertificateProperties(certificateName, version, {
      enabled: false,
    });
    assert.equal(result.properties.enabled, false);

    result = await client.getCertificateVersion(certificateName, version);
    assert.equal(result.properties.enabled, false);
  });

  // On playback mode, the tests happen too fast for the timeout to work
  it("can update certificate with requestOptions timeout", async function (this: Context) {
    recorder.skip(undefined, "Timeout tests don't work on playback mode.");
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);

    const poller = await client.beginCreateCertificate(
      certificateName,
      basicCertificatePolicy,
      testPollerProperties
    );
    const { version } = poller.getResult()!.properties;

    await assertThrowsAbortError(async () => {
      await client.updateCertificateProperties(certificateName, version || "", {
        tags: {
          customTag: "value",
        },
        requestOptions: { timeout: 1 },
      });
    });
  });

  it("can get a certificate", async function (this: Context) {
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
  });

  it("can get a certificate's secret in PKCS 12 format", async function (this: Context) {
    recorder.skip(
      undefined,
      "This test uses the file system and the certificate value has been sanitized in recordings."
    );
    // Skipping this test from the live browser test runs, because we use the file system.
    if (!isNode) {
      this.skip();
    }
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    const createPoller = await client.beginCreateCertificate(
      certificateName,
      basicCertificatePolicy,
      testPollerProperties
    );

    await createPoller.pollUntilDone();
    const keyVaultCertificate = await client.getCertificate(certificateName);
    const base64CER = Buffer.from(keyVaultCertificate.cer!).toString("base64");

    const certificateSecret = await secretClient.getSecret(certificateName);
    const base64PKCS12 = certificateSecret.value!;
    fs.writeFileSync("pkcs12.p12", Buffer.from(base64PKCS12, "base64"));

    // Obtaining only the public certificate.
    // We send "-passin 'pass:'" because our self-signed certificate doesn't specify a password on its issuer.
    childProcess.execSync(
      "openssl pkcs12 -in pkcs12.p12 -out pkcs12.crt.pem -clcerts -nokeys -passin pass:"
    );

    // To generate a PEM private key out of a KeyVault Certificate
    // created with the default (or "application/x-pkcs12") content type,
    // use:
    //
    //     openssl pkcs12 -in file_name.p12 -out file_name.key.pem -nocerts -nodes
    //

    const PEMPublicCertificate = fs.readFileSync("pkcs12.crt.pem");

    // The PEM encoded public certificate should be the same as the Base64 encoded CER
    assert.equal(
      base64CER,
      PEMPublicCertificate.toString()
        .split(/-----(BEGIN|END) CERTIFICATE-----/g)[2]
        .split(os.EOL)
        .join("")
        .replace(/\n/g, "")
    );
  });

  it("can get a certificate's secret in PEM format", async function (this: Context) {
    recorder.skip("browser", "This test uses the file system.");
    // Skipping this test from the live browser test runs, because we use the file system.
    if (!isNode) {
      this.skip();
    }
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    const createPoller = await client.beginCreateCertificate(
      certificateName,
      {
        issuerName: "Self",
        subject: "cn=MyCert",
        contentType: "application/x-pem-file",
      },
      testPollerProperties
    );

    await createPoller.pollUntilDone();
    const keyVaultCertificate = await client.getCertificate(certificateName);
    const base64CER = Buffer.from(keyVaultCertificate.cer!).toString("base64");

    const certificateSecret = await secretClient.getSecret(certificateName);
    const base64PublicCertificate = certificateSecret
      .value!.split("\n")
      .slice(0, -2) // Removing -----END CERTIFICATE-----
      .join("")
      .split("-----BEGIN CERTIFICATE-----") // Removing the PEM header
      .slice(-1)
      .join("");

    // The PEM encoded public certificate should be the same as the Base64 encoded CER
    assert.equal(base64CER, base64PublicCertificate);
  });

  // On playback mode, the tests happen too fast for the timeout to work
  it("can get a certificate with requestOptions timeout", async function (this: Context) {
    recorder.skip(undefined, "Timeout tests don't work on playback mode.");
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

  it("can retrieve the latest version of a certificate value", async function (this: Context) {
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
  });

  it("can get a certificate (Non Existing)", async function (this: Context) {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    let error;
    try {
      await client.getCertificate(certificateName);
      throw Error("Expecting an error but not catching one.");
    } catch (e: any) {
      error = e;
    }
    assert.equal(error.code, "CertificateNotFound");
    assert.equal(error.statusCode, 404);
  });

  it("can delete a certificate", async function (this: Context) {
    this.retries(5);
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
    } catch (e: any) {
      if (e.statusCode === 404) {
        assert.equal(e.code, "CertificateNotFound");
      } else {
        throw e;
      }
    }

    await poller.pollUntilDone();
  });

  // On playback mode, the tests happen too fast for the timeout to work
  it("can delete a certificate with requestOptions timeout", async function (this: Context) {
    recorder.skip(undefined, "Timeout tests don't work on playback mode.");
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
          timeout: 1,
        },
      });
    });
  });

  it("can delete a certificate (Non Existing)", async function (this: Context) {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    let error;
    try {
      await client.beginDeleteCertificate(certificateName, testPollerProperties);
      throw Error("Expecting an error but not catching one.");
    } catch (e: any) {
      error = e;
    }
    assert.equal(error.code, "CertificateNotFound");
    assert.equal(error.statusCode, 404);
  });

  describe("can get a deleted certificate", () => {
    it("using beginDeleteCertificate's poller", async function (this: Context) {
      const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
      const certificatePoller = await client.beginCreateCertificate(
        certificateName,
        basicCertificatePolicy,
        testPollerProperties
      );
      await certificatePoller.pollUntilDone();

      const deletePoller = await client.beginDeleteCertificate(
        certificateName,
        testPollerProperties
      );
      const deletedCertificate = await deletePoller.pollUntilDone();
      assert.equal(
        deletedCertificate.name,
        certificateName,
        "Unexpected certificate name in result from pollUntilDone()."
      );
    });

    it("using getDeletedCertificate", async function (this: Context) {
      const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
      const certificatePoller = await client.beginCreateCertificate(
        certificateName,
        basicCertificatePolicy,
        testPollerProperties
      );
      await certificatePoller.pollUntilDone();

      const deletePoller = await client.beginDeleteCertificate(
        certificateName,
        testPollerProperties
      );
      await deletePoller.pollUntilDone();

      const deletedCertificate = await client.getDeletedCertificate(certificateName);
      assert.equal(
        deletedCertificate.name,
        certificateName,
        "Unexpected certificate name in result from getDeletedCertificate()."
      );
    });

    it("can not get a certificate that never existed", async function (this: Context) {
      const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
      let error;
      try {
        await client.beginDeleteCertificate(certificateName, testPollerProperties);
        throw Error("Expecting an error but not catching one.");
      } catch (e: any) {
        error = e;
      }
      assert.equal(error.code, "CertificateNotFound");
      assert.equal(error.statusCode, 404);
    });
  });

  it("can create, read, and delete a certificate issuer", async function (this: Context) {
    const issuerName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);

    // Create
    const createResponse = await client.createIssuer(issuerName, "Test", {
      accountId: "keyvaultuser",
      administratorContacts: [
        {
          firstName: "John",
          lastName: "Doe",
          email: "admin@microsoft.com",
          phone: "4255555555",
        },
      ],
    });
    assert.equal(createResponse.administratorContacts![0].email, "admin@microsoft.com");
    assert.equal(createResponse.accountId, "keyvaultuser");

    // Creating a certificate with that issuer
    await client.beginCreateCertificate(
      certificateName,
      {
        issuerName,
        subject: "cn=MyCert",
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
      administratorContacts: [
        {
          firstName: "John",
          lastName: "Doe",
          email: "admin@microsoft.com",
          phone: "4255555555",
        },
      ],
      accountId: "keyvaultuser2",
    });
    getResponse = await client.getIssuer(issuerName);
    assert.equal(getResponse.administratorContacts![0].email, "admin@microsoft.com");
    assert.equal(getResponse.accountId, "keyvaultuser2");

    // Delete
    await client.deleteIssuer(issuerName);
    let error;
    try {
      await client.getIssuer(issuerName);
      throw Error("Expecting an error but not catching one.");
    } catch (e: any) {
      error = e;
    }
    assert.equal(error.message, "Issuer not found");
  });

  it("can update a certificate's policy", async function (this: Context) {
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
      subject: "cn=MyOtherCert",
    });
    const updated = await client.getCertificate(certificateName);
    assert.equal(updated.policy!.subject, "cn=MyOtherCert");
  });

  it("can read, cancel and delete a certificate's operation", async function (this: Context) {
    // Known flaky test due to the lag between the request and when the job gets picked up by the service.
    this.retries(5);

    const certificateName = recorder.getUniqueName("crudcertoperation");
    await client.beginCreateCertificate(
      certificateName,
      basicCertificatePolicy,
      testPollerProperties
    );

    let certificateOperation: any;

    // Read
    const operationPoller = await client.getCertificateOperation(certificateName);
    certificateOperation = operationPoller.getOperationState().certificateOperation!;
    assert.equal(certificateOperation.status, "inProgress");
    assert.equal(certificateOperation.cancellationRequested, false);

    // Cancel
    await operationPoller.cancelOperation();
    certificateOperation = operationPoller.getOperationState().certificateOperation!;
    assert.equal(certificateOperation.cancellationRequested, true);

    // Delete
    await client.deleteCertificateOperation(certificateName);

    let error;
    try {
      await client.getCertificateOperation(certificateName);
      throw Error("Expecting an error but not catching one.");
    } catch (e: any) {
      error = e;
    }
    assert.equal(error.message, `Pending certificate not found: ${certificateName}`);
  });

  it("can set, read and delete a certificate's contacts", async function () {
    const contacts = [
      {
        email: "a@a.com",
        name: "a",
        phone: "111111111111",
      },
      {
        email: "b@b.com",
        name: "b",
        phone: "222222222222",
      },
    ];

    await client.setContacts(contacts);

    const getResponse = await client.getContacts();
    assert.equal(
      getResponse && getResponse[0] && getResponse[0].name ? getResponse[0].name : undefined,
      "a"
    );
    assert.equal(
      getResponse && getResponse[1] && getResponse[1].name ? getResponse[1].name : undefined,
      "b"
    );

    await client.deleteContacts();

    let error;
    try {
      await client.getContacts();
      throw Error("Expecting an error but not catching one.");
    } catch (e: any) {
      error = e;
    }
    assert.equal(error.code, "ContactsNotFound");
  });

  it("supports tracing", async function (this: Context) {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    await assert.supportsTracing(
      async (tracingOptions) => {
        const poller = await client.beginCreateCertificate(
          certificateName,
          basicCertificatePolicy,
          {
            ...testPollerProperties,
            ...tracingOptions,
          }
        );
        await poller.pollUntilDone();
        await client.getCertificate(certificateName, { ...tracingOptions });
      },
      [
        "CreateCertificatePoller.createCertificate",
        "CreateCertificatePoller.getPlainCertificateOperation",
        "CreateCertificatePoller.getCertificate",
        "CertificateClient.getCertificate",
      ]
    );
  });
});
