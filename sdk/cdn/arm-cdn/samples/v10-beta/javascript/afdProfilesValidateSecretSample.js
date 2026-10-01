// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to validate a Secret in the profile.
 *
 * @summary validate a Secret in the profile.
 * x-ms-original-file: 2025-12-01/AFDProfiles_ValidateSecret.json
 */
async function validateSecret() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.afdProfiles.validateSecret("RG", "profile1", {
    secretSource: {
      id: "/subscriptions/subid/resourcegroups/RG/providers/Microsoft.KeyVault/vault/kvName/certificate/certName",
    },
    secretType: "CustomerCertificate",
  });
  console.log(result);
}

async function main() {
  await validateSecret();
}

main().catch(console.error);
