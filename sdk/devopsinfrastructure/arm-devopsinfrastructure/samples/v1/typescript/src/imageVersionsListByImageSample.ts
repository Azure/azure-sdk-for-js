// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevOpsInfrastructureClient } from "@azure/arm-devopsinfrastructure";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list ImageVersion resources by Image
 *
 * @summary list ImageVersion resources by Image
 * x-ms-original-file: 2024-10-19/ImageVersions_ListByImage.json
 */
async function imageVersionsListByImage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a2e95d27-c161-4b61-bda4-11512c14c2c2";
  const client = new DevOpsInfrastructureClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.imageVersions.listByImage(
    "my-resource-group",
    "windows-2022",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  imageVersionsListByImage();
}

main().catch(console.error);
