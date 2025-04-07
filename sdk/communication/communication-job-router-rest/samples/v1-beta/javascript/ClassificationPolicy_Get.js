// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Classification policy crud
 */
const JobRouter = require("@azure-rest/communication-job-router").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

const endpoint = process.env["COMMUNICATION_ENDPOINT"] || "";

// Get a classification policy

async function getClassificationPolicy() {
  // Create the Router Client
  const routerClient = JobRouter(endpoint, new DefaultAzureCredential());

  const policyId = "classification-policy-123";

  const result = await routerClient
    .path("/routing/classificationPolicies/{classificationPolicyId}", policyId)
    .get();

  console.log("classification policy: " + result);
}

getClassificationPolicy().catch(console.error);
