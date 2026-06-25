// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RelayAPI } from "@azure/arm-relay";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a namespace authorization rule.
 *
 * @summary deletes a namespace authorization rule.
 * x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceAuthorizationRuleDelete.json
 */
async function relayNameSpaceAuthorizationRuleDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  await client.namespaces.deleteAuthorizationRule(
    "resourcegroup",
    "example-RelayNamespace-01",
    "example-RelayAuthRules-01",
  );
}

async function main(): Promise<void> {
  await relayNameSpaceAuthorizationRuleDelete();
}

main().catch(console.error);
