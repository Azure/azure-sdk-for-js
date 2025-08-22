// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Obtains the specified change resource for the target resource
 *
 * @summary Obtains the specified change resource for the target resource
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2022-05-01/examples/GetChange.json
 */

import { ChangesClient } from "@azure/arm-changes";
import { DefaultAzureCredential } from "@azure/identity";

async function getChange(): Promise<void> {
  const subscriptionId = "subscriptionId1";
  const resourceGroupName = "resourceGroup1";
  const resourceProviderNamespace = "resourceProvider1";
  const resourceType = "resourceType1";
  const resourceName = "resourceName1";
  const changeResourceId = "1d58d72f-0719-4a48-9228-b7ea682885bf";
  const credential = new DefaultAzureCredential();
  const client = new ChangesClient(credential, subscriptionId);
  const result = await client.changes.get(
    resourceGroupName,
    resourceProviderNamespace,
    resourceType,
    resourceName,
    changeResourceId,
  );
  console.log(result);
}

getChange().catch(console.error);
