// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { InformaticaDataManagement } = require("@azure/arm-informaticadatamanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list InformaticaOrganizationResource resources by resource group
 *
 * @summary list InformaticaOrganizationResource resources by resource group
 * x-ms-original-file: 2025-11-27/Organizations_ListByResourceGroup_MaximumSet_Gen.json
 */
async function organizationsListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new InformaticaDataManagement(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.organizations.listByResourceGroup("rg-example")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list InformaticaOrganizationResource resources by resource group
 *
 * @summary list InformaticaOrganizationResource resources by resource group
 * x-ms-original-file: 2025-11-27/Organizations_ListByResourceGroup_MinimumSet_Gen.json
 */
async function organizationsListByResourceGroupMin() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new InformaticaDataManagement(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.organizations.listByResourceGroup("rg-example")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await organizationsListByResourceGroup();
  await organizationsListByResourceGroupMin();
}

main().catch(console.error);
