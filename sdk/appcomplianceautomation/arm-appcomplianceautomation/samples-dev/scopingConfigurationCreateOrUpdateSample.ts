// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppComplianceAutomationToolForMicrosoft365 } from "@azure/arm-appcomplianceautomation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get the AppComplianceAutomation scoping configuration of the specific report.
 *
 * @summary Get the AppComplianceAutomation scoping configuration of the specific report.
 * x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/ScopingConfiguration_CreateOrUpdate.json
 */
async function scopingConfigurationCreateOrUpdate(): Promise<void> {
  const reportName = "testReportName";
  const scopingConfigurationName = "default";
  const credential = new DefaultAzureCredential();
  const client = new AppComplianceAutomationToolForMicrosoft365(credential);
  const result = await client.scopingConfiguration.createOrUpdate(
    reportName,
    scopingConfigurationName,
    {
      properties: {
        answers: [
          {
            answers: ["Azure"],
            questionId: "GEN20_hostingEnvironment",
          },
          {
            answers: [],
            questionId: "DHP_G07_customerDataProcess",
          },
          {
            answers: [],
            questionId: "Tier2InitSub_serviceCommunicate",
          },
        ],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await scopingConfigurationCreateOrUpdate();
}

main().catch(console.error);
