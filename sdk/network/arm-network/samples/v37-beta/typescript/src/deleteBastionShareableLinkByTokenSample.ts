// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the Bastion Shareable Links for all the tokens specified in the request.
 *
 * @summary deletes the Bastion Shareable Links for all the tokens specified in the request.
 * x-ms-original-file: 2025-05-01/BastionShareableLinkDeleteByToken.json
 */
async function deleteBastionShareableLinksForTheRequestVMs(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.deleteBastionShareableLinkByToken("rg1", "bastionhosttenant", {
    tokens: ["abcd1234-efgh-hijk-5678-abcdefgh1234", "dcba4321-hgfe-kjih-8765-hgfedcba4321"],
  });
}

async function main(): Promise<void> {
  await deleteBastionShareableLinksForTheRequestVMs();
}

main().catch(console.error);
