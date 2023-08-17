// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert, isNode, matrix } from "@azure/test-utils";
import { Context } from "mocha";
import { OpenAIClient } from "../../src/OpenAIClient.js";
import { AuthMethod, createClient, startRecorder } from "./utils/recordedClient.js";
import { ImageLocation } from "../../src/api/models.js";

matrix([["AzureAPIKey", "AAD", "OpenAIKey"]] as const, async function (authMethod: AuthMethod) {
  describe(`[${authMethod}] Client`, () => {
    let recorder: Recorder;
    let client: OpenAIClient;

    beforeEach(async function (this: Context) {
      if (!isNode && authMethod === "AAD") {
        this.skip();
      }
      recorder = await startRecorder(this.currentTest);
      client = createClient(authMethod, { recorder });
    });

    afterEach(async function () {
      if (recorder) {
        await recorder.stop();
      }
    });

    it("completions test", async function () {
      const prompt = ["This is a test"];
      const modelName = "text-davinci-003";
      const completions = await client.getCompletions(modelName, prompt);
      assert.isNotNull(completions.choices);
      assert.equal(completions.choices?.length, 1);
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
      const events = client.listCompletions(modelName, prompt, {
        maxTokens: 2048,
      });
      let received = false;
      for await (const event of events) {
        if (!event?.choices) {
          throw new Error("Expected choices in the response");
        }
        for (const choice of event.choices) {
          assert.isDefined(choice.text);
          received = true;
        }
      }
      assert.isTrue(received);
    });

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

    it("get images test", async function () {
      if (authMethod === "OpenAIKey") {
        this.skip();
      }
      function delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
      const prompt = "monkey eating banana";
      const numberOfImages = 2;
      const size = "256x256";
      let imageLinks = await client.beginAzureBatchImageGeneration(prompt, {
        n: numberOfImages,
        size: size,
      });
      while (imageLinks.status === "notRunning" || imageLinks.status === "running") {
        await delay(5000);
        imageLinks = await client.getAzureBatchImageGenerationOperationStatus(imageLinks.id);
      }
      assert.equal(imageLinks.status, "succeeded");
      assert.isNotNull(imageLinks.result);
      assert.equal((imageLinks.result?.data as ImageLocation[]).length, numberOfImages);
    });
  });
});
