// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get GitHub Access Token.
 *
 * @summary get GitHub Access Token.
 * x-ms-original-file: 2018-06-01/Factories_GetGitHubAccessToken.json
 */
async function factoriesGetGitHubAccessToken() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.factories.getGitHubAccessToken(
    "exampleResourceGroup",
    "exampleFactoryName",
    { gitHubAccessCode: "some", gitHubAccessTokenBaseUrl: "some", gitHubClientId: "some" },
  );
  console.log(result);
}

async function main() {
  await factoriesGetGitHubAccessToken();
}

main().catch(console.error);
