// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KeyVaultManagementClient } = require("@azure/arm-keyvault");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Update access policies in a key vault in the specified subscription.
 *
 * @summary Update access policies in a key vault in the specified subscription.
 * x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2025-05-01/examples/updateAccessPoliciesAdd.json
 */
async function addAnAccessPolicyOrUpdateAnAccessPolicyWithNewPermissions() {
  const subscriptionId =
    process.env["KEYVAULT_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["KEYVAULT_RESOURCE_GROUP"] || "sample-group";
  const vaultName = "sample-vault";
  const operationKind = "add";
  const parameters = {
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

async function main() {
  await addAnAccessPolicyOrUpdateAnAccessPolicyWithNewPermissions();
}

main().catch(console.error);
