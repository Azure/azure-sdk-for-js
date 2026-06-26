// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { InformaticaDataManagement } = require("@azure/arm-informaticadatamanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a InformaticaServerlessRuntimeResource
 *
 * @summary get a InformaticaServerlessRuntimeResource
 * x-ms-original-file: 2025-11-27/ServerlessRuntimes_Get_MaximumSet_Gen.json
 */
async function serverlessRuntimesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new InformaticaDataManagement(credential, subscriptionId);
  const result = await client.serverlessRuntimes.get(
    "rg-example",
    "myOrganization",
    "myServerlessRuntime",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a InformaticaServerlessRuntimeResource
 *
 * @summary get a InformaticaServerlessRuntimeResource
 * x-ms-original-file: 2025-11-27/ServerlessRuntimes_Get_MinimumSet_Gen.json
 */
async function serverlessRuntimesGetMin() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new InformaticaDataManagement(credential, subscriptionId);
  const result = await client.serverlessRuntimes.get(
    "rg-example",
    "myOrganization",
    "myServerlessRuntime",
  );
  console.log(result);
}

async function main() {
  await serverlessRuntimesGet();
  await serverlessRuntimesGetMin();
}

main().catch(console.error);
