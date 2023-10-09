// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { OpenAIClient } from "../../src/index.js";
import { createClient } from "./utils/recordedClient.js";
import { assert } from "@azure/test-utils";
import { AbortController } from "@azure/abort-controller";
import { isLiveMode } from "@azure-tools/test-recorder";

describe("AbortSignal", () => {
  let client: OpenAIClient;

  beforeEach(async function (this: Context) {
    // Inconsistent behavior in record and playback mode. See https://github.com/Azure/azure-sdk-for-js/issues/27352
    if (!isLiveMode()) {
      this.skip();
    }

    client = createClient("OpenAIKey", {});
  });

  it("Abort signal test for streaming method", async function () {
    // Skip test for Node 14. See https://github.com/Azure/azure-sdk-for-js/issues/27353
    if (typeof process === "object") {
      const [major] = process.versions.node.split(".").map(Number);
      if (major === 14) {
        this.skip();
      }
    }
    const messages = [
      { role: "system", content: "You are a helpful assistant. You will talk like a pirate." },
      { role: "user", content: "Can you help me?" },
      { role: "assistant", content: "Arrrr! Of course, me hearty! What can I do for ye?" },
      { role: "user", content: "What's the best way to train a parrot?" },
    ];

    const deploymentName = "gpt-3.5-turbo";
    const abortController = new AbortController();
    const abortSignal = abortController.signal;
    try {
      const events = client.listChatCompletions(deploymentName, messages, {
        maxTokens: 800,
        temperature: 0.7,
        presencePenalty: 0,
        frequencyPenalty: 0,
        abortSignal,
      });
      for await (const event of events) {
        for (const choice of event.choices) {
          const delta = choice.delta?.content;
          abortController.abort();
          if (delta !== undefined) {
            assert.isDefined(delta);
          }
        }
      }
      assert.fail("Expected to abort streaming");
    } catch (error: any) {
      console.log(error);
      assert.isTrue(error.name === "AbortError" || error.code === "ECONNRESET");
      assert.equal(abortSignal.aborted, true);
    }
  });
});
