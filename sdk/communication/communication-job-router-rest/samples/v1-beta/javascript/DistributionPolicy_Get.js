const JobRouter = require("../src").default;
require("dotenv").config();
const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Get a distribution policy

async function getDistributionPolicy() {
  // Create the Router Client
  const routerClient = JobRouter(connectionString);

  const policyId = "distribution-policy-123";

  const result = await routerClient
    .path("/routing/distributionPolicies/{distributionPolicyId}", policyId)
    .get();

  console.log("distribution policy: " + result);
}

getDistributionPolicy().catch(console.error);
