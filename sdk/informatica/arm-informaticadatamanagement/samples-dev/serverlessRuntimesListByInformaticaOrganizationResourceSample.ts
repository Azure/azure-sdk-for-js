// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List InformaticaServerlessRuntimeResource resources by InformaticaOrganizationResource
 *
 * @summary List InformaticaServerlessRuntimeResource resources by InformaticaOrganizationResource
 * x-ms-original-file: specification/informatica/resource-manager/Informatica.DataManagement/stable/2024-05-08/examples/ServerlessRuntimes_ListByInformaticaOrganizationResource_MaximumSet_Gen.json
 */

import { InformaticaDataManagement } from "@azure/arm-informaticadatamanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function serverlessRuntimesListByInformaticaOrganizationResource(): Promise<void> {
  const subscriptionId =
    process.env["INFORMATICA_SUBSCRIPTION_ID"] || "3599DA28-E346-4D9F-811E-189C0445F0FE";
  const resourceGroupName = process.env["INFORMATICA_RESOURCE_GROUP"] || "rgopenapi";
  const organizationName = "orgName";
  const credential = new DefaultAzureCredential();
  const client = new InformaticaDataManagement(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.serverlessRuntimes.listByInformaticaOrganizationResource(
    resourceGroupName,
    organizationName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await serverlessRuntimesListByInformaticaOrganizationResource();
}

main().catch(console.error);
