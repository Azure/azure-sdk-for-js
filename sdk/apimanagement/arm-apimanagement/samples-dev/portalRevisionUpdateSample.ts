// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates the description of specified portal revision or makes it current.
 *
 * @summary Updates the description of specified portal revision or makes it current.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementUpdatePortalRevision.json
 */

import {
  PortalRevisionContract,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementUpdatePortalRevision(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const portalRevisionId = "20201112101010";
  const ifMatch = "*";
  const parameters: PortalRevisionContract = {
    description: "portal revision update",
    isCurrent: true,
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.portalRevision.beginUpdateAndWait(
    resourceGroupName,
    serviceName,
    portalRevisionId,
    ifMatch,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUpdatePortalRevision();
}

main().catch(console.error);
