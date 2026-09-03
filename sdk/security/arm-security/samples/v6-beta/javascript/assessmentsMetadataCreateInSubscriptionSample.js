// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create metadata information on an assessment type in a specific subscription
 *
 * @summary create metadata information on an assessment type in a specific subscription
 * x-ms-original-file: 2025-05-04/AssessmentsMetadata/CreateAssessmentsMetadata_subscription_example.json
 */
async function createSecurityAssessmentMetadataForSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0980887d-03d6-408c-9566-532f3456804e";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.assessmentsMetadata.createInSubscription(
    "ca039e75-a276-4175-aebc-bcd41e4b14b7",
    {
      description:
        "Install an endpoint protection solution on your virtual machines scale sets, to protect them from threats and vulnerabilities.",
      assessmentType: "CustomerManaged",
      categories: ["Compute"],
      displayName: "Install endpoint protection solution on virtual machine scale sets",
      remediationDescription:
        'To install an endpoint protection solution: 1.  <a href="https://docs.microsoft.com/azure/virtual-machine-scale-sets/virtual-machine-scale-sets-faq#how-do-i-turn-on-antimalware-in-my-virtual-machine-scale-set">Follow the instructions in How do I turn on antimalware in my virtual machine scale set</a>',
      severity: "Medium",
      threats: ["dataExfiltration", "dataSpillage", "maliciousInsider"],
    },
  );
  console.log(result);
}

async function main() {
  await createSecurityAssessmentMetadataForSubscription();
}

main().catch(console.error);
