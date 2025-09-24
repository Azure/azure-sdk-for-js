// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates of updates hostname configuration for a Gateway.
 *
 * @summary Creates of updates hostname configuration for a Gateway.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateGatewayHostnameConfiguration.json
 */

import {
  GatewayHostnameConfigurationContract,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementCreateGatewayHostnameConfiguration(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const gatewayId = "gw1";
  const hcId = "default";
  const parameters: GatewayHostnameConfigurationContract = {
    certificateId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/certificates/cert1",
    hostname: "*",
    http2Enabled: true,
    negotiateClientCertificate: false,
    tls10Enabled: false,
    tls11Enabled: false,
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.gatewayHostnameConfiguration.createOrUpdate(
    resourceGroupName,
    serviceName,
    gatewayId,
    hcId,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateGatewayHostnameConfiguration();
}

main().catch(console.error);
