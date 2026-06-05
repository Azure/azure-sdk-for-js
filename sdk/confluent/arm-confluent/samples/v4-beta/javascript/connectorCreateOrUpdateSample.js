// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create confluent connector by Name
 *
 * @summary create confluent connector by Name
 * x-ms-original-file: 2025-08-18-preview/Connector_CreateOrUpdate_MaximumSet_Gen.json
 */
async function connectorCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.connector.createOrUpdate(
    "rgconfluent",
    "cppyvn",
    "tteibyyztawsguofmfn",
    "bfokzevhjixs",
    "fczksqy",
    {
      body: {
        connectorBasicInfo: {
          connectorType: "SINK",
          connectorClass: "AZUREBLOBSOURCE",
          connectorName: "gxad",
          connectorId: "qlrrqyekgitbbes",
          connectorState: "PROVISIONING",
        },
        connectorServiceTypeInfo: { connectorServiceType: "ConnectorServiceTypeInfoBase" },
        partnerConnectorInfo: { partnerConnectorType: "PartnerInfoBase" },
      },
    },
  );
  console.log(result);
}

async function main() {
  await connectorCreateOrUpdateMaximumSet();
}

main().catch(console.error);
