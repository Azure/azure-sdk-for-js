// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary router worker crud
 */
const { JobRouterClient } = require("@azure/communication-job-router");

// Load the .env file (you will need to set these environment variables)
require("dotenv").config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Update a router worker
async function updateRouterWorker() {
  // Create the Router Client
  const routerClient = new JobRouterClient(connectionString);

  const request = {
    id: "router-worker-123",
    loadRatio: 2,
    totalCapacity: 50,
    queueAssignments: {
      MainQueue: {},
      SecondaryQueue: {},
    },
    channelConfigurations: {
      CustomChatChannel: {
        capacityCostPerJob: 2,
      },
      CustomVoiceChannel: {
        capacityCostPerJob: 5,
      },
    },
  };

  const result = await routerClient.updateWorker(request.id, request);

  console.log("router worker: " + result);
}

updateRouterWorker().catch(console.error);
