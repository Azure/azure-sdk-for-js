// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NspAssociation} from "@azure/arm-network";
import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a NSP resource association.
 *
 * @summary Creates or updates a NSP resource association.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NspAssociationPut.json
 */
async function nspAssociationPut(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subId";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkSecurityPerimeterName = "nsp1";
  const associationName = "association1";
  const parameters: NspAssociation = {
    accessMode: "Enforced",
    privateLinkResource: {
      id: "/subscriptions/{paasSubscriptionId}/resourceGroups/{paasResourceGroupName}/providers/{providerName}/{resourceType}/{resourceName}",
    },
    profile: {
      id: "/subscriptions/subId/resourceGroups/rg1/providers/Microsoft.Network/networkSecurityPerimeters/nsp1/profiles/{profileName}",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.networkSecurityPerimeterAssociations.beginCreateOrUpdateAndWait(
      resourceGroupName,
      networkSecurityPerimeterName,
      associationName,
      parameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await nspAssociationPut();
}

main().catch(console.error);
