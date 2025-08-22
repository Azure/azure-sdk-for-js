// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Obtains a list of change resources from the past 14 days for the target resource
 *
 * @summary Obtains a list of change resources from the past 14 days for the target resource
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2022-05-01/examples/ListChanges.json
 */

import { ChangesClient } from "@azure/arm-changes";
import { DefaultAzureCredential } from "@azure/identity";

async function listChanges(): Promise<void> {
  const subscriptionId = "subscriptionId1";
  const resourceGroupName = "resourceGroup1";
  const resourceProviderNamespace = "resourceProvider1";
  const resourceType = "resourceType1";
  const resourceName = "resourceName1";
  const credential = new DefaultAzureCredential();
  const client = new ChangesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.changes.list(
    resourceGroupName,
    resourceProviderNamespace,
    resourceType,
    resourceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

listChanges().catch(console.error);
