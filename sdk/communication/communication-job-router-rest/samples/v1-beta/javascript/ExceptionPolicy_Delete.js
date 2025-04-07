// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Exception policy crud
 */
const JobRouter = require("@azure-rest/communication-job-router").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

const endpoint = process.env["COMMUNICATION_ENDPOINT"] || "";

// Delete exception policy
async function deleteExceptionPolicy() {
  // Create the Router Client
  const routerClient = JobRouter(endpoint, new DefaultAzureCredential());

  const policyId = "exception-policy-123";

  const result = await routerClient
    .path("/routing/exceptionPolicies/{exceptionPolicyId}", policyId)
    .delete();

  console.log("exception policy: " + result);
}

deleteExceptionPolicy().catch(console.error);
