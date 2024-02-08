// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary router job crud
 */
const JobRouter = require("@azure-rest/communication-job-router").default;
require("dotenv").config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Delete router job
async function deleteRouterJob() {
  // Create the Router Client
  const routerClient = JobRouter(connectionString);

  const entityId = "router-job-123";

  const result = await routerClient.path("/routing/jobs/{jobId}", entityId).delete();

  console.log("router job: " + result);
}

deleteRouterJob().catch(console.error);
