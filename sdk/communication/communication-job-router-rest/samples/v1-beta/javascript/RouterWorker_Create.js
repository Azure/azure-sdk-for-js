// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary router worker crud
 */
const JobRouter = require("@azure-rest/communication-job-router").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

const endpoint = process.env["COMMUNICATION_ENDPOINT"] || "";

// Create a router worker
async function createRouterWorker() {
  // Create the Router Client
  const routerClient = JobRouter(endpoint, new DefaultAzureCredential());

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
