// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a provider instance for the specified subscription, resource group, SAP monitor name, and resource name.
 *
 * @summary Creates a provider instance for the specified subscription, resource group, SAP monitor name, and resource name.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/workloadmonitor/Db2ProviderInstances_Create.json
 */

import type { ProviderInstance } from "@azure/arm-workloads";
import { WorkloadsClient } from "@azure/arm-workloads";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createADb2Provider(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "mySapMonitor";
  const providerInstanceName = "myProviderInstance";
  const providerInstanceParameter: ProviderInstance = {
    providerSettings: {
      dbName: "dbName",
      dbPassword: "password",
      dbPasswordUri: "",
      dbPort: "dbPort",
      dbUsername: "username",
      hostname: "hostname",
      providerType: "Db2",
      sapSid: "SID",
      sslCertificateUri: "https://storageaccount.blob.core.windows.net/containername/filename",
      sslPreference: "ServerCertificate",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.providerInstances.beginCreateAndWait(
    resourceGroupName,
    monitorName,
    providerInstanceName,
    providerInstanceParameter,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a provider instance for the specified subscription, resource group, SAP monitor name, and resource name.
 *
 * @summary Creates a provider instance for the specified subscription, resource group, SAP monitor name, and resource name.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/workloadmonitor/Db2ProviderInstances_Create_Root_Certificate.json
 */
async function createADb2ProviderWithRootCertificate(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "mySapMonitor";
  const providerInstanceName = "myProviderInstance";
  const providerInstanceParameter: ProviderInstance = {
    providerSettings: {
      dbName: "dbName",
      dbPassword: "password",
      dbPasswordUri: "",
      dbPort: "dbPort",
      dbUsername: "username",
      hostname: "hostname",
      providerType: "Db2",
      sapSid: "SID",
      sslPreference: "RootCertificate",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.providerInstances.beginCreateAndWait(
    resourceGroupName,
    monitorName,
    providerInstanceName,
    providerInstanceParameter,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a provider instance for the specified subscription, resource group, SAP monitor name, and resource name.
 *
 * @summary Creates a provider instance for the specified subscription, resource group, SAP monitor name, and resource name.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/workloadmonitor/MsSqlServerProviderInstance_Create.json
 */
async function createAMSSqlServerProvider(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "mySapMonitor";
  const providerInstanceName = "myProviderInstance";
  const providerInstanceParameter: ProviderInstance = {
    providerSettings: {
      dbPassword: "****",
      dbPasswordUri: "",
      dbPort: "5912",
      dbUsername: "user",
      hostname: "hostname",
      providerType: "MsSqlServer",
      sapSid: "sid",
      sslCertificateUri: "https://storageaccount.blob.core.windows.net/containername/filename",
      sslPreference: "ServerCertificate",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.providerInstances.beginCreateAndWait(
    resourceGroupName,
    monitorName,
    providerInstanceName,
    providerInstanceParameter,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a provider instance for the specified subscription, resource group, SAP monitor name, and resource name.
 *
 * @summary Creates a provider instance for the specified subscription, resource group, SAP monitor name, and resource name.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/workloadmonitor/MsSqlServerProviderInstance_Create_Root_Certificate.json
 */
async function createAMSSqlServerProviderWithRootCertificate(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "mySapMonitor";
  const providerInstanceName = "myProviderInstance";
  const providerInstanceParameter: ProviderInstance = {
    providerSettings: {
      dbPassword: "****",
      dbPasswordUri: "",
      dbPort: "5912",
      dbUsername: "user",
      hostname: "hostname",
      providerType: "MsSqlServer",
      sapSid: "sid",
      sslPreference: "RootCertificate",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.providerInstances.beginCreateAndWait(
    resourceGroupName,
    monitorName,
    providerInstanceName,
    providerInstanceParameter,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a provider instance for the specified subscription, resource group, SAP monitor name, and resource name.
 *
 * @summary Creates a provider instance for the specified subscription, resource group, SAP monitor name, and resource name.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/workloadmonitor/PrometheusOSProviderInstances_Create.json
 */
async function createAOSProvider(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "mySapMonitor";
  const providerInstanceName = "myProviderInstance";
  const providerInstanceParameter: ProviderInstance = {
    providerSettings: {
      prometheusUrl: "http://192.168.0.0:9090/metrics",
      providerType: "PrometheusOS",
      sapSid: "SID",
      sslCertificateUri: "https://storageaccount.blob.core.windows.net/containername/filename",
      sslPreference: "ServerCertificate",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.providerInstances.beginCreateAndWait(
    resourceGroupName,
    monitorName,
    providerInstanceName,
    providerInstanceParameter,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a provider instance for the specified subscription, resource group, SAP monitor name, and resource name.
 *
 * @summary Creates a provider instance for the specified subscription, resource group, SAP monitor name, and resource name.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/workloadmonitor/PrometheusOSProviderInstances_Create_Root_Certificate.json
 */
async function createAOSProviderWithRootCertificate(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "mySapMonitor";
  const providerInstanceName = "myProviderInstance";
  const providerInstanceParameter: ProviderInstance = {
    providerSettings: {
      prometheusUrl: "http://192.168.0.0:9090/metrics",
      providerType: "PrometheusOS",
      sapSid: "SID",
      sslPreference: "RootCertificate",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.providerInstances.beginCreateAndWait(
    resourceGroupName,
    monitorName,
    providerInstanceName,
    providerInstanceParameter,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a provider instance for the specified subscription, resource group, SAP monitor name, and resource name.
 *
 * @summary Creates a provider instance for the specified subscription, resource group, SAP monitor name, and resource name.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/workloadmonitor/PrometheusHaClusterProviderInstances_Create.json
 */
async function createAPrometheusHaClusterProvider(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "mySapMonitor";
  const providerInstanceName = "myProviderInstance";
  const providerInstanceParameter: ProviderInstance = {
    providerSettings: {
      clusterName: "clusterName",
      hostname: "hostname",
      prometheusUrl: "http://192.168.0.0:9090/metrics",
      providerType: "PrometheusHaCluster",
      sid: "sid",
      sslCertificateUri: "https://storageaccount.blob.core.windows.net/containername/filename",
      sslPreference: "ServerCertificate",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.providerInstances.beginCreateAndWait(
    resourceGroupName,
    monitorName,
    providerInstanceName,
    providerInstanceParameter,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a provider instance for the specified subscription, resource group, SAP monitor name, and resource name.
 *
 * @summary Creates a provider instance for the specified subscription, resource group, SAP monitor name, and resource name.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/workloadmonitor/PrometheusHaClusterProviderInstances_Create_Root_Certificate.json
 */
async function createAPrometheusHaClusterProviderWithRootCertificate(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "mySapMonitor";
  const providerInstanceName = "myProviderInstance";
  const providerInstanceParameter: ProviderInstance = {
    providerSettings: {
      clusterName: "clusterName",
      hostname: "hostname",
      prometheusUrl: "http://192.168.0.0:9090/metrics",
      providerType: "PrometheusHaCluster",
      sid: "sid",
      sslPreference: "RootCertificate",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.providerInstances.beginCreateAndWait(
    resourceGroupName,
    monitorName,
    providerInstanceName,
    providerInstanceParameter,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a provider instance for the specified subscription, resource group, SAP monitor name, and resource name.
 *
 * @summary Creates a provider instance for the specified subscription, resource group, SAP monitor name, and resource name.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/workloadmonitor/ProviderInstances_Create.json
 */
async function createASapMonitorHanaProvider(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "mySapMonitor";
  const providerInstanceName = "myProviderInstance";
  const providerInstanceParameter: ProviderInstance = {
    providerSettings: {
      dbName: "db",
      dbPassword: "****",
      dbPasswordUri: "",
      dbUsername: "user",
      hostname: "name",
      instanceNumber: "00",
      providerType: "SapHana",
      sapSid: "SID",
      sqlPort: "0000",
      sslCertificateUri: "https://storageaccount.blob.core.windows.net/containername/filename",
      sslHostNameInCertificate: "xyz.domain.com",
      sslPreference: "ServerCertificate",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.providerInstances.beginCreateAndWait(
    resourceGroupName,
    monitorName,
    providerInstanceName,
    providerInstanceParameter,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a provider instance for the specified subscription, resource group, SAP monitor name, and resource name.
 *
 * @summary Creates a provider instance for the specified subscription, resource group, SAP monitor name, and resource name.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/workloadmonitor/ProviderInstances_Create_Root_Certificate.json
 */
async function createASapMonitorHanaProviderWithRootCertificate(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "mySapMonitor";
  const providerInstanceName = "myProviderInstance";
  const providerInstanceParameter: ProviderInstance = {
    providerSettings: {
      dbName: "db",
      dbPassword: "****",
      dbPasswordUri: "",
      dbUsername: "user",
      hostname: "name",
      instanceNumber: "00",
      providerType: "SapHana",
      sapSid: "SID",
      sqlPort: "0000",
      sslHostNameInCertificate: "xyz.domain.com",
      sslPreference: "RootCertificate",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.providerInstances.beginCreateAndWait(
    resourceGroupName,
    monitorName,
    providerInstanceName,
    providerInstanceParameter,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a provider instance for the specified subscription, resource group, SAP monitor name, and resource name.
 *
 * @summary Creates a provider instance for the specified subscription, resource group, SAP monitor name, and resource name.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/workloadmonitor/NetWeaverProviderInstances_Create.json
 */
async function createASapMonitorNetWeaverProvider(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "mySapMonitor";
  const providerInstanceName = "myProviderInstance";
  const providerInstanceParameter: ProviderInstance = {
    providerSettings: {
      providerType: "SapNetWeaver",
      sapClientId: "111",
      sapHostFileEntries: ["127.0.0.1 name fqdn"],
      sapHostname: "name",
      sapInstanceNr: "00",
      sapPassword: "****",
      sapPasswordUri: "",
      sapPortNumber: "1234",
      sapSid: "SID",
      sapUsername: "username",
      sslCertificateUri: "https://storageaccount.blob.core.windows.net/containername/filename",
      sslPreference: "ServerCertificate",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.providerInstances.beginCreateAndWait(
    resourceGroupName,
    monitorName,
    providerInstanceName,
    providerInstanceParameter,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a provider instance for the specified subscription, resource group, SAP monitor name, and resource name.
 *
 * @summary Creates a provider instance for the specified subscription, resource group, SAP monitor name, and resource name.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/workloadmonitor/NetWeaverProviderInstances_Create_Root_Certificate.json
 */
async function createASapMonitorNetWeaverProviderWithRootCertificate(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "mySapMonitor";
  const providerInstanceName = "myProviderInstance";
  const providerInstanceParameter: ProviderInstance = {
    providerSettings: {
      providerType: "SapNetWeaver",
      sapClientId: "111",
      sapHostFileEntries: ["127.0.0.1 name fqdn"],
      sapHostname: "name",
      sapInstanceNr: "00",
      sapPassword: "****",
      sapPasswordUri: "",
      sapPortNumber: "1234",
      sapSid: "SID",
      sapUsername: "username",
      sslPreference: "RootCertificate",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.providerInstances.beginCreateAndWait(
    resourceGroupName,
    monitorName,
    providerInstanceName,
    providerInstanceParameter,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createADb2Provider();
  await createADb2ProviderWithRootCertificate();
  await createAMSSqlServerProvider();
  await createAMSSqlServerProviderWithRootCertificate();
  await createAOSProvider();
  await createAOSProviderWithRootCertificate();
  await createAPrometheusHaClusterProvider();
  await createAPrometheusHaClusterProviderWithRootCertificate();
  await createASapMonitorHanaProvider();
  await createASapMonitorHanaProviderWithRootCertificate();
  await createASapMonitorNetWeaverProvider();
  await createASapMonitorNetWeaverProviderWithRootCertificate();
}

main().catch(console.error);
