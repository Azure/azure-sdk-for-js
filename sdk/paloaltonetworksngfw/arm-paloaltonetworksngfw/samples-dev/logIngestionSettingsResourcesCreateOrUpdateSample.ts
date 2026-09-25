// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update the Log Ingestion Settings for a firewall. SYNC — forwards to the partner and returns 200 OK (or 201 Created on first create) with the persisted settings. commonDestination.monitorConfigurationsV2 (dcrId, logIngestionEndpoint, dcrImmutableId, streamName) drives where the firewall logs are ingested.
 *
 * @summary create or update the Log Ingestion Settings for a firewall. SYNC — forwards to the partner and returns 200 OK (or 201 Created on first create) with the persisted settings. commonDestination.monitorConfigurationsV2 (dcrId, logIngestionEndpoint, dcrImmutableId, streamName) drives where the firewall logs are ingested.
 * x-ms-original-file: 2026-07-29-preview/LogIngestionSettingsResources_CreateOrUpdate_MaximumSet_Gen.json
 */
async function logIngestionSettingsResourcesCreateOrUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.logIngestionSettingsResources.createOrUpdate(
    "firewall-rg",
    "firewall1",
    {
      properties: {
        commonDestination: {
          monitorConfigurationsV2: {
            dcrId:
              "/subscriptions/2bf4a339-294d-4c25-b0b2-ef649e9f5c27/resourceGroups/firewall-rg/providers/Microsoft.Insights/dataCollectionRules/dcr1",
            logIngestionEndpoint: "https://dce1.eastus-1.ingest.monitor.azure.com",
            dcrImmutableId: "dcr-961d3dcf06f8402ebe071efc3eb19005",
            streamName: "Custom-PANLogs_CL",
          },
        },
        trafficLogDestination: {
          monitorConfigurationsV2: {
            dcrId:
              "/subscriptions/2bf4a339-294d-4c25-b0b2-ef649e9f5c27/resourceGroups/firewall-rg/providers/Microsoft.Insights/dataCollectionRules/dcr1",
            logIngestionEndpoint: "https://dce1.eastus-1.ingest.monitor.azure.com",
            dcrImmutableId: "dcr-961d3dcf06f8402ebe071efc3eb19005",
            streamName: "Custom-PANTrafficLogs_CL",
          },
        },
        threatLogDestination: {
          monitorConfigurationsV2: {
            dcrId:
              "/subscriptions/2bf4a339-294d-4c25-b0b2-ef649e9f5c27/resourceGroups/firewall-rg/providers/Microsoft.Insights/dataCollectionRules/dcr2",
            logIngestionEndpoint: "https://dce1.eastus-1.ingest.monitor.azure.com",
            dcrImmutableId: "dcr-772e4ecf17f9513fce182efc4fc2a116",
            streamName: "Custom-PANThreatLogs_CL",
          },
        },
        decryptLogDestination: {
          monitorConfigurationsV2: {
            dcrId:
              "/subscriptions/2bf4a339-294d-4c25-b0b2-ef649e9f5c27/resourceGroups/firewall-rg/providers/Microsoft.Insights/dataCollectionRules/dcr3",
            logIngestionEndpoint: "https://dce1.eastus-1.ingest.monitor.azure.com",
            dcrImmutableId: "dcr-883f5fdf28fa624dfe293efc5fd3b227",
            streamName: "Custom-PANDecryptLogs_CL",
          },
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update the Log Ingestion Settings for a firewall. SYNC — forwards to the partner and returns 200 OK (or 201 Created on first create) with the persisted settings. commonDestination.monitorConfigurationsV2 (dcrId, logIngestionEndpoint, dcrImmutableId, streamName) drives where the firewall logs are ingested.
 *
 * @summary create or update the Log Ingestion Settings for a firewall. SYNC — forwards to the partner and returns 200 OK (or 201 Created on first create) with the persisted settings. commonDestination.monitorConfigurationsV2 (dcrId, logIngestionEndpoint, dcrImmutableId, streamName) drives where the firewall logs are ingested.
 * x-ms-original-file: 2026-07-29-preview/LogIngestionSettingsResources_CreateOrUpdate_MinimumSet_Gen.json
 */
async function logIngestionSettingsResourcesCreateOrUpdateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.logIngestionSettingsResources.createOrUpdate(
    "firewall-rg",
    "firewall1",
    {
      properties: {
        commonDestination: {
          monitorConfigurationsV2: {
            dcrId:
              "/subscriptions/2bf4a339-294d-4c25-b0b2-ef649e9f5c27/resourceGroups/firewall-rg/providers/Microsoft.Insights/dataCollectionRules/dcr1",
            logIngestionEndpoint: "https://dce1.eastus-1.ingest.monitor.azure.com",
            dcrImmutableId: "dcr-961d3dcf06f8402ebe071efc3eb19005",
            streamName: "Custom-PANTrafficLogs_CL",
          },
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await logIngestionSettingsResourcesCreateOrUpdateMaximumSetGen();
  await logIngestionSettingsResourcesCreateOrUpdateMinimumSetGen();
}

main().catch(console.error);
