const JobRouter = require("../src").default;
require("dotenv").config();
const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Get a classification policy

async function getClassificationPolicy() {
  // Create the Router Client
  const routerClient = JobRouter(connectionString);

  const policyId = "classification-policy-123";

  const result = await routerClient
    .path("/routing/classificationPolicies/{classificationPolicyId}", policyId)
    .get();

  console.log("classification policy: " + result);
}

void getClassificationPolicy();
