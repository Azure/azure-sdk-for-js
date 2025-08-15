// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AuthorizationServerUpdateContract,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates the details of the authorization server specified by its identifier.
 *
 * @summary Updates the details of the authorization server specified by its identifier.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementUpdateAuthorizationServer.json
 */
async function apiManagementUpdateAuthorizationServer(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const authsid = "newauthServer";
  const ifMatch = "*";
  const parameters: AuthorizationServerUpdateContract = {
    clientId: "update",
    clientSecret: "updated",
    useInApiDocumentation: true,
    useInTestConsole: false,
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.authorizationServer.update(
    resourceGroupName,
    serviceName,
    authsid,
    ifMatch,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUpdateAuthorizationServer();
}

main().catch(console.error);
