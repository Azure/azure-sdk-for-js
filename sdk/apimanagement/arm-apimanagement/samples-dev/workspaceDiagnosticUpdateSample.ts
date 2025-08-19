// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates the details of the Diagnostic specified by its identifier.
 *
 * @summary Updates the details of the Diagnostic specified by its identifier.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementUpdateWorkspaceDiagnostic.json
 */

import {
  DiagnosticUpdateContract,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementUpdateWorkspaceDiagnostic(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const diagnosticId = "applicationinsights";
  const ifMatch = "*";
  const parameters: DiagnosticUpdateContract = {
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
  const result = await client.workspaceDiagnostic.update(
    resourceGroupName,
    serviceName,
    workspaceId,
    diagnosticId,
    ifMatch,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUpdateWorkspaceDiagnostic();
}

main().catch(console.error);
