// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets Metadata of the serverless runtime environment.
 *
 * @summary Gets Metadata of the serverless runtime environment.
 * x-ms-original-file: specification/informatica/resource-manager/Informatica.DataManagement/stable/2024-05-08/examples/Organizations_GetServerlessMetadata_MaximumSet_Gen.json
 */

import { InformaticaDataManagement } from "@azure/arm-informaticadatamanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function organizationsGetServerlessMetadata(): Promise<void> {
  const subscriptionId =
    process.env["INFORMATICA_SUBSCRIPTION_ID"] || "3599DA28-E346-4D9F-811E-189C0445F0FE";
  const resourceGroupName = process.env["INFORMATICA_RESOURCE_GROUP"] || "rgopenapi";
  const organizationName = "3_UC";
  const credential = new DefaultAzureCredential();
  const client = new InformaticaDataManagement(credential, subscriptionId);
  const result = await client.organizations.getServerlessMetadata(
    resourceGroupName,
    organizationName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Gets Metadata of the serverless runtime environment.
 *
 * @summary Gets Metadata of the serverless runtime environment.
 * x-ms-original-file: specification/informatica/resource-manager/Informatica.DataManagement/stable/2024-05-08/examples/Organizations_GetServerlessMetadata_MinimumSet_Gen.json
 */
async function organizationsGetServerlessMetadataMin(): Promise<void> {
  const subscriptionId =
    process.env["INFORMATICA_SUBSCRIPTION_ID"] || "3599DA28-E346-4D9F-811E-189C0445F0FE";
  const resourceGroupName = process.env["INFORMATICA_RESOURCE_GROUP"] || "rgopenapi";
  const organizationName = "A";
  const credential = new DefaultAzureCredential();
  const client = new InformaticaDataManagement(credential, subscriptionId);
  const result = await client.organizations.getServerlessMetadata(
    resourceGroupName,
    organizationName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await organizationsGetServerlessMetadata();
  await organizationsGetServerlessMetadataMin();
}

main().catch(console.error);
