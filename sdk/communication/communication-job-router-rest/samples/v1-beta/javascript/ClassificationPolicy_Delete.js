// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Classification policy crud
 */
const JobRouter = require("@azure-rest/communication-job-router").default;
require("dotenv").config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Delete classification policy
async function deleteClassificationPolicy() {
  // Create the Router Client
  const routerClient = JobRouter(connectionString);

  const policyId = "classification-policy-123";

  const result = await routerClient
    .path("/routing/classificationPolicies/{classificationPolicyId}", policyId)
    .delete();

  console.log("classification policy: " + result);
}

deleteClassificationPolicy().catch(console.error);
