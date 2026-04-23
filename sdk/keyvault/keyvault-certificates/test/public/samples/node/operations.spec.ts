// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Uses a CertificateClient to create, update, and delete a certificate's operation.
 */

import { CertificateClient } from "../../../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { forPublishing } from "@azure-tools/test-publishing";
import { retryWithBackoff } from "./utils.js";
import { describe, it, beforeEach, afterEach } from "vitest";
// Load the .env file if it exists
import "dotenv/config";

describe("operations", () => {
  let recorder: Recorder;
  let client: CertificateClient;
  let certificateName: string;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start({
      envSetupForPlayback: {
        KEYVAULT_URI: "https://keyvault_name.vault.azure.net/",
      },
      removeCentralSanitizers: ["AZSDK3430"],
    });
    // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
    // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
    // about DefaultAzureCredential and the other credentials that are available for use.
    // If you're using MSI, DefaultAzureCredential should "just work".
    client = forPublishing(
      new CertificateClient(
        assertEnvironmentVariable("KEYVAULT_URI"),
        createTestCredential(),
        recorder.configureClientOptions({}),
      ),
      () =>
        new CertificateClient(
          process.env["KEYVAULT_URI"] || "<keyvault-url>",
          new DefaultAzureCredential(),
        ),
    );
    certificateName = forPublishing(
      recorder.variable("certificateName", `operation-${new Date().getTime()}`),
      () => `operation-${new Date().getTime()}`,
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("get and cancel pending operations", async () => {
    // Certificates' operations will be pending for some time right after they're created.
    const createPoller = await client.beginCreateCertificate(certificateName, {
      issuerName: "Self",
      subject: "cn=MyCert",
    });

    const pendingCertificate = createPoller.getResult();
    console.log({ pendingCertificate });

    // Reading the certificate's operation (it will be pending)
    const operationPoller = await client.getCertificateOperation(certificateName);
    let operation = operationPoller.getResult();
    console.log("Certificate operation:", operation);

    // Cancelling the certificate's operation
    await operationPoller.cancelOperation();
    operation = operationPoller.getResult();
    console.log("Cancelled certificate operation:", operation);

    // Deleting the certificate's operation
    await retryWithBackoff(() => client.deleteCertificateOperation(certificateName), {
      delayMs: 1000,
      shouldRetry: (e) =>
        /conflict while deleting the pending certificate/i.test((e as Error).message) ||
        /Pending Certificate not found/i.test((e as Error).message),
    });

    try {
      await client.getCertificateOperation(certificateName);
    } catch (e: any) {
      // getCertificateOperation throws when the operation has been deleted
      console.log("Certificate operation no longer exists:", e.code);
    }

    // There will be no signs of a pending operation at this point
    const certificateWithoutOperation = await client.getCertificate(certificateName);
    console.log("Certificate without operation:", certificateWithoutOperation);
  });

  // Operation snippets

  it("get a certificate operation", async () => {
    // @snippet CertificateClientGetCertificateOperation
    await client.beginCreateCertificate(certificateName, {
      issuerName: "Unknown",
      subject: "cn=MyCert",
    });
    // @ts-preserve-whitespace
    const poller = await client.getCertificateOperation(certificateName);
    const pendingCertificate = poller.getResult();
    console.log("Pending certificate:", pendingCertificate);
    // @ts-preserve-whitespace
    const certificateOperation = poller.getOperationState().certificateOperation;
    console.log(certificateOperation);
    // @snippet-end CertificateClientGetCertificateOperation
  });

  it("delete a certificate operation", async () => {
    // @snippet CertificateClientDeleteCertificateOperation
    await client.beginCreateCertificate(certificateName, {
      issuerName: "Unknown",
      subject: "cn=MyCert",
    });
    await client.deleteCertificateOperation(certificateName);
    // @ts-preserve-whitespace
    await forPublishing(Promise.resolve(), () =>
      (async () => {
        try {
          await client.getCertificateOperation(certificateName);
        } catch (e: any) {
          // getCertificateOperation throws when the operation has been deleted
          console.log(`getCertificateOperation throws after deletion: ${e.message}`);
        }
      })(),
    );
    // @snippet-end CertificateClientDeleteCertificateOperation
  });
});
