// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Classification policy crud
 */
import type { AzureCommunicationRoutingServiceClient } from "@azure-rest/communication-job-router";
import JobRouter from "@azure-rest/communication-job-router";
import "dotenv/config";

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Get a classification policy

async function getClassificationPolicy(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient = JobRouter(connectionString);

  const policyId = "classification-policy-123";

  const result = await routerClient
    .path("/routing/classificationPolicies/{classificationPolicyId}", policyId)
    .get();

  console.log("classification policy: " + result);
}

getClassificationPolicy().catch(console.error);
