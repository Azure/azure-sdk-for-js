// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates the OpenID Connect Provider.
 *
 * @summary Creates or updates the OpenID Connect Provider.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateOpenIdConnectProvider.json
 */

import {
  OpenidConnectProviderContract,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementCreateOpenIdConnectProvider(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const opid = "templateOpenIdConnect3";
  const parameters: OpenidConnectProviderContract = {
    clientId: "oidprovidertemplate3",
    clientSecret: "x",
    displayName: "templateoidprovider3",
    metadataEndpoint: "https://oidprovider-template3.net",
    useInApiDocumentation: true,
    useInTestConsole: false,
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.openIdConnectProvider.createOrUpdate(
    resourceGroupName,
    serviceName,
    opid,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateOpenIdConnectProvider();
}

main().catch(console.error);
