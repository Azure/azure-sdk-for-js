// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Description for Register a user provided function app with a static site build
 *
 * @summary Description for Register a user provided function app with a static site build
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2024-11-01/examples/RegisterUserProvidedFunctionAppWithStaticSiteBuild.json
 */

import {
  StaticSiteUserProvidedFunctionAppARMResource,
  StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteBuildOptionalParams,
  WebSiteManagementClient,
} from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function registerAUserProvidedFunctionAppWithAStaticSiteBuild(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPSERVICE_RESOURCE_GROUP"] || "rg";
  const name = "testStaticSite0";
  const environmentName = "default";
  const functionAppName = "testFunctionApp";
  const isForced = true;
  const staticSiteUserProvidedFunctionEnvelope: StaticSiteUserProvidedFunctionAppARMResource =
    {
      functionAppRegion: "West US 2",
      functionAppResourceId:
        "/subscription/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/functionRG/providers/Microsoft.Web/sites/testFunctionApp",
    };
  const options: StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteBuildOptionalParams =
    { isForced };
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result =
    await client.staticSites.beginRegisterUserProvidedFunctionAppWithStaticSiteBuildAndWait(
      resourceGroupName,
      name,
      environmentName,
      functionAppName,
      staticSiteUserProvidedFunctionEnvelope,
      options,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await registerAUserProvidedFunctionAppWithAStaticSiteBuild();
}

main().catch(console.error);
