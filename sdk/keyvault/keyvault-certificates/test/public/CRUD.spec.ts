// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import os from "node:os";
import fs from "node:fs";
import childProcess from "child_process";
import { env, isLiveMode, isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import { SecretClient } from "@azure/keyvault-secrets";
import { ClientSecretCredential } from "@azure/identity";
import { isNodeLike } from "@azure/core-util";

import { CertificateClient } from "../../src/index.js";
import { assertThrowsAbortError } from "./utils/common.js";
import { testPollerProperties } from "./utils/recorderUtils.js";
import { authenticate } from "./utils/testAuthentication.js";
import TestClient from "./utils/testClient.js";
import { toSupportTracing } from "@azure-tools/test-utils-vitest";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
expect.extend({ toSupportTracing });

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

  beforeEach(async function (ctx) {
    const authentication = await authenticate(ctx);
    suffix = authentication.suffix;
    client = authentication.client;
    testClient = authentication.testClient;
    recorder = authentication.recorder;
    keyVaultUrl = authentication.keyVaultUrl;
    credential = authentication.credential;
    secretClient = new SecretClient(
      keyVaultUrl,
      credential,
      recorder.configureClientOptions({ disableChallengeResourceVerification: !isLiveMode() }),
    );
  });

  afterEach(async function () {
    await recorder.stop();
  });

  // The tests follow

  it("can create a certificate", async function (ctx) {
    const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);
    const poller = await client.beginCreateCertificate(
      certificateName,
      basicCertificatePolicy,
      testPollerProperties,
    );
    const pendingCertificate = poller.getResult(); // Pending certificate
    expect(pendingCertificate!.properties.name).toEqual(certificateName);
  });

  it("can abort creating a certificate", async function (ctx) {
    const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);
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

  it("cannot create a certificate with an empty name", async function () {
    const certificateName = "";
    await expect(
      client.beginCreateCertificate(certificateName, basicCertificatePolicy, testPollerProperties),
    ).rejects.toThrowError();
  });

  it("can update the tags of a certificate", { retry: 5 }, async function (ctx) {
    const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);

    await client.beginCreateCertificate(
      certificateName,
      basicCertificatePolicy,
      testPollerProperties,
    );
    await client.updateCertificateProperties(certificateName, "", {
      tags: {
        customTag: "value",
      },
    });

    const updated = await client.getCertificate(certificateName);
    expect(updated!.properties.tags!.customTag).toEqual("value");
  });

  it("can disable a certificate", async function (ctx) {
    const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);

    const poller = await client.beginCreateCertificate(
      certificateName,
      basicCertificatePolicy,
      testPollerProperties,
    );

    let result = await poller.pollUntilDone();
    expect(result.properties.enabled).toEqual(true);

    result = await client.updateCertificateProperties(certificateName, "", {
      enabled: false,
    });
    expect(result.properties.enabled).toEqual(false);

    result = await client.getCertificate(certificateName);
    expect(result.properties.enabled).toEqual(false);
  });

  it("can disable a certificate version", async function (ctx) {
    const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);

    const poller = await client.beginCreateCertificate(
      certificateName,
      basicCertificatePolicy,
      testPollerProperties,
    );

    let result = await poller.pollUntilDone();

    const version = result.properties.version!;
    expect(result.properties.enabled).toEqual(true);

    result = await client.updateCertificateProperties(certificateName, version, {
      enabled: false,
    });
    expect(result.properties.enabled).toEqual(false);

    result = await client.getCertificateVersion(certificateName, version);
    expect(result.properties.enabled).toEqual(false);
  });

  it("can get a certificate", async function (ctx) {
    const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);
    await client.beginCreateCertificate(
      certificateName,
      basicCertificatePolicy,
      testPollerProperties,
    );
    const result = await client.getCertificate(certificateName);
    expect(result.properties.name).toEqual(certificateName);
  });

  // Skipping this test from the live browser test runs, because we use the file system.
  // This test uses the file system and the certificate value has been sanitized in recordings, so skip in playback too
  it.skipIf(!isNodeLike || isPlaybackMode())(
    "can get a certificate's secret in PKCS 12 format",
    async function (ctx) {
      const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);
      const createPoller = await client.beginCreateCertificate(
        certificateName,
        basicCertificatePolicy,
        testPollerProperties,
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
        "openssl pkcs12 -in pkcs12.p12 -out pkcs12.crt.pem -clcerts -nokeys -passin pass:",
      );

      // To generate a PEM private key out of a KeyVault Certificate
      // created with the default (or "application/x-pkcs12") content type,
      // use:
      //
      //     openssl pkcs12 -in file_name.p12 -out file_name.key.pem -nocerts -nodes
      //

      const PEMPublicCertificate = fs.readFileSync("pkcs12.crt.pem");

      // The PEM encoded public certificate should be the same as the Base64 encoded CER
      expect(base64CER).toEqual(
        PEMPublicCertificate.toString()
          .split(/-----(BEGIN|END) CERTIFICATE-----/g)[2]
          .split(os.EOL)
          .join("")
          .replace(/\n/g, ""),
      );
    },
  );

  // Skipping this test from the live browser test runs, because we use the file system.
  it.skipIf(!isNodeLike)("can get a certificate's secret in PEM format", async function (ctx) {
    const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);
    const createPoller = await client.beginCreateCertificate(
      certificateName,
      {
        issuerName: "Self",
        subject: "cn=MyCert",
        contentType: "application/x-pem-file",
      },
      testPollerProperties,
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
    expect(base64CER).toEqual(base64PublicCertificate);
  });

  it("can retrieve the latest version of a certificate value", async function (ctx) {
    const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);
    await client.beginCreateCertificate(
      certificateName,
      basicCertificatePolicy,
      testPollerProperties,
    );

    const result = await client.getCertificate(certificateName);

    expect(result.properties.name).toEqual(certificateName);
  });

  it("can get a certificate (Non Existing)", async function (ctx) {
    const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);
    let error;
    try {
      await client.getCertificate(certificateName);
      throw Error("Expecting an error but not catching one.");
    } catch (e: any) {
      error = e;
    }
    expect(error).toMatchObject({ code: "CertificateNotFound", statusCode: 404 });
  });

  it("can delete a certificate", { retry: 5 }, async function (ctx) {
    const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);
    await client.beginCreateCertificate(
      certificateName,
      basicCertificatePolicy,
      testPollerProperties,
    );
    const poller = await client.beginDeleteCertificate(certificateName, testPollerProperties);
    const result = poller.getResult()!;

    expect(typeof result.recoveryId).toEqual("string");
    expect(result.deletedOn).toBeInstanceOf(Date);
    expect(result.scheduledPurgeDate).toBeInstanceOf(Date);

    try {
      await client.getCertificate(certificateName);
      throw Error("Expecting an error but not catching one.");
    } catch (e: any) {
      if (e.statusCode === 404) {
        expect(e.code).toEqual("CertificateNotFound");
      } else {
        throw e;
      }
    }

    await poller.pollUntilDone();
  });

  it("can delete a certificate (Non Existing)", async function (ctx) {
    const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);
    let error;
    try {
      await client.beginDeleteCertificate(certificateName, testPollerProperties);
      throw Error("Expecting an error but not catching one.");
    } catch (e: any) {
      error = e;
    }
    expect(error).toMatchObject({ code: "CertificateNotFound", statusCode: 404 });
  });

  describe("can get a deleted certificate", () => {
    it("using beginDeleteCertificate's poller", async function (ctx) {
      const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);
      const certificatePoller = await client.beginCreateCertificate(
        certificateName,
        basicCertificatePolicy,
        testPollerProperties,
      );
      await certificatePoller.pollUntilDone();

      const deletePoller = await client.beginDeleteCertificate(
        certificateName,
        testPollerProperties,
      );
      const deletedCertificate = await deletePoller.pollUntilDone();
      expect(deletedCertificate.name).toEqual(certificateName);
    });

    it("using getDeletedCertificate", async function (ctx) {
      const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);
      const certificatePoller = await client.beginCreateCertificate(
        certificateName,
        basicCertificatePolicy,
        testPollerProperties,
      );
      await certificatePoller.pollUntilDone();

      const deletePoller = await client.beginDeleteCertificate(
        certificateName,
        testPollerProperties,
      );
      await deletePoller.pollUntilDone();

      const deletedCertificate = await client.getDeletedCertificate(certificateName);
      expect(deletedCertificate.name).toEqual(certificateName);
    });

    it("can not get a certificate that never existed", async function (ctx) {
      const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);
      let error;
      try {
        await client.beginDeleteCertificate(certificateName, testPollerProperties);
        throw Error("Expecting an error but not catching one.");
      } catch (e: any) {
        error = e;
      }
      expect(error).toMatchObject({ code: "CertificateNotFound", statusCode: 404 });
    });
  });

  it("can create, read, and delete a certificate issuer", async function (ctx) {
    const issuerName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);
    const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);

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
    expect(createResponse.administratorContacts![0].email).toEqual("admin@microsoft.com");
    expect(createResponse.accountId).toEqual("keyvaultuser");

    // Creating a certificate with that issuer
    await client.beginCreateCertificate(
      certificateName,
      {
        issuerName,
        subject: "cn=MyCert",
      },
      testPollerProperties,
    );

    // Reading the issuer from the certificate
    const certificate = await client.getCertificate(certificateName);
    expect(certificate.policy!.issuerName).toEqual(issuerName);

    let getResponse: any;

    // Read
    getResponse = await client.getIssuer(issuerName);
    expect(getResponse.provider).toEqual("Test");

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
    expect(getResponse.administratorContacts![0].email).toEqual("admin@microsoft.com");
    expect(getResponse.accountId).toEqual("keyvaultuser2");

    // Delete
    await client.deleteIssuer(issuerName);
    let error;
    try {
      await client.getIssuer(issuerName);
      throw Error("Expecting an error but not catching one.");
    } catch (e: any) {
      error = e;
    }
    expect(error.message).toEqual("Issuer not found");
  });

  it("can update a certificate's policy", async function (ctx) {
    const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);

    await client.beginCreateCertificate(
      certificateName,
      basicCertificatePolicy,
      testPollerProperties,
    );
    const result = await client.getCertificate(certificateName);
    expect(result.policy!.issuerName).toEqual("Self");
    expect(result.policy!.subject).toEqual("cn=MyCert");

    await client.updateCertificatePolicy(certificateName, {
      issuerName: "Self",
      subject: "cn=MyOtherCert",
    });
    const updated = await client.getCertificate(certificateName);
    expect(updated.policy!.issuerName).toEqual("Self");
  });

  it("can read, cancel and delete a certificate's operation", { retry: 5 }, async function () {
    const certificateName = recorder.variable(
      "crudcertoperation",
      `crudcertoperation-${Math.floor(Math.random() * 10000)}`,
    );
    await client.beginCreateCertificate(
      certificateName,
      basicCertificatePolicy,
      testPollerProperties,
    );

    let certificateOperation: any;

    // Read
    const operationPoller = await client.getCertificateOperation(certificateName);
    certificateOperation = operationPoller.getOperationState().certificateOperation!;
    expect(certificateOperation.status).toEqual("inProgress");
    expect(certificateOperation.cancellationRequested).toEqual(false);

    // Cancel
    await operationPoller.cancelOperation();
    certificateOperation = operationPoller.getOperationState().certificateOperation!;
    expect(certificateOperation.cancellationRequested).toEqual(true);

    // Delete
    await client.deleteCertificateOperation(certificateName);

    let error;
    try {
      await client.getCertificateOperation(certificateName);
      throw Error("Expecting an error but not catching one.");
    } catch (e: any) {
      error = e;
    }
    expect(error.message).toEqual(`Pending certificate not found: ${certificateName}`);
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
    expect(getResponse!.length).toEqual(2);
    expect(getResponse![0]!.name).toEqual("a");
    expect(getResponse![1]!.name).toEqual("b");

    await client.deleteContacts();

    let error;
    try {
      await client.getContacts();
      throw Error("Expecting an error but not catching one.");
    } catch (e: any) {
      error = e;
    }
    expect(error.code).toEqual("ContactsNotFound");
  });

  it("supports tracing", async function (ctx) {
    const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);
    await expect(async (tracingOptions: any) => {
      const poller = await client.beginCreateCertificate(certificateName, basicCertificatePolicy, {
        ...testPollerProperties,
        ...tracingOptions,
      });
      await poller.pollUntilDone();
      await client.getCertificate(certificateName, { ...tracingOptions });
    }).toSupportTracing([
      "CreateCertificatePoller.createCertificate",
      "CreateCertificatePoller.getPlainCertificateOperation",
      "CreateCertificatePoller.getCertificate",
      "CertificateClient.getCertificate",
    ]);
  });
});
