// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Delete a trusted access role binding.
 *
 * @summary Delete a trusted access role binding.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/stable/2025-10-01/examples/TrustedAccessRoleBindings_Delete.json
 */
async function deleteATrustedAccessRoleBinding() {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "clustername1";
  const trustedAccessRoleBindingName = "binding1";
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.trustedAccessRoleBindings.beginDeleteAndWait(
    resourceGroupName,
    resourceName,
    trustedAccessRoleBindingName,
  );
  console.log(result);
}

async function main() {
  await deleteATrustedAccessRoleBinding();
}

main().catch(console.error);
