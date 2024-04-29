// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential, TextAnalysisClient } from "../../src";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import sinon from "sinon";
import { setLogLevel } from "@azure/logger";
import { isNodeLike } from "@azure/core-util";

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

describe("Logging", function () {
  it("Warn-Text header is correctly logged", async function () {
    const content = "The API version 1 is going to be deprecated by some time in the future";
    const client = makeClientWithWarnText(content);
    let spy;
    if (isNodeLike) {
      spy = sinon.spy(process.stderr, "write");
    } else {
      spy = sinon.spy(console, "warn");
    }
    setLogLevel("warning");
    await client.beginAnalyzeBatch([{ kind: "EntityRecognition" }], ["I need coffee"], "en");
    sinon.assert.callCount(spy, 1);
    sinon.assert.calledWithMatch(spy, content);
    setLogLevel();
  });
});
