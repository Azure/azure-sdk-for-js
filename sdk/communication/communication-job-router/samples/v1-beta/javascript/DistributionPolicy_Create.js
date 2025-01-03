// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Distribution policy crud
 */
// Load the .env file (you will need to set these environment variables)
const dotenv = require("dotenv");
const { JobRouterAdministrationClient } = require("@azure/communication-job-router");
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Create an distribution policy
async function createDistributionPolicy() {
  // Create the Router Client
  const routerAdministrationClient = new JobRouterAdministrationClient(connectionString);

  const id = "distribution-policy-123";
  const distributionPolicyRequest = {
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

  const result = await routerAdministrationClient.createDistributionPolicy(id, request);

  console.log("distribution policy: " + result);
}

createDistributionPolicy().catch(console.error);
