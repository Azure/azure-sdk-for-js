// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The Delete OuContainer operation deletes specified OuContainer.
 *
 * @summary The Delete OuContainer operation deletes specified OuContainer.
 * x-ms-original-file: specification/domainservices/resource-manager/Microsoft.AAD/stable/2021-05-01/examples/DeleteOuContainer.json
 */

import { DomainServicesResourceProvider } from "@azure/arm-domainservices";
import { DefaultAzureCredential } from "@azure/identity";

async function deleteOuContainer(): Promise<void> {
  const subscriptionId = "1639790a-76a2-4ac4-98d9-8562f5dfcb4d";
  const resourceGroupName = "OuContainerResourceGroup";
  const domainServiceName = "OuContainer.com";
  const ouContainerName = "OuContainer1";
  const credential = new DefaultAzureCredential();
  const client = new DomainServicesResourceProvider(credential, subscriptionId);
  const result = await client.ouContainerOperationGrp.beginDeleteAndWait(
    resourceGroupName,
    domainServiceName,
    ouContainerName,
  );
  console.log(result);
}

deleteOuContainer().catch(console.error);
