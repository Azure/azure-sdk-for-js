// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to This operation retrieves the policy definition version in the given subscription with the given name.
 *
 * @summary This operation retrieves the policy definition version in the given subscription with the given name.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2024-05-01/examples/getPolicyDefinitionVersion.json
 */

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function retrieveAPolicyDefinitionVersion(): Promise<void> {
  const subscriptionId =
    process.env["POLICY_SUBSCRIPTION_ID"] ||
    "ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
  const policyDefinitionName = "ResourceNaming";
  const policyDefinitionVersion = "1.2.1";
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential, subscriptionId);
  const result = await client.policyDefinitionVersions.get(
    policyDefinitionName,
    policyDefinitionVersion,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveAPolicyDefinitionVersion();
}

main().catch(console.error);
