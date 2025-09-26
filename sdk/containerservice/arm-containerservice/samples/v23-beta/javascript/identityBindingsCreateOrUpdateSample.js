// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates an identity binding in the specified managed cluster.
 *
 * @summary Creates or updates an identity binding in the specified managed cluster.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2025-07-02-preview/examples/IdentityBindings_Create_Or_Update.json
 */
async function createOrUpdateIdentityBinding() {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "clustername1";
  const identityBindingName = "identitybinding1";
  const parameters = {
    properties: {
      managedIdentity: {
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity1",
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.identityBindings.beginCreateOrUpdateAndWait(
    resourceGroupName,
    resourceName,
    identityBindingName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createOrUpdateIdentityBinding();
}

main().catch(console.error);
