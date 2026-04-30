// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DomainRegistrationManagementClient } = require("@azure/arm-domainregistration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Implements Csm operations Api to exposes the list of available Csm Apis under the resource provider
 *
 * @summary description for Implements Csm operations Api to exposes the list of available Csm Apis under the resource provider
 * x-ms-original-file: 2024-11-01/ListOperations.json
 */
async function listOperations() {
  const credential = new DefaultAzureCredential();
  const client = new DomainRegistrationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.domainRegistrationProvider.listOperations()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listOperations();
}

main().catch(console.error);
