// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a source control.
 *
 * @summary delete a source control.
 * x-ms-original-file: 2025-07-01-preview/sourcecontrols/DeleteSourceControl.json
 */
async function deleteASourceControl() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b28fbe4a-0bb1-4593-960b-061c8655a550";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.sourceControls.delete(
    "myRg",
    "myWorkspace",
    "789e0c1f-4a3d-43ad-809c-e713b677b04a",
    {
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
  await deleteASourceControl();
}

main().catch(console.error);
