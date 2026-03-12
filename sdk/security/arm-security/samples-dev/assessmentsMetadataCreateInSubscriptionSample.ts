// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create metadata information on an assessment type in a specific subscription
 *
 * @summary Create metadata information on an assessment type in a specific subscription
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/stable/2021-06-01/examples/AssessmentsMetadata/CreateAssessmentsMetadata_subscription_example.json
 */

import type { SecurityAssessmentMetadataResponse } from "@azure/arm-security";
import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createSecurityAssessmentMetadataForSubscription(): Promise<void> {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "0980887d-03d6-408c-9566-532f3456804e";
  const assessmentMetadataName = "ca039e75-a276-4175-aebc-bcd41e4b14b7";
  const assessmentMetadata: SecurityAssessmentMetadataResponse = {
    description:
      "Install an endpoint protection solution on your virtual machines scale sets, to protect them from threats and vulnerabilities.",
    assessmentType: "CustomerManaged",
    categories: ["Compute"],
    displayName: "Install endpoint protection solution on virtual machine scale sets",
    implementationEffort: "Low",
    remediationDescription:
      'To install an endpoint protection solution: 1.  <a href="https://learn.microsoft.com/azure/virtual-machine-scale-sets/virtual-machine-scale-sets-faq#how-do-i-turn-on-antimalware-in-my-virtual-machine-scale-set">Follow the instructions in How do I turn on antimalware in my virtual machine scale set</a>',
    severity: "Medium",
    threats: ["dataExfiltration", "dataSpillage", "maliciousInsider"],
    userImpact: "Low",
  };
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.assessmentsMetadata.createInSubscription(
    assessmentMetadataName,
    assessmentMetadata,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createSecurityAssessmentMetadataForSubscription();
}

main().catch(console.error);
