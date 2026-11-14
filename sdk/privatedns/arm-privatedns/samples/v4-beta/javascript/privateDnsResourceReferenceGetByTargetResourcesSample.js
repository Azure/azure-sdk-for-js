// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PrivateDnsManagementClient } = require("@azure/arm-privatedns");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the private DNS zone records specified by the referencing targetResourceIds.
 *
 * @summary returns the private DNS zone records specified by the referencing targetResourceIds.
 * x-ms-original-file: 2026-06-01-preview/GetPrivateDnsResourceReference.json
 */
async function getPrivateDNSResourceReference() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new PrivateDnsManagementClient(credential, subscriptionId);
  const result = await client.privateDnsResourceReference.getByTargetResources({
    targetResources: [
      {
        id: "/subscriptions/subscriptionId/resourceGroups/resourceGroup1/providers/Microsoft.Network/privateTrafficManagerProfiles/ptm-profile1",
      },
    ],
  });
  console.log(result);
}

async function main() {
  await getPrivateDNSResourceReference();
}

main().catch(console.error);
