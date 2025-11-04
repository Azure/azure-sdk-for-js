// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RelayAPI } from "@azure/arm-relay";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to authorization rules for a WCF relay.
 *
 * @summary authorization rules for a WCF relay.
 * x-ms-original-file: 2024-01-01/Relay/RelayAuthorizationRuleListAll.json
 */
async function relayAuthorizationRuleListAll(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.wcfRelays.listAuthorizationRules(
    "resourcegroup",
    "example-RelayNamespace-01",
    "example-Relay-Wcf-01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await relayAuthorizationRuleListAll();
}

main().catch(console.error);
