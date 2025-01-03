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

// Update a distribution policy
async function updateDistributionPolicy() {
  // Create the Router Client
  const routerAdministrationClient = new JobRouterAdministrationClient(connectionString);

  const distributionPolicyRequest = {
    id: "distribution-policy-123",
    mode: {
      kind: "longest-idle",
      minConcurrentOffers: 1,
      maxConcurrentOffers: 1,
      bypassSelectors: false,
    },
    offerExpiresAfterSeconds: 15,
  };

  const request = distributionPolicyRequest;

  const result = await routerAdministrationClient.updateDistributionPolicy(request.id, request);

  console.log("distribution policy: " + result);
}

updateDistributionPolicy().catch(console.error);
