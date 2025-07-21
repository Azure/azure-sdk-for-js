// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkClient } = require("@azure/arm-dns");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the DNS records specified by the referencing targetResourceIds.
 *
 * @summary returns the DNS records specified by the referencing targetResourceIds.
 * x-ms-original-file: 2023-07-01-preview/GetDnsResourceReference.json
 */
async function getDNSResourceReference() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.dnsResourceReference.getByTargetResources({
    properties: {
      targetResources: [
        {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/trafficManagerProfiles/testpp2",
        },
      ],
    },
  });
  console.log(result);
}

async function main() {
  await getDNSResourceReference();
}

main().catch(console.error);
