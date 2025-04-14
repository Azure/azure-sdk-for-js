// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary router worker crud
 */
const JobRouter = require("@azure-rest/communication-job-router").default;
require("dotenv").config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Delete router worker
async function deleteRouterWorker() {
  // Create the Router Client
  const routerClient = JobRouter(connectionString);

  const entityId = "router-worker-123";

  const result = await routerClient.path("/routing/workers/{workerId}", entityId).delete();

  console.log("router worker: " + result);
}

deleteRouterWorker().catch(console.error);
