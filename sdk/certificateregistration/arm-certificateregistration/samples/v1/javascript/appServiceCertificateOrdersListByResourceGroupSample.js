// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CertificateRegistrationManagementClient } = require("@azure/arm-certificateregistration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Get certificate orders in a resource group.
 *
 * @summary description for Get certificate orders in a resource group.
 * x-ms-original-file: 2024-11-01/ListAppServiceCertificateOrdersByResourceGroup.json
 */
async function listAppServiceCertificateOrdersByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new CertificateRegistrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.appServiceCertificateOrders.listByResourceGroup("testrg123")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAppServiceCertificateOrdersByResourceGroup();
}

main().catch(console.error);
