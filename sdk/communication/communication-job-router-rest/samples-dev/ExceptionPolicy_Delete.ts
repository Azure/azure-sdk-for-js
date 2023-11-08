// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Exception policy crud
 */
import { AzureCommunicationRoutingServiceClient } from "../src"
import JobRouter from "../src"; import { DefaultAzureCredential } from "@azure/identity";







// Delete exception policy
async function deleteExceptionPolicy(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient =
    JobRouter("https://<endpoint>", new DefaultAzureCredential());

  const policyId = "exception-policy-123";

  const result = await routerClient.path("/routing/exceptionPolicies/{exceptionPolicyId}", policyId).delete();

  console.log("exception policy: " + result);
}

deleteExceptionPolicy().catch(console.error);
