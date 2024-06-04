// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { assert } from "@azure-tools/test-utils";
import { isLiveMode } from "@azure-tools/test-recorder";
import OpenAI, { AzureOpenAI } from "openai";
import { createClient } from "./utils/createClient.js";

describe("AbortSignal", () => {
  let client: AzureOpenAI | OpenAI;

  beforeEach(async function (this: Context) {
    // Streaming doesn't work in the record/playback because stream chunks are part of a single response
    // and the test-proxy just sends all of them at once.
    if (!isLiveMode()) {
      this.skip();
    }
    client = createClient("AAD", "completions");
  });

  // TODO: Fix the tests
  it.skip("Abort signal test for streaming method", async function () {
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
    let currentMessage = "";
    try {
      const events = await client.chat.completions.create({
        model: deploymentName,
        messages,
        stream: true,
        max_tokens: 800,
        temperature: 0.7,
        presence_penalty: 0,
        frequency_penalty: 0,
      });
      for await (const event of events) {
        assert.isDefined(event);
        events.controller.abort();
      }
      assert.isDefined(currentMessage);
      assert.fail("Expected to abort streaming");
    } catch (error: any) {
      console.log(error);
      assert.isTrue(error.name === "AbortError" || error.code === "ECONNRESET");
    }
  });
});
