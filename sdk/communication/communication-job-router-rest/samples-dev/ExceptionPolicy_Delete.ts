// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Exception policy crud
 */
import type { AzureCommunicationRoutingServiceClient } from "@azure-rest/communication-job-router";
import JobRouter from "@azure-rest/communication-job-router";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const endpoint = process.env["COMMUNICATION_ENDPOINT"] || "";

// Delete exception policy
async function deleteExceptionPolicy(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient = JobRouter(
    endpoint,
    new DefaultAzureCredential(),
  );

  const policyId = "exception-policy-123";

  const result = await routerClient
    .path("/routing/exceptionPolicies/{exceptionPolicyId}", policyId)
    .delete();

  console.log("exception policy: " + result);
}

deleteExceptionPolicy().catch(console.error);
