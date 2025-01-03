// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary job queue crud
 */
const { JobRouterAdministrationClient } = require("@azure/communication-job-router");

// Load the .env file (you will need to set these environment variables)
require("dotenv").config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Delete router jobQueue
async function deleteJobQueue() {
  // Create the Router Client
  const routerAdministrationClient = new JobRouterAdministrationClient(connectionString);

  const entityId = "queue-123";

  const result = await routerAdministrationClient.deleteQueue(entityId);

  console.log("router jobQueue: " + result);
}

deleteJobQueue().catch(console.error);
