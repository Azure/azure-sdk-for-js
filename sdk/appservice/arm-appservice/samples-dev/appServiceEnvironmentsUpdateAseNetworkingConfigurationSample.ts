// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Description for Update networking configuration of an App Service Environment
 *
 * @summary Description for Update networking configuration of an App Service Environment
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2024-11-01/examples/AppServiceEnvironments_UpdateAseNetworkingConfiguration.json
 */

import {
  AseV3NetworkingConfiguration,
  WebSiteManagementClient,
} from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateNetworkingConfigurationOfAnAppServiceEnvironment(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPSERVICE_RESOURCE_GROUP"] || "test-rg";
  const name = "test-ase";
  const aseNetworkingConfiguration: AseV3NetworkingConfiguration = {
    ftpEnabled: true,
    remoteDebugEnabled: true,
  };
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result =
    await client.appServiceEnvironments.updateAseNetworkingConfiguration(
      resourceGroupName,
      name,
      aseNetworkingConfiguration,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await updateNetworkingConfigurationOfAnAppServiceEnvironment();
}

main().catch(console.error);
