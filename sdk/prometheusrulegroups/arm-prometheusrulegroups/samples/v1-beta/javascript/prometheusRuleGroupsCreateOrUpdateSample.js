// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PrometheusRuleGroupsManagementClient } = require("@azure/arm-prometheusrulegroups");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a Prometheus rule group definition.
 *
 * @summary create or update a Prometheus rule group definition.
 * x-ms-original-file: 2023-03-01/createOrUpdateClusterCentricRuleGroup.json
 */
async function createOrUpdateAClusterCentricPrometheusRuleGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PrometheusRuleGroupsManagementClient(credential, subscriptionId);
  const result = await client.prometheusRuleGroups.createOrUpdate(
    "promResourceGroup",
    "myPrometheusRuleGroup",
    {
      location: "East US",
      description: "This is a rule group with culster centric configuration",
      clusterName: "myClusterName",
      interval: "PT10M",
      rules: [
        {
          actions: [],
          alert: "Billing_Processing_Very_Slow",
          annotations: { annotationName1: "annotationValue1" },
          enabled: true,
          expression: "job_type:billing_jobs_duration_seconds:99p5m > 30",
          for: "PT5M",
          labels: { team: "prod" },
          resolveConfiguration: { autoResolved: true, timeToResolve: "PT10M" },
          severity: 2,
        },
      ],
      scopes: [
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/myResourceGroup/providers/microsoft.monitor/accounts/myAzureMonitorWorkspace",
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/myResourceGroup/providers/Microsoft.ContainerService/managedClusters/myClusterName",
      ],
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Prometheus rule group definition.
 *
 * @summary create or update a Prometheus rule group definition.
 * x-ms-original-file: 2023-03-01/createOrUpdatePrometheusRuleGroup.json
 */
async function createOrUpdateAPrometheusRuleGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PrometheusRuleGroupsManagementClient(credential, subscriptionId);
  const result = await client.prometheusRuleGroups.createOrUpdate(
    "promResourceGroup",
    "myPrometheusRuleGroup",
    {
      location: "East US",
      description: "This is the description of the following rule group",
      clusterName: "myClusterName",
      enabled: true,
      interval: "PT10M",
      rules: [
        {
          expression:
            'histogram_quantile(0.99, sum(rate(jobs_duration_seconds_bucket{service="billing-processing"}[5m])) by (job_type))',
          labels: { team: "prod" },
          record: "job_type:billing_jobs_duration_seconds:99p5m",
        },
        {
          actions: [
            {
              actionGroupId:
                "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourcegroups/myrg/providers/microsoft.insights/actiongroups/myactiongroup",
              actionProperties: { key11: "value11", key12: "value12" },
            },
            {
              actionGroupId:
                "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourcegroups/myrg/providers/microsoft.insights/actiongroups/myotheractiongroup",
              actionProperties: { key21: "value21", key22: "value22" },
            },
          ],
          alert: "Billing_Processing_Very_Slow",
          annotations: { annotationName1: "annotationValue1" },
          enabled: true,
          expression: "job_type:billing_jobs_duration_seconds:99p5m > 30",
          for: "PT5M",
          labels: { team: "prod" },
          resolveConfiguration: { autoResolved: true, timeToResolve: "PT10M" },
          severity: 2,
        },
      ],
      scopes: [
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/myResourceGroup/providers/microsoft.monitor/accounts/myAzureMonitorWorkspace",
      ],
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateAClusterCentricPrometheusRuleGroup();
  await createOrUpdateAPrometheusRuleGroup();
}

main().catch(console.error);
