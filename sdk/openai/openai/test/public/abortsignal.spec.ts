// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { OpenAIClient } from "../../src/index.js";
import { createClient, startRecorder } from "./utils/recordedClient.js";
import { assert } from "@azure/test-utils";
import { Recorder } from "@azure-tools/test-recorder";
import { AbortController } from "@azure/abort-controller";

describe("AbortSignal", () => {
  let recorder: Recorder;
  let client: OpenAIClient;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    recorder = await startRecorder(this.currentTest);
    client = createClient("AzureAPIKey", { recorder });
  });

  afterEach(async function () {
    if (recorder) {
      await recorder.stop();
    }
  });

  it("Abort signal test for streaming method", async function () {
    // Skip test for Node 14
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

    const deploymentName = "gpt-35-turbo";
    const abortController = new AbortController();
    const abortSignal = abortController.signal;
    let currentMessage = "";
    let counter = 0;
    try {
      const events = client.listChatCompletions(deploymentName, messages, {
        maxTokens: 800,
        temperature: 0.7,
        presencePenalty: 0,
        frequencyPenalty: 0,
        abortSignal: abortSignal,
      });
      for await (const event of events) {
        counter++;
        console.log("Number of events received", counter)
        for (const choice of event.choices) {
          const delta = choice.delta?.content;
          abortController.abort();
          if (delta !== undefined) {
            currentMessage += delta;
          }
        }
      }
      console.log("Received message", currentMessage)
      assert.fail("Expected to abort streaming");
    } catch (error: any) {
      console.log(error);
      assert.isTrue(error.name === "AbortError" || error.name === "Error");
      assert.equal(abortSignal.aborted, true);
    }
  });
});
