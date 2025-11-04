// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RelayAPI } from "@azure/arm-relay";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a WCF relay. This operation is idempotent.
 *
 * @summary creates or updates a WCF relay. This operation is idempotent.
 * x-ms-original-file: 2024-01-01/Relay/RelayCreate.json
 */
async function relayCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  const result = await client.wcfRelays.createOrUpdate(
    "resourcegroup",
    "example-RelayNamespace-9953",
    "example-Relay-Wcf-1194",
    {
      properties: {
        relayType: "NetTcp",
        requiresClientAuthorization: true,
        requiresTransportSecurity: true,
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await relayCreate();
}

main().catch(console.error);
