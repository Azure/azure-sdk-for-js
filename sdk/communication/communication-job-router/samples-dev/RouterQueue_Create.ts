// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary job queue crud
 */
import {
  RouterQueue,
  DistributionPolicy,
  JobRouterAdministrationClient,
} from "@azure/communication-job-router";

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Create a router jobQueue
async function createJobQueue(): Promise<void> {
  // Create the Router Client
  const routerAdministrationClient: JobRouterAdministrationClient =
    new JobRouterAdministrationClient(connectionString);

  const distributionPolicyId = "distribution-policy-123";
  const distributionPolicyRequest: DistributionPolicy = {
    name: "distribution-policy-123",
    mode: {
      kind: "longest-idle",
      minConcurrentOffers: 1,
      maxConcurrentOffers: 1,
      bypassSelectors: false,
    },
    offerExpiresAfterSeconds: 15,
  };
  await routerAdministrationClient.createDistributionPolicy(
    distributionPolicyId,
    distributionPolicyRequest
  );

  const queueId = "queue-123";
  const request: RouterQueue = {
    id: "queue-123",
    distributionPolicyId: distributionPolicyId,
    name: "Main",
  };

  const result = await routerAdministrationClient.createQueue(queueId, request);

  console.log("router jobQueue: " + result);
}

createJobQueue().catch(console.error);
