const JobRouter = require("../src").default;
require("dotenv").config();
const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Create an distribution policy
async function createDistributionPolicy() {
  // Create the Router Client
  const routerClient = JobRouter(connectionString);

  const id = "distribution-policy-123";
  const result = await routerClient
    .path("/routing/distributionPolicies/{distributionPolicyId}", id)
    .patch({
      contentType: "application/merge-patch+json",
      body: {
        name: "distribution-policy-123",
        mode: {
          kind: "longest-idle",
          minConcurrentOffers: 1,
          maxConcurrentOffers: 5,
          bypassSelectors: false,
        },
        offerExpiresAfterSeconds: 120,
      },
    });

  console.log("distribution policy: " + result);
}

createDistributionPolicy().catch(console.error);
