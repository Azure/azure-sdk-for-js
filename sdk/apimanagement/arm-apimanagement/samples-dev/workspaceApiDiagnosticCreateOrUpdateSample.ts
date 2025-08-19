// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a new Diagnostic for an API or updates an existing one.
 *
 * @summary Creates a new Diagnostic for an API or updates an existing one.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateWorkspaceApiDiagnostic.json
 */

import {
  DiagnosticContract,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementCreateWorkspaceApiDiagnostic(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const apiId = "57d1f7558aa04f15146d9d8a";
  const diagnosticId = "applicationinsights";
  const parameters: DiagnosticContract = {
    alwaysLog: "allErrors",
    backend: {
      response: { body: { bytes: 512 }, headers: ["Content-type"] },
      request: { body: { bytes: 512 }, headers: ["Content-type"] },
    },
    frontend: {
      response: { body: { bytes: 512 }, headers: ["Content-type"] },
      request: { body: { bytes: 512 }, headers: ["Content-type"] },
    },
    loggerId: "/workspaces/wks1/loggers/applicationinsights",
    sampling: { percentage: 50, samplingType: "fixed" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceApiDiagnostic.createOrUpdate(
    resourceGroupName,
    serviceName,
    workspaceId,
    apiId,
    diagnosticId,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateWorkspaceApiDiagnostic();
}

main().catch(console.error);
