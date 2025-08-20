// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential, TextAnalysisClient } from "@azure/ai-language-text";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { setLogLevel } from "@azure/logger";
import { isNodeLike } from "@azure/core-util";
import { describe, it, expect, vi } from "vitest";

function makeClientWithWarnText(content: string): TextAnalysisClient {
  return new TextAnalysisClient("https://endpoint", new AzureKeyCredential("test"), {
    httpClient: {
      sendRequest: async (request) => ({
        request,
        status: 202,
        headers: createHttpHeaders({ "warn-text": content }),
      }),
    },
  });
}

describe("Logging", () => {
  it("Warn-Text header is correctly logged", async () => {
    const content = "The API version 1 is going to be deprecated by some time in the future";
    const client = makeClientWithWarnText(content);
    let spy;
    if (isNodeLike) {
      spy = vi.spyOn(process.stderr, "write");
    } else {
      spy = vi.spyOn(console, "warn");
    }
    setLogLevel("warning");
    await client.beginAnalyzeBatch([{ kind: "EntityRecognition" }], ["I need coffee"], "en");

    const mockArgs = spy.mock.calls[0][0];
    expect(mockArgs).toContain(content);
    setLogLevel();
  });
});
