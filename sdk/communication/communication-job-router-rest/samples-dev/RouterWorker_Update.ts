// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary router worker crud
 */
import JobRouter from "../src";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureCommunicationRoutingServiceClient } from "../src";


// Update a router worker
async function updateRouterWorker(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient =
    JobRouter("https://<endpoint>", new DefaultAzureCredential());

  const id = "router-worker-123";

  const result = await routerClient.path("/routing/workers/{workerId}", id).patch({
    contentType: "application/merge-patch+json",
    body: {
      capacity: 100,
      queues: [
        "MainQueue",
        "SecondaryQueue"
      ],
      labels: {},
      channels: [{
        channelId: "CustomChatChannel",
        capacityCostPerJob: 10
      }, {
        channelId: "CustomVoiceChannel",
        capacityCostPerJob: 100
      }],
    }
  })
  console.log("router worker: " + result);
}

updateRouterWorker().catch(console.error);
