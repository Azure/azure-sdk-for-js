// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns a serverless runtime resource by ID
 *
 * @summary Returns a serverless runtime resource by ID
 * x-ms-original-file: specification/informatica/resource-manager/Informatica.DataManagement/stable/2024-05-08/examples/ServerlessRuntimes_ServerlessResourceById_MaximumSet_Gen.json
 */

import { InformaticaDataManagement } from "@azure/arm-informaticadatamanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function serverlessRuntimesServerlessResourceById(): Promise<void> {
  const subscriptionId =
    process.env["INFORMATICA_SUBSCRIPTION_ID"] || "3599DA28-E346-4D9F-811E-189C0445F0FE";
  const resourceGroupName = process.env["INFORMATICA_RESOURCE_GROUP"] || "rgopenapi";
  const organizationName = "_RD_R";
  const serverlessRuntimeName = "serverlessRuntimeName159";
  const credential = new DefaultAzureCredential();
  const client = new InformaticaDataManagement(credential, subscriptionId);
  const result = await client.serverlessRuntimes.serverlessResourceById(
    resourceGroupName,
    organizationName,
    serverlessRuntimeName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await serverlessRuntimesServerlessResourceById();
}

main().catch(console.error);
