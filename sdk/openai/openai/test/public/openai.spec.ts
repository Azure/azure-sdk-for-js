// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, assertEnvironmentVariable, isPlaybackMode } from "@azure-tools/test-recorder";
import { assert, matrix } from "@azure/test-utils";
import { Context } from "mocha";
import { OpenAIClient, OpenAIKeyCredential } from "../../src/index.js";
import { AuthMethod, createClient, startRecorder } from "./utils/recordedClient.js";
import {
  assertChatCompletions,
  assertCompletions,
  assertCompletionsStream,
} from "./utils/asserts.js";
import { listDeployments, listOpenAIModels, withDeployment } from "./utils/utils.js";

describe("OpenAI", function () {
  let deployments: string[] = [];
  let models: string[] = [];

  before(async function (this: Context) {
    if (isPlaybackMode()) {
      this.skip();
    }
    const subId = assertEnvironmentVariable("SUBSCRIPTION_ID");
    const rgName = assertEnvironmentVariable("RESOURCE_GROUP");
    const accountName = assertEnvironmentVariable("ACCOUNT_NAME");
    deployments = await listDeployments(subId, rgName, accountName);
    models = await listOpenAIModels(
      new OpenAIKeyCredential(assertEnvironmentVariable("OPENAI_API_KEY"))
    );
  });

  matrix([["AzureAPIKey", "AAD", "OpenAIKey"]] as const, async function (authMethod: AuthMethod) {
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

      describe("getChatCompletions", function () {
        it("returns completions across all models", async function () {
          const messages = [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: "Knock knock." },
            { role: "assistant", content: "Who's there?" },
            { role: "user", content: "Orange." },
          ];
          await withDeployment(
            authMethod === "OpenAIKey" ? models : deployments,
            async (deploymentName) =>
              client.getChatCompletions(deploymentName, messages).then(assertChatCompletions)
          );
        });

        it("calls functions", async function () {
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
          const messages = [{ role: "user", content: "What's the weather like in Boston?" }];

          await withDeployment(
            authMethod === "OpenAIKey" ? models : deployments,
            async (deploymentName) =>
              client
                .getChatCompletions(deploymentName, messages, {
                  functions: [getCurrentWeather],
                })
                .then((c) => assertChatCompletions(c, { functions: true }))
          );
        });
      });

      describe("listChatCompletions", function () {
        it("returns completions across all models", async function () {
          const messages = [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: "Knock knock." },
            { role: "assistant", content: "Who's there?" },
            { role: "user", content: "Orange." },
          ];
          await withDeployment(
            authMethod === "OpenAIKey" ? models : deployments,
            async (deploymentName) =>
              client.getChatCompletions(deploymentName, messages).then(assertChatCompletions)
          );
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
