// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { OpenAIClient } from "../../src/index.js";
import { createClient } from "./utils/recordedClient.js";
import { assert } from "@azure-tools/test-utils";
import { AbortController } from "@azure/abort-controller";
import { isLiveMode } from "@azure-tools/test-recorder";

describe("AbortSignal", () => {
  let client: OpenAIClient;

  beforeEach(async function (this: Context) {
    // Streaming doesn't work in the record/playback because stream chunks are part of a single response
    // and the test-proxy just sends all of them at once.
    if (!isLiveMode()) {
      this.skip();
    }

    client = createClient("OpenAIKey", "completions", {});
  });

  it("Abort signal test for streaming method", async function () {
    const messages = [
      {
        role: "system",
        content: "You are a helpful assistant. You will talk like a pirate.",
      } as const,
      { role: "user", content: "Can you help me?" } as const,
      { role: "assistant", content: "Arrrr! Of course, me hearty! What can I do for ye?" } as const,
      { role: "user", content: "What's the best way to train a parrot?" } as const,
    ];

    const deploymentName = "gpt-3.5-turbo";
    const abortController = new AbortController();
    const abortSignal = abortController.signal;
    let currentMessage = "";
    try {
      const events = await client.streamChatCompletions(deploymentName, messages, {
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
            currentMessage += delta;
          }
        }
      }
      assert.isDefined(currentMessage);
      assert.fail("Expected to abort streaming");
    } catch (error: any) {
      console.log(error);
      assert.isTrue(error.name === "AbortError" || error.code === "ECONNRESET");
      assert.equal(abortSignal.aborted, true);
    }
  });
});
