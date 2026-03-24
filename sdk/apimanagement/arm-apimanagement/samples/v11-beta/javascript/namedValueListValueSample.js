// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the secret of the named value specified by its identifier.
 *
 * @summary gets the secret of the named value specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementNamedValueListValue.json
 */
async function apiManagementNamedValueListValue() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.namedValue.listValue(
    "rg1",
    "apimService1",
    "testarmTemplateproperties2",
  );
  console.log(result);
}

async function main() {
  await apiManagementNamedValueListValue();
}

main().catch(console.error);
