// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Classification policy crud
 */
import { AzureCommunicationRoutingServiceClient } from "../src"
import JobRouter from "../src"; import { DefaultAzureCredential } from "@azure/identity";







// Get a classification policy

async function getClassificationPolicy(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient =
    JobRouter("https://<endpoint>", new DefaultAzureCredential());

  const policyId = "classification-policy-123";

  const result = await routerClient.path("/routing/classificationPolicies/{classificationPolicyId}", policyId).get();

  console.log("classification policy: " + result);
}

void getClassificationPolicy();
