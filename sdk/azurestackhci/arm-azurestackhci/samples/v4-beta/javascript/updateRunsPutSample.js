// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to put Update runs for a specified update
 *
 * @summary put Update runs for a specified update
 * x-ms-original-file: 2025-12-01-preview/PutUpdateRuns.json
 */
async function getUpdateRunsUnderClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b8d594e5-51f3-4c11-9c54-a7771b81c712";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.updateRuns.put(
    "testrg",
    "testcluster",
    "Microsoft4.2203.2.32",
    "23b779ba-0d52-4a80-8571-45ca74664ec3",
    {
      progress: {
        name: "Unnamed step",
        description: "Update Azure Stack.",
        endTimeUtc: new Date("2022-04-06T13:58:42.969006+00:00"),
        errorMessage: "",
        lastUpdatedTimeUtc: new Date("2022-04-06T13:58:42.969006+00:00"),
        startTimeUtc: new Date("2022-04-06T01:36:33.3876751+00:00"),
        status: "Success",
        steps: [
          {
            name: "PreUpdate Cloud",
            description: "Prepare for SSU update",
            endTimeUtc: new Date("2022-04-06T01:37:16.8728314+00:00"),
            errorMessage: "",
            lastUpdatedTimeUtc: new Date("2022-04-06T01:37:16.8728314+00:00"),
            startTimeUtc: new Date("2022-04-06T01:36:33.3876751+00:00"),
            status: "Success",
            steps: [],
          },
        ],
      },
    },
  );
  console.log(result);
}

async function main() {
  await getUpdateRunsUnderClusterResource();
}

main().catch(console.error);
