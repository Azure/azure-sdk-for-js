const JobRouter = require("../src").default;
require("dotenv").config();
const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Get a exception policy

async function getExceptionPolicy() {
  // Create the Router Client
  const routerClient = JobRouter(connectionString);

  const policyId = "exception-policy-123";

  const result = await routerClient
    .path("/routing/exceptionPolicies/{exceptionPolicyId}", policyId)
    .get();

  console.log("exception policy: " + result);
}

getExceptionPolicy().catch(console.error);
