// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RelayAPI } from "@azure/arm-relay";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to regenerates the primary or secondary connection strings to the WCF relay.
 *
 * @summary regenerates the primary or secondary connection strings to the WCF relay.
 * x-ms-original-file: 2024-01-01/Relay/RelayAuthorizationRuleRegenerateKey.json
 */
async function relayAuthorizationRuleRegenerateKeyJson(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  const result = await client.wcfRelays.regenerateKeys(
    "resourcegroup",
    "example-RelayNamespace-01",
    "example-Relay-wcf-01",
    "example-RelayAuthRules-01",
    { keyType: "PrimaryKey" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await relayAuthorizationRuleRegenerateKeyJson();
}

main().catch(console.error);
