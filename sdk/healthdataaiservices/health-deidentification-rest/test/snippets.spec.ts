// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import DeidentificationClient, { DeidentificationContent, isUnexpected } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSample_Deidentify", async () => {
    const credential = new DefaultAzureCredential();
    const serviceEndpoint = "https://example.api.cac001.deid.azure.com";
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

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
