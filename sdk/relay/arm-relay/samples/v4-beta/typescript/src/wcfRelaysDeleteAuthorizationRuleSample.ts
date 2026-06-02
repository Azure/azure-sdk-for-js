// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RelayAPI } from "@azure/arm-relay";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a WCF relay authorization rule.
 *
 * @summary deletes a WCF relay authorization rule.
 * x-ms-original-file: 2024-01-01/Relay/RelayAuthorizationRuleDelete.json
 */
async function relayAuthorizationRuleDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  await client.wcfRelays.deleteAuthorizationRule(
    "resourcegroup",
    "example-RelayNamespace-01",
    "example-Relay-wcf-01",
    "example-RelayAuthRules-01",
  );
}

async function main(): Promise<void> {
  await relayAuthorizationRuleDelete();
}

main().catch(console.error);
