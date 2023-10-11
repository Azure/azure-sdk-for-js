// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary job queue crud
 */
import {
  RouterQueue,
  DistributionPolicy,
  AzureCommunicationRoutingServiceClient,
} from "../src";

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Create a router jobQueue
async function createJobQueue(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient =
    createClient(connectionString);

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
  await routerClient.createDistributionPolicy(
    distributionPolicyId,
    distributionPolicyRequest
  );

  const queueId = "queue-123";
  const request: RouterQueue = {
    id: "queue-123",
    distributionPolicyId: distributionPolicyId,
    name: "Main",
  };

  const result = await routerClient.createQueue(queueId, request);

  console.log("router jobQueue: " + result);
}

createJobQueue().catch(console.error);
