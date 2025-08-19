// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete environment. This operation can take a while to complete.
 *
 * @summary Delete environment. This operation can take a while to complete.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/Environments_Delete.json
 */

import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

async function environmentsDelete(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const userName = "@me";
  const name = "{environmentName}";
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.environments.beginDeleteAndWait(
    resourceGroupName,
    labName,
    userName,
    name,
  );
  console.log(result);
}

environmentsDelete().catch(console.error);
