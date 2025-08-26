// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a trusted access role binding.
 *
 * @summary Get a trusted access role binding.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2025-05-02-preview/examples/TrustedAccessRoleBindings_Get.json
 */

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getATrustedAccessRoleBinding(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "clustername1";
  const trustedAccessRoleBindingName = "binding1";
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.trustedAccessRoleBindings.get(
    resourceGroupName,
    resourceName,
    trustedAccessRoleBindingName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getATrustedAccessRoleBinding();
}

main().catch(console.error);
