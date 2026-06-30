// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { InformaticaDataManagement } = require("@azure/arm-informaticadatamanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list InformaticaServerlessRuntimeResource resources by InformaticaOrganizationResource
 *
 * @summary list InformaticaServerlessRuntimeResource resources by InformaticaOrganizationResource
 * x-ms-original-file: 2025-11-27/ServerlessRuntimes_ListByInformaticaOrganizationResource_MaximumSet_Gen.json
 */
async function serverlessRuntimesListByInformaticaOrganizationResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new InformaticaDataManagement(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.serverlessRuntimes.listByInformaticaOrganizationResource(
    "rg-example",
    "myOrganization",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await serverlessRuntimesListByInformaticaOrganizationResource();
}

main().catch(console.error);
