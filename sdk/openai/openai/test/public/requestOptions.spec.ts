// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { OpenAIClient } from "../../src/index.js";
import { createClient, startRecorder } from "./utils/recordedClient.js";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "@azure-tools/test-utils";

describe("Request options", () => {
  let client: OpenAIClient;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = await startRecorder(this.currentTest);
    client = createClient("OpenAIKey", "completions", { recorder });
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("onResponse is called in non-streaming methods", async function () {
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
    let called = false;
    await client.getChatCompletions(deploymentName, messages, {
      onResponse: () => {
        called = true;
      },
    });
    assert.isTrue(called);
  });

  it("onResponse is called in streaming methods", async function () {
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
    let called = false;
    const stream = await client.streamChatCompletions(deploymentName, messages, {
      onResponse: () => {
        called = true;
      },
    });
    await stream.cancel();
    assert.isTrue(called);
  });
});
