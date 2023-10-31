// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary router worker crud
 */
import { JobRouterClient, RouterWorker } from "@azure/communication-job-router";

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Create a router worker
async function createRouterWorker(): Promise<void> {
  // Create the Router Client
  const routerClient: JobRouterClient = new JobRouterClient(connectionString);

  const id = "router-worker-123";
  const request: RouterWorker = {
    id: "router-worker-123",
    state: "active",
    loadRatio: 1,
    totalCapacity: 100,
    queueAssignments: {
      MainQueue: {},
      SecondaryQueue: {},
    },
    labels: {},
    channelConfigurations: {
      CustomChatChannel: {
        capacityCostPerJob: 10,
      },
      CustomVoiceChannel: {
        capacityCostPerJob: 100,
      },
    },
  };

  const result = await routerClient.createWorker(id, request);

  console.log("router worker: " + result);
}

createRouterWorker().catch(console.error);
