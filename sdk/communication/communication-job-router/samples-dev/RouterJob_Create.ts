// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary router job crud
 */
import { DistributionPolicy, RouterJob, JobQueue, RouterAdministrationClient, RouterClient } from "@azure/communication-job-router";

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";


// Create a router job
async function createRouterJob(): Promise<void> {
  // Create the Router Client
  const routerClient: RouterClient = new RouterClient(connectionString);
  const routerAdministrationClient: RouterAdministrationClient = new RouterAdministrationClient(connectionString);

  const distributionPolicyId = "distribution-policy-123"
  const distributionPolicyRequest: DistributionPolicy = {
    name: "distribution-policy-123",
    mode: {
      kind: "longest-idle",
      minConcurrentOffers: 1,
      maxConcurrentOffers: 1,
      bypassSelectors: false
    },
    offerTtlInSeconds: 15
  };
  await routerAdministrationClient.createDistributionPolicy(distributionPolicyId, distributionPolicyRequest);

  const queueId = "queue-123";
  const queueRequest: JobQueue = {
    id: "queue-123",
    distributionPolicyId: distributionPolicyId,
    name: "Main",
    labels: {}
  };
  await routerAdministrationClient.createQueue(queueId, queueRequest);

  const jobId = "router-job-123";
  const request: RouterJob = {
    id: "router-job-123",
    channelId: "ChatChannel",
    queueId: queueRequest.id,
    labels: {}
  };

  const result = await routerClient.createJob(jobId, request);

  console.log("router job: " + result);

};

createRouterJob().catch(console.error);
