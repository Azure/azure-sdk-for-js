// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns the description for the specified WCF relay.
 *
 * @summary Returns the description for the specified WCF relay.
 * x-ms-original-file: specification/relay/resource-manager/Microsoft.Relay/stable/2017-04-01/examples/Relay/RelayGet.json
 */

import { RelayAPI } from "@azure/arm-relay";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function relayGet(): Promise<void> {
  const subscriptionId =
    process.env["RELAY_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["RELAY_RESOURCE_GROUP"] || "resourcegroup";
  const namespaceName = "example-RelayNamespace-9953";
  const relayName = "example-Relay-Wcf-1194";
  const credential = new DefaultAzureCredential();
  const client = new RelayAPI(credential, subscriptionId);
  const result = await client.wCFRelays.get(resourceGroupName, namespaceName, relayName);
  console.log(result);
}

async function main(): Promise<void> {
  await relayGet();
}

main().catch(console.error);
