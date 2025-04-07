// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary job queue crud
 */
const JobRouter = require("@azure-rest/communication-job-router").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

const endpoint = process.env["COMMUNICATION_ENDPOINT"] || "";

// Delete router jobQueue
async function deleteJobQueue() {
  // Create the Router Client
  const routerClient = JobRouter(endpoint, new DefaultAzureCredential());

  const entityId = "queue-123";

  const result = await routerClient.path("/routing/queues/{queueId}", entityId).delete();

  console.log("router jobQueue: " + result);
}

deleteJobQueue().catch(console.error);
