// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Distribution policy crud
 */

const JobRouter = require("@azure-rest/communication-job-router").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

const endpoint = process.env["COMMUNICATION_ENDPOINT"] || "";

// Get a distribution policy

async function getDistributionPolicy() {
  // Create the Router Client
  const routerClient = JobRouter(endpoint, new DefaultAzureCredential());

  const policyId = "distribution-policy-123";

  const result = await routerClient
    .path("/routing/distributionPolicies/{distributionPolicyId}", policyId)
    .get();

  console.log("distribution policy: " + result);
}

getDistributionPolicy().catch(console.error);
