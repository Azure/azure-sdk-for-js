// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates the alert rule.
 *
 * @summary creates or updates the alert rule.
 * x-ms-original-file: 2025-07-01-preview/alertRules/CreateFusionAlertRule.json
 */
async function createsOrUpdatesAFusionAlertRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.alertRules.createOrUpdate(
    "myRg",
    "myWorkspace",
    "myFirstFusionRule",
    {
      etag: "3d00c3ca-0000-0100-0000-5d42d5010000",
      kind: "Fusion",
      alertRuleTemplateName: "f71aba3d-28fb-450b-b192-4e76a83015c8",
      enabled: true,
      sourceSettings: [
        { enabled: true, sourceName: "Anomalies" },
        {
          enabled: true,
          sourceName: "Alert providers",
          sourceSubTypes: [
            {
              enabled: true,
              severityFilters: {
                filters: [
                  { enabled: true, severity: "High" },
                  { enabled: true, severity: "Medium" },
                  { enabled: true, severity: "Low" },
                  { enabled: true, severity: "Informational" },
                ],
              },
              sourceSubTypeName: "Azure Active Directory Identity Protection",
            },
            {
              enabled: true,
              severityFilters: {
                filters: [
                  { enabled: true, severity: "High" },
                  { enabled: true, severity: "Medium" },
                  { enabled: true, severity: "Low" },
                  { enabled: true, severity: "Informational" },
                ],
              },
              sourceSubTypeName: "Azure Defender",
            },
            {
              enabled: true,
              severityFilters: {
                filters: [
                  { enabled: true, severity: "High" },
                  { enabled: true, severity: "Medium" },
                  { enabled: true, severity: "Low" },
                  { enabled: true, severity: "Informational" },
                ],
              },
              sourceSubTypeName: "Azure Defender for IoT",
            },
            {
              enabled: true,
              severityFilters: {
                filters: [
                  { enabled: true, severity: "High" },
                  { enabled: true, severity: "Medium" },
                  { enabled: true, severity: "Low" },
                  { enabled: true, severity: "Informational" },
                ],
              },
              sourceSubTypeName: "Microsoft 365 Defender",
            },
            {
              enabled: true,
              severityFilters: {
                filters: [
                  { enabled: true, severity: "High" },
                  { enabled: true, severity: "Medium" },
                  { enabled: true, severity: "Low" },
                  { enabled: true, severity: "Informational" },
                ],
              },
              sourceSubTypeName: "Microsoft Cloud App Security",
            },
            {
              enabled: true,
              severityFilters: {
                filters: [
                  { enabled: true, severity: "High" },
                  { enabled: true, severity: "Medium" },
                  { enabled: true, severity: "Low" },
                  { enabled: true, severity: "Informational" },
                ],
              },
              sourceSubTypeName: "Microsoft Defender for Endpoint",
            },
            {
              enabled: true,
              severityFilters: {
                filters: [
                  { enabled: true, severity: "High" },
                  { enabled: true, severity: "Medium" },
                  { enabled: true, severity: "Low" },
                  { enabled: true, severity: "Informational" },
                ],
              },
              sourceSubTypeName: "Microsoft Defender for Identity",
            },
            {
              enabled: true,
              severityFilters: {
                filters: [
                  { enabled: true, severity: "High" },
                  { enabled: true, severity: "Medium" },
                  { enabled: true, severity: "Low" },
                  { enabled: true, severity: "Informational" },
                ],
              },
              sourceSubTypeName: "Microsoft Defender for Office 365",
            },
            {
              enabled: true,
              severityFilters: {
                filters: [
                  { enabled: true, severity: "High" },
                  { enabled: true, severity: "Medium" },
                  { enabled: true, severity: "Low" },
                  { enabled: true, severity: "Informational" },
                ],
              },
              sourceSubTypeName: "Azure Sentinel scheduled analytics rules",
            },
          ],
        },
        {
          enabled: true,
          sourceName: "Raw logs from other sources",
          sourceSubTypes: [
            { enabled: true, severityFilters: {}, sourceSubTypeName: "Palo Alto Networks" },
          ],
        },
      ],
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates the alert rule.
 *
 * @summary creates or updates the alert rule.
 * x-ms-original-file: 2025-07-01-preview/alertRules/CreateFusionAlertRuleWithFusionScenarioExclusion.json
 */
async function createsOrUpdatesAFusionAlertRuleWithScenarioExclusionPattern() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.alertRules.createOrUpdate(
    "myRg",
    "myWorkspace",
    "myFirstFusionRule",
    {
      etag: "3d00c3ca-0000-0100-0000-5d42d5010000",
      kind: "Fusion",
      alertRuleTemplateName: "f71aba3d-28fb-450b-b192-4e76a83015c8",
      enabled: true,
      sourceSettings: [
        { enabled: true, sourceName: "Anomalies" },
        {
          enabled: true,
          sourceName: "Alert providers",
          sourceSubTypes: [
            {
              enabled: true,
              severityFilters: {
                filters: [
                  { enabled: true, severity: "High" },
                  { enabled: true, severity: "Medium" },
                  { enabled: true, severity: "Low" },
                  { enabled: true, severity: "Informational" },
                ],
              },
              sourceSubTypeName: "Azure Active Directory Identity Protection",
            },
            {
              enabled: true,
              severityFilters: {
                filters: [
                  { enabled: true, severity: "High" },
                  { enabled: true, severity: "Medium" },
                  { enabled: true, severity: "Low" },
                  { enabled: true, severity: "Informational" },
                ],
              },
              sourceSubTypeName: "Azure Defender",
            },
            {
              enabled: true,
              severityFilters: {
                filters: [
                  { enabled: true, severity: "High" },
                  { enabled: true, severity: "Medium" },
                  { enabled: true, severity: "Low" },
                  { enabled: true, severity: "Informational" },
                ],
              },
              sourceSubTypeName: "Azure Defender for IoT",
            },
            {
              enabled: true,
              severityFilters: {
                filters: [
                  { enabled: true, severity: "High" },
                  { enabled: true, severity: "Medium" },
                  { enabled: true, severity: "Low" },
                  { enabled: true, severity: "Informational" },
                ],
              },
              sourceSubTypeName: "Microsoft 365 Defender",
            },
            {
              enabled: true,
              severityFilters: {
                filters: [
                  { enabled: true, severity: "High" },
                  { enabled: true, severity: "Medium" },
                  { enabled: true, severity: "Low" },
                  { enabled: true, severity: "Informational" },
                ],
              },
              sourceSubTypeName: "Microsoft Cloud App Security",
            },
            {
              enabled: true,
              severityFilters: {
                filters: [
                  { enabled: true, severity: "High" },
                  { enabled: true, severity: "Medium" },
                  { enabled: true, severity: "Low" },
                  { enabled: true, severity: "Informational" },
                ],
              },
              sourceSubTypeName: "Microsoft Defender for Endpoint",
            },
            {
              enabled: true,
              severityFilters: {
                filters: [
                  { enabled: true, severity: "High" },
                  { enabled: true, severity: "Medium" },
                  { enabled: true, severity: "Low" },
                  { enabled: true, severity: "Informational" },
                ],
              },
              sourceSubTypeName: "Microsoft Defender for Identity",
            },
            {
              enabled: true,
              severityFilters: {
                filters: [
                  { enabled: true, severity: "High" },
                  { enabled: true, severity: "Medium" },
                  { enabled: true, severity: "Low" },
                  { enabled: true, severity: "Informational" },
                ],
              },
              sourceSubTypeName: "Microsoft Defender for Office 365",
            },
            {
              enabled: true,
              severityFilters: {
                filters: [
                  { enabled: true, severity: "High" },
                  { enabled: true, severity: "Medium" },
                  { enabled: true, severity: "Low" },
                  { enabled: true, severity: "Informational" },
                ],
              },
              sourceSubTypeName: "Azure Sentinel scheduled analytics rules",
            },
          ],
        },
        {
          enabled: true,
          sourceName: "Raw logs from other sources",
          sourceSubTypes: [
            { enabled: true, severityFilters: {}, sourceSubTypeName: "Palo Alto Networks" },
          ],
        },
      ],
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates the alert rule.
 *
 * @summary creates or updates the alert rule.
 * x-ms-original-file: 2025-07-01-preview/alertRules/CreateMicrosoftSecurityIncidentCreationAlertRule.json
 */
async function createsOrUpdatesAMicrosoftSecurityIncidentCreationRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.alertRules.createOrUpdate(
    "myRg",
    "myWorkspace",
    "microsoftSecurityIncidentCreationRuleExample",
    {
      etag: '"260097e0-0000-0d00-0000-5d6fa88f0000"',
      kind: "MicrosoftSecurityIncidentCreation",
      displayName: "testing displayname",
      enabled: true,
      productFilter: "Microsoft Cloud App Security",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates the alert rule.
 *
 * @summary creates or updates the alert rule.
 * x-ms-original-file: 2025-07-01-preview/alertRules/CreateNrtAlertRule.json
 */
async function createsOrUpdatesANrtAlertRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.alertRules.createOrUpdate(
    "myRg",
    "myWorkspace",
    "73e01a99-5cd7-4139-a149-9f2736ff2ab5",
    {
      etag: '"0300bf09-0000-0000-0000-5c37296e0000"',
      kind: "NRT",
      description: "",
      displayName: "Rule2",
      enabled: true,
      eventGroupingSettings: { aggregationKind: "AlertPerResult" },
      incidentConfiguration: {
        createIncident: true,
        groupingConfiguration: {
          enabled: true,
          groupByEntities: ["Host", "Account"],
          lookbackDuration: "PT5H",
          matchingMethod: "Selected",
          reopenClosedIncident: false,
        },
      },
      query:
        "ProtectionStatus | extend HostCustomEntity = Computer | extend IPCustomEntity = ComputerIP_Hidden",
      severity: "High",
      suppressionDuration: "PT1H",
      suppressionEnabled: false,
      tactics: ["Persistence", "LateralMovement"],
      techniques: ["T1037", "T1021"],
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates the alert rule.
 *
 * @summary creates or updates the alert rule.
 * x-ms-original-file: 2025-07-01-preview/alertRules/CreateScheduledAlertRule.json
 */
async function createsOrUpdatesAScheduledAlertRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.alertRules.createOrUpdate(
    "myRg",
    "myWorkspace",
    "73e01a99-5cd7-4139-a149-9f2736ff2ab5",
    {
      etag: '"0300bf09-0000-0000-0000-5c37296e0000"',
      kind: "Scheduled",
      description: "An example for a scheduled rule",
      alertDetailsOverride: {
        alertDescriptionFormat: "Suspicious activity was made by {{ComputerIP}}",
        alertDisplayNameFormat: "Alert from {{Computer}}",
        alertDynamicProperties: [
          { alertProperty: "ProductComponentName", value: "ProductComponentNameCustomColumn" },
          { alertProperty: "ProductName", value: "ProductNameCustomColumn" },
          { alertProperty: "AlertLink", value: "Link" },
        ],
      },
      customDetails: { OperatingSystemName: "OSName", OperatingSystemType: "OSType" },
      displayName: "My scheduled rule",
      enabled: true,
      entityMappings: [
        { entityType: "Host", fieldMappings: [{ columnName: "Computer", identifier: "FullName" }] },
        { entityType: "IP", fieldMappings: [{ columnName: "ComputerIP", identifier: "Address" }] },
      ],
      eventGroupingSettings: { aggregationKind: "AlertPerResult" },
      incidentConfiguration: {
        createIncident: true,
        groupingConfiguration: {
          enabled: true,
          groupByAlertDetails: ["DisplayName"],
          groupByCustomDetails: ["OperatingSystemType", "OperatingSystemName"],
          groupByEntities: ["Host"],
          lookbackDuration: "PT5H",
          matchingMethod: "Selected",
          reopenClosedIncident: false,
        },
      },
      query: "Heartbeat",
      queryFrequency: "PT1H",
      queryPeriod: "P2DT1H30M",
      sentinelEntitiesMappings: [{ columnName: "Entities" }],
      severity: "High",
      suppressionDuration: "PT1H",
      suppressionEnabled: false,
      tactics: ["Persistence", "LateralMovement"],
      techniques: ["T1037", "T1021"],
      triggerOperator: "GreaterThan",
      triggerThreshold: 0,
    },
  );
  console.log(result);
}

async function main() {
  await createsOrUpdatesAFusionAlertRule();
  await createsOrUpdatesAFusionAlertRuleWithScenarioExclusionPattern();
  await createsOrUpdatesAMicrosoftSecurityIncidentCreationRule();
  await createsOrUpdatesANrtAlertRule();
  await createsOrUpdatesAScheduledAlertRule();
}

main().catch(console.error);
