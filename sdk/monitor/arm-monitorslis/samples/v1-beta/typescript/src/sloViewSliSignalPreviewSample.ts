// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitorslis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns preview data for the signal.
 *
 * @summary returns preview data for the signal.
 * x-ms-original-file: 2025-03-01-preview/SloView_SliSignalPreview.json
 */
async function sliSignalPreview(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  const result = await client.sloView.sliSignalPreview("testSG", {
    previewType: "Slo",
    evaluationType: "RequestBased",
    goodSignals: {
      signalSources: [
        {
          signalSourceId: "A",
          metricNamespace: "junminsg0220",
          metricName: "mfrei0728_1_mdmtest1_ppe1_raw1:maxOfAverage",
          sourceAmwAccountManagedIdentity:
            "/subscriptions/0f991b9d-ab0e-4827-9cc7-984d7319017d/resourceGroups/test-slis/providers/Microsoft.ManagedIdentity/userAssignedIdentities/TapIdentity1",
          sourceAmwAccountResourceId:
            "/subscriptions/0f991b9d-ab0e-4827-9cc7-984d7319017d/resourceGroups/test-slis/providers/microsoft.monitor/accounts/streaming-3p-slo-ppe1-eastus-raw1",
          filters: [],
          spatialAggregation: { type: "Count", dimensions: ["Datacenter"] },
          temporalAggregation: { type: "Average" },
        },
        {
          signalSourceId: "B",
          metricNamespace: "junminsg0220",
          metricName: "mfrei0728_2_mdmtest1_ppe1_raw1:maxOfAverage",
          sourceAmwAccountManagedIdentity:
            "/subscriptions/0f991b9d-ab0e-4827-9cc7-984d7319017d/resourceGroups/test-slis/providers/Microsoft.ManagedIdentity/userAssignedIdentities/TapIdentity1",
          sourceAmwAccountResourceId:
            "/subscriptions/0f991b9d-ab0e-4827-9cc7-984d7319017d/resourceGroups/test-slis/providers/microsoft.monitor/accounts/streaming-3p-slo-ppe1-eastus-raw1",
          filters: [],
          spatialAggregation: { type: "Count", dimensions: ["Datacenter"] },
          temporalAggregation: { type: "Average" },
        },
      ],
      signalFormula: "A + B",
    },
    totalSignals: {
      signalSources: [
        {
          signalSourceId: "A",
          metricNamespace: "junminsg0220",
          metricName: "mfrei0728_1_mdmtest1_ppe1_raw1:maxOfAverage",
          sourceAmwAccountManagedIdentity:
            "/subscriptions/0f991b9d-ab0e-4827-9cc7-984d7319017d/resourceGroups/test-slis/providers/Microsoft.ManagedIdentity/userAssignedIdentities/TapIdentity1",
          sourceAmwAccountResourceId:
            "/subscriptions/0f991b9d-ab0e-4827-9cc7-984d7319017d/resourceGroups/test-slis/providers/microsoft.monitor/accounts/streaming-3p-slo-ppe1-eastus-raw1",
          filters: [],
          spatialAggregation: { type: "Count", dimensions: ["Datacenter"] },
          temporalAggregation: { type: "Average" },
        },
        {
          signalSourceId: "B",
          metricNamespace: "junminsg0220",
          metricName: "mfrei0728_2_mdmtest1_ppe1_raw1:maxOfAverage",
          sourceAmwAccountManagedIdentity:
            "/subscriptions/0f991b9d-ab0e-4827-9cc7-984d7319017d/resourceGroups/test-slis/providers/Microsoft.ManagedIdentity/userAssignedIdentities/TapIdentity1",
          sourceAmwAccountResourceId:
            "/subscriptions/0f991b9d-ab0e-4827-9cc7-984d7319017d/resourceGroups/test-slis/providers/microsoft.monitor/accounts/streaming-3p-slo-ppe1-eastus-raw1",
          filters: [],
          spatialAggregation: { type: "Count", dimensions: ["Datacenter"] },
          temporalAggregation: { type: "Average" },
        },
      ],
      signalFormula: "A + B",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await sliSignalPreview();
}

main().catch(console.error);
