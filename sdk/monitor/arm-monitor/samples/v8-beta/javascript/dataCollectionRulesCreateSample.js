// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a data collection rule.
 *
 * @summary creates or updates a data collection rule.
 * x-ms-original-file: 2024-03-11/DataCollectionRulesCreate.json
 */
async function createOrUpdateDataCollectionRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.dataCollectionRules.create("myResourceGroup", "myCollectionRule", {
    body: {
      location: "eastus",
      dataFlows: [
        {
          destinations: ["centralWorkspace"],
          streams: ["Microsoft-Perf", "Microsoft-Syslog", "Microsoft-WindowsEvent"],
        },
      ],
      dataSources: {
        performanceCounters: [
          {
            name: "cloudTeamCoreCounters",
            counterSpecifiers: [
              "\\Processor(_Total)\\% Processor Time",
              "\\Memory\\Committed Bytes",
              "\\LogicalDisk(_Total)\\Free Megabytes",
              "\\PhysicalDisk(_Total)\\Avg. Disk Queue Length",
            ],
            samplingFrequencyInSeconds: 15,
            streams: ["Microsoft-Perf"],
          },
          {
            name: "appTeamExtraCounters",
            counterSpecifiers: ["\\Process(_Total)\\Thread Count"],
            samplingFrequencyInSeconds: 30,
            streams: ["Microsoft-Perf"],
          },
        ],
        syslog: [
          {
            name: "cronSyslog",
            facilityNames: ["cron"],
            logLevels: ["Debug", "Critical", "Emergency"],
            streams: ["Microsoft-Syslog"],
          },
          {
            name: "syslogBase",
            facilityNames: ["syslog"],
            logLevels: ["Alert", "Critical", "Emergency"],
            streams: ["Microsoft-Syslog"],
          },
        ],
        windowsEventLogs: [
          {
            name: "cloudSecurityTeamEvents",
            streams: ["Microsoft-WindowsEvent"],
            xPathQueries: ["Security!"],
          },
          {
            name: "appTeam1AppEvents",
            streams: ["Microsoft-WindowsEvent"],
            xPathQueries: [
              "System![System[(Level = 1 or Level = 2 or Level = 3)]]",
              "Application!*[System[(Level = 1 or Level = 2 or Level = 3)]]",
            ],
          },
        ],
      },
      destinations: {
        logAnalytics: [
          {
            name: "centralWorkspace",
            workspaceResourceId:
              "/subscriptions/703362b3-f278-4e4b-9179-c76eaf41ffc2/resourceGroups/myResourceGroup/providers/Microsoft.OperationalInsights/workspaces/centralTeamWorkspace",
          },
        ],
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a data collection rule.
 *
 * @summary creates or updates a data collection rule.
 * x-ms-original-file: 2024-03-11/DataCollectionRulesCreateAgentSettings.json
 */
async function createOrUpdateAnAgentSettingsConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.dataCollectionRules.create("myResourceGroup", "myCollectionRule", {
    body: {
      kind: "AgentSettings",
      location: "eastus",
      description: "An agent settings configuration",
      agentSettings: {
        logs: [
          { name: "MaxDiskQuotaInMB", value: "5000" },
          { name: "UseTimeReceivedForForwardedEvents", value: "1" },
          { name: "Tags", value: "Azure, Monitoring" },
        ],
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a data collection rule.
 *
 * @summary creates or updates a data collection rule.
 * x-ms-original-file: 2024-03-11/DataCollectionRulesCreateEmbeddedDCE.json
 */
async function createOrUpdateDataCollectionRuleWithEmbeddedIngestionEndpoints() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.dataCollectionRules.create("myResourceGroup", "myCollectionRule", {
    body: {
      kind: " Direct",
      location: "eastus",
      description: "A Direct Ingestion Rule with builtin ingestion fqdns",
      dataFlows: [
        {
          destinations: ["myworkspace"],
          outputStream: "Custom-LOGS1_CL",
          streams: ["Custom-LOGS1_CL"],
          transformKql:
            "source | extend jsonContext = parse_json(AdditionalContext) | project TimeGenerated = Time, Computer, AdditionalContext = jsonContext, CounterName=tostring(jsonContext.CounterName), CounterValue=toreal(jsonContext.CounterValue)",
        },
      ],
      destinations: {
        logAnalytics: [
          {
            name: "centralWorkspace",
            workspaceResourceId:
              "/subscriptions/703362b3-f278-4e4b-9179-c76eaf41ffc2/resourceGroups/myResourceGroup/providers/Microsoft.OperationalInsights/workspaces/centralTeamWorkspace",
          },
        ],
      },
      streamDeclarations: {
        "Custom-LOGS1_CL": {
          columns: [
            { name: "Time", type: "datetime" },
            { name: "Computer", type: "string" },
            { name: "AdditionalContext", type: "string" },
            { name: "CounterName", type: "string" },
            { name: "CounterValue", type: "real" },
          ],
        },
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a data collection rule.
 *
 * @summary creates or updates a data collection rule.
 * x-ms-original-file: 2024-03-11/DataCollectionRulesCreateEnrichment.json
 */
async function createOrUpdateDataCollectionRuleWithEnrichment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.dataCollectionRules.create("myResourceGroup", "myCollectionRule", {
    body: {
      location: "eastus",
      description: "A rule showcasing ingestion time enrichment",
      dataCollectionEndpointId:
        "/subscriptions/703362b3-f278-4e4b-9179-c76eaf41ffc2/resourceGroups/myResourceGroup/providers/Microsoft.Insights/dataCollectionEndpoints/myDataCollectionEndpoint",
      dataFlows: [
        {
          destinations: ["centralWorkspace"],
          outputStream: "Custom-LOGS1_CL",
          streams: ["Custom-TabularDataABC"],
          transformKql:
            "source | extend LookupData = lookup_string_am('mytextdatastore', Message) | project TimeGenerated, Message, AdditionalContext = LookupData.Message",
        },
      ],
      dataSources: {
        logFiles: [
          {
            name: "myTabularLogDataSource",
            format: "text",
            filePatterns: ["C:\\JavaLogs\\*\\*.log"],
            settings: { text: { recordStartTimestampFormat: "ISO 8601" } },
            streams: ["Custom-TabularDataABC"],
          },
        ],
      },
      destinations: {
        logAnalytics: [
          {
            name: "centralWorkspace",
            workspaceResourceId:
              "/subscriptions/703362b3-f278-4e4b-9179-c76eaf41ffc2/resourceGroups/myResourceGroup/providers/Microsoft.OperationalInsights/workspaces/centralTeamWorkspace",
          },
        ],
      },
      references: {
        enrichmentData: {
          storageBlobs: [
            {
              name: "mytextdatastore",
              blobUrl: "https://myenrichmentstorage.blob.core.windows.net/enrichment",
              lookupType: "String",
              resourceId:
                "/subscriptions/703362b3-f278-4e4b-9179-c76eaf41ffc2/resourcegroups/myResourceGroup/providers/Microsoft.Storage/storageAccounts/myenrichmentstorage",
            },
          ],
        },
      },
      streamDeclarations: {
        "Custom-TabularDataABC": {
          columns: [
            { name: "TimeGenerated", type: "datetime" },
            { name: "Message", type: "string" },
            { name: "AdditionalContext", type: "string" },
          ],
        },
      },
    },
  });
  console.log(result);
}

async function main() {
  await createOrUpdateDataCollectionRule();
  await createOrUpdateAnAgentSettingsConfiguration();
  await createOrUpdateDataCollectionRuleWithEmbeddedIngestionEndpoints();
  await createOrUpdateDataCollectionRuleWithEnrichment();
}

main().catch(console.error);
