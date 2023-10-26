// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary router worker crud
 */
import { AzureCommunicationRoutingServiceClient } from "../src";
import createClient from "../src/azureCommunicationRoutingServiceClient";

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Create a router worker
async function createRouterWorker(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient =
    createClient(connectionString);

  const id = "router-worker-123";

  const result = await routerClient.path("/routing/workers/{workerId}", id).patch({
    contentType: "application/merge-patch+json",
    body: {
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
    }
  })

  console.log("router worker: " + result);
}

createRouterWorker().catch(console.error);
