// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import createAuthoringClient from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential } from "@azure/core-auth";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_ActiveDirectory", async () => {
    const endpoint = "https://<resource name>.cognitiveservices.azure.com";
    const credential = new DefaultAzureCredential();

    const client = createAuthoringClient(endpoint, credential);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
