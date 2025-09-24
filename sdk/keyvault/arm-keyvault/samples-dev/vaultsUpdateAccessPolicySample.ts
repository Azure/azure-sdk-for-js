// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update access policies in a key vault in the specified subscription.
 *
 * @summary Update access policies in a key vault in the specified subscription.
 * x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2024-11-01/examples/updateAccessPoliciesAdd.json
 */

import {
  VaultAccessPolicyParameters,
  KeyVaultManagementClient,
} from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function addAnAccessPolicyOrUpdateAnAccessPolicyWithNewPermissions(): Promise<void> {
  const subscriptionId =
    process.env["KEYVAULT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["KEYVAULT_RESOURCE_GROUP"] || "sample-group";
  const vaultName = "sample-vault";
  const operationKind = "add";
  const parameters: VaultAccessPolicyParameters = {
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
  };
  const credential = new DefaultAzureCredential();
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.vaults.updateAccessPolicy(
    resourceGroupName,
    vaultName,
    operationKind,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await addAnAccessPolicyOrUpdateAnAccessPolicyWithNewPermissions();
}

main().catch(console.error);
