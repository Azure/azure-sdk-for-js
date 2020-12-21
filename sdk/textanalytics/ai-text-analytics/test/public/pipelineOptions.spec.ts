// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as dotenv from "dotenv";

import { DetectLanguageResultArray, DetectLanguageSuccessResult } from "../../src";

import { WebResource, HttpOperationResponse, HttpHeaders, isNode } from "@azure/core-http";
import { createClient } from "../utils/recordedClient";

if (isNode) {
  dotenv.config();
}

describe("TextAnalyticsClient Custom PipelineOptions", function() {
  it("use custom HTTPClient", async () => {
    const pipelineTester = new Promise<DetectLanguageResultArray>((resolve) => {
      const client = createClient("APIKey", {
        httpClient: {
          sendRequest: async (request: WebResource): Promise<HttpOperationResponse> => ({
            status: 200,
            request,
            bodyAsText: JSON.stringify({
              documents: [
                { id: "0", detectedLanguage: { name: "English", iso6391Name: "en", score: 1.0 } }
              ],
              errors: [],
              modelVersion: "2019-10-01"
            }),
            headers: new HttpHeaders({})
          })
        }
      });

      return client.detectLanguage(["Hello!"], "us").then((languages) => resolve(languages));
    });

    const [result] = await pipelineTester;
    assert.ok(result.error === undefined);
    assert.ok((result as DetectLanguageSuccessResult).id === "0");
    assert.ok((result as DetectLanguageSuccessResult).primaryLanguage.iso6391Name === "en");
  });
});
