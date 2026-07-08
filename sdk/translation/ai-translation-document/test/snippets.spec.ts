// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DocumentTranslationClient, SingleDocumentTranslationClient } from "../src/index.js";
import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
import type { KeyCredential } from "@azure/core-auth";
import { setLogLevel } from "@azure/logger";
import { writeFile } from "node:fs/promises";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const endpoint = "https://<translator-instance>.cognitiveservices.azure.com";
    const client = new DocumentTranslationClient(endpoint, new DefaultAzureCredential());
  });

  it("ReadmeSampleCreateClient_Browser", async () => {
    const credential = new InteractiveBrowserCredential({
      tenantId: "<YOUR_TENANT_ID>",
      clientId: "<YOUR_CLIENT_ID>",
    });
    const client = new DocumentTranslationClient("<endpoint>", credential);
  });

  it("ReadmeSampleCreateClient_KeyCredential", async () => {
    const endpoint = "https://<translator-instance>.cognitiveservices.azure.com";
    const credential: KeyCredential = { key: "YOUR_SUBSCRIPTION_KEY" };
    const client = new DocumentTranslationClient(endpoint, credential);
  });

  it("ReadmeSampleSynchronousDocumentTranslation", async () => {
    const endpoint = "https://<translator-instance>.cognitiveservices.azure.com";
    const client = new SingleDocumentTranslationClient(endpoint, new DefaultAzureCredential());

    const response = await client.translate("hi", {
      document: {
        contents: "This is a test.",
        contentType: "text/html",
        filename: "test-input.txt",
      },
    });

    if (response.readableStreamBody) {
      await writeFile("test-output.txt", response.readableStreamBody);
    }
  });

  it("ReadmeSampleBatchDocumentTranslation", async () => {
    const endpoint = "https://<translator-instance>.cognitiveservices.azure.com";
    const client = new DocumentTranslationClient(endpoint, new DefaultAzureCredential());

    const poller = client.startTranslation({
      inputs: [
        {
          source: { sourceUrl: "<source container SAS URL>" },
          targets: [{ targetUrl: "<target container SAS URL>", language: "fr" }],
        },
      ],
    });

    const result = await poller.pollUntilDone();
    console.log(`Translation status: ${result.status}`);
  });

  it("ReadmeSampleGetSupportedFormats", async () => {
    const endpoint = "https://<translator-instance>.cognitiveservices.azure.com";
    const client = new DocumentTranslationClient(endpoint, new DefaultAzureCredential());

    const formats = await client.getSupportedFormats("document");
    for (const format of formats.value) {
      console.log(format.format);
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
