// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import DocumentTranslator, { StartTranslationDetails } from "@azure-rest/ai-document-translator";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_APIKey", async () => {
    const client = DocumentTranslator("<endpoint>", { key: "<API key>" });
  });

  it("ReadmeSampleBatchSubmissionRequest", async () => {
    const batchSubmissionRequest: StartTranslationDetails = {
      inputs: [
        {
          source: { sourceUrl: "<sas_url_to_source>" },
          targets: [{ language: "fr", targetUrl: "<sas_url_to_target_fr>" }],
        },
      ],
    };
  });

  it("ReadmeSampleBatchSubmissionRequestMultiple", async () => {
    const batchSubmissionRequest: StartTranslationDetails = {
      inputs: [
        {
          source: { sourceUrl: "<sas_url_to_source_A>" },
          targets: [
            { language: "fr", targetUrl: "<sas_url_to_target_A_fr>" },
            { language: "de", targetUrl: "<sas_url_to_target_A_de>" },
          ],
        },
        {
          source: { sourceUrl: "<sas_url_to_source_B>" },
          targets: [
            { language: "fr", targetUrl: "<sas_url_to_target_B_fr>" },
            { language: "de", targetUrl: "<sas_url_to_target_B_de>" },
          ],
        },
      ],
    };
  });

  it("SetLogLevel", async () => {
    // @ts-preserve-whitespace
    setLogLevel("info");
  });
});
