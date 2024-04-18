// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary router worker crud
 */
import JobRouter, {
  AzureCommunicationRoutingServiceClient
} from "@azure-rest/communication-job-router"
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Delete router worker
async function deleteRouterWorker(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient =
    JobRouter(connectionString);

  const entityId = "router-worker-123";

  const result = await routerClient.path("/routing/workers/{workerId}", entityId).delete();

  console.log("router worker: " + result);
}

deleteRouterWorker().catch(console.error);
