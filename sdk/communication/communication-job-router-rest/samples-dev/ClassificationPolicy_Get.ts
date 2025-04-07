// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Classification policy crud
 */
import type { AzureCommunicationRoutingServiceClient } from "@azure-rest/communication-job-router";
import JobRouter from "@azure-rest/communication-job-router";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const endpoint = process.env["COMMUNICATION_ENDPOINT"] || "";

// Get a classification policy

async function getClassificationPolicy(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient = JobRouter(
    endpoint,
    new DefaultAzureCredential(),
  );

  const policyId = "classification-policy-123";

  const result = await routerClient
    .path("/routing/classificationPolicies/{classificationPolicyId}", policyId)
    .get();

  console.log("classification policy: " + result);
}

getClassificationPolicy().catch(console.error);
