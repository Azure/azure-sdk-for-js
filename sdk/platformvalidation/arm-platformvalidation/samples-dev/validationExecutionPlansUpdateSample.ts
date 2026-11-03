// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformValidationClient } from "@azure/arm-platformvalidation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a validation test execution plan
 *
 * @summary update a validation test execution plan
 * x-ms-original-file: 2026-08-01-preview/ValidationExecutionPlans_Update_MaximumSet_Gen.json
 */
async function validationExecutionPlansUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const result = await client.validationExecutionPlans.update(
    "rgvalidate",
    "cvtest01",
    "veptest01",
    {
      properties: {
        description:
          "Validation execution plan that runs the network connectivity checks against the target image.",
        planConfigurationJson:
          '{"apiVersion":"microsoft.PlatformValidation/validationExecutionPlan.v0","kind":"ValidationExecutionPlan","metadata":{"name":"contoso-linux-cert"},"parameters":{"certificationPackageReference":{"osType":"Linux","vmGenerationType":"V1","architectureType":"X64","recommendedVMSizes":["Standard_D4s_v3"],"storageProfile":{"osDiskImage":{"sourceVhdUri":"https://contoso.blob.core.windows.net/vhds/img.vhd?<sas>"},"dataDiskImages":[]},"additionalProperties":{}}},"authoring":{"steps":[{"name":"os-disk-size","type":"test","testRef":"/providers/Microsoft.PlatformValidation/validationTests/os-disk-size/versions/1.0.0"},{"name":"data-disk-size","type":"test","testRef":"/providers/Microsoft.PlatformValidation/validationTests/data-disk-size/versions/1.0.0"},{"name":"malware-defender","type":"test","testRef":"/providers/Microsoft.PlatformValidation/validationTests/malware-defender/versions/1.0.0"},{"name":"malware-esrp","type":"test","testRef":"/providers/Microsoft.PlatformValidation/validationTests/malware-esrp/versions/1.0.0"},{"name":"linux-quality-validation","type":"test","testRef":"/providers/Microsoft.PlatformValidation/validationTests/linux-quality-validation/versions/1.0.0","inputs":{"concurrency":1,"testSuite":[{"testNames":["smoke_test","validate_netvsc_reload"]}]}}]}}',
      },
      tags: { environment: "production" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await validationExecutionPlansUpdateMaximumSet();
}

main().catch(console.error);
