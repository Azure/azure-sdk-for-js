// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary router job crud
 */
const JobRouter = require("@azure-rest/communication-job-router").default;
require("dotenv").config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Get a router job

async function getRouterJob() {
  // Create the Router Client
  const routerClient = JobRouter(connectionString);

  const entityId = "router-job-123";

  const result = await routerClient.path("/routing/jobs/{jobId}", entityId).get();

  console.log("router job: " + result);
}

getRouterJob().catch(console.error);
