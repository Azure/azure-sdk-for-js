// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceLinkerManagementClient } = require("@azure/arm-servicelinker");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to validate a Linker.
 *
 * @summary validate a Linker.
 * x-ms-original-file: 2024-07-01-preview/ValidateLinkerSuccess.json
 */
async function validateLinkerSuccess() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new ServiceLinkerManagementClient(credential, subscriptionId);
  const result = await client.linker.validate(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.Web/sites/test-app",
    "linkName",
  );
  console.log(result);
}

async function main() {
  await validateLinkerSuccess();
}

main().catch(console.error);
