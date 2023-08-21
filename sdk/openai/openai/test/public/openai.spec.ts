// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert, matrix } from "@azure/test-utils";
import { Context } from "mocha";
import { OpenAIClient } from "../../src/index.js";
import { AuthMethod, createClient, startRecorder } from "./utils/recordedClient.js";
import {
  assertChatCompletions,
  assertChatCompletionsStream,
  assertCompletions,
  assertCompletionsStream,
} from "./utils/asserts.js";
import {
  getDeployments,
  getModels,
  getSucceeded,
  updateWithSucceeded,
  withDeployment,
} from "./utils/utils.js";
import { logger } from "./utils/logger.js";

describe("OpenAI", function () {
  let deployments: string[] = [];
  let models: string[] = [];

  before(async function (this: Context) {
    deployments = await getDeployments();
    models = await getModels();
  });

  matrix([["AzureAPIKey", "OpenAIKey", "AAD"]] as const, async function (authMethod: AuthMethod) {
    describe(`[${authMethod}] Client`, () => {
      let recorder: Recorder;
      let client: OpenAIClient;

      beforeEach(async function (this: Context) {
        recorder = await startRecorder(this.currentTest);
        client = createClient(authMethod, { recorder });
      });

      afterEach(async function () {
        if (recorder) {
          await recorder.stop();
        }
      });

      describe("getCompletions", function () {
        it("returns completions across all models", async function () {
          const prompt = ["This is a test"];
          await withDeployment(
            authMethod === "OpenAIKey" ? models : deployments,
            async (deploymentName) =>
              client.getCompletions(deploymentName, prompt).then(assertCompletions)
          );
        });
      });

      describe("listCompletions", function () {
        it("returns completions stream", async function () {
          const prompt = ["This is a test"];
          const modelName = "text-davinci-003";
          await assertCompletionsStream(client.listCompletions(modelName, prompt), {
            // The API returns an empty choice in the first event for some
            // reason. This should be fixed in the API.
            allowEmptyChoices: true,
          });
        });

        it("stream long completions", async function () {
          const prompt = [
            `##### Translate this code snippet into Python. Use Azure SDKs where possible.
  \`\`\`
  using System.Threading.Tasks;
  using Microsoft.AspNetCore.Mvc;
  using Microsoft.Azure.WebJobs;
  using Microsoft.Azure.WebJobs.Extensions.Http;
  using Microsoft.AspNetCore.Http;
  using Microsoft.Extensions.Logging;
  using System;
  using Azure.Messaging.EventGrid;
  using Azure.Messaging.EventGrid.SystemEvents;
  
  namespace Function1
  {
      public static class Function1
      {
          [FunctionName("Function1")]
          public static async Task<IActionResult> Run(
              [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
              ILogger log)
          {
              log.LogInformation("C# HTTP trigger function processed a request.");
              string response = string.Empty;
              BinaryData events = await BinaryData.FromStreamAsync(req.Body);
              log.LogInformation($"Received events: {events}");
  
              EventGridEvent[] eventGridEvents = EventGridEvent.ParseMany(events);
  
              foreach (EventGridEvent eventGridEvent in eventGridEvents)
              {
                  // Handle system events
                  if (eventGridEvent.TryGetSystemEventData(out object eventData))
                  {
                      // Handle the subscription validation event
                      if (eventData is SubscriptionValidationEventData subscriptionValidationEventData)
                      {
                          log.LogInformation($"Got SubscriptionValidation event data, validation code: {subscriptionValidationEventData.ValidationCode}, topic: {eventGridEvent.Topic}");
                          // Do any additional validation (as required) and then return back the below response
                          var responseData = new
                          {
                              ValidationResponse = subscriptionValidationEventData.ValidationCode
                          };
  
                          return new OkObjectResult(responseData);
                      }
                  }
              }
              return new OkObjectResult(response);
          }
      }
  }
  
  \`\`\`
  `,
          ];
          const modelName = "text-davinci-003";
          await assertCompletionsStream(
            client.listCompletions(modelName, prompt, {
              maxTokens: 2048,
            }),
            {
              // The API returns an empty choice in the first event for some
              // reason. This should be fixed in the API.
              allowEmptyChoices: true,
            }
          );
        });
      });

      describe("chat completions", function () {
        const pirateMessages = [
          { role: "system", content: "You are a helpful assistant. You will talk like a pirate." },
          { role: "user", content: "Can you help me?" },
          { role: "assistant", content: "Arrrr! Of course, me hearty! What can I do for ye?" },
          { role: "user", content: "What's the best way to train a parrot?" },
        ];
        const weatherMessages = [{ role: "user", content: "What's the weather like in Boston?" }];
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
        const chatCompletionDeployments: string[] = [];
        const chatCompletionModels: string[] = [];
        describe("getChatCompletions", function () {
          it("returns completions across all models", async function () {
            updateWithSucceeded(
              await withDeployment(
                getSucceeded(
                  authMethod,
                  deployments,
                  models,
                  chatCompletionDeployments,
                  chatCompletionModels
                ),
                async (deploymentName) =>
                  client
                    .getChatCompletions(deploymentName, pirateMessages)
                    .then(assertChatCompletions)
              ),
              chatCompletionDeployments,
              chatCompletionModels,
              authMethod
            );
          });

          it("calls functions", async function () {
            updateWithSucceeded(
              await withDeployment(
                getSucceeded(
                  authMethod,
                  deployments,
                  models,
                  chatCompletionDeployments,
                  chatCompletionModels
                ),
                async (deploymentName) =>
                  client
                    .getChatCompletions(deploymentName, weatherMessages, {
                      functions: [getCurrentWeather],
                    })
                    .then((c) => assertChatCompletions(c, { functions: true }))
              ),
              chatCompletionDeployments,
              chatCompletionModels,
              authMethod
            );
          });
        });

        describe("listChatCompletions", function () {
          it("returns completions across all models", async function () {
            updateWithSucceeded(
              await withDeployment(
                getSucceeded(
                  authMethod,
                  deployments,
                  models,
                  chatCompletionDeployments,
                  chatCompletionModels
                ),
                async (deploymentName) => {
                  const count = await assertChatCompletionsStream(
                    client.listChatCompletions(deploymentName, pirateMessages),
                    {
                      // The API returns an empty choice in the first event for some
                      // reason. This should be fixed in the API.
                      allowEmptyChoices: true,
                    }
                  );
                  if (count === 0) {
                    logger.warning(`No completions returned for ${deploymentName}`);
                  }
                }
              ),
              chatCompletionDeployments,
              chatCompletionModels,
              authMethod
            );
          });

          it("calls functions", async function () {
            updateWithSucceeded(
              await withDeployment(
                getSucceeded(
                  authMethod,
                  deployments,
                  models,
                  chatCompletionDeployments,
                  chatCompletionModels
                ),
                async (deploymentName) => {
                  const count = await assertChatCompletionsStream(
                    client.listChatCompletions(deploymentName, weatherMessages, {
                      functions: [getCurrentWeather],
                    }),
                    {
                      functions: true,
                      // The API returns an empty choice in the first event for some
                      // reason. This should be fixed in the API.
                      allowEmptyChoices: true,
                    }
                  );
                  if (count === 0) {
                    logger.warning(`No completions returned for ${deploymentName}`);
                  }
                }
              ),
              chatCompletionDeployments,
              chatCompletionModels,
              authMethod
            );
          });
        });
      });

      describe("getEmbeddings", function () {
        it("embeddings test", async function () {
          const prompt = ["This is a test"];
          const modelName = "text-embedding-ada-002";
          const embeddings = await client.getEmbeddings(modelName, prompt);
          assert.isNotNull(embeddings.data);
          assert.equal(embeddings.data.length > 0, true);
          assert.isNotNull(embeddings.data[0].embedding);
          assert.equal(embeddings.data[0].embedding.length > 0, true);
          assert.isNotNull(embeddings.usage);
        });
      });
    });
  });
});
