// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RelayAPI } from "@azure/arm-relay";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update NetworkRuleSet for a Namespace.
 *
 * @summary create or update NetworkRuleSet for a Namespace.
 * x-ms-original-file: 2024-01-01/VirtualNetworkRules/RelayNetworkRuleSetCreate.json
 */
async function nameSpaceNetworkRuleSetCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "Subscription";
  const client = new RelayAPI(credential, subscriptionId);
  const result = await client.namespaces.createOrUpdateNetworkRuleSet(
    "ResourceGroup",
    "example-RelayNamespace-6019",
    {
      properties: {
        defaultAction: "Deny",
        ipRules: [
          { action: "Allow", ipMask: "1.1.1.1" },
          { action: "Allow", ipMask: "1.1.1.2" },
          { action: "Allow", ipMask: "1.1.1.3" },
          { action: "Allow", ipMask: "1.1.1.4" },
          { action: "Allow", ipMask: "1.1.1.5" },
        ],
        trustedServiceAccessEnabled: false,
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await nameSpaceNetworkRuleSetCreate();
}

main().catch(console.error);
