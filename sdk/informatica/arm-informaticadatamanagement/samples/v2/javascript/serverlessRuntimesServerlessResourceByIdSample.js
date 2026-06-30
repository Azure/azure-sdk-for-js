// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { InformaticaDataManagement } = require("@azure/arm-informaticadatamanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns a serverless runtime resource by ID
 *
 * @summary returns a serverless runtime resource by ID
 * x-ms-original-file: 2025-11-27/ServerlessRuntimes_ServerlessResourceById_MaximumSet_Gen.json
 */
async function serverlessRuntimesServerlessResourceById() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new InformaticaDataManagement(credential, subscriptionId);
  const result = await client.serverlessRuntimes.serverlessResourceById(
    "rg-example",
    "myOrganization",
    "myServerlessRuntime",
  );
  console.log(result);
}

async function main() {
  await serverlessRuntimesServerlessResourceById();
}

main().catch(console.error);
