// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a workload classifier.
 *
 * @summary creates or updates a workload classifier.
 * x-ms-original-file: 2025-02-01-preview/CreateOrUpdateWorkloadClassifierMax.json
 */
async function createAWorkloadGroupWithAllPropertiesSpecified() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.workloadClassifiers.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
    "wlm_workloadgroup",
    "wlm_workloadclassifier",
    {
      context: "test_context",
      endTime: "14:00",
      importance: "high",
      label: "test_label",
      memberName: "dbo",
      startTime: "12:00",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a workload classifier.
 *
 * @summary creates or updates a workload classifier.
 * x-ms-original-file: 2025-02-01-preview/CreateOrUpdateWorkloadClassifierMin.json
 */
async function createAWorkloadGroupWithTheRequiredPropertiesSpecified() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.workloadClassifiers.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
    "wlm_workloadgroup",
    "wlm_workloadclassifier",
    { memberName: "dbo" },
  );
  console.log(result);
}

async function main() {
  await createAWorkloadGroupWithAllPropertiesSpecified();
  await createAWorkloadGroupWithTheRequiredPropertiesSpecified();
}

main().catch(console.error);
