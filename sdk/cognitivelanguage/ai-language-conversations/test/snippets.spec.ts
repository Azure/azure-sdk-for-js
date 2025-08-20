// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConversationAnalysisClient } from "@azure/ai-language-conversations";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential } from "@azure/core-auth";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Key", async () => {
    const endpoint = "https://<resource name>.cognitiveservices.azure.com";
    const credential = new AzureKeyCredential("<api key>");

    const client = new ConversationAnalysisClient(endpoint, credential);
  });

  it("ReadmeSampleCreateClient_ActiveDirectory", async () => {
    const endpoint = "https://<resource name>.cognitiveservices.azure.com";
    const credential = new DefaultAzureCredential();

    const client = new ConversationAnalysisClient(endpoint, credential);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
