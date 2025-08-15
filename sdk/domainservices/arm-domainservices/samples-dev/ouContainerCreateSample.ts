// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerAccount } from "@azure/arm-domainservices";
import { DomainServicesResourceProvider } from "@azure/arm-domainservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to The Create OuContainer operation creates a new OuContainer under the specified Domain Service instance.
 *
 * @summary The Create OuContainer operation creates a new OuContainer under the specified Domain Service instance.
 * x-ms-original-file: specification/domainservices/resource-manager/Microsoft.AAD/stable/2021-05-01/examples/CreateOuContainer.json
 */
async function createDomainService(): Promise<void> {
  const subscriptionId = "1639790a-76a2-4ac4-98d9-8562f5dfcb4d";
  const resourceGroupName = "OuContainerResourceGroup";
  const domainServiceName = "OuContainer.com";
  const ouContainerName = "OuContainer1";
  const containerAccount: ContainerAccount = {
    accountName: "AccountName1",
    password: "<password>",
    spn: "Spn1",
  };
  const credential = new DefaultAzureCredential();
  const client = new DomainServicesResourceProvider(credential, subscriptionId);
  const result = await client.ouContainerOperationGrp.beginCreateAndWait(
    resourceGroupName,
    domainServiceName,
    ouContainerName,
    containerAccount,
  );
  console.log(result);
}

createDomainService().catch(console.error);
