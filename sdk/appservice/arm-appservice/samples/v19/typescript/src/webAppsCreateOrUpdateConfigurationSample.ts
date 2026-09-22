// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Updates the configuration of an app.
 *
 * @summary description for Updates the configuration of an app.
 * x-ms-original-file: 2025-05-01/UpdateSiteConfig.json
 */
async function updateSiteConfig(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.createOrUpdateConfiguration("testrg123", "sitef6141", {
    acrUseManagedIdentityCreds: false,
    alwaysOn: false,
    appCommandLine: "",
    autoHealEnabled: false,
    azureStorageAccounts: {},
    defaultDocuments: [
      "Default.htm",
      "Default.html",
      "Default.asp",
      "index.htm",
      "index.html",
      "iisstart.htm",
      "default.aspx",
      "index.php",
      "hostingstart.html",
    ],
    detailedErrorLoggingEnabled: false,
    ftpsState: "AllAllowed",
    functionAppScaleLimit: 0,
    functionsRuntimeScaleMonitoringEnabled: false,
    http20Enabled: false,
    httpLoggingEnabled: false,
    linuxFxVersion: "",
    loadBalancing: "LeastRequests",
    logsDirectorySizeLimit: 35,
    managedPipelineMode: "Integrated",
    minTlsVersion: "1.2",
    minimumElasticInstanceCount: 0,
    netFrameworkVersion: "v4.0",
    nodeVersion: "",
    numberOfWorkers: 1,
    phpVersion: "5.6",
    powerShellVersion: "",
    pythonVersion: "",
    remoteDebuggingEnabled: false,
    requestTracingEnabled: false,
    scmMinTlsVersion: "1.2",
    use32BitWorkerProcess: true,
    virtualApplications: [
      { physicalPath: "site\\wwwroot", preloadEnabled: false, virtualPath: "/" },
    ],
    vnetName: "",
    vnetPrivatePortsCount: 0,
    vnetRouteAllEnabled: false,
    webSocketsEnabled: false,
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateSiteConfig();
}

main().catch(console.error);
