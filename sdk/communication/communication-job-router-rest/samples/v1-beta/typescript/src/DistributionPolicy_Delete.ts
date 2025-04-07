// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Distribution policy crud
 */

import type { AzureCommunicationRoutingServiceClient } from "@azure-rest/communication-job-router";
import JobRouter from "@azure-rest/communication-job-router";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const endpoint = process.env["COMMUNICATION_ENDPOINT"] || "";

// Delete distribution policy
async function deleteDistributionPolicy(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient = JobRouter(
    endpoint,
    new DefaultAzureCredential(),
  );

  const policyId = "distribution-policy-123";

  const result = await routerClient
    .path("/routing/distributionPolicies/{distributionPolicyId}", policyId)
    .delete();

  console.log("distribution policy: " + result);
}

deleteDistributionPolicy().catch(console.error);
