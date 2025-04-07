// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary router worker crud
 */
import type { AzureCommunicationRoutingServiceClient } from "@azure-rest/communication-job-router";
import JobRouter from "@azure-rest/communication-job-router";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const endpoint = process.env["COMMUNICATION_ENDPOINT"] || "";

// Create a router worker
async function createRouterWorker(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient = JobRouter(
    endpoint,
    new DefaultAzureCredential(),
  );

  const id = "router-worker-123";

  const result = await routerClient.path("/routing/workers/{workerId}", id).patch({
    contentType: "application/merge-patch+json",
    body: {
      capacity: 100,
      queues: ["MainQueue", "SecondaryQueue"],
      labels: {},
      channels: [
        {
          channelId: "CustomChatChannel",
          capacityCostPerJob: 10,
        },
        {
          channelId: "CustomVoiceChannel",
          capacityCostPerJob: 100,
        },
      ],
    },
  });

  console.log("router worker: " + result);
}

createRouterWorker().catch(console.error);
