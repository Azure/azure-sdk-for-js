// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { InformaticaDataManagement } = require("@azure/arm-informaticadatamanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a InformaticaServerlessRuntimeResource
 *
 * @summary delete a InformaticaServerlessRuntimeResource
 * x-ms-original-file: 2025-11-27/ServerlessRuntimes_Delete_MaximumSet_Gen.json
 */
async function serverlessRuntimesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new InformaticaDataManagement(credential, subscriptionId);
  await client.serverlessRuntimes.delete("rg-example", "myOrganization", "myServerlessRuntime");
}

async function main() {
  await serverlessRuntimesDelete();
}

main().catch(console.error);
