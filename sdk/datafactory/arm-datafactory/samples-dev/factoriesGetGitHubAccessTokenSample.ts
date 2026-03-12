// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get GitHub Access Token.
 *
 * @summary Get GitHub Access Token.
 * x-ms-original-file: specification/datafactory/resource-manager/Microsoft.DataFactory/stable/2018-06-01/examples/Factories_GetGitHubAccessToken.json
 */

import {
  GitHubAccessTokenRequest,
  DataFactoryManagementClient,
} from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function factoriesGetGitHubAccessToken(): Promise<void> {
  const subscriptionId =
    process.env["DATAFACTORY_SUBSCRIPTION_ID"] ||
    "12345678-1234-1234-1234-12345678abc";
  const resourceGroupName =
    process.env["DATAFACTORY_RESOURCE_GROUP"] || "exampleResourceGroup";
  const factoryName = "exampleFactoryName";
  const gitHubAccessTokenRequest: GitHubAccessTokenRequest = {
    gitHubAccessCode: "some",
    gitHubAccessTokenBaseUrl: "some",
    gitHubClientId: "some",
  };
  const credential = new DefaultAzureCredential();
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.factories.getGitHubAccessToken(
    resourceGroupName,
    factoryName,
    gitHubAccessTokenRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await factoriesGetGitHubAccessToken();
}

main().catch(console.error);
