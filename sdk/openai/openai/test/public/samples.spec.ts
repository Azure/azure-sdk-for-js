// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { Context } from "mocha";
import { OpenAIClient } from "../../src/OpenAIClient.js";
import { createClient, startRecorder } from "./utils/recordedClient.js";

export const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("README samples", () => {
  let recorder: Recorder;
  let client: OpenAIClient;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    recorder = await startRecorder(this.currentTest);
    client = createClient("AzureAPIKey", { recorder });
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("Generate Chatbot Response", async function () {
    const deploymentName = "text-davinci-003";
    const prompt = ["What is Azure OpenAI?"];
    console.log(`Input: ${prompt}`);

    const { choices } = await client.getCompletions(deploymentName, prompt);
    const completion = choices[0].text;
    console.log(`Chatbot: ${completion}`);
  });

  it("Generate Multiple Chatbot Responses", async function () {
    const examplePrompts = [
      "How are you today?",
      "What is Azure OpenAI?",
      "Why do children love dinosaurs?",
      "Generate a proof of Euler's identity",
      "Describe in single words only the good things that come into your mind about your mother.",
    ];

    const deploymentName = "text-davinci-003";

    let promptIndex = 0;
    const { choices } = await client.getCompletions(deploymentName, examplePrompts);
    for (const choice of choices) {
      const completion = choice.text;
      console.log(`Input: ${examplePrompts[promptIndex++]}`);
      console.log(`Chatbot: ${completion}`);
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

    console.log(`Input: ${summarizationPrompt}`);

    const deploymentName = "text-davinci-003";

    const { choices } = await client.getCompletions(deploymentName, summarizationPrompt);
    const completion = choices[0].text;
    console.log(`Summarization: ${completion}`);
  });
});
