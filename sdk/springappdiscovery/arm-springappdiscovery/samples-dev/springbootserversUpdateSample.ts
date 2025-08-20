// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update springbootservers resource.
 *
 * @summary Update springbootservers resource.
 * x-ms-original-file: specification/offazurespringboot/resource-manager/Microsoft.OffAzureSpringBoot/preview/2023-01-01-preview/examples/springbootservers_Update_MaximumSet_Gen.json
 */

import type { SpringbootserversPatch } from "@azure/arm-springappdiscovery";
import { SpringAppDiscoveryManagementClient } from "@azure/arm-springappdiscovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function springbootserversUpdateMaximumSetGen(): Promise<void> {
  const subscriptionId = process.env["SPRINGAPPDISCOVERY_SUBSCRIPTION_ID"] || "etmdxomjncqvygm";
  const resourceGroupName =
    process.env["SPRINGAPPDISCOVERY_RESOURCE_GROUP"] || "rgspringbootservers";
  const siteName = "hlkrzldhyobavtabgpubtjbhlslnjmsvkthwcfboriwyxndacjypzbj";
  const springbootserversName = "zkarbqnwnxeozvjrkpdqmgnwedwgtwcmmyqwaijkn";
  const springbootservers: SpringbootserversPatch = {};
  const credential = new DefaultAzureCredential();
  const client = new SpringAppDiscoveryManagementClient(credential, subscriptionId);
  const result = await client.springbootservers.beginUpdateAndWait(
    resourceGroupName,
    siteName,
    springbootserversName,
    springbootservers,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Update springbootservers resource.
 *
 * @summary Update springbootservers resource.
 * x-ms-original-file: specification/offazurespringboot/resource-manager/Microsoft.OffAzureSpringBoot/preview/2023-01-01-preview/examples/springbootservers_Update_MinimumSet_Gen.json
 */
async function springbootserversUpdateMinimumSetGen(): Promise<void> {
  const subscriptionId = process.env["SPRINGAPPDISCOVERY_SUBSCRIPTION_ID"] || "etmdxomjncqvygm";
  const resourceGroupName =
    process.env["SPRINGAPPDISCOVERY_RESOURCE_GROUP"] || "rgspringbootservers";
  const siteName = "hlkrzldhyobavtabgpubtjbhlslnjmsvkthwcfboriwyxndacjypzbj";
  const springbootserversName = "zkarbqnwnxeozvjrkpdqmgnwedwgtwcmmyqwaijkn";
  const springbootservers: SpringbootserversPatch = {};
  const credential = new DefaultAzureCredential();
  const client = new SpringAppDiscoveryManagementClient(credential, subscriptionId);
  const result = await client.springbootservers.beginUpdateAndWait(
    resourceGroupName,
    siteName,
    springbootserversName,
    springbootservers,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await springbootserversUpdateMaximumSetGen();
  await springbootserversUpdateMinimumSetGen();
}

main().catch(console.error);
