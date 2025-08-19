// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Allows modifying tags of service fabrics. All other properties will be ignored.
 *
 * @summary Allows modifying tags of service fabrics. All other properties will be ignored.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/ServiceFabrics_Update.json
 */

import type { ServiceFabricFragment } from "@azure/arm-devtestlabs";
import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

async function serviceFabricsUpdate(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const userName = "{userName}";
  const name = "{serviceFabricName}";
  const serviceFabric: ServiceFabricFragment = {
    tags: { tagName1: "tagValue1" },
  };
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.serviceFabrics.update(
    resourceGroupName,
    labName,
    userName,
    name,
    serviceFabric,
  );
  console.log(result);
}

serviceFabricsUpdate().catch(console.error);
