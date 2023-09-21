// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { OpenAIClient } from "../../src/index.js";
import { createClient } from "../public/utils/recordedClient.js";
import { AbortSignalLike } from "@azure/abort-controller";
import { assert } from "@azure/test-utils";
describe("AbortSignal", () => {
  let client: OpenAIClient;

  beforeEach(async function (this: Context) {
    client = createClient("AzureAPIKey", {});
  });

  it("Abort signal test for streaming method", async function () {
    const messages = [
      { role: "system", content: "You are a helpful assistant. You will talk like a pirate." },
      { role: "user", content: "Can you help me?" },
      { role: "assistant", content: "Arrrr! Of course, me hearty! What can I do for ye?" },
      { role: "user", content: "What's the best way to train a parrot?" },
    ];

    const deploymentName = "gpt-35-turbo";
    const abortController = new AbortController();
    const abortSignal = abortController.signal;

    try {
      const events = client.listChatCompletions(deploymentName, messages, {
        maxTokens: 800,
        temperature: 0.7,
        presencePenalty: 0,
        frequencyPenalty: 0,
        abortSignal: abortSignal as AbortSignalLike,
      });
      for await (const event of events) {
        for (const choice of event.choices) {
          const delta = choice.delta?.content;
          abortController.abort();
          if (delta !== undefined) {
            this.currentMessage += delta;
          }
        }
      }
      assert.fail("Expected to abort streaming");
    } catch (error) {
      assert.isDefined(error);
      assert.equal(abortSignal.aborted, true);
    }
  });
});
