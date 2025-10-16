// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates a threat detection policy.
 *
 * @summary Creates or updates a threat detection policy.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/ServerSecurityAlertsCreateMax.json
 */
async function updateAServerThreatDetectionPolicyWithAllParameters() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "securityalert-4799";
  const serverName = "securityalert-6440";
  const securityAlertPolicyName = "Default";
  const parameters = {
    disabledAlerts: ["Access_Anomaly", "Usage_Anomaly"],
    emailAccountAdmins: true,
    emailAddresses: ["testSecurityAlert@microsoft.com"],
    retentionDays: 5,
    state: "Enabled",
    storageAccountAccessKey:
      "sdlfkjabc+sdlfkjsdlkfsjdfLDKFTERLKFDFKLjsdfksjdflsdkfD2342309432849328476458/3RSD==",
    storageEndpoint: "https://mystorage.blob.core.windows.net",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.serverSecurityAlertPolicies.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    securityAlertPolicyName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a threat detection policy.
 *
 * @summary Creates or updates a threat detection policy.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/ServerSecurityAlertsCreateMin.json
 */
async function updateAServerThreatDetectionPolicyWithMinimalParameters() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "securityalert-4799";
  const serverName = "securityalert-6440";
  const securityAlertPolicyName = "Default";
  const parameters = { state: "Enabled" };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.serverSecurityAlertPolicies.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    securityAlertPolicyName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await updateAServerThreatDetectionPolicyWithAllParameters();
  await updateAServerThreatDetectionPolicyWithMinimalParameters();
}

main().catch(console.error);
