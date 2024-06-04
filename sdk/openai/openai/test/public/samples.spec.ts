// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert, matrix } from "@azure-tools/test-utils";
import { Context } from "mocha";
import { createClient, startRecorder } from "./utils/createClient.js";
import OpenAI, { AzureOpenAI } from "openai";
import {
  ChatCompletionMessageParam,
  ChatCompletionMessageToolCall,
  ChatCompletionToolMessageParam,
  ChatCompletionUserMessageParam,
} from "openai/resources/index.mjs";
import { APIMatrix, APIVersion, AuthMethod, authTypes } from "./utils/utils.js";

describe("README samples", () => {
  let recorder: Recorder;
  let client: AzureOpenAI | OpenAI;

  afterEach(async function () {
    await recorder.stop();
  });

  matrix([authTypes] as const, async function (authMethod: AuthMethod) {
    describe(`[${authMethod}] Client`, () => {
      matrix([APIMatrix] as const, async function (apiVersion: APIVersion) {
        describe("Completions", function () {
          beforeEach(async function (this: Context) {
            recorder = new Recorder(this.currentTest);
            recorder = await startRecorder(this.currentTest);
            client = createClient(authMethod, apiVersion, "completions");
          });

          it("Generate Chatbot Response", async function () {
            const deploymentId = "gpt-35-turbo";

            const messages: ChatCompletionMessageParam[] = [
              {
                role: "system",
                content: "You are a helpful assistant. You will talk like a pirate.",
              },
              { role: "user", content: "Can you help me?" },
              { role: "assistant", content: "Arrrr! Of course, me hearty! What can I do for ye?" },
              { role: "user", content: "What's the best way to train a parrot?" },
            ];

            const events = await client.chat.completions.create({
              model: deploymentId,
              messages,
              stream: true,
              max_tokens: 128,
            });
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

            const { choices } = await client.completions.create({
              model: deploymentName,
              prompt: examplePrompts,
              max_tokens: 64,
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

            const { choices } = await client.completions.create({
              model: deploymentName,
              prompt: summarizationPrompt,
            });
            const completion = choices[0].text;
            assert.isDefined(completion);
          });

          it("Use chat tools", async function () {
            const deploymentName = "gpt-35-turbo-16k";

            const getCurrentWeather = {
              name: "get_current_weather",
              description: "Get the current weather in a given location",
              parameters: {
                type: "object",
                properties: {
                  location: {
                    type: "string",
                    description: "The city and state, e.g. San Francisco, CA",
                  },
                  unit: {
                    type: "string",
                    enum: ["celsius", "fahrenheit"],
                  },
                },
                required: ["location"],
              },
            };

            const messages = [
              { role: "user", content: "What is the weather like in Boston?" } as const,
            ];

            const options = {
              tools: [
                {
                  type: "function",
                  function: getCurrentWeather,
                } as const,
              ],
            };
            const result = await client.chat.completions.create({
              model: deploymentName,
              messages,
              ...options,
            });
            function applyToolCall({
              function: call,
              id,
            }: ChatCompletionMessageToolCall): ChatCompletionToolMessageParam {
              if (call.name === "get_current_weather") {
                const { location, unit } = JSON.parse(call.arguments);
                return {
                  role: "tool",
                  content: `The weather in ${location} is 72 degrees ${unit} and sunny.`,
                  tool_call_id: id,
                };
              }
              throw new Error(`Unknown tool call: ${call.name}`);
            }
            const choice = result.choices[0];
            const responseMessage = choice.message;
            if (responseMessage?.role === "assistant") {
              const requestedToolCalls = responseMessage?.tool_calls;
              if (requestedToolCalls?.length) {
                const toolCallResolutionMessages = [
                  ...messages,
                  responseMessage,
                  ...requestedToolCalls.map(applyToolCall),
                ];
                const finalResult = await client.chat.completions.create({
                  model: deploymentName,
                  messages: toolCallResolutionMessages,
                });
                assert.isDefined(finalResult.choices[0].message?.content);
              }
            }
          });
        });

        describe("Dall-E", function () {
          beforeEach(async function (this: Context) {
            recorder = new Recorder(this.currentTest);
            recorder = await startRecorder(this.currentTest);
            client = createClient(authMethod, apiVersion, "dalle");
          });

          it("Generate Batch Image", async function () {
            const prompt = "a monkey eating a banana";
            const size = "1024x1024";
            const n = 1;
            const deploymentName = "dall-e-3";

            const results = await client.images.generate({
              model: deploymentName,
              prompt,
              n,
              size,
            });

            for (const image of results.data) {
              assert.isString(image.url);
            }
          });

          // TODO: The model currently responds with: Invalid content type. image_url is only supported by certain models
          it.skip("Chat with images", async function () {
            const url =
              "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg";
            const deploymentName = "gpt-4-1106-preview";
            const messages: ChatCompletionUserMessageParam[] = [
              {
                role: "user",
                content: [
                  {
                    type: "image_url",
                    image_url: {
                      url,
                      detail: "auto",
                    },
                  },
                ],
              },
            ];

            const result = await client.chat.completions.create({
              model: deploymentName,
              messages,
            });
            assert.isString(result.choices[0].message?.content);
          });
        });
      });
    });
  });
});
