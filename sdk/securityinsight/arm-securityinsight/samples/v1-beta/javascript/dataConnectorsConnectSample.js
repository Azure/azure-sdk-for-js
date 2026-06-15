// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to connects a data connector.
 *
 * @summary connects a data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/ConnectAPIPolling.json
 */
async function connectAnAPIPollingDataConnector() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.dataConnectors.connect(
    "myRg",
    "myWorkspace",
    "316ec55e-7138-4d63-ab18-90c8a60fd1c8",
    {
      apiKey: "123456789",
      kind: "APIKey",
      requestConfigUserInputValues: [
        {
          displayText: "Organization Name",
          placeHolderName: "{{placeHolder1}}",
          placeHolderValue: "somePlaceHolderValue",
          requestObjectKey: "apiEndpoint",
        },
      ],
    },
  );
}

/**
 * This sample demonstrates how to connects a data connector.
 *
 * @summary connects a data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/ConnectAPIPollingV2Logs.json
 */
async function connectAnAPIPollingV2LogsDataConnector() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.dataConnectors.connect(
    "myRg",
    "myWorkspace",
    "316ec55e-7138-4d63-ab18-90c8a60fd1c8",
    {
      apiKey: "123456789",
      dataCollectionEndpoint: "https://test.eastus.ingest.monitor.azure.com",
      dataCollectionRuleImmutableId: "dcr-34adsj9o7d6f9de204478b9cgb43b631",
      kind: "APIKey",
      outputStream: "Custom-MyTableRawData",
      requestConfigUserInputValues: [
        {
          displayText: "Organization Name",
          placeHolderName: "{{placeHolder1}}",
          placeHolderValue: "somePlaceHolderValue",
          requestObjectKey: "apiEndpoint",
        },
      ],
    },
  );
}

async function main() {
  await connectAnAPIPollingDataConnector();
  await connectAnAPIPollingV2LogsDataConnector();
}

main().catch(console.error);
