// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary router worker crud
 */
import type { AzureCommunicationRoutingServiceClient } from "@azure-rest/communication-job-router";
import JobRouter from "@azure-rest/communication-job-router";
import "dotenv/config";

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Get a router worker
async function getRouterWorker(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient = JobRouter(connectionString);

  const entityId = "router-worker-123";

  const result = await routerClient.path("/routing/workers/{workerId}", entityId).get();

  console.log("router worker: " + result);
}

getRouterWorker().catch(console.error);
