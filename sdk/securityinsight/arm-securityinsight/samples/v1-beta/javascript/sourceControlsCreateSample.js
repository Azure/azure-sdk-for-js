// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a source control.
 *
 * @summary creates a source control.
 * x-ms-original-file: 2025-07-01-preview/sourcecontrols/CreateSourceControl.json
 */
async function createsOrUpdatesASourceControl() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b28fbe4a-0bb1-4593-960b-061c8655a550";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.sourceControls.create(
    "myRg",
    "myWorkspace",
    "789e0c1f-4a3d-43ad-809c-e713b677b04a",
    {
      etag: '"0300bf09-0000-0000-0000-5c37296e0000"',
      description: "This is a source control",
      contentTypes: ["AnalyticsRule", "Workbook"],
      displayName: "My Source Control",
      repoType: "Github",
      repository: {
        branch: "master",
        displayUrl: "https://github.com/user/repo",
        url: "https://github.com/user/repo",
      },
      repositoryAccess: {
        clientId: "54b3c2c0-1f48-4a1c-af9f-6399c3240b73",
        code: "939fd7c6caf754f4f41f",
        kind: "OAuth",
        state: "state",
      },
    },
  );
  console.log(result);
}

async function main() {
  await createsOrUpdatesASourceControl();
}

main().catch(console.error);
