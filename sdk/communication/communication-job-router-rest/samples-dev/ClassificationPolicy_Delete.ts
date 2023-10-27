// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Classification policy crud
 */
import { AzureCommunicationRoutingServiceClient } from "../src"
import JobRouter from "../src";
import { DefaultAzureCredential } from "@azure/identity";







// Delete classification policy
async function deleteClassificationPolicy(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient =
    JobRouter("https://<endpoint>", new DefaultAzureCredential());

  const policyId = "classification-policy-123";

  const result = await routerClient.path("/routing/classificationPolicies/{classificationPolicyId}", policyId).delete();

  console.log("classification policy: " + result);
}

deleteClassificationPolicy().catch(console.error);
