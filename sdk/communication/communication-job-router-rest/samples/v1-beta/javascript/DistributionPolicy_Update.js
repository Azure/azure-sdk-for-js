// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Distribution policy crud
 */

const JobRouter = require("@azure-rest/communication-job-router").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

const endpoint = process.env["COMMUNICATION_ENDPOINT"] || "";

// Update a distribution policy
async function updateDistributionPolicy() {
  // Create the Router Client
  const routerClient = JobRouter(endpoint, new DefaultAzureCredential());

  const id = "distribution-policy-123";
  const result = await routerClient
    .path("/routing/distributionPolicies/{distributionPolicyId}", id)
    .patch({
      contentType: "application/merge-patch+json",
      body: {
        name: "distribution-policy-123",
        mode: {
          kind: "longestIdle",
          minConcurrentOffers: 1,
          maxConcurrentOffers: 5,
          bypassSelectors: false,
        },
        offerExpiresAfterSeconds: 120,
      },
    });

  console.log("distribution policy: " + result);
}

updateDistributionPolicy().catch(console.error);
