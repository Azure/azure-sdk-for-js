// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CertificateRegistrationManagementClient } = require("@azure/arm-certificateregistration");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Description for Implements Csm operations Api to exposes the list of available Csm Apis under the resource provider
 *
 * @summary Description for Implements Csm operations Api to exposes the list of available Csm Apis under the resource provider
 * x-ms-original-file: specification/certificateregistration/resource-manager/Microsoft.CertificateRegistration/CertificateRegistration/stable/2024-11-01/examples/ListOperations.json
 */
async function listOperations() {
  const credential = new DefaultAzureCredential();
  const client = new CertificateRegistrationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.certificateRegistrationProvider.listOperations()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listOperations();
}

main().catch(console.error);
