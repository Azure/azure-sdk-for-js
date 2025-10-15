// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Updates tags on a managed namespace.
 *
 * @summary Updates tags on a managed namespace.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2025-07-02-preview/examples/ManagedNamespacesUpdateTags.json
 */
async function updateManagedNamespaceTags() {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "clustername1";
  const managedNamespaceName = "namespace1";
  const parameters = {
    tags: { tagKey1: "tagValue1", tagKey2: "tagValue2" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.managedNamespaces.update(
    resourceGroupName,
    resourceName,
    managedNamespaceName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await updateManagedNamespaceTags();
}

main().catch(console.error);
