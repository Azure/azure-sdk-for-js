// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or replace an existing service fabric. This operation can take a while to complete.
 *
 * @summary Create or replace an existing service fabric. This operation can take a while to complete.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/ServiceFabrics_CreateOrUpdate.json
 */

import type { ServiceFabric } from "@azure/arm-devtestlabs";
import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

async function serviceFabricsCreateOrUpdate(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const userName = "{userName}";
  const name = "{serviceFabricName}";
  const serviceFabric: ServiceFabric = {
    environmentId: "{environmentId}",
    externalServiceFabricId: "{serviceFabricId}",
    location: "{location}",
    tags: { tagName1: "tagValue1" },
  };
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.serviceFabrics.beginCreateOrUpdateAndWait(
    resourceGroupName,
    labName,
    userName,
    name,
    serviceFabric,
  );
  console.log(result);
}

serviceFabricsCreateOrUpdate().catch(console.error);
