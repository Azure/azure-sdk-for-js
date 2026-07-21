// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DomainServicesResourceProvider } = require("@azure/arm-domainservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get OuContainer in DomainService instance.
 *
 * @summary get OuContainer in DomainService instance.
 * x-ms-original-file: 2025-10-01-preview/GetOuContainer.json
 */
async function getOuContainer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1639790a-76a2-4ac4-98d9-8562f5dfcb4d";
  const client = new DomainServicesResourceProvider(credential, subscriptionId);
  const result = await client.ouContainerOperationGrp.get(
    "OuContainerResourceGroup",
    "OuContainer.com",
    "OuContainer1",
  );
  console.log(result);
}

async function main() {
  await getOuContainer();
}

main().catch(console.error);
