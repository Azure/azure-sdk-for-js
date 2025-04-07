// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary router job crud
 */
const JobRouter = require("@azure-rest/communication-job-router").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

const endpoint = process.env["COMMUNICATION_ENDPOINT"] || "";

// Update a router job
async function updateRouterJob() {
  // Create the JobRouter Client
  const routerClient = JobRouter(endpoint, new DefaultAzureCredential());

  const queueId = "queue-123";
  await routerClient.path("/routing/queues/{queueId}", queueId).patch({
    contentType: "application/merge-patch+json",
    body: {
      distributionPolicyId: "distribution-policy-123",
      name: "Main",
      labels: {},
      exceptionPolicyId: "exception-policy-123",
    },
  });

  const jobId = "router-job-123";
  const result = await routerClient.path("/routing/jobs/{jobId}", jobId).patch({
    contentType: "application/merge-patch+json",
    body: {
      channelId: "ChatChannel",
      queueId: queueId,
      channelReference: "abc",
      priority: 2,
      labels: {},
    },
  });

  console.log("router job: " + result);
}

updateRouterJob().catch(console.error);
