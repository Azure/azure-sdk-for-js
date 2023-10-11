// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Distribution policy crud
 */
// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
import { DistributionPolicy, JobrouterClient } from "@azure/communication-job-router";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Create an distribution policy
async function createDistributionPolicy(): Promise<void> {
  // Create the Router Client
  const routerClient: JobrouterClient =
    new JobrouterClient(connectionString);

  const id = "distribution-policy-123";
  const distributionPolicyRequest: DistributionPolicy = {
    name: "distribution-policy-123",
    mode: {
      kind: "longest-idle",
      minConcurrentOffers: 1,
      maxConcurrentOffers: 5,
      bypassSelectors: false,
    },
    offerExpiresAfterSeconds: 120,
  };

  const request = distributionPolicyRequest;

  const result = await routerClient.createDistributionPolicy(id, request);

  console.log("distribution policy: " + result);
}

createDistributionPolicy().catch(console.error);
