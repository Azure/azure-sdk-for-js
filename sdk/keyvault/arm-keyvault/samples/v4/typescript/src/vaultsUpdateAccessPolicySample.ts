// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultManagementClient } from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update access policies in a key vault in the specified subscription.
 *
 * @summary update access policies in a key vault in the specified subscription.
 * x-ms-original-file: 2025-05-01/updateAccessPoliciesAdd.json
 */
async function addAnAccessPolicyOrUpdateAnAccessPolicyWithNewPermissions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.vaults.updateAccessPolicy("sample-group", "sample-vault", "add", {
    properties: {
      accessPolicies: [
        {
          objectId: "00000000-0000-0000-0000-000000000000",
          permissions: {
            certificates: ["get"],
            keys: ["encrypt"],
            secrets: ["get"],
          },
          tenantId: "00000000-0000-0000-0000-000000000000",
        },
      ],
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await addAnAccessPolicyOrUpdateAnAccessPolicyWithNewPermissions();
}

main().catch(console.error);
