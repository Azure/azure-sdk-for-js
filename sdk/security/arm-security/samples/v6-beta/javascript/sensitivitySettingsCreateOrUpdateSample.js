// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update data sensitivity settings for sensitive data discovery
 *
 * @summary create or update data sensitivity settings for sensitive data discovery
 * x-ms-original-file: 2023-02-15-preview/SensitivitySettings/PutSensitivitySettings_example.json
 */
async function updateSensitivitySettings() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.sensitivitySettings.createOrUpdate({
    sensitiveInfoTypesIds: [
      "f2f8a7a1-28c0-404b-9ab4-30a0a7af18cb",
      "b452f22b-f87d-4f48-8490-ecf0873325b5",
      "d59ee8b6-2618-404b-a5e7-aa377cd67543",
    ],
    sensitivityThresholdLabelId: "f2f8a7a1-28c0-404b-9ab4-30a0a7af18cb",
    sensitivityThresholdLabelOrder: 2,
  });
  console.log(result);
}

async function main() {
  await updateSensitivitySettings();
}

main().catch(console.error);
