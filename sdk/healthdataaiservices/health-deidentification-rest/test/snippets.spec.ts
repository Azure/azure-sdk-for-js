// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeidentificationContent } from "../src/index.js";
import DeidentificationClient, {
  DeidentificationJob,
  DeidentifyDocumentsDefaultResponse,
  getLongRunningPoller,
  isUnexpected,
} from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("CreateClient", async () => {
    const credential = new DefaultAzureCredential();
    const serviceEndpoint =
      process.env.DEID_SERVICE_ENDPOINT || "https://example.api.deid.azure.com";
    const client = DeidentificationClient(serviceEndpoint, credential);
  });

  it("DeidentifyText", async () => {
    const credential = new DefaultAzureCredential();
    const serviceEndpoint =
      process.env.DEID_SERVICE_ENDPOINT || "https://example.api.deid.azure.com";
    const client = DeidentificationClient(serviceEndpoint, credential);
    // @ts-preserve-whitespace
    const content: DeidentificationContent = {
      inputText: "Hello John!",
    };
    // @ts-preserve-whitespace
    const response = await client.path("/deid").post({ body: content });
    // @ts-preserve-whitespace
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    // @ts-preserve-whitespace
    console.log(response.body.outputText); // Hello, Tom!
  });

  it("DeidentifyDocuments", async () => {
    const credential = new DefaultAzureCredential();
    const serviceEndpoint =
      process.env["DEID_SERVICE_ENDPOINT"] || "https://example.api.deid.azure.com";
    const storageLocation = `https://${process.env["STORAGE_ACCOUNT_NAME"]}.blob.core.windows.net/${process.env["STORAGE_CONTAINER_NAME"]}`;
    const inputPrefix = "example_patient_1";
    const outputPrefix = process.env["OUTPUT_PREFIX"] || "_output";
    // @ts-preserve-whitespace
    const client = DeidentificationClient(serviceEndpoint, credential);
    const jobName = "sample-job-" + new Date().getTime().toString().slice(-8);
    // @ts-preserve-whitespace
    const job: DeidentificationJob = {
      operation: "Surrogate",
      sourceLocation: { location: storageLocation, prefix: inputPrefix },
      targetLocation: { location: storageLocation, prefix: outputPrefix },
    };
    const response = (await client
      .path("/jobs/{name}", jobName)
      .put({ body: job })) as DeidentifyDocumentsDefaultResponse;
    // @ts-preserve-whitespace
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    // @ts-preserve-whitespace
    const poller = await getLongRunningPoller(client, response);
    const finalOutput = await poller.pollUntilDone();
    console.log(finalOutput.body);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
