// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Uses a CertificateClient to create, update, and delete a certificate's operation.
 */

import { CertificateClient } from "../../../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { forPublishing } from "@azure-tools/test-publishing";
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

  async function deleteCertificateOperationWithRetry(certificateName: string): Promise<void> {
    let lastError: unknown;
    for (let i = 0; i < 5; i++) {
      try {
        await client.deleteCertificateOperation(certificateName);
        return;
      } catch (error: any) {
        lastError = error;
        if (
          !/conflict while deleting the pending certificate/i.test(error.message) &&
          !/Pending Certificate not found/i.test(error.message)
        ) {
          throw error;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
    throw lastError;
  }

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
    await deleteCertificateOperationWithRetry(certificateName);

    let error;
    try {
      await client.getCertificateOperation(certificateName);
      throw Error("Expecting an error but not catching one.");
    } catch (e: any) {
      error = e;
    }
    console.log(error.message); // Pending certificate not found

    // There will be no signs of a pending operation at this point
    const certificateWithoutOperation = await client.getCertificate(certificateName);
    console.log("Certificate without operation:", certificateWithoutOperation);
  });

  // Operation snippets

  it("get a certificate operation", async () => {
    const credential = forPublishing(createTestCredential(), () => new DefaultAzureCredential());
    // @ts-preserve-whitespace
    const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";
    // @ts-preserve-whitespace
    const client = forPublishing(
      new CertificateClient(url, credential, recorder.configureClientOptions({})),
      () => new CertificateClient(url, credential),
    );
    // @ts-preserve-whitespace
    // @snippet CertificateClientGetCertificateOperation
    const certificateName = forPublishing(
      recorder.variable("certificateName", `operation-${new Date().getTime()}`),
      () => "MyCertificate",
    );
    const createPoller = await client.beginCreateCertificate(certificateName, {
      issuerName: "Unknown",
      subject: "cn=MyCert",
    });
    // @ts-preserve-whitespace
    const poller = await client.getCertificateOperation(certificateName);
    const pendingCertificate = poller.getResult();
    // @ts-preserve-whitespace
    const certificateOperation = poller.getOperationState().certificateOperation;
    console.log(certificateOperation);
    // @snippet-end CertificateClientGetCertificateOperation
  });

  it("delete a certificate operation", async () => {
    const credential = forPublishing(createTestCredential(), () => new DefaultAzureCredential());
    // @ts-preserve-whitespace
    const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";
    // @ts-preserve-whitespace
    const client = forPublishing(
      new CertificateClient(url, credential, recorder.configureClientOptions({})),
      () => new CertificateClient(url, credential),
    );
    // @ts-preserve-whitespace
    // @snippet CertificateClientDeleteCertificateOperation
    const certificateName = forPublishing(
      recorder.variable("certificateName", `operation-${new Date().getTime()}`),
      () => "MyCertificate",
    );
    await client.beginCreateCertificate(certificateName, {
      issuerName: "Unknown",
      subject: "cn=MyCert",
    });
    await client.deleteCertificateOperation(certificateName);
    // @ts-preserve-whitespace
    await forPublishing(Promise.resolve(), () => client.getCertificateOperation(certificateName));
    // Throws error: Pending certificate not found: "MyCertificate"
    // @snippet-end CertificateClientDeleteCertificateOperation
  });
});
