// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "@azure/test-utils";
import { Context } from "mocha";
import { ChatRequestMessage, OpenAIClient } from "../../src/index.js";
import { createClient, startRecorder } from "./utils/recordedClient.js";

describe("README samples", () => {
  let recorder: Recorder;
  let client: OpenAIClient;

  afterEach(async function () {
    await recorder.stop();
  });

  describe("Completions", function () {
    beforeEach(async function (this: Context) {
      recorder = new Recorder(this.currentTest);
      recorder = await startRecorder(this.currentTest);
      client = createClient("AzureAPIKey", "completions", { recorder });
    });

    it("Generate Chatbot Response", async function () {
      const deploymentId = "gpt-35-turbo";

      const messages: ChatRequestMessage[] = [
        { role: "system", content: "You are a helpful assistant. You will talk like a pirate." },
        { role: "user", content: "Can you help me?" },
        { role: "assistant", content: "Arrrr! Of course, me hearty! What can I do for ye?" },
        { role: "user", content: "What's the best way to train a parrot?" },
      ];

      const events = client.listChatCompletions(deploymentId, messages, { maxTokens: 128 });
      for await (const event of events) {
        for (const choice of event.choices) {
          const delta = choice.delta?.content;
          if (delta !== undefined) {
            assert.isDefined(delta);
          }
        }
      }
    });

    it("Generate Multiple Completions", async function () {
      const examplePrompts = [
        "How are you today?",
        "What is Azure OpenAI?",
        "Why do children love dinosaurs?",
        "Generate a proof of Euler's identity",
        "Describe in single words only the good things that come into your mind about your mother.",
      ];

      const deploymentName = "text-davinci-003";

      const { choices } = await client.getCompletions(deploymentName, examplePrompts, {
        maxTokens: 64,
      });
      for (const choice of choices) {
        const completion = choice.text;
        assert.isDefined(completion);
      }
    });

    it("Summarize Text with Completion", async function () {
      const textToSummarize = ` 
      Two independent experiments reported their results this morning at CERN, Europe's high-energy physics laboratory near Geneva in Switzerland. Both show convincing evidence of a new boson particle weighing around 125 gigaelectronvolts, which so far fits predictions of the Higgs previously made by theoretical physicists.
    
      ""As a layman I would say: 'I think we have it'. Would you agree?"" Rolf-Dieter Heuer, CERN's director-general, asked the packed auditorium. The physicists assembled there burst into applause.
     :`;

      const summarizationPrompt = [
        ` 
      Summarize the following text.
    
      Text:
      """"""
      ${textToSummarize}
      """"""
    
      Summary:
    `,
      ];

      const deploymentName = "text-davinci-003";

      const { choices } = await client.getCompletions(deploymentName, summarizationPrompt);
      const completion = choices[0].text;
      assert.isDefined(completion);
    });
  });

  describe("Dall-E", function () {
    beforeEach(async function (this: Context) {
      recorder = new Recorder(this.currentTest);
      recorder = await startRecorder(this.currentTest);
      client = createClient("AzureAPIKey", "dalle", { recorder });
    });

    it("Generate Batch Image", async function () {
      const prompt = "a monkey eating a banana";
      const size = "1024x1024";
      const n = 1;
      const deploymentName = "dall-e-3";

      const results = await client.getImages(deploymentName, prompt, { n, size });

      for (const image of results.data) {
        assert.isString(image.url);
      }
    });
  });
});
