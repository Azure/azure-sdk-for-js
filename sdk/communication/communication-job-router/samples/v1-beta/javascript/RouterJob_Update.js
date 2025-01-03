// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary router job crud
 */
const {
  JobRouterAdministrationClient,
  JobRouterClient,
} = require("@azure/communication-job-router");

// Load the .env file (you will need to set these environment variables)
require("dotenv").config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Update a router job
async function updateRouterJob() {
  // Create the JobRouter Client
  const jobRouterClient = new JobRouterClient(connectionString);
  const jobRouterAdministrationClient = new JobRouterAdministrationClient(connectionString);

  const queueId = "queue-2";
  const createOptions = {
    distributionPolicyId: "distribution-policy-123",
    name: "Main",
    labels: {},
  };
  await jobRouterAdministrationClient.createQueue(queueId, createOptions);

  const jobId = "router-job-123";
  const updateOptions = {
    channelId: "general",
    queueId: queueId,
    labels: {},
  };

  const result = await jobRouterClient.updateJob(jobId, updateOptions);

  console.log("router job: " + result);
}

updateRouterJob().catch(console.error);
