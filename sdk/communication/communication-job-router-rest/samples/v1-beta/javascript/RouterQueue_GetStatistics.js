// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary job queue crud
 */

const JobRouter = require("@azure-rest/communication-job-router").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

const endpoint = process.env["COMMUNICATION_ENDPOINT"] || "";

// Get a router jobQueue's statistics

async function getJobQueueStatistics() {
  // Create the Router Client
  const routerClient = JobRouter(endpoint, new DefaultAzureCredential());

  const entityId = "router-jobQueue-123";

  const result = await routerClient.path("/routing/queues/{queueId}/statistics", entityId).get();

  console.log("router jobQueue: " + result);
}

getJobQueueStatistics().catch(console.error);
