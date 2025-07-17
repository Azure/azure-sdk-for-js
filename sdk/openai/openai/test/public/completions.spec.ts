// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe } from "vitest";
import { createClientsAndDeployments } from "../utils/createClients.js";
import type { APIVersion } from "../utils/utils.js";
import { assertCompletions, assertCompletionsStream } from "../utils/asserts.js";
import { APIMatrix, testWithDeployments } from "../utils/utils.js";
import { completionsModelsToSkip } from "../utils/models.js";
import "../../src/types/index.js";
import type { ClientsAndDeploymentsInfo } from "../utils/types.js";

describe.concurrent.each(APIMatrix)("Legacy Completions [%s]", (apiVersion: APIVersion) => {
  const clientsAndDeployments: ClientsAndDeploymentsInfo = createClientsAndDeployments(
    apiVersion,
    { completion: "true" },
    { clientOptions: { maxRetries: 0 }, deploymentsToSkip: ["computer-use-preview"] },
  );

  describe("completions.create", function () {
    describe("returns completions across all models", async () => {
      const prompt = ["What is Azure OpenAI?"];
      await testWithDeployments({
        clientsAndDeploymentsInfo: clientsAndDeployments,
        apiVersion,
        run: (client, deploymentName) =>
          client.completions.create({ model: deploymentName, prompt }),
        validate: assertCompletions,
        modelsListToSkip: completionsModelsToSkip,
      });
    });

    describe("returns completions stream", async () => {
      const prompt = ["This is Azure OpenAI?"];
      await testWithDeployments({
        clientsAndDeploymentsInfo: clientsAndDeployments,
        apiVersion,
        run: (client, deploymentName) =>
          client.completions.create({ model: deploymentName, prompt, stream: true }),
        validate: (result) => assertCompletionsStream(result, { allowEmptyChoices: true }),
      });
    });

    describe("stream long completions", async () => {
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
      await testWithDeployments({
        clientsAndDeploymentsInfo: clientsAndDeployments,
        apiVersion,
        run: (client, deploymentName) =>
          client.completions.create(
            { model: deploymentName, prompt, stream: true, max_tokens: 2048 },
            { timeout: 10000 },
          ),
        validate: (result) => assertCompletionsStream(result, { allowEmptyChoices: true }),
      });
    });
  });
});
