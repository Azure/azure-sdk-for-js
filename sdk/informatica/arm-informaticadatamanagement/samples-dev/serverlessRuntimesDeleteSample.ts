// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete a InformaticaServerlessRuntimeResource
 *
 * @summary Delete a InformaticaServerlessRuntimeResource
 * x-ms-original-file: specification/informatica/resource-manager/Informatica.DataManagement/stable/2024-05-08/examples/ServerlessRuntimes_Delete_MaximumSet_Gen.json
 */

import { InformaticaDataManagement } from "@azure/arm-informaticadatamanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function serverlessRuntimesDelete(): Promise<void> {
  const subscriptionId =
    process.env["INFORMATICA_SUBSCRIPTION_ID"] || "3599DA28-E346-4D9F-811E-189C0445F0FE";
  const resourceGroupName = process.env["INFORMATICA_RESOURCE_GROUP"] || "rgopenapi";
  const organizationName = "orgName";
  const serverlessRuntimeName = "serverlessRuntimeName";
  const credential = new DefaultAzureCredential();
  const client = new InformaticaDataManagement(credential, subscriptionId);
  const result = await client.serverlessRuntimes.beginDeleteAndWait(
    resourceGroupName,
    organizationName,
    serverlessRuntimeName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await serverlessRuntimesDelete();
}

main().catch(console.error);
