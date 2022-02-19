// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { DetectLanguageResultArray, DetectLanguageSuccessResult } from "../../src";
import { createClient } from "./utils/recordedClient";

import { PipelineRequest, PipelineResponse, createHttpHeaders } from "@azure/core-rest-pipeline";

describe("TextAnalyticsClient Custom PipelineOptions", function () {
  it("use custom HTTPClient", async () => {
    const pipelineTester = new Promise<DetectLanguageResultArray>((resolve) => {
      const client = createClient({
        authMethod: "DummyAPIKey",
        clientOptions: {
          httpClient: {
            sendRequest: async (request: PipelineRequest): Promise<PipelineResponse> => ({
              status: 200,
              request,
              bodyAsText: JSON.stringify({
                documents: [
                  { id: "0", detectedLanguage: { name: "English", iso6391Name: "en", score: 1.0 } },
                ],
                errors: [],
                modelVersion: "2019-10-01",
              }),
              headers: createHttpHeaders(),
            }),
          },
        },
      });

      return client.detectLanguage(["Hello!"], "us").then((languages) => resolve(languages));
    });

    const [result] = await pipelineTester;
    assert.ok(result.error === undefined);
    assert.ok((result as DetectLanguageSuccessResult).id === "0");
    assert.ok((result as DetectLanguageSuccessResult).primaryLanguage.iso6391Name === "en");
  });
});
