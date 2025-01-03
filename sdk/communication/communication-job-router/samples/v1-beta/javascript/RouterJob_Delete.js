// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary router job crud
 */
const { JobRouterClient } = require("@azure/communication-job-router");

// Load the .env file (you will need to set these environment variables)
require("dotenv").config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Delete router job
async function deleteRouterJob() {
  // Create the Router Client
  const routerClient = new JobRouterClient(connectionString);

  const entityId = "router-job-123";

  const result = await routerClient.deleteJob(entityId);

  console.log("router job: " + result);
}

deleteRouterJob().catch(console.error);
