// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RelayAPI } from "@azure/arm-relay";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get authorizationRule for a WCF relay by name.
 *
 * @summary get authorizationRule for a WCF relay by name.
 * x-ms-original-file: 2024-01-01/Relay/RelayAuthorizationRuleGet.json
 */
async function relayAuthorizationRuleGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  const result = await client.wcfRelays.getAuthorizationRule(
    "resourcegroup",
    "example-RelayNamespace-01",
    "example-Relay-wcf-01",
    "example-RelayAuthRules-01",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await relayAuthorizationRuleGet();
}

main().catch(console.error);
