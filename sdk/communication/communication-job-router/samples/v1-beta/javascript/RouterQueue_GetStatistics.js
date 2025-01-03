// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary job queue crud
 */

// Load the .env file (you will need to set these environment variables)
const dotenv = require("dotenv");
const { JobRouterClient } = require("@azure/communication-job-router");
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Get a router jobQueue's statistics

async function getJobQueueStatistics() {
  // Create the Router Client
  const routerClient = new JobRouterClient(connectionString);

  const entityId = "router-jobQueue-123";

  const result = await routerClient.getQueueStatistics(entityId);

  console.log("router jobQueue: " + result);
}

getJobQueueStatistics().catch(console.error);
