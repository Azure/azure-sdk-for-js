// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Distribution policy crud
 */

const JobRouter = require("@azure-rest/communication-job-router").default;
require("dotenv").config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Delete distribution policy
async function deleteDistributionPolicy() {
  // Create the Router Client
  const routerClient = JobRouter(connectionString);

  const policyId = "distribution-policy-123";

  const result = await routerClient
    .path("/routing/distributionPolicies/{distributionPolicyId}", policyId)
    .delete();

  console.log("distribution policy: " + result);
}

deleteDistributionPolicy().catch(console.error);
