// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { InformaticaDataManagement } from "@azure/arm-informaticadatamanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get a InformaticaServerlessRuntimeResource
 *
 * @summary Get a InformaticaServerlessRuntimeResource
 * x-ms-original-file: specification/informatica/resource-manager/Informatica.DataManagement/stable/2024-05-08/examples/ServerlessRuntimes_Get_MaximumSet_Gen.json
 */
async function serverlessRuntimesGet(): Promise<void> {
  const subscriptionId =
    process.env["INFORMATICA_SUBSCRIPTION_ID"] || "3599DA28-E346-4D9F-811E-189C0445F0FE";
  const resourceGroupName = process.env["INFORMATICA_RESOURCE_GROUP"] || "rgopenapi";
  const organizationName = "e3Y";
  const serverlessRuntimeName = "48-";
  const credential = new DefaultAzureCredential();
  const client = new InformaticaDataManagement(credential, subscriptionId);
  const result = await client.serverlessRuntimes.get(
    resourceGroupName,
    organizationName,
    serverlessRuntimeName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Get a InformaticaServerlessRuntimeResource
 *
 * @summary Get a InformaticaServerlessRuntimeResource
 * x-ms-original-file: specification/informatica/resource-manager/Informatica.DataManagement/stable/2024-05-08/examples/ServerlessRuntimes_Get_MinimumSet_Gen.json
 */
async function serverlessRuntimesGetMin(): Promise<void> {
  const subscriptionId =
    process.env["INFORMATICA_SUBSCRIPTION_ID"] || "3599DA28-E346-4D9F-811E-189C0445F0FE";
  const resourceGroupName = process.env["INFORMATICA_RESOURCE_GROUP"] || "rgopenapi";
  const organizationName = "YC";
  const serverlessRuntimeName = "___";
  const credential = new DefaultAzureCredential();
  const client = new InformaticaDataManagement(credential, subscriptionId);
  const result = await client.serverlessRuntimes.get(
    resourceGroupName,
    organizationName,
    serverlessRuntimeName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await serverlessRuntimesGet();
  await serverlessRuntimesGetMin();
}

main().catch(console.error);
