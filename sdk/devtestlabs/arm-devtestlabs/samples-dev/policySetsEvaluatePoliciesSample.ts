// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Evaluates lab policy.
 *
 * @summary Evaluates lab policy.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/PolicySets_EvaluatePolicies.json
 */

import type { EvaluatePoliciesRequest } from "@azure/arm-devtestlabs";
import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

async function policySetsEvaluatePolicies(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const name = "{policySetName}";
  const evaluatePoliciesRequest: EvaluatePoliciesRequest = {
    policies: [{ factName: "LabVmCount", valueOffset: "1" }],
  };
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.policySets.evaluatePolicies(
    resourceGroupName,
    labName,
    name,
    evaluatePoliciesRequest,
  );
  console.log(result);
}

policySetsEvaluatePolicies().catch(console.error);
