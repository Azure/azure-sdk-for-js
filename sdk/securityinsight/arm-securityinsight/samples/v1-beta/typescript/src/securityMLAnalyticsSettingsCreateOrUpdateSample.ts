// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates the Security ML Analytics Settings.
 *
 * @summary creates or updates the Security ML Analytics Settings.
 * x-ms-original-file: 2025-07-01-preview/securityMLAnalyticsSettings/CreateAnomalySecurityMLAnalyticsSetting.json
 */
async function createsOrUpdatesAAnomalySecurityMLAnalyticsSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.securityMLAnalyticsSettings.createOrUpdate(
    "myRg",
    "myWorkspace",
    "f209187f-1d17-4431-94af-c141bf5f23db",
    {
      etag: '"260090e2-0000-0d00-0000-5d6fb8670000"',
      kind: "Anomaly",
      description:
        "When account logs from a source region that has rarely been logged in from during the last 14 days, an anomaly is triggered.",
      anomalySettingsVersion: 0,
      anomalyVersion: "1.0.5",
      customizableObservations: {
        multiSelectObservations: null,
        prioritizeExcludeObservations: null,
        singleSelectObservations: [
          {
            name: "Device vendor",
            description: "Select device vendor of network connection logs from CommonSecurityLog",
            rerun: "RerunAlways",
            sequenceNumber: 1,
            supportedValues: ["Palo Alto Networks", "Fortinet", "Check Point"],
            supportedValuesKql: null,
            value: ["Palo Alto Networks"],
            valuesKql: null,
          },
        ],
        singleValueObservations: null,
        thresholdObservations: [
          {
            name: "Daily data transfer threshold in MB",
            description:
              "Suppress anomalies when daily data transfered (in MB) per hour is less than the chosen value",
            maximum: "100",
            minimum: "1",
            rerun: "RerunAlways",
            sequenceNumber: 1,
            value: "25",
          },
          {
            name: "Number of standard deviations",
            description:
              "Triggers anomalies when number of standard deviations is greater than the chosen value",
            maximum: "10",
            minimum: "2",
            rerun: "RerunAlways",
            sequenceNumber: 2,
            value: "3",
          },
        ],
      },
      displayName: "Login from unusual region",
      enabled: true,
      frequency: "PT1H",
      isDefaultSettings: true,
      requiredDataConnectors: [{ connectorId: "AWS", dataTypes: ["AWSCloudTrail"] }],
      settingsDefinitionId: "f209187f-1d17-4431-94af-c141bf5f23db",
      settingsStatus: "Production",
      tactics: ["Exfiltration", "CommandAndControl"],
      techniques: ["T1037", "T1021"],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createsOrUpdatesAAnomalySecurityMLAnalyticsSettings();
}

main().catch(console.error);
